#!/bin/bash

# run-mcp-server.sh - Helper script to launch the dbt Power User MCP server

# Check if required arguments are provided
if [ "$#" -lt 1 ]; then
  echo "Usage: $0 <dbt_project_path> [dbt_profiles_path] [altimate_api_key] [altimate_instance]"
  echo ""
  echo "Arguments:"
  echo "  dbt_project_path   - Path to your dbt project (required)"
  echo "  dbt_profiles_path  - Path to your dbt profiles.yml file (optional)"
  echo "  altimate_api_key   - Your Altimate API key for AI features (optional)"
  echo "  altimate_instance  - Your Altimate instance name (optional)"
  exit 1
fi

# Set environment variables from command line arguments
export DBT_PROJECT_PATH="$1"

if [ "$#" -ge 2 ]; then
  export DBT_PROFILES_PATH="$2"
fi

if [ "$#" -ge 3 ]; then
  export ALTIMATE_API_KEY="$3"
fi

if [ "$#" -ge 4 ]; then
  export ALTIMATE_INSTANCE="$4"
fi

# Set logging options (optional)
export DBT_MCP_LOG_LEVEL="INFO"  # Set to DEBUG for more verbose output
export DBT_MCP_LOG_TO_FILE="true"
export DBT_MCP_LOG_FILE_PATH="./dbt-mcp-server.log"

# Print config
echo "Starting dbt Power User MCP server with:"
echo "- Project path: $DBT_PROJECT_PATH"
if [ -n "$DBT_PROFILES_PATH" ]; then
  echo "- Profiles path: $DBT_PROFILES_PATH"
fi
if [ -n "$ALTIMATE_API_KEY" ]; then
  echo "- Altimate API key: [REDACTED]"
fi
if [ -n "$ALTIMATE_INSTANCE" ]; then
  echo "- Altimate instance: $ALTIMATE_INSTANCE"
fi
echo ""

# Run the MCP server
npm run mcp-server 