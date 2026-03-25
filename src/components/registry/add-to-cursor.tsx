import { Button } from '@/components/ui/button';

export function AddToCursor({
  mcp,
}: {
  mcp: { command: string; env: { [key: string]: string } };
}) {
  function generateCursorDeeplink() {
    const name = 'shadcn';
    const config = btoa(JSON.stringify(mcp));

    return `cursor://anysphere.cursor-deeplink/mcp/install?name=${name}&config=${config}`;
  }

  return (
    <Button
      size="sm"
      className="bg-black text-white hover:bg-black hover:shadow-sm dark:bg-white dark:text-black dark:hover:bg-white"
      asChild>
      <a href={generateCursorDeeplink()}>
        <img
          src="https://cursor.com/deeplink/mcp-install-light.svg"
          alt="Add shadcn/ui Registry MCP server to Cursor"
          height="80"
          className="hidden dark:block"
        />
        <img
          src="https://cursor.com/deeplink/mcp-install-dark.svg"
          alt="Add shadcn/ui Registry MCP server to Cursor"
          height="80"
          className="block dark:hidden"
        />
      </a>
    </Button>
  );
}
