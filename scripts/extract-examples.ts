/**
 * Example Code Extractor
 *
 * Produces copy-pasteable snippets for each exported example in the demo files.
 *
 * For every exported example function we:
 *   1. Walk it (with proper scope analysis) to find every top-level name it references.
 *   2. Recursively pull in any helper declarations it depends on.
 *   3. Constant-fold simple string / number / boolean / literal-object bindings at their use sites,
 *      so site-only scaffolding like `demoFieldWidth` and `fieldConfig.default.gap` disappear and are
 *      replaced with their resolved values.
 *   4. Keep only the imports that are still referenced after folding.
 *
 * Site-plumbing (imports from `@/lib/demo-utils`, the `examples: DemoExample[]` export, the
 * `createLegacyDemo(...)` export, re-exports) is stripped from the snippet.
 *
 * Output: public/examples/[component].json
 */
import _generate from '@babel/generator';
import { parse as babelParse } from '@babel/parser';
import _traverse, { type NodePath } from '@babel/traverse';
import * as t from '@babel/types';
import * as fs from 'fs';
import * as path from 'path';
import { format as prettierFormat } from 'prettier';
import { fileURLToPath } from 'url';

// Handle ESM/CJS default-export interop under tsx
type TraverseFn = typeof _traverse;
type GenerateFn = typeof _generate;
const traverse = ((_traverse as unknown as { default?: TraverseFn }).default ??
  _traverse) as TraverseFn;
const generate = ((_generate as unknown as { default?: GenerateFn }).default ??
  _generate) as GenerateFn;

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const DEMO_DIR = path.join(_dirname, '../src/app/demo/[name]/ui');
const OUTPUT_DIR = path.join(_dirname, '../public/examples');

// Sources whose imports are always dropped from snippets (site scaffolding).
const DROP_IMPORT_SOURCES = new Set(['@/lib/demo-utils']);

interface ExampleCode {
  name: string;
  code: string;
}

function isExampleFunction(name: string): boolean {
  const hasMixedCase = /[a-z]/.test(name) && /[A-Z]/.test(name);
  const hasExampleKeyword = name.includes('Demo') || name.includes('Example');
  const startsWithUppercase = /^[A-Z]/.test(name);

  return hasExampleKeyword || (hasMixedCase && startsWithUppercase);
}

/**
 * Try to reduce an expression to a JavaScript primitive/object of primitives,
 * following top-level identifier references through `foldables`.
 * Returns `undefined` for anything we can't statically resolve.
 */
function tryEvaluate(
  node: t.Node,
  foldables: Map<string, t.Expression>,
): unknown | undefined {
  if (
    t.isStringLiteral(node) ||
    t.isNumericLiteral(node) ||
    t.isBooleanLiteral(node)
  ) {
    return node.value;
  }

  if (t.isNullLiteral(node)) {
    return null;
  }

  if (t.isTemplateLiteral(node)) {
    let result = '';

    for (let i = 0; i < node.quasis.length; i++) {
      result += node.quasis[i].value.cooked ?? node.quasis[i].value.raw;

      if (i < node.expressions.length) {
        const expr = node.expressions[i];

        if (!t.isExpression(expr)) return undefined;

        const evald = tryEvaluate(expr, foldables);

        if (evald === undefined) return undefined;

        result += String(evald);
      }
    }

    return result;
  }

  if (t.isTSAsExpression(node) || t.isTSTypeAssertion(node)) {
    return tryEvaluate(node.expression, foldables);
  }

  if (t.isObjectExpression(node)) {
    const obj: Record<string, unknown> = {};

    for (const prop of node.properties) {
      if (!t.isObjectProperty(prop) || prop.computed) return undefined;

      let key: string;

      if (t.isIdentifier(prop.key)) key = prop.key.name;
      else if (t.isStringLiteral(prop.key)) key = prop.key.value;
      else return undefined;

      if (!t.isExpression(prop.value)) return undefined;

      const val = tryEvaluate(prop.value, foldables);

      if (val === undefined) return undefined;

      obj[key] = val;
    }

    return obj;
  }

  if (t.isArrayExpression(node)) {
    const arr: unknown[] = [];

    for (const el of node.elements) {
      if (el === null || !t.isExpression(el)) return undefined;

      const val = tryEvaluate(el, foldables);

      if (val === undefined) return undefined;

      arr.push(val);
    }

    return arr;
  }

  if (t.isIdentifier(node)) {
    const foldNode = foldables.get(node.name);

    if (foldNode) return tryEvaluate(foldNode, foldables);

    return undefined;
  }

  if (t.isMemberExpression(node) && !node.computed) {
    const obj = tryEvaluate(node.object, foldables);

    if (obj !== null && typeof obj === 'object') {
      const prop = node.property;

      if (t.isIdentifier(prop)) {
        return (obj as Record<string, unknown>)[prop.name];
      }
    }

    return undefined;
  }

  return undefined;
}

