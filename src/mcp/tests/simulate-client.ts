#!/usr/bin/env node

/**
 * MCP Client Simulator
 *
 * This script simulates a Cursor MCP client to test the MCP server.
 * It allows you to send tools/list and tools/call requests to the server
 * and see the responses.
 *
 * Usage:
 *   ts-node simulate-client.ts [command] [arguments]
 *
 * Commands:
 *   list                  - List all available tools
 *   call [tool] [args]    - Call a specific tool with arguments
 *
 * Examples:
 *   ts-node simulate-client.ts list
 *   ts-node simulate-client.ts call list_models
 *   ts-node simulate-client.ts call compile_model '{"model":"customers"}'
 */

import { spawn } from "child_process";
import * as readline from "readline";

// Setup command line arguments
const args = process.argv.slice(2);
const command = args[0];
const toolName = args[1];
const toolArgs = args[2] ? JSON.parse(args[2]) : {};

// Function to run the MCP server and send requests
async function runMCPClient() {
  // Check if environment variables are set
  if (!process.env.DBT_PROJECT_PATH) {
    console.error("Error: DBT_PROJECT_PATH environment variable is not set.");
    console.log("Please set it to the path of your dbt project.");
    process.exit(1);
  }

  // Spawn the MCP server process
  const mcpServer = spawn("npm", ["run", "mcp-server"], {
    stdio: ["pipe", "pipe", "pipe"],
    env: process.env,
  });

  // Handle server output
  mcpServer.stdout.on("data", (data) => {
    try {
      const message = JSON.parse(data.toString());
      console.log("\n[SERVER RESPONSE]:");
      console.log(JSON.stringify(message, null, 2));

      // If this was the response to our request, exit
      if (message.id === "client-request") {
        console.log("\nRequest completed. Press Ctrl+C to exit.");
      }
    } catch (error) {
      // If it's not a JSON response, just print the raw output
      console.log("[SERVER LOG]:", data.toString());
    }
  });

  mcpServer.stderr.on("data", (data) => {
    console.error("[SERVER ERROR]:", data.toString());
  });

  mcpServer.on("close", (code) => {
    console.log(`[SERVER] Process exited with code ${code}`);
  });

  // Wait for server to start (this is a basic way, could be improved)
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Create a request based on the command
  let request;
  if (command === "list") {
    console.log("[CLIENT] Sending tools/list request...");
    request = {
      jsonrpc: "2.0",
      id: "client-request",
      method: "tools/list",
    };
  } else if (command === "call" && toolName) {
    console.log(`[CLIENT] Calling tool '${toolName}' with args:`, toolArgs);
    request = {
      jsonrpc: "2.0",
      id: "client-request",
      method: "tools/call",
      params: {
        name: toolName,
        arguments: toolArgs,
      },
    };
  } else {
    console.error("Error: Invalid command or missing tool name.");
    console.log(
      "Usage: ts-node simulate-client.ts [list|call] [toolName] [toolArgs]",
    );
    mcpServer.kill();
    process.exit(1);
  }

  // Send the request to the server
  mcpServer.stdin.write(JSON.stringify(request) + "\n");

  // Set up ctrl+c handler to clean up
  process.on("SIGINT", () => {
    console.log("\nExiting...");
    mcpServer.kill();
    process.exit(0);
  });
}

// Print help if no arguments
if (!command) {
  console.log(`
MCP Client Simulator

This script simulates a Cursor MCP client to test the MCP server.
It sends requests to the MCP server and displays the responses.

Usage:
  ts-node simulate-client.ts [command] [arguments]

Commands:
  list                  - List all available tools
  call [tool] [args]    - Call a specific tool with arguments

Examples:
  ts-node simulate-client.ts list
  ts-node simulate-client.ts call list_models
  ts-node simulate-client.ts call compile_model '{"model":"customers"}'
  ts-node simulate-client.ts call run_query '{"sql":"SELECT 1"}'

Environment Variables:
  DBT_PROJECT_PATH      - Path to your dbt project (required)
  DBT_PROFILES_PATH     - Path to your profiles.yml file (optional)
  ALTIMATE_API_KEY      - Your Altimate API key (optional, for AI features)
  ALTIMATE_INSTANCE     - Your Altimate instance name (optional)
  `);
  process.exit(0);
}

// Run the client
runMCPClient().catch((error) => {
  console.error("Error running MCP client:", error);
  process.exit(1);
});
