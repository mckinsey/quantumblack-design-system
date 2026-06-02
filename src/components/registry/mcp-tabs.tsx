'use client';

import { useEffect, useState } from 'react';

import { AddToCursor } from '@/components/registry/add-to-cursor';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export async function copyToClipboard(value: string) {
  await navigator.clipboard.writeText(value);
}

export function MCPTabs({ rootUrl }: { rootUrl: string }) {
  const [tab, setTab] = useState('cursor');
  const [hasCopied, setHasCopied] = useState(false);

  const mcp = {
    command: 'npx -y shadcn@canary registry:mcp',
    env: {
      REGISTRY_URL: `https://${rootUrl}/r/registry.json`,
    },
  };

  const mcpServer = JSON.stringify(
    {
      mcpServers: {
        shadcn: mcp,
      },
    },
    null,
    2,
  );

  useEffect(() => {
    if (hasCopied) {
      setTimeout(() => {
        setHasCopied(false);
      }, 2000);
    }
  }, [hasCopied]);

  return (
    <Tabs value={tab} onValueChange={setTab}>
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="cursor">Cursor</TabsTrigger>
          <TabsTrigger value="windsurf">Windsurf</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="cursor">
        <p className="text-fg-secondary text-sm">
          Click Add to Cursor or copy and paste the code into{' '}
          <code className="inline text-sm tabular-nums">.cursor/mcp.json</code>
        </p>
      </TabsContent>

      <TabsContent value="windsurf">
        <p className="text-fg-secondary text-sm">
          Copy and paste the code into{' '}
          <code className="inline text-sm tabular-nums">
            .codeium/windsurf/mcp_config.json
          </code>
        </p>
      </TabsContent>

      <div className="relative">
        <div className="absolute top-3 right-3 flex gap-2">
          {tab === 'cursor' && <AddToCursor mcp={mcp} />}

          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              copyToClipboard(mcpServer);
              setHasCopied(true);
            }}
            className="shadow-none">
            {hasCopied ? <Icon icon="check" /> : <Icon icon="content_paste" />}
            Copy
          </Button>
        </div>

        <pre className="bg-surface-secondary text-fg-secondary mt-16 overflow-x-auto border p-1 sm:mt-0">
          <code className="text-fg-secondary relative rounded bg-transparent p-1 font-mono text-sm">
            {mcpServer}
          </code>
        </pre>
      </div>
    </Tabs>
  );
}