/**
 * Turn a resolved JS primitive back into an AST expression node.
 * Returns `undefined` for anything we can't represent as a literal.
 */
function primitiveToNode(value: unknown): t.Expression | undefined {
  if (typeof value === 'string') return t.stringLiteral(value);
  if (typeof value === 'number') return t.numericLiteral(value);
  if (typeof value === 'boolean') return t.booleanLiteral(value);
  if (value === null) return t.nullLiteral();

  if (Array.isArray(value)) {
    const els = value.map(v => primitiveToNode(v));

    if (els.some(e => e === undefined)) return undefined;

    return t.arrayExpression(els as t.Expression[]);
  }

  if (typeof value === 'object') {
    const props: t.ObjectProperty[] = [];
    const isValidIdent = (name: string) =>
      /^[$_a-zA-Z][$_a-zA-Z0-9]*$/.test(name);

    for (const [k, v] of Object.entries(value)) {
      const valNode = primitiveToNode(v);

      if (!valNode) return undefined;

      const keyNode: t.Identifier | t.StringLiteral = isValidIdent(k)
        ? t.identifier(k)
        : t.stringLiteral(k);

      props.push(t.objectProperty(keyNode, valNode, false));
    }

    return t.objectExpression(props);
  }

  return undefined;
}

/**
 * A helper is "foldable" (can be inlined at use sites) when its init
 * evaluates to a plain literal / literal object / literal array.
 */
function computeFoldables(
  ast: t.File,
  sourceFilePath: string,
): Map<string, t.Expression> {
  const foldables = new Map<string, t.Expression>();

  // Two passes: first collect all top-level const inits (so cross-references
  // like { a: foo, b: bar } where foo/bar are other top-level consts can resolve),
  // then filter to those that actually evaluate to a static value.
  const candidates = new Map<string, t.Expression>();

  for (const stmt of ast.program.body) {
    if (t.isVariableDeclaration(stmt) && stmt.kind === 'const') {
      for (const decl of stmt.declarations) {
        if (t.isIdentifier(decl.id) && decl.init && t.isExpression(decl.init)) {
          candidates.set(decl.id.name, decl.init);
        }
      }
    }
  }

  // Merge in values pulled from relative imports (./sibling files).
  for (const [localName, init] of collectCrossFileCandidates(
    ast,
    sourceFilePath,
  )) {
    // Only add if not already present as a local candidate — locals win.
    if (!candidates.has(localName)) candidates.set(localName, init);
  }

  // Names that appear inside TS type positions (`typeof foo`, `keyof typeof foo`)
  // must stay as real declarations, otherwise the type alias breaks. Collect them.
  const typeReferenced = collectTypeReferencedNames(ast);

  for (const [name, init] of candidates) {
    if (typeReferenced.has(name)) continue;

    const value = tryEvaluate(init, candidates);

    if (value === undefined) continue;

    // Fold primitives freely. Fold object/array values only when they're a
    // pure lookup table of primitives — those are the "config" shape (e.g.
    // fieldConfig.default.gap) that we want to inline away. Larger arrays
    // of data (like ITEMS, an array of records) stay as a declaration.
    if (!shouldFold(name, init, value)) continue;

    const node = primitiveToNode(value);

    if (node) foldables.set(name, node);
  }

  return foldables;
}

/**
 * Cache: relative-import file path → its exported const initializers.
 * Populated lazily so we only parse each companion file once per run.
 */
const crossFileExportsCache = new Map<string, Map<string, t.Expression>>();

