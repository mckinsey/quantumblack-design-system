import { promises as fs } from 'fs';
import path from 'path';
import { Suspense } from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Component } from '@/lib/registry';

import { CodeBlock } from './code-block';
import { InstallationGuide } from './installation-guide';
import { PreviewContent } from './preview-content';

interface ComponentDetailTabsProps {
  component: Component;
}

async function readDemoCode(componentName: string): Promise<string | null> {
  try {
    const demoPath = path.join(
      process.cwd(),
      'src/app/demo/[name]/ui',
      `${componentName}.tsx`,
    );
    return await fs.readFile(demoPath, 'utf-8');
  } catch (error) {
    console.error('Failed to read demo file:', error);
    return null;
  }
}

async function CodeTabContent({ component }: { component: Component }) {
  const demoCode = await readDemoCode(component.name);

  if (!demoCode) {
    return (
      <div className="text-fg-secondary p-8 text-center">
        No demo code available for this component.
      </div>
    );
  }

  return (
    <CodeBlock
      code={demoCode}
      language="tsx"
      filename={`${component.name}.tsx`}
    />
  );
}

export async function ComponentDetailTabs({
  component,
}: ComponentDetailTabsProps) {
  return (
    <Tabs defaultValue="preview" className="flex h-full w-full flex-col">
      <TabsList className="bg-surface-bg-primary border-stroke-tertiary grid h-auto w-full flex-shrink-0 grid-cols-3 rounded-none border-b p-0">
        <TabsTrigger
          value="preview"
          className="data-[state=active]:bg-surface-bg-primary rounded-none transition-colors">
          Preview
        </TabsTrigger>
        <TabsTrigger
          value="code"
          className="data-[state=active]:bg-surface-bg-primary rounded-none transition-colors">
          Code
        </TabsTrigger>
        <TabsTrigger
          value="installation"
          className="data-[state=active]:bg-surface-bg-primary rounded-none transition-colors">
          Installation
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value="preview"
        className="bg-surface-bg-primary mt-0 min-h-0 w-full flex-1 overflow-y-auto">
        <PreviewContent component={component} />
      </TabsContent>

      <TabsContent
        value="code"
        className="bg-surface-bg-primary mt-0 min-h-0 w-full flex-1 overflow-y-auto py-0">
        <div className="space-y-6">
          <Suspense
            fallback={
              <div className="space-y-4">
                <Skeleton className="bg-fill-onsurface-ui-3 h-[400px] w-full" />
              </div>
            }>
            <CodeTabContent component={component} />
          </Suspense>
        </div>
      </TabsContent>

      <TabsContent
        value="installation"
        className="bg-surface-bg-primary mt-0 min-h-0 w-full flex-1 overflow-y-auto p-6">
        <InstallationGuide component={component} />
      </TabsContent>
    </Tabs>
  );
}
