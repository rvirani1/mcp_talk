export default function McpArchitecture() {
  // TODO: Let's follow an example of Claude Desktop that's working with like a weather API
  // We can do this with like a model system that shows the actual code that's running between the elements
  return <div>
    <h1>MCP Architecture</h1>
    <h2>MCP Server, i.e. an external API. Let's say it's Stripe or a Weather API</h2>
    <p>This is the thing we currentkly have to write custom glue code to enable our LLM to interact with</p>
    <h2>MCP Client, i.e. application the end-user actually uses. Claude Desktop, Cursor, Windsurf, etc.</h2>
    <p>A client that uses MCP to interact with other applications</p>
    <h2>LLM</h2>
    <p>The LLM usually running in a cloud provider or a foundation model provider, OpenAI, Anthropic, Google, etc.</p>
    <p>Communicates via JSON-RPC 2.0 or stdio and SSE</p>
  </div>
}