function parseFileForExports(
  absPath: string,
): Map<string, t.Expression> | undefined {
  if (crossFileExportsCache.has(absPath)) {
    return crossFileExportsCache.get(absPath);
  }

  if (!fs.existsSync(absPath)) return undefined;

  const source = fs.readFileSync(absPath, 'utf-8');

  let ast: t.File;

  try {
    ast = babelParse(source, {
      sourceType: 'module',
      plugins: [
        'jsx',
        'typescript',
        ['decorators', { decoratorsBeforeExport: false }],
      ],
    });
  } catch {
    return undefined;
  }

  const exports = new Map<string, t.Expression>();

  // Collect both `export const X = ...` and non-exported top-level `const X = ...`
  // (so exported constants can reference internal helpers when evaluating).
  const localConsts = new Map<string, t.Expression>();

  for (const stmt of ast.program.body) {
    const varDecl = t.isExportNamedDeclaration(stmt) ? stmt.declaration : stmt;

    if (t.isVariableDeclaration(varDecl) && varDecl.kind === 'const') {
      for (const decl of varDecl.declarations) {
        if (t.isIdentifier(decl.id) && decl.init && t.isExpression(decl.init)) {
          localConsts.set(decl.id.name, decl.init);

          if (t.isExportNamedDeclaration(stmt)) {
            exports.set(decl.id.name, decl.init);
          }
        }
      }
    }
  }

  // Resolve any exported init that references another local const in this file.
  // We evaluate each export against the full local-const map and store the
  // resolved literal representation. Non-static exports stay as their raw init.
  const resolved = new Map<string, t.Expression>();

  for (const [name, init] of exports) {
    const value = tryEvaluate(init, localConsts);

    if (value === undefined) {
      resolved.set(name, init);
      continue;
    }

    const node = primitiveToNode(value);

    resolved.set(name, node ?? init);
  }

  crossFileExportsCache.set(absPath, resolved);

  return resolved;
}

function resolveRelativeImport(
  fromFile: string,
  source: string,
): string | undefined {
  const dir = path.dirname(fromFile);
  const base = path.resolve(dir, source);
  const candidates = [
    base,
    `${base}.ts`,
    `${base}.tsx`,
    `${base}.js`,
    `${base}.jsx`,
    path.join(base, 'index.ts'),
    path.join(base, 'index.tsx'),
  ];

  for (const c of candidates) {
    if (fs.existsSync(c) && fs.statSync(c).isFile()) return c;
  }

  return undefined;
}

/**
 * For every relative import in `ast`, load the imported file and return
 * its exported const initializers keyed by the *local* alias used here.
 */
function collectCrossFileCandidates(
  ast: t.File,
  sourceFilePath: string,
): Map<string, t.Expression> {
  const result = new Map<string, t.Expression>();

  for (const stmt of ast.program.body) {
    if (!t.isImportDeclaration(stmt)) continue;

    const source = stmt.source.value;

    // Only follow relative imports — package imports (react, date-fns) are
    // opaque, and path-alias imports (@/lib/utils) can be added later if needed.
    if (!source.startsWith('./') && !source.startsWith('../')) continue;

    const resolved = resolveRelativeImport(sourceFilePath, source);

    if (!resolved) continue;

    const exports = parseFileForExports(resolved);

    if (!exports) continue;

    for (const spec of stmt.specifiers) {
      if (!t.isImportSpecifier(spec)) continue;
      if (!t.isIdentifier(spec.imported)) continue;

      const importedName = spec.imported.name;
      const localName = spec.local.name;
      const init = exports.get(importedName);

      if (init) result.set(localName, init);
    }
  }

  return result;
}

/**
 * Find every top-level name referenced from inside a TS type position.
 * Those names must not be folded away — the type declarations that reference
 * them need the original value declaration to survive.
 */
function collectTypeReferencedNames(ast: t.File): Set<string> {
  const referenced = new Set<string>();

  traverse(ast, {
    Program(programPath) {
      programPath.traverse({
        Identifier(idPath: NodePath<t.Identifier>) {
          if (!isInsideTypeAnnotation(idPath)) return;
          if (!idPath.isReferencedIdentifier()) return;

          referenced.add(idPath.node.name);
        },
      });
    },
  });

  return referenced;
}

/**
 * Decide whether a resolved value should be inlined at use sites.
 *
 * - Primitive (string/number/boolean/null): always fold.
 * - Object: fold only if every value is a primitive AND it's used as a lookup
 *   table (member access) rather than as data. We approximate that with:
 *   "every leaf is a primitive". Nested objects allowed (fieldConfig.default.gap).
 * - Array: never fold — arrays are almost always data that reads better as `const ITEMS = [...]`.
 */
function shouldFold(
  _name: string,
  _init: t.Expression,
  value: unknown,
): boolean {
  if (value === null) return true;

  const type = typeof value;

  if (type === 'string' || type === 'number' || type === 'boolean') return true;

  if (Array.isArray(value)) return false;

  if (type === 'object') {
    return everyLeafIsPrimitive(value);
  }

  return false;
}

function everyLeafIsPrimitive(value: unknown): boolean {
  if (value === null) return true;

  const type = typeof value;

  if (type === 'string' || type === 'number' || type === 'boolean') return true;

  if (Array.isArray(value)) return false;

  if (type === 'object') {
    return Object.values(value as Record<string, unknown>).every(
      everyLeafIsPrimitive,
    );
  }

  return false;
}

