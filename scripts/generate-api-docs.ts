/**
 * API Documentation Generator
 *
 * This script uses react-docgen-typescript to extract component prop information
 * from TypeScript files and generates JSON API documentation for each component.
 *
 * Output: public/api/[component].json
 */
import * as fs from 'fs';
import * as path from 'path';
import {
  type ComponentDoc,
  type PropItem,
  parse,
} from 'react-docgen-typescript';

// Configuration
const COMPONENTS_DIR = path.join(__dirname, '../src/components/ui');
const OUTPUT_DIR = path.join(__dirname, '../public/api');

// Parser options for react-docgen-typescript
const parserOptions = {
  savePropValueAsString: true,
  shouldExtractLiteralValuesFromEnum: true,
  shouldRemoveUndefinedFromOptional: true,
  propFilter: (prop: PropItem) => {
    // Filter out HTML attributes and ref
    if (prop.declarations && prop.declarations.length > 0) {
      const hasPropAdditionalDescription = prop.declarations.find(
        declaration => {
          return !declaration.fileName.includes('node_modules');
        },
      );
      return Boolean(hasPropAdditionalDescription);
    }
    return true;
  },
};

interface ComponentProp {
  type: string;
  defaultValue: string | null;
  description: string;
  required: boolean;
}

interface ComponentAPI {
  displayName: string;
  description: string;
  props: Record<string, ComponentProp>;
}

/**
 * Formats prop type to be more readable
 */
function formatPropType(prop: PropItem): string {
  const { type } = prop;

  // Handle union types (e.g., "default" | "accent" | "secondary")
  if (type.name === 'enum' && type.raw) {
    // Clean up the raw type string using split/join to avoid ReDoS vulnerability
    return type.raw
      .split('|')
      .map(part => part.trim())
      .join(' | ')
      .replace(/"/g, '"');
  }

  // Handle function types
  if (type.name === 'signature' && type.raw) {
    return type.raw;
  }

  return type.name;
}

/**
 * Transforms react-docgen-typescript output to our API format
 */
function transformComponentDoc(doc: ComponentDoc): ComponentAPI {
  const props: Record<string, ComponentProp> = {};

  for (const [propName, propItem] of Object.entries(doc.props)) {
    // Skip internal props
    if (propName.startsWith('_')) continue;

    props[propName] = {
      type: formatPropType(propItem),
      defaultValue: propItem.defaultValue?.value ?? null,
      description: propItem.description || '',
      required: propItem.required,
    };
  }

  return {
    displayName: doc.displayName,
    description: doc.description || '',
    props,
  };
}

/**
 * Main function to generate API documentation
 */
async function generateAPIDocs(): Promise<void> {
  console.log('🔍 Scanning components directory:', COMPONENTS_DIR);

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log('📁 Created output directory:', OUTPUT_DIR);
  }

  // Get all TypeScript files in the components directory
  const files = fs
    .readdirSync(COMPONENTS_DIR)
    .filter(file => file.endsWith('.tsx'));

  console.log(`📦 Found ${files.length} component files`);

  const results = await Promise.all(
    files.map(async file => {
      const filePath = path.join(COMPONENTS_DIR, file);
      const componentName = path.basename(file, '.tsx');
      try {
        console.log(`  ⚙️  Processing: ${file}`);
        const docs = parse(filePath, parserOptions);
        if (docs.length === 0) {
          console.log(`    ⚠️  No exported components found in ${file}`);
          return null;
        }
        const apis = docs.map(transformComponentDoc);
        const outputPath = path.join(OUTPUT_DIR, `${componentName}.json`);
        await fs.promises.writeFile(
          outputPath,
          `${JSON.stringify(apis, null, 2)}\n`,
        );
        console.log(
          `    ✅ Generated: ${componentName}.json (${apis.length} component(s))`,
        );
        return [componentName, apis] as const;
      } catch (error) {
        console.error(`    ❌ Error processing ${file}:`, error);
        return null;
      }
    }),
  );

  const allAPIs = Object.fromEntries(
    results.filter((r): r is [string, ComponentAPI[]] => r !== null),
  );

  // Write combined API index file
  const indexPath = path.join(OUTPUT_DIR, 'index.json');
  await fs.promises.writeFile(
    indexPath,
    `${JSON.stringify(allAPIs, null, 2)}\n`,
  );
  console.log(`\n📄 Generated combined index: index.json`);

  console.log('\n✨ API documentation generation complete!');
}

// Run the generator
generateAPIDocs().catch(console.error);
