#!/usr/bin/env node

/**
 * Entry point script for the dbt Power User MCP server
 */

// Register ts-node to handle TypeScript files
require("ts-node/register");

// Run the MCP server
require("./src/mcp/mcpServer");