/**
 * Constant-fold references to foldable names inside a node.
 * Replaces `foo` and `foo.bar.baz` with their resolved literal values.
 * Also collapses `` `${foo} ${bar}` `` down to plain strings when all parts resolve.
 */
function isInsideTypeAnnotation(nodePath: NodePath): boolean {
  return nodePath.findParent(p => p.node.type.startsWith('TS')) !== null;
}

function foldConstants(
  ast: t.File,
  foldables: Map<string, t.Expression>,
): void {
  traverse(ast, {
    Program(programPath) {
      programPath.traverse({
        MemberExpression(memberPath: NodePath<t.MemberExpression>) {
          // Never rewrite identifiers appearing inside TS type positions —
          // `typeof foo`, `keyof typeof foo`, etc. require identifiers, not literals.
          if (isInsideTypeAnnotation(memberPath)) return;

          // Find the leftmost identifier of the member chain.
          let leftmost: t.Node = memberPath.node;

          while (t.isMemberExpression(leftmost)) leftmost = leftmost.object;

          if (!t.isIdentifier(leftmost)) return;
          if (!foldables.has(leftmost.name)) return;

          // Make sure the leftmost binding is truly the top-level one
          // (not shadowed by a local parameter/variable).
          const binding = memberPath.scope.getBinding(leftmost.name);

          if (binding && binding.scope !== programPath.scope) return;

          const value = tryEvaluate(memberPath.node, foldables);

          if (value === undefined) return;

          const literal = primitiveToNode(value);

          if (literal) memberPath.replaceWith(literal);
        },
        Identifier(idPath: NodePath<t.Identifier>) {
          if (!foldables.has(idPath.node.name)) return;

          // Only fold actual references, not declarations / property keys / etc.
          if (!idPath.isReferencedIdentifier()) return;

          if (isInsideTypeAnnotation(idPath)) return;

          const binding = idPath.scope.getBinding(idPath.node.name);

          if (binding && binding.scope !== programPath.scope) return;

          const value = tryEvaluate(idPath.node, foldables);

          if (value === undefined) return;

          // Standalone identifier refs only inline primitives. Inlining an
          // object at a bare use site (e.g. `foo[runtimeKey]`) would spill
          // the whole lookup table — for those cases we leave the reference
          // and let reachability keep the declaration / import instead.
          if (!isPrimitive(value)) return;

          const literal = primitiveToNode(value);

          if (literal) idPath.replaceWith(literal);
        },
      });

      // Second pass: simplify template literals.
      //   a) Merge any `${literal}` expressions into their surrounding quasis, so
      //      `` `${'w-[240px]'} ${gap}` `` becomes `` `w-[240px] ${gap}` ``.
      //   b) If all expressions collapsed away, replace with a StringLiteral.
      programPath.traverse({
        TemplateLiteral(tmplPath: NodePath<t.TemplateLiteral>) {
          const node = tmplPath.node;
          const quasis = node.quasis;
          const exprs = node.expressions;

          const newQuasis: t.TemplateElement[] = [];
          const newExprs: (t.Expression | t.TSType)[] = [];

          let accum = quasis[0].value.cooked ?? quasis[0].value.raw;

          for (let i = 0; i < exprs.length; i++) {
            const expr = exprs[i];
            const nextRaw =
              quasis[i + 1].value.cooked ?? quasis[i + 1].value.raw;

            let asStr: string | undefined;

            if (t.isStringLiteral(expr)) asStr = expr.value;
            else if (t.isNumericLiteral(expr) || t.isBooleanLiteral(expr)) {
              asStr = String(expr.value);
            } else if (t.isNullLiteral(expr)) asStr = 'null';

            if (asStr !== undefined) {
              accum = `${accum}${asStr}${nextRaw}`;
            } else {
              newQuasis.push(
                t.templateElement({ raw: accum, cooked: accum }, false),
              );
              newExprs.push(expr);
              accum = nextRaw;
            }
          }

          newQuasis.push(
            t.templateElement({ raw: accum, cooked: accum }, true),
          );

          // Nothing merged — leave the node alone (also avoids an infinite
          // re-visit loop after replaceWith).
          if (newExprs.length === exprs.length) return;

          if (newExprs.length === 0) {
            tmplPath.replaceWith(t.stringLiteral(accum));

            return;
          }

          tmplPath.replaceWith(
            t.templateLiteral(newQuasis, newExprs as t.Expression[]),
          );
        },
      });

      // Third pass: `className={'foo'}` on JSX attributes → `className="foo"`.
      // Only unwrap JSX *attribute* containers — JSX children like `{DESCRIPTION}`
      // are left alone since escape rules differ (JSXText vs string literal).
      programPath.traverse({
        JSXAttribute(attrPath: NodePath<t.JSXAttribute>) {
          const value = attrPath.node.value;

          if (!value || !t.isJSXExpressionContainer(value)) return;

          const inner = value.expression;

          if (t.isStringLiteral(inner)) {
            attrPath.node.value = t.stringLiteral(inner.value);
          }
        },
      });
    },
  });
}

