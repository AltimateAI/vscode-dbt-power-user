# Using dbt Power User with Cursor via MCP

This guide explains how to set up and use the dbt Power User extension's Model Context Protocol (MCP) server with Cursor.

## What is MCP?

The [Model Context Protocol (MCP)](https://www.anthropic.com/news/model-context-protocol) is an open standard that defines how external tools and data sources can be connected to AI models in a unified way. It allows AI assistants to discover and use tools from your development environment.

With MCP support, you can now use the powerful dbt Power User features directly within Cursor's AI-enhanced environment.

## Architecture Overview

The dbt Power User MCP integration follows this architecture:

```
┌─────────────────┐          ┌──────────────────┐          ┌───────────────────┐
│                 │  JSONRPC  │                  │  CLI     │                   │
│   Cursor IDE    │◄─────────►│   MCP Server     │◄─────────►│   dbt Project     │
│  (AI Assistant) │  over     │  (Node.js)       │ Commands │                   │
│                 │  stdio    │                  │          │                   │
└─────────────────┘          └──────────────────┘          └───────────────────┘
         ▲                            │                             │
         │                            │                             │
         │                            ▼                             ▼
         │                   ┌──────────────────┐          ┌───────────────────┐
         │                   │                  │          │                   │
         └───────────────────┤  Tool Handlers   │          │   Data Warehouse  │
                             │                  │          │                   │
                             └──────────────────┘          └───────────────────┘
                                      │
                                      ▼
                             ┌──────────────────┐
                             │                  │
                             │  AI Services     │
                             │  (Optional)      │
                             │                  │
                             └──────────────────┘
```

**How It Works:**

1. The user asks Cursor's AI assistant to perform a dbt operation
2. Cursor communicates with the MCP server using JSON-RPC over stdio
3. The MCP server identifies the appropriate tool to handle the request
4. The server executes dbt CLI commands against the dbt project
5. For some operations, the server may query the data warehouse
6. AI-powered tools may call external AI services if configured
7. Results are returned to Cursor for display to the user

## Prerequisites

- [dbt Power User extension](https://marketplace.visualstudio.com/items?itemName=innoverio.vscode-dbt-power-user) installed
- [Cursor IDE](https://cursor.sh/) installed
- Node.js installed (to run the MCP server)
- A dbt project

## Setup and Installation

1. Clone or download the dbt Power User extension:

   ```bash
   git clone https://github.com/AltimateAI/vscode-dbt-power-user.git
   cd vscode-dbt-power-user
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the MCP server using the provided scripts:

   **On Linux/macOS:**

   ```bash
   ./run-mcp-server.sh /path/to/your/dbt/project [/path/to/profiles.yml] [your_altimate_api_key] [your_altimate_instance]
   ```

   **On Windows:**

   ```batch
   run-mcp-server.bat C:\path\to\your\dbt\project [C:\path\to\profiles.yml] [your_altimate_api_key] [your_altimate_instance]
   ```

   Replace the parameters with your actual paths and credentials:

   - `/path/to/your/dbt/project`: Path to your dbt project (required)
   - `/path/to/profiles.yml`: Path to your dbt profiles.yml file (optional)
   - `your_altimate_api_key`: Your Altimate API key for AI features (optional)
   - `your_altimate_instance`: Your Altimate instance name (optional)

   Alternatively, you can set the environment variables manually and run:

   ```bash
   npm run mcp-server
   ```

## Configuring Cursor

1. Open Cursor IDE
2. Go to Settings (gear icon) > MCP > Add MCP Server
3. In the dialog that appears:
   - Choose "stdio" as the transport
   - For the command, enter the full path to the run-mcp-server script or the full npm command
   - Example:
     ```
     /path/to/vscode-dbt-power-user/run-mcp-server.sh /path/to/your/dbt/project
     ```
     or
     ```
     cd /path/to/vscode-dbt-power-user && DBT_PROJECT_PATH=/path/to/your/dbt/project npm run mcp-server
     ```
4. Click "Add Server"

## Using dbt Power User in Cursor

Once set up, Cursor's AI assistant will be able to use dbt Power User's tools to help with your dbt development. You can ask the assistant to perform tasks like:

- "Compile the customers model"
- "Show me the lineage for the orders model"
- "Run tests for the payments model"
- "Explain this SQL query"
- "Generate a model from this SQL"
- "Generate documentation for the customers model"
- "Get the column information for the users model"
- "Run the customers model and show me the results"
- "Generate tests for the orders model"
- "Explain the lineage of the payments model in plain English"

## Available MCP Tools

The dbt Power User MCP integration provides a comprehensive set of tools organized into categories:

### Core dbt Operations

| Tool Name       | Description                                              | Required Parameters                           | Example Usage                                |
| --------------- | -------------------------------------------------------- | --------------------------------------------- | -------------------------------------------- |
| `list_models`   | Lists all models in the dbt project                      | None                                          | "List all models in my project"              |
| `compile_model` | Compiles a dbt model and returns the generated SQL       | `model` (string)                              | "Compile the orders model"                   |
| `run_model`     | Runs a dbt model and returns the results                 | `model` (string), Optional: `limit` (integer) | "Run the customers model and return 10 rows" |
| `run_query`     | Executes a SQL query against the data warehouse          | Either `sql` (string) or `model` (string)     | "Run this query: SELECT \* FROM orders"      |
| `run_tests`     | Runs dbt tests on a specific model or the entire project | Optional: `model` (string)                    | "Run tests for the payments model"           |

### Data Analysis and Exploration

| Tool Name           | Description                                                  | Required Parameters                           | Example Usage                                            |
| ------------------- | ------------------------------------------------------------ | --------------------------------------------- | -------------------------------------------------------- |
| `get_model_columns` | Gets column information for a model                          | `model` (string)                              | "What columns are in the users model?"                   |
| `get_lineage`       | Returns raw lineage information for a model                  | `model` (string)                              | "Get the lineage of the orders model"                    |
| `explain_lineage`   | Provides a natural language explanation of a model's lineage | `model` (string), Optional: `depth` (integer) | "Explain how the payments model relates to other models" |

### AI-Powered Features

| Tool Name                 | Description                                         | Required Parameters                                           | Example Usage                                    |
| ------------------------- | --------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------ |
| `explain_query`           | Provides an AI-generated explanation of a SQL query | Either `sql` (string) or `model` (string)                     | "Explain this SQL query"                         |
| `generate_model_from_sql` | Uses AI to generate a dbt model from raw SQL        | `sql` (string)                                                | "Convert this SQL into a dbt model"              |
| `generate_docs`           | Uses AI to generate documentation for a model       | `model` (string)                                              | "Generate documentation for the customers model" |
| `generate_test`           | Uses AI to generate tests for a model               | `model` (string), Optional: `tests_type` ("schema" or "data") | "Generate schema tests for the orders model"     |

## Troubleshooting

If you encounter issues:

1. Check the log file at `./dbt-mcp-server.log` for detailed information
2. Make sure your dbt project path is correct
3. Ensure that the dbt project has a valid `dbt_project.yml` file
4. Check that your profiles.yml has the correct credentials for your data warehouse
5. For AI-powered features, make sure you've provided a valid Altimate API key
6. Set `DBT_MCP_LOG_LEVEL=DEBUG` for more verbose logging
7. Use the client simulator to test individual tools:
   ```bash
   ts-node src/mcp/tests/simulate-client.ts list
   ts-node src/mcp/tests/simulate-client.ts call tool_name '{"param":"value"}'
   ```

## Advanced Usage

### Working with Multiple dbt Projects

If you work with multiple dbt projects, you can start separate MCP server instances for each project:

1. Create separate configurations in Cursor for each project
2. Give each configuration a meaningful name relating to the project
3. Select the appropriate server when working with a specific project

### Automating Testing with the Client Simulator

You can use the provided client simulator to test MCP tools and automate validations:

```bash
# Test compilation of multiple models
for model in customers orders payments; do
  ts-node src/mcp/tests/simulate-client.ts call compile_model '{"model":"'$model'"}'
done

# Test running a model with different limits
ts-node src/mcp/tests/simulate-client.ts call run_model '{"model":"customers", "limit": 5}'
```

## Limitations

- MCP integration is currently in beta
- Some features may require an Altimate API key
- The MCP server must be running for Cursor to access the tools
- Performance depends on your dbt project size and data warehouse connection

For more help, please contact us via [Slack or chat](https://www.altimate.ai/support).
