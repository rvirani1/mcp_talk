import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import PageHeader from '@/app/_components/PageHeader'

export default function MinimalServerCode() {
  const codeString = `import { McpServer } from '@modelcontextprotocol/sdk';
import { z } from 'zod';

const mcpServer = new McpServer('my-calc-server');

mcpServer.addTool({
    name: 'addNumbers',
    description: 'Adds two numbers together.',
    parameters: z.object({
        a: z.number().describe('The first number to add.'),
        b: z.number().describe('The second number to add.'),
    }),
    execute: async ({ a, b }) => {
        const sum = a + b;
        return \`The sum of \${a} and \${b} is \${sum}.\`;
    },
});

export { mcpServer };`

  return (
    <div>
      <PageHeader title="Minimal Server Code" />
      <div className="flex flex-col items-center justify-center gap-8 px-4">
        <div className="w-full max-w-6xl">
          <SyntaxHighlighter
            language="typescript"
            style={oneDark}
            customStyle={{
              borderRadius: '12px',
              fontSize: '1.4rem',
              lineHeight: '1.6',
              margin: 0,
              padding: '2.5rem',
            }}
            showLineNumbers={true}
            wrapLines={true}
          >
            {codeString}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  )
}