/**
 * Strip every attached comment from every node in the tree.
 * Prevents comments from bleeding across dropped statements when we filter
 * the Program body.
 */
function stripAllComments(ast: t.File): void {
  traverse(ast, {
    enter(nodePath) {
      nodePath.node.leadingComments = null;
      nodePath.node.trailingComments = null;
      nodePath.node.innerComments = null;
    },
  });
}

/**
 * Inline simple local `const` declarations whose RHS resolves to a primitive
 * (or a plain object literal, in the destructuring case).
 *
 * Two shapes are handled:
 *   1. `const x = <primitive>` — every reference to `x` is replaced with the literal.
 *   2. `const { a, b } = <plain object literal of primitives>` — every reference
 *      to a destructured name is replaced with its resolved value.
 *
 * Anything more complex (renames, defaults, rest, nested patterns, non-static
 * RHS, non-primitive values) is left alone.
 *
 * The declaration itself is removed after all its bindings are inlined.
 */
function inlineLocalConsts(ast: t.File): void {
  traverse(ast, {
    VariableDeclaration(declPath: NodePath<t.VariableDeclaration>) {
      if (declPath.node.kind !== 'const') return;

      // Only touch function-body / block-scoped consts. Program-level consts
      // are handled by the earlier top-level fold pass.
      if (t.isProgram(declPath.parent)) return;

      const surviving: t.VariableDeclarator[] = [];

      for (const decl of declPath.node.declarations) {
        if (!inlineOneDeclarator(declPath, decl)) surviving.push(decl);
      }

      if (surviving.length === 0) declPath.remove();
      else declPath.node.declarations = surviving;
    },
  });
}

function inlineOneDeclarator(
  declPath: NodePath<t.VariableDeclaration>,
  decl: t.VariableDeclarator,
): boolean {
  if (!decl.init || !t.isExpression(decl.init)) return false;

  const value = tryEvaluate(decl.init, new Map());

  if (value === undefined) return false;

  // Simple case: `const x = <primitive>`.
  if (t.isIdentifier(decl.id)) {
    if (!isPrimitive(value)) return false;

    return replaceBindingReferences(declPath, decl.id.name, value);
  }

  // Destructuring case: `const { a, b, c } = <object literal>`.
  if (t.isObjectPattern(decl.id)) {
    if (value === null || typeof value !== 'object' || Array.isArray(value)) {
      return false;
    }

    const objValue = value as Record<string, unknown>;
    const bindings: Array<{ localName: string; keyName: string }> = [];

    for (const prop of decl.id.properties) {
      // Reject rest patterns, computed keys, and defaults / renames.
      if (!t.isObjectProperty(prop)) return false;
      if (prop.computed) return false;
      if (!t.isIdentifier(prop.value)) return false;

      let keyName: string;

      if (t.isIdentifier(prop.key)) keyName = prop.key.name;
      else if (t.isStringLiteral(prop.key)) keyName = prop.key.value;
      else return false;

      if (!(keyName in objValue)) return false;
      if (!isPrimitive(objValue[keyName])) return false;

      bindings.push({ localName: prop.value.name, keyName });
    }

    let allReplaced = true;

    for (const { localName, keyName } of bindings) {
      if (!replaceBindingReferences(declPath, localName, objValue[keyName])) {
        allReplaced = false;
      }
    }

    return allReplaced;
  }

  return false;
}

function isPrimitive(value: unknown): boolean {
  if (value === null) return true;

  const type = typeof value;

  return type === 'string' || type === 'number' || type === 'boolean';
}

/**
 * Replace every reference to `name` in the enclosing scope with a fresh
 * primitive literal node. Returns false if the binding lookup fails.
 */
function replaceBindingReferences(
  declPath: NodePath,
  name: string,
  value: unknown,
): boolean {
  const binding = declPath.scope.getBinding(name);

  if (!binding) return false;

  // Iterate over a snapshot — replacing paths can trigger scope updates
  // during traversal.
  for (const refPath of [...binding.referencePaths]) {
    const literal = primitiveToNode(value);

    if (!literal) return false;

    refPath.replaceWith(literal);
  }

  return true;
}

