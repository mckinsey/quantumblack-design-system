/**
 * Example Code Extractor
 *
 * This script uses @babel/parser to parse demo files with proper AST parsing.
 * It extracts the source code for each example function and validates the output.
 *
 * Output: public/examples/[component].json
 */
import { parse as babelParse } from '@babel/parser';
import traverse from '@babel/traverse';
import type { NodePath } from '@babel/traverse';
import { isFunctionDeclaration } from '@babel/types';
import type { ExportNamedDeclaration, File } from '@babel/types';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// ESM equivalent of __dirname
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

// Configuration
const DEMO_DIR = path.join(_dirname, '../src/app/demo/[name]/ui');
const OUTPUT_DIR = path.join(_dirname, '../public/examples');

interface ExampleCode {
  name: string;
  code: string;
}

/**
 * Extract source code slice from file content using line/column information
 */
function getSourceCode(
  content: string,
  start: { line: number; column: number },
  end: { line: number; column: number },
): string {
  const lines = content.split('\n');

  if (start.line === end.line) {
    return lines[start.line - 1].slice(start.column, end.column);
  }

  const result: string[] = [];

  // First line
  result.push(lines[start.line - 1].slice(start.column));

  // Middle lines
  for (let i = start.line; i < end.line - 1; i++) {
    result.push(lines[i]);
  }

  // Last line
  result.push(lines[end.line - 1].slice(0, end.column));

  return result.join('\n');
}

/**
 * Parse demo file and extract all exported example functions
 */
function extractExamplesFromAST(
  content: string,
  filePath: string,
): ExampleCode[] {
  const examples: ExampleCode[] = [];

  try {
    const ast: File = babelParse(content, {
      sourceType: 'module',
      plugins: [
        'jsx',
        'typescript',
        ['decorators', { decoratorsBeforeExport: false }],
      ],
    });

    traverse(ast, {
      ExportNamedDeclaration(nodePath: NodePath<ExportNamedDeclaration>) {
        const node = nodePath.node;

        // Handle: export function FunctionName() { ... }
        if (isFunctionDeclaration(node.declaration)) {
          const funcDecl = node.declaration;
          if (funcDecl.id?.name) {
            const functionName = funcDecl.id.name;

            // Check if this looks like an example function
            if (
              isExampleFunction(functionName) &&
              node.loc?.start &&
              node.loc?.end
            ) {
              // Get just the function declaration
              const funcCode = getSourceCode(
                content,
                node.loc.start,
                node.loc.end,
              );
              examples.push({ name: functionName, code: funcCode });
            }
          }
        }

        // Handle: export const functionName = () => { ... } or export const functionName = function() { ... }
        if (node.declaration && 'declarations' in node.declaration) {
          const declarations = (
            node.declaration as unknown as { declarations?: unknown[] }
          ).declarations;
          if (Array.isArray(declarations)) {
            for (const decl of declarations) {
              // Type guard: check if this looks like a VariableDeclarator
              if (
                decl &&
                typeof decl === 'object' &&
                'id' in decl &&
                !('params' in decl) // VariableDeclarator doesn't have params
              ) {
                const id = (decl as Record<string, unknown>).id;
                if (id && typeof id === 'object' && 'name' in id) {
                  const varName = (id as Record<string, unknown>).name;

                  if (
                    typeof varName === 'string' &&
                    isExampleFunction(varName) &&
                    node.loc?.start &&
                    node.loc?.end
                  ) {
                    const funcCode = getSourceCode(
                      content,
                      node.loc.start,
                      node.loc.end,
                    );
                    examples.push({ name: varName, code: funcCode });
                  }
                }
              }
            }
          }
        }
      },
    });
  } catch (error) {
    console.error(
      `    ⚠️  Failed to parse AST for ${filePath}:`,
      (error as Error).message,
    );
    return [];
  }

  return examples;
}

/**
 * Determine if a function name looks like an example function
 */
function isExampleFunction(name: string): boolean {
  // Examples typically have:
  // 1. Mixed case (camelCase or PascalCase)
  // 2. Include "Demo" or "Example" in the name
  // 3. Start with uppercase (component-like names)

  const hasMixedCase = /[a-z]/.test(name) && /[A-Z]/.test(name);
  const hasExampleKeyword = name.includes('Demo') || name.includes('Example');
  const startsWithUppercase = /^[A-Z]/.test(name);

  return hasExampleKeyword || (hasMixedCase && startsWithUppercase);
}

/**
 * Validate that extracted code is valid and complete
 */
function validateExample(example: ExampleCode): boolean {
  const { name, code } = example;

  // Must have code
  if (!code || code.trim().length === 0) {
    return false;
  }

  // Code should contain the function name
  if (!code.includes(name)) {
    return false;
  }

  // Code should start with 'export' and contain 'function' or '=>'
  const trimmed = code.trim();
  if (!trimmed.startsWith('export')) {
    return false;
  }

  return true;
}

/**
 * Process a single demo file
 */
function processDemoFile(filePath: string): ExampleCode[] | null {
  const content = fs.readFileSync(filePath, 'utf-8');

  // Quick check: does file look like it has examples?
  if (!content.includes('export')) {
    return null;
  }

  // Extract using AST parsing
  const examples = extractExamplesFromAST(content, filePath);

  if (examples.length === 0) {
    return null;
  }

  // Validate all examples
  const validatedExamples = examples.filter(example => {
    if (!validateExample(example)) {
      console.warn(`    ⚠️  Skipped invalid example: ${example.name}`);
      return false;
    }
    return true;
  });

  return validatedExamples.length > 0 ? validatedExamples : null;
}

/**
 * Main function
 */
async function extractExamples(): Promise<void> {
  console.log('🔍 Scanning demo directory:', DEMO_DIR);

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log('📁 Created output directory:', OUTPUT_DIR);
  }

  // Get all demo files
  const files = fs.readdirSync(DEMO_DIR).filter(file => file.endsWith('.tsx'));
  console.log(`📦 Found ${files.length} demo files`);

  const results = await Promise.all(
    files.map(async file => {
      const filePath = path.join(DEMO_DIR, file);
      const componentName = path.basename(file, '.tsx');
      try {
        const examples = processDemoFile(filePath);
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
        } else {
          console.log(`  ⏭️  Skipped: ${file} (no valid examples found)`);
          return null;
        }
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
    results.filter((r): r is [string, ExampleCode[]] => r !== null),
  );
  const processedCount = Object.keys(allExamples).length;
  const skippedCount = files.length - processedCount;

  // Write combined index
  const indexPath = path.join(OUTPUT_DIR, 'index.json');
  await fs.promises.writeFile(
    indexPath,
    `${JSON.stringify(allExamples, null, 2)}\n`,
  );

  console.log(
    `\n📊 Processed: ${processedCount} successful, ${skippedCount} skipped`,
  );
  console.log('✨ Example extraction complete!');
}

// Run the extractor
extractExamples().catch(console.error);
