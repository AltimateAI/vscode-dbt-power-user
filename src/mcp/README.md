# dbt Power User MCP Integration

This directory contains the Model Context Protocol (MCP) integration for the dbt Power User extension.

## What is MCP?

MCP (Model Context Protocol) is an open standard for connecting AI assistants to external tools and data sources. This integration allows Cursor's AI assistant to use dbt Power User's functionality directly.

## Directory Structure

- `mcpServer.ts`: The main MCP server implementation
- `types.ts`: TypeScript type definitions for the MCP integration
- `logger.ts`: Logger utility for the MCP server
- `version.ts`: Utility to get the extension version
- `tools/`: Directory containing tool handlers for various dbt operations
- `__tests__/`: Tests for the MCP integration
- `tests/`: Helper scripts for manual testing

## Available Tools

The following MCP tools are available for interacting with dbt projects:

### Core dbt Operations

- `list_models`: List all models in the dbt project
- `compile_model`: Compile a dbt model and return the generated SQL
- `run_model`: Run a dbt model and return the results
- `run_query`: Execute a SQL query against the data warehouse
- `run_tests`: Run dbt tests on a model or the entire project

### Data Analysis and Exploration

- `get_model_columns`: Get column information for a specific model
- `get_lineage`: Get the lineage information for a model
- `explain_lineage`: Provide a natural language explanation of a model's lineage

### AI-Powered Features

- `explain_query`: Generate an explanation of a SQL query using AI
- `generate_model_from_sql`: Convert raw SQL into a dbt model using AI
- `generate_docs`: Generate documentation for a model using AI
- `generate_test`: Generate tests for a model using AI

## Testing

### Automated Tests

To run the unit tests:

```bash
npm test -- --testPathPattern=src/mcp
```

### Manual Testing

#### Using the Client Simulator

A client simulator is provided to test the MCP server manually:

```bash
# Set required environment variables
export DBT_PROJECT_PATH=/path/to/your/dbt/project
export DBT_PROFILES_PATH=/path/to/your/profiles.yml  # Optional
export ALTIMATE_API_KEY=your_api_key                 # Optional, for AI features
export ALTIMATE_INSTANCE=your_instance               # Optional

# List all available tools
ts-node src/mcp/tests/simulate-client.ts list

# Call a specific tool
ts-node src/mcp/tests/simulate-client.ts call list_models
ts-node src/mcp/tests/simulate-client.ts call compile_model '{"model":"customers"}'
ts-node src/mcp/tests/simulate-client.ts call run_query '{"sql":"SELECT 1 as id"}'

# Try the new tools
ts-node src/mcp/tests/simulate-client.ts call get_model_columns '{"model":"customers"}'
ts-node src/mcp/tests/simulate-client.ts call run_model '{"model":"customers", "limit": 10}'
ts-node src/mcp/tests/simulate-client.ts call generate_test '{"model":"customers", "tests_type":"schema"}'
ts-node src/mcp/tests/simulate-client.ts call explain_lineage '{"model":"customers", "depth": 2}'
```

#### Testing with Cursor

To test with Cursor:

1. Start the MCP server using the shell script:

   ```bash
   ./run-mcp-server.sh /path/to/your/dbt/project [/path/to/profiles.yml] [your_altimate_api_key] [your_altimate_instance]
   ```

2. In Cursor:

   - Go to Settings > MCP > Add MCP Server
   - Choose "stdio" transport
   - Enter the command to run the MCP server:
     ```
     /absolute/path/to/run-mcp-server.sh /path/to/your/dbt/project
     ```
   - Click "Add Server"

3. Ask the AI to perform dbt operations:
   - "Compile the customers model"
   - "Show me the lineage for orders"
   - "Run tests for the payments model"
   - "Get the column information for the users model"
   - "Generate tests for the orders model"
   - "Explain the lineage of the payments model"
   - "Run the customers model and show me the results"

## Debugging

- Check the log file at `./dbt-mcp-server.log` for detailed information
- Set `DBT_MCP_LOG_LEVEL=DEBUG` for more verbose logging
- Use the client simulator to test individual tools

## Extending

To add a new tool:

1. Create a new handler in `tools/` directory
2. Add the tool to the `registerTools()` function in `tools/index.ts`
3. Implement the handler logic
4. Add tests for the new tool

See existing tools for examples of the structure and implementation pattern.