/**
 * Names of top-level declarations we always drop from snippets — site plumbing only.
 */
function shouldDropTopLevel(name: string): boolean {
  // The `examples: DemoExample[]` export used to power the site's demo grid.
  if (name === 'examples') return true;

  // Anything that isn't camel/PascalCase-named example-shaped: e.g. `accordion = createLegacyDemo(...)`.
  // Example functions are always PascalCase and contain Demo/Example or start with a capital.
  // The runner exports (`accordion`, `textarea`, ...) start lowercase, so they'll be filtered
  // out by the reachability step naturally. This is just a belt-and-braces guard.
  return false;
}

/**
 * Extract per-example, self-contained snippets from a demo file.
 */
function extractExamples(
  source: string,
  sourceFilePath: string,
): ExampleCode[] {
  const parseAst = () =>
    babelParse(source, {
      sourceType: 'module',
      plugins: [
        'jsx',
        'typescript',
        ['decorators', { decoratorsBeforeExport: false }],
      ],
    });

  // Parse once to discover which top-level names are example functions.
  const discoveryAst = parseAst();
  const exampleNames = new Set<string>();

  traverse(discoveryAst, {
    ExportNamedDeclaration(exportPath: NodePath<t.ExportNamedDeclaration>) {
      const decl = exportPath.node.declaration;

      if (t.isFunctionDeclaration(decl) && decl.id?.name) {
        if (isExampleFunction(decl.id.name)) exampleNames.add(decl.id.name);
      } else if (t.isVariableDeclaration(decl)) {
        for (const d of decl.declarations) {
          if (t.isIdentifier(d.id) && isExampleFunction(d.id.name)) {
            // Only include arrow/function-expression exports, not `examples` arrays or
            // the `createLegacyDemo(...)` runner export.
            if (
              d.init &&
              (t.isArrowFunctionExpression(d.init) ||
                t.isFunctionExpression(d.init))
            ) {
              exampleNames.add(d.id.name);
            }
          }
        }
      }
    },
  });

  const examples: ExampleCode[] = [];

  // For each example, do a fresh parse + transform. Cheap enough at this scale
  // and avoids having to deep-clone the AST manually.
  for (const targetName of exampleNames) {
    const ast = parseAst();
    const foldables = computeFoldables(ast, sourceFilePath);

    foldConstants(ast, foldables);
    inlineLocalConsts(ast);
    // Fold once more — inlining primitives into template literals / JSX attrs
    // creates new collapse opportunities for the passes inside foldConstants.
    foldConstants(ast, foldables);
    stripAllComments(ast);

    // After folding, walk from the target function to find every top-level name it
    // still references (helpers, imports). We do a BFS over top-level bindings.
    const topLevelDecls = collectTopLevelDeclarations(ast);
    const imports = collectImports(ast);

    const kept = new Set<string>();

    const queue: string[] = [targetName];

    while (queue.length > 0) {
      const name = queue.shift()!;

      if (kept.has(name)) continue;
      if (shouldDropTopLevel(name)) continue;

      kept.add(name);

      const declNode = topLevelDecls.get(name);

      if (!declNode) continue;

      // Find every referenced identifier inside this declaration, add to queue.
      const referenced = findReferencedTopLevelNames(
        ast,
        declNode,
        topLevelDecls,
        imports,
      );

      for (const ref of referenced) queue.push(ref);
    }

    // Determine which imports are still used by the kept set.
    const usedImportLocals = new Set<string>();

    for (const name of kept) {
      const declNode = topLevelDecls.get(name);

      if (!declNode) continue;

      const referenced = findReferencedTopLevelNames(
        ast,
        declNode,
        topLevelDecls,
        imports,
      );

      for (const ref of referenced) {
        if (imports.has(ref)) usedImportLocals.add(ref);
      }
    }

    // Build the filtered Program body.
    const newBody: t.Statement[] = [];

    for (const stmt of ast.program.body) {
      if (t.isImportDeclaration(stmt)) {
        if (DROP_IMPORT_SOURCES.has(stmt.source.value)) continue;

        const filteredSpecifiers = stmt.specifiers.filter(spec => {
          const localName = spec.local.name;

          return usedImportLocals.has(localName);
        });

        if (filteredSpecifiers.length === 0) continue;

        const clonedImport = t.importDeclaration(
          filteredSpecifiers,
          t.stringLiteral(stmt.source.value),
        );

        clonedImport.importKind = stmt.importKind;
        newBody.push(clonedImport);

        continue;
      }

      const declaredNames = statementDeclaredNames(stmt);

      if (declaredNames.length === 0) continue;

      const anyKept = declaredNames.some(n => kept.has(n));

      if (!anyKept) continue;

      // Strip the `export` from all non-target statements — the snippet is a
      // single self-contained example. Only the target function keeps `export`.
      newBody.push(stripExportUnless(stmt, targetName));
    }

    // Emit imports as one block, then each other statement on its own,
    // joined by blank lines. Prettier will normalise indentation but won't
    // re-add blank lines between synthetic siblings, so we do it here.
    const importStmts = newBody.filter((s): s is t.ImportDeclaration =>
      t.isImportDeclaration(s),
    );
    const otherStmts = newBody.filter(s => !t.isImportDeclaration(s));

    const sections: string[] = [];

    if (importStmts.length > 0) {
      sections.push(generateStatements(importStmts));
    }

    for (const stmt of otherStmts) {
      sections.push(generateStatements([stmt]));
    }

    const generated = sections.join('\n\n');

    examples.push({ name: targetName, code: generated });
  }

  return examples;
}

