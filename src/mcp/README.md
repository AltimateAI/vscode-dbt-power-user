# DBT Power User MCP Server Testing

This directory contains tools to test the MCP (Model Context Protocol) server implementation in the DBT Power User extension.

## Testing the MCP Server

There are two ways to test if your MCP server with SSE mode is working correctly:

### 1. Using the HTML Test Client

The `test-client.html` file provides a simple web interface to test the MCP server connection:

1. First, make sure the MCP server is running by executing the `dbtPowerUser.mcp.start` command in VS Code.
2. Open the `test-client.html` file in a web browser.
3. Click the "Connect to SSE" button to establish a connection to the server.
4. Once connected, the status will change to "Connected" and you'll see the connection details in the Events Log.
5. Click the "Get Projects" button to test the `get_projects` function.
6. The Events Log will show the request and response from the server.

### 2. Using the Node.js Test Client

The `test-client.js` file provides a command-line way to test the MCP server:

1. First, make sure the MCP server is running by executing the `dbtPowerUser.mcp.start` command in VS Code.
2. Install the required dependencies:
   ```
   npm install node-fetch eventsource
   ```
3. Run the test client:
   ```
   node src/mcp/test-client.js
   ```
4. The script will automatically connect to the server, test the `get_projects` function, and display the results.

## Troubleshooting

If you encounter connection issues:

1. Make sure the MCP server is running (execute `dbtPowerUser.mcp.start` in VS Code).
2. Check that the server is running on port 7891 (default).
3. Look for any error messages in the VS Code console or in the test client output.
4. If using the HTML client, check the browser's developer console for any CORS-related errors.

## CORS Issues

If you encounter CORS issues with the HTML client, you may need to uncomment the CORS middleware in the MCP server implementation (`src/mcp/index.ts`):

```typescript
// Add CORS headers
this.expressApp.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
    return;
  }
  next();
});
```
