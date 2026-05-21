/**
 * Core library for converting Figma Design Token JSON exports to CSS.
 *
 * Maps Figma paths and aliases to --custom-properties, builds @theme inline
 * primitives and semantic blocks (:root, .dark, .radius-mode), and preserves
 * existing declaration order from globals.css when regenerating.
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

// --- Types ---

type TokenLeaf = {
  $type?: string
  $value?: unknown
  $extensions?: {
    'com.figma.aliasData'?: { targetVariableName?: string }
    'com.figma.codeSyntax'?: { WEB?: string }
  }
}

type FlatToken = { path: string[]; leaf: TokenLeaf }

type CssDeclaration = { name: string; value: string }

export type SelectorConfig = {
  file: string
  selector: string
  mergeFiles?: string[]
  label?: string
}

export type TokensSyncConfig = {
  source: 'file' | 'figma'
  globalsPath: string
  themeBridgePath: string
  sections: Array<
    | { id: string; wrapper: string; files: string[] }
    | { id: string; selectors: SelectorConfig[] }
  >
}

// --- Parse Figma export JSON ---

function isTokenLeaf(node: unknown): node is TokenLeaf {
  return (
    typeof node === 'object' &&
    node !== null &&
    '$value' in node &&
    ('$type' in node || '$extensions' in node)
  )
}

function flattenTokens(
  obj: Record<string, unknown>,
  path: string[] = [],
): FlatToken[] {
  const result: FlatToken[] = []
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith('$')) continue
    const nextPath = [...path, key]
    if (isTokenLeaf(value)) {
      result.push({ path: nextPath, leaf: value })
    } else if (typeof value === 'object' && value !== null) {
      result.push(...flattenTokens(value as Record<string, unknown>, nextPath))
    }
  }
  return result
}

type ColorValue = { hex?: string; alpha?: number }

function formatColorValue(value: ColorValue): string {
  const hex = (value.hex ?? '#000000').replace('#', '').toUpperCase()
  const alpha = value.alpha ?? 1
  if (alpha >= 0.999) {
    return `#${hex.length === 6 ? hex : hex.slice(0, 6)}`.toLowerCase()
  }
  const base = hex.length >= 6 ? hex.slice(0, 6) : hex.padEnd(6, '0')
  const a = Math.round(alpha * 255)
    .toString(16)
    .padStart(2, '0')
  return `#${base}${a}`.toLowerCase()
}

// --- Name mapping ---

const PALETTE_NAMES = new Set([
  'red', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky',
  'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose', 'stone',
])

const SKIP_ROOT_KEYS = new Set(['Descriptor', 'Spacing', 'Stroke-Weight'])

const THEME_GROUP_ORDER = [
  'Font', 'Mist', 'Mist 50', 'Slate', 'Slate 900', 'Brand-Accents',
]

function kebab(segment: string): string {
  return segment
    .replace(/\s+/g, '-')
    .replace(/_/g, '-')
    .replace(/\u2013/g, '-')
    .replace(/–/g, '-')
    .split('-')
    .filter(Boolean)
    .map((part) => part.toLowerCase())
    .join('-')
}

function shouldSkipPath(path: string[]): boolean {
  return path.length === 0 || (path[0] != null && SKIP_ROOT_KEYS.has(path[0]))
}

function collapseSemanticPath(path: string[]): string[] {
  if (path.length === 3 && path[1] === 'Content') return [path[0], path[2]]
  if (path.length === 3 && path[1] === 'onSurface') {
    return [path[0], path[2].replace(/^bg-ui/i, 'onsurface-ui-')]
  }
  if (path[0] === 'Elevations' && path.length === 2) {
    const leaf = path[1].replace(/^Shade_T/i, 'shade-t').replace(/^Shade/i, 'shade')
    return ['elevations', leaf]
  }
  return path
}

function pathToCssVarName(path: string[], context: 'theme' | 'semantic'): string | null {
  if (shouldSkipPath(path)) return null
  if (path[0] === 'Font') {
    if (path[1] === 'Family' && path[2]) return `--font-${kebab(path[2])}`
    if (path[1] === 'Weight' && path[2]) return `--font-weight-${path[2]}`
    if (path[1] === 'Font-Size' && path[2]) return `--font-font-size-${path[2]}`
    if (path[1] === 'Line-Height' && path[2]) return `--font-line-height-${path[2]}`
    return null
  }
  if (path[0] === 'Brand-Accents' && path[1]) return `--brand-accents-${kebab(path[1])}`
  if (path.length >= 2 && PALETTE_NAMES.has(path[0].toLowerCase())) {
    return `--color-${path[0].toLowerCase()}-${path[1]}`
  }
  if (context === 'semantic') {
    return `--${collapseSemanticPath(path).map(kebab).join('-')}`
  }
  if (path[0]?.includes(' ')) {
    const [group, ...rest] = path
    return `--${kebab(group)}${rest.length ? `-${rest.map(kebab).join('-')}` : ''}`
  }
  if (path.length === 2) return `--${kebab(path[0])}-${path[1]}`
  if (path.length === 1) return `--${kebab(path[0])}`
  return `--${path.map(kebab).join('-')}`
}

function aliasToCssValue(targetVariableName: string): string {
  const parts = targetVariableName.trim().split('/')
  if (parts.length === 2) {
    const [a, b] = parts
    if (a.includes(' ')) return `var(--${kebab(a)}-${b})`
    if (a === a.toLowerCase() && !a.includes(' ')) return `var(--color-${a}-${b})`
    return `var(--${a.toLowerCase()}-${b})`
  }
  return `var(--${kebab(targetVariableName)})`
}

function resolveTokenValue(leaf: TokenLeaf): string | null {
  const aliasName = leaf.$extensions?.['com.figma.aliasData']?.targetVariableName
  if (aliasName) return aliasToCssValue(aliasName)

  const webSyntax = leaf.$extensions?.['com.figma.codeSyntax']?.WEB
  if (webSyntax && !/--radi-\d/.test(webSyntax)) return webSyntax

  const { $type: type, $value: value } = leaf
  if (type === 'color' && typeof value === 'object' && value !== null) {
    return formatColorValue(value as ColorValue)
  }
  if (type === 'number' && typeof value === 'number') return `${value}px`
  if (type === 'string' && typeof value === 'string') return `'${value}'`
  return null
}

// --- CSS generation ---

function loadJson(rootDir: string, file: string): Record<string, unknown> {
  return JSON.parse(readFileSync(join(rootDir, file), 'utf8')) as Record<string, unknown>
}

function tokensFromFiles(rootDir: string, files: string[]): FlatToken[] {
  return files.flatMap((file) => flattenTokens(loadJson(rootDir, file)))
}

function declarationsFromTokens(
  tokens: FlatToken[],
  context: 'theme' | 'semantic',
): CssDeclaration[] {
  const declarations: CssDeclaration[] = []
  const seen = new Set<string>()
  for (const { path, leaf } of tokens) {
    if (shouldSkipPath(path)) continue
    const name = pathToCssVarName(path, context)
    if (!name || seen.has(name)) continue
    const value = resolveTokenValue(leaf)
    if (!value) continue
    seen.add(name)
    declarations.push({ name, value })
  }
  return declarations
}

function groupKeyFromVar(cssVar: string): string {
  const name = cssVar.replace(/^--/, '')
  if (name.startsWith('font-')) return 'Font'
  if (name.startsWith('mist-50-opacity')) return 'Mist 50'
  if (name.startsWith('mist-')) return 'Mist'
  if (name.startsWith('slate-900-opacity')) return 'Slate 900'
  if (name.startsWith('slate-')) return 'Slate'
  if (name.startsWith('brand-accents')) return 'Brand-Accents'
  if (name.startsWith('color-')) {
    const parts = name.split('-')
    if (parts.length >= 3) return `palette:${parts[1]}`
  }
  return 'Other'
}

function sectionCommentForGroup(group: string, context: 'theme' | 'semantic'): string | undefined {
  if (context === 'theme') {
    const map: Record<string, string> = {
      Font: 'Font Tokens',
      Mist: 'Mist Primitives',
      'Mist 50': 'Mist Opacity Tokens',
      Slate: 'Slate Primitives',
      'Slate 900': 'Slate Opacity Tokens',
      'Brand-Accents': 'Brand Accents',
    }
    return map[group] ? `/** ${map[group]} */` : undefined
  }
  const semanticMap: Record<string, string> = {
    Text: 'text', Border: 'border', Fill: 'fill', Surface: 'surface',
    Status: 'status', Stateslayer: 'state layer', Elevations: 'elevation',
  }
  return semanticMap[group] ? `/** ${semanticMap[group]} tokens */` : undefined
}

function declarationGroup(decl: CssDeclaration, context: 'theme' | 'semantic'): string {
  if (context === 'semantic') {
    const parts = decl.name.replace(/^--/, '').split('-')
    return (
      ({
        text: 'Text',
        border: 'Border',
        fill: 'Fill',
        surface: 'Surface',
        status: 'Status',
        stateslayer: 'Stateslayer',
        elevations: 'Elevations',
        rad: 'Radius',
        slider: 'Slider',
      }) as Record<string, string>
    )[parts[0]] ?? 'Other'
  }
  return groupKeyFromVar(decl.name)
}

export function parseCssDeclarationOrder(css: string): string[] {
  const order: string[] = []
  const seen = new Set<string>()
  const re = /(--[^:\s]+)\s*:/g
  let match: RegExpExecArray | null
  while ((match = re.exec(css)) !== null) {
    if (!seen.has(match[1])) {
      seen.add(match[1])
      order.push(match[1])
    }
  }
  return order
}

export function orderDeclarations(
  declarations: CssDeclaration[],
  existingOrder: string[],
): CssDeclaration[] {
  const index = new Map(existingOrder.map((name, i) => [name, i]))
  const known: CssDeclaration[] = []
  const unknown: CssDeclaration[] = []
  for (const decl of declarations) {
    if (index.has(decl.name)) known.push(decl)
    else unknown.push(decl)
  }
  known.sort((a, b) => index.get(a.name)! - index.get(b.name)!)
  unknown.sort((a, b) => a.name.localeCompare(b.name))
  return [...known, ...unknown]
}

function formatDeclarationsGrouped(
  declarations: CssDeclaration[],
  context: 'theme' | 'semantic',
  indent: string,
): string {
  const byGroup = new Map<string, CssDeclaration[]>()
  for (const decl of declarations) {
    const group = declarationGroup(decl, context)
    const list = byGroup.get(group) ?? []
    list.push(decl)
    byGroup.set(group, list)
  }

  const order =
    context === 'theme'
      ? [
          ...THEME_GROUP_ORDER,
          ...[...byGroup.keys()].filter((k) => !THEME_GROUP_ORDER.includes(k) && !k.startsWith('palette:')),
          ...[...byGroup.keys()].filter((k) => k.startsWith('palette:')).sort(),
        ]
      : ['Radius', 'Text', 'Border', 'Fill', 'Slider', 'Surface', 'Status', 'Stateslayer', 'Elevations', 'Other']

  const lines: string[] = []
  const emitted = new Set<string>()
  for (const group of order) {
    const decls = byGroup.get(group)
    if (!decls?.length || emitted.has(group)) continue
    emitted.add(group)
    const comment = sectionCommentForGroup(group, context)
    if (comment) lines.push('', `${indent}${comment}`)
    for (const decl of decls.sort((a, b) => a.name.localeCompare(b.name))) {
      lines.push(`${indent}${decl.name}: ${decl.value};`)
    }
  }
  for (const [group, decls] of byGroup) {
    if (emitted.has(group)) continue
    for (const decl of decls) lines.push(`${indent}${decl.name}: ${decl.value};`)
  }
  return lines.join('\n')
}

function formatDeclarations(
  declarations: CssDeclaration[],
  context: 'theme' | 'semantic',
  indent: string,
  existingOrder?: string[],
): string {
  if (!existingOrder?.length) {
    return formatDeclarationsGrouped(declarations, context, indent)
  }

  const ordered = orderDeclarations(declarations, existingOrder)
  const lines: string[] = []
  let lastGroup: string | undefined
  for (const decl of ordered) {
    const group = declarationGroup(decl, context)
    if (group !== lastGroup) {
      const comment = sectionCommentForGroup(group, context)
      if (comment) lines.push('', `${indent}${comment}`)
      lastGroup = group
    }
    lines.push(`${indent}${decl.name}: ${decl.value};`)
  }
  return lines.join('\n')
}

function addFontSans(declarations: CssDeclaration[]): CssDeclaration[] {
  const display = declarations.find((d) => d.name === '--font-display')
  if (!display || declarations.some((d) => d.name === '--font-sans')) return declarations
  const value = display.value.replace(/^'|'$/g, '')
  return [...declarations, { name: '--font-sans', value: `'${value}', sans-serif` }]
}

function extractSelectorBlock(sectionCss: string, selector: string): string {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const match = sectionCss.match(
    new RegExp(`${escaped}\\s*\\{([\\s\\S]*?)\\n\\}`, 'm'),
  )
  return match?.[1] ?? ''
}

function generateThemeInline(
  rootDir: string,
  files: string[],
  bridgePath: string,
  existingSection?: string,
): string {
  let declarations = declarationsFromTokens(tokensFromFiles(rootDir, files), 'theme')
  declarations = addFontSans(declarations)
  const existingOrder = existingSection
    ? parseCssDeclarationOrder(existingSection)
    : undefined
  const primitives = formatDeclarations(declarations, 'theme', '  ', existingOrder)
  const bridge = readFileSync(join(rootDir, bridgePath), 'utf8').trimEnd()
  return `@theme inline {\n${primitives}\n\n${bridge}\n}`
}

function formatSemanticDeclarations(
  declarations: CssDeclaration[],
  groupComments: Record<string, string | undefined>,
  existingOrder?: string[],
): string {
  const groupOrder = [
    'Radius', 'Text', 'Border', 'Fill', 'Slider', 'Surface', 'Status', 'Stateslayer', 'Elevations', 'Other',
  ]

  if (!existingOrder?.length) {
    const byGroup = new Map<string, CssDeclaration[]>()
    for (const decl of declarations) {
      const group = declarationGroup(decl, 'semantic')
      const list = byGroup.get(group) ?? []
      list.push(decl)
      byGroup.set(group, list)
    }
    const lines: string[] = []
    for (const group of groupOrder) {
      const decls = byGroup.get(group)
      if (!decls?.length) continue
      if (groupComments[group]) lines.push('', `  /** ${groupComments[group]} */`)
      for (const decl of decls.sort((a, b) => a.name.localeCompare(b.name))) {
        lines.push(`  ${decl.name}: ${decl.value};`)
      }
    }
    for (const [group, decls] of byGroup) {
      if (groupOrder.includes(group)) continue
      for (const decl of decls) lines.push(`  ${decl.name}: ${decl.value};`)
    }
    return lines.join('\n')
  }

  const ordered = orderDeclarations(declarations, existingOrder)
  const lines: string[] = []
  let lastGroup: string | undefined
  for (const decl of ordered) {
    const group = declarationGroup(decl, 'semantic')
    if (group !== lastGroup) {
      if (groupComments[group]) lines.push('', `  /** ${groupComments[group]} */`)
      lastGroup = group
    }
    lines.push(`  ${decl.name}: ${decl.value};`)
  }
  return lines.join('\n')
}

function generateSelectorBlock(
  rootDir: string,
  selector: string,
  files: string[],
  sectionLabel?: string,
  radiusComment?: string,
  existingSelectorBody?: string,
): string {
  const declarations = declarationsFromTokens(tokensFromFiles(rootDir, files), 'semantic')
  const groupComments: Record<string, string | undefined> = {
    Radius: radiusComment ?? 'Sharp radius tokens (default - no radius)',
    Text: sectionLabel ? `${sectionLabel} text tokens` : 'text tokens',
    Border: sectionLabel ? `${sectionLabel} border tokens` : 'border tokens',
    Fill: sectionLabel ? `${sectionLabel} fill tokens` : 'fill tokens',
    Surface: sectionLabel ? `${sectionLabel} surface tokens` : 'surface tokens',
    Status: sectionLabel ? `${sectionLabel} status tokens` : 'status tokens',
    Stateslayer: sectionLabel ? `${sectionLabel} state layer tokens` : 'state layer tokens',
    Elevations: sectionLabel ? `${sectionLabel} elevation tokens` : 'elevation tokens',
  }
  const existingOrder = existingSelectorBody
    ? parseCssDeclarationOrder(existingSelectorBody)
    : undefined
  const body = formatSemanticDeclarations(declarations, groupComments, existingOrder)
  return `${selector} {\n${body}\n}`
}

export function generateAllSections(
  rootDir: string,
  config: TokensSyncConfig,
  existingSections: Record<string, string> = {},
): Record<string, string> {
  const sections: Record<string, string> = {}
  for (const section of config.sections) {
    if ('wrapper' in section && section.wrapper) {
      sections[section.id] = generateThemeInline(
        rootDir,
        section.files,
        config.themeBridgePath,
        existingSections[section.id],
      )
      continue
    }
    if ('selectors' in section && section.selectors) {
      const existingSemantic = existingSections[section.id] ?? ''
      sections[section.id] = section.selectors
        .map((sel) => {
          const files = [sel.file, ...(sel.mergeFiles ?? [])]
          const isRadiusOnly = sel.selector === '.radius-mode' && files.length === 1
          return generateSelectorBlock(
            rootDir,
            sel.selector,
            files,
            sel.label,
            isRadiusOnly ? 'Rounded radius tokens' : undefined,
            extractSelectorBlock(existingSemantic, sel.selector),
          )
        })
        .join('\n\n')
    }
  }
  return sections
}

export function parseCssCustomProperties(css: string): Map<string, string> {
  const map = new Map<string, string>()
  const re = /(--[\w-]+)\s*:\s*([^;]+);/g
  let match: RegExpExecArray | null
  while ((match = re.exec(css)) !== null) map.set(match[1], match[2].trim())
  return map
}