/**
 * Collect every top-level declaration by binding name.
 * Includes: function declarations, const/let/var declarations.
 * Excludes: imports (tracked separately), re-exports.
 */
function collectTopLevelDeclarations(ast: t.File): Map<string, t.Statement> {
  const decls = new Map<string, t.Statement>();

  for (const stmt of ast.program.body) {
    if (t.isImportDeclaration(stmt)) continue;

    // Bare re-export (`export { Foo } from './bar'`) has no declaration.
    if (
      t.isExportNamedDeclaration(stmt) &&
      !stmt.declaration &&
      stmt.specifiers.length > 0
    ) {
      continue;
    }

    const declared = statementDeclaredNames(stmt);

    for (const name of declared) decls.set(name, stmt);
  }

  return decls;
}

interface ImportInfo {
  source: string;
  spec:
    | t.ImportSpecifier
    | t.ImportDefaultSpecifier
    | t.ImportNamespaceSpecifier;
  isTypeOnly: boolean;
}

function collectImports(ast: t.File): Map<string, ImportInfo> {
  const imports = new Map<string, ImportInfo>();

  for (const stmt of ast.program.body) {
    if (!t.isImportDeclaration(stmt)) continue;

    for (const spec of stmt.specifiers) {
      const localName = spec.local.name;
      const isTypeOnly =
        stmt.importKind === 'type' ||
        (t.isImportSpecifier(spec) && spec.importKind === 'type');

      imports.set(localName, {
        source: stmt.source.value,
        spec,
        isTypeOnly,
      });
    }
  }

  return imports;
}

/**
 * Return the top-level binding names declared by this statement.
 */
function statementDeclaredNames(stmt: t.Statement): string[] {
  const names: string[] = [];

  if (t.isFunctionDeclaration(stmt) && stmt.id) {
    names.push(stmt.id.name);
  } else if (t.isClassDeclaration(stmt) && stmt.id) {
    names.push(stmt.id.name);
  } else if (t.isVariableDeclaration(stmt)) {
    for (const decl of stmt.declarations) {
      if (t.isIdentifier(decl.id)) names.push(decl.id.name);
    }
  } else if (t.isTSTypeAliasDeclaration(stmt)) {
    names.push(stmt.id.name);
  } else if (t.isTSInterfaceDeclaration(stmt)) {
    names.push(stmt.id.name);
  } else if (t.isExportNamedDeclaration(stmt) && stmt.declaration) {
    return statementDeclaredNames(stmt.declaration as t.Statement);
  } else if (t.isExportDefaultDeclaration(stmt)) {
    // Not something demos use, but handle defensively.
    if (t.isFunctionDeclaration(stmt.declaration) && stmt.declaration.id) {
      names.push(stmt.declaration.id.name);
    }
  }

  return names;
}

/**
 * Walk a statement and collect every identifier reference that points at a top-level
 * binding (helper decl OR import).  Uses scope analysis to skip locals/params.
 */
function findReferencedTopLevelNames(
  ast: t.File,
  targetStmt: t.Statement,
  topLevelDecls: Map<string, t.Statement>,
  imports: Map<string, ImportInfo>,
): Set<string> {
  const found = new Set<string>();

  traverse(ast, {
    Program(programPath) {
      // Locate the NodePath for the target statement so we can traverse into it
      // with scope info intact.
      programPath.get('body').forEach(bodyPath => {
        if (bodyPath.node !== targetStmt) return;

        bodyPath.traverse({
          ReferencedIdentifier(
            idPath: NodePath<t.Identifier | t.JSXIdentifier>,
          ) {
            const name = idPath.node.name;

            if (!topLevelDecls.has(name) && !imports.has(name)) return;

            const binding = idPath.scope.getBinding(name);

            // If a local binding shadows the top-level one, skip.
            if (binding && binding.scope !== programPath.scope) return;

            found.add(name);
          },
        });
      });
    },
  });

  return found;
}

