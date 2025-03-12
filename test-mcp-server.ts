// Import with explicit path
import { DbtPowerUserMcpNewServer } from "./src/mcp/sse";

// Simple function to initialize and run the server
function startServer() {
  try {
    console.log("Initializing MCP server...");
    const mcpServer = new DbtPowerUserMcpNewServer();

    console.log("MCP server initialized. Press Ctrl+C to stop.");

    // Keep the process running
    process.stdin.resume();

    // Handle graceful shutdown
    process.on("SIGINT", () => {
      console.log("Shutting down MCP server...");
      // Access private method using type assertion
      // mcpServer.stop();
      process.exit(0);
    });
  } catch (error) {
    console.error("Failed to start MCP server:", error);
  }
}

// Start the server
startServer();