/**
 * `export function Foo()` → keep the export if Foo is the target, strip it otherwise.
 * `export const foo = ...` → same treatment.
 */
function stripExportUnless(stmt: t.Statement, targetName: string): t.Statement {
  if (!t.isExportNamedDeclaration(stmt)) return stmt;

  if (!stmt.declaration) return stmt;

  const declaredNames = statementDeclaredNames(stmt.declaration as t.Statement);

  if (declaredNames.includes(targetName)) return stmt;

  return stmt.declaration as t.Statement;
}

/**
 * Serialise a list of statements to a code string using @babel/generator.
 */
function generateStatements(stmts: t.Statement[]): string {
  const file = t.file(t.program(stmts, [], 'module'));

  return generate(file, {
    retainLines: false,
    comments: true,
    jsescOption: { minimal: true },
  }).code;
}

/**
 * Format the generated code with Prettier so the JSON strings look like the
 * rest of the codebase.
 */
async function formatCode(code: string, exampleName: string): Promise<string> {
  try {
    return await prettierFormat(code, {
      parser: 'typescript',
      singleQuote: true,
      jsxSingleQuote: false,
      arrowParens: 'avoid',
      trailingComma: 'all',
      bracketSameLine: true,
    });
  } catch (error) {
    console.warn(
      `    ⚠️  Prettier failed on ${exampleName}: ${(error as Error).message}`,
    );

    return code;
  }
}

function validateExample(example: ExampleCode): boolean {
  const trimmed = example.code.trim();

  if (trimmed.length === 0) return false;
  if (!trimmed.includes(example.name)) return false;

  return true;
}

async function processDemoFile(
  filePath: string,
): Promise<ExampleCode[] | null> {
  const source = fs.readFileSync(filePath, 'utf-8');

  if (!source.includes('export')) return null;

  let examples: ExampleCode[];

  try {
    examples = extractExamples(source, filePath);
  } catch (error) {
    console.error(
      `    ⚠️  Failed to extract from ${filePath}:`,
      (error as Error).message,
    );

    return null;
  }

  const formatted: ExampleCode[] = [];

  for (const example of examples) {
    const code = (await formatCode(example.code, example.name)).trimEnd();

    const entry = { name: example.name, code };

    if (validateExample(entry)) formatted.push(entry);
    else console.warn(`    ⚠️  Skipped invalid example: ${example.name}`);
  }

  return formatted.length > 0 ? formatted : null;
}

async function main(): Promise<void> {
  console.log('🔍 Scanning demo directory:', DEMO_DIR);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log('📁 Created output directory:', OUTPUT_DIR);
  }

  const files = fs.readdirSync(DEMO_DIR).filter(f => f.endsWith('.tsx'));

  console.log(`📦 Found ${files.length} demo files`);

  const results = await Promise.all(
    files.map(async file => {
      const filePath = path.join(DEMO_DIR, file);
      const componentName = path.basename(file, '.tsx');

      try {
        const examples = await processDemoFile(filePath);

        if (examples) {
          const outputPath = path.join(OUTPUT_DIR, `${componentName}.json`);

          await fs.promises.writeFile(
            outputPath,
            `${JSON.stringify(examples, null, 2)}\n`,
          );
          console.log(
            `  ✅ Extracted: ${componentName}.json (${examples.length} example(s))`,
          );

          return [componentName, examples] as const;
        }

        console.log(`  ⏭️  Skipped: ${file} (no valid examples found)`);

        return null;
      } catch (error) {
        console.error(
          `  ❌ Error processing ${file}:`,
          (error as Error).message,
        );

        return null;
      }
    }),
  );

  const allExamples = Object.fromEntries(
    results.filter((r): r is readonly [string, ExampleCode[]] => r !== null),
  );

  const indexPath = path.join(OUTPUT_DIR, 'index.json');

  await fs.promises.writeFile(
    indexPath,
    `${JSON.stringify(allExamples, null, 2)}\n`,
  );

  const processed = Object.keys(allExamples).length;
  const skipped = files.length - processed;

  console.log(`\n📊 Processed: ${processed} successful, ${skipped} skipped`);
  console.log('✨ Example extraction complete!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
