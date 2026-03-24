#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_ROOT"

# Determine docker compose command (V2 syntax with fallback)
if docker compose version &>/dev/null; then
    DC="docker compose -f docker-setup/docker-compose.yml"
else
    DC="docker-compose -f docker-setup/docker-compose.yml"
fi

# Step 1: Check for .env file with DBT_PROJECT_PATH
if [ -f "$SCRIPT_DIR/.env" ]; then
    echo "Loading .env from docker-setup/.env"
    export $(grep -v '^#' "$SCRIPT_DIR/.env" | xargs)
fi

if [ -n "$DBT_PROJECT_PATH" ]; then
    echo "Using custom dbt project: $DBT_PROJECT_PATH"
else
    echo "Using built-in jaffle_shop_duckdb project"
fi

# Step 2: Build the extension
echo ""
echo "Building extension with webpack..."
npm run webpack

# Step 3: Build and start the container
echo ""
echo "Building and starting code-server container..."
$DC up --build -d

# Step 4: Wait for code-server to be ready
echo ""
echo "Waiting for code-server to be ready..."
MAX_WAIT=60
WAITED=0
until curl -sf http://localhost:3001/healthz > /dev/null 2>&1; do
    if [ $WAITED -ge $MAX_WAIT ]; then
        echo "Timed out waiting for code-server after ${MAX_WAIT}s"
        echo "Check logs with: npm run docker:logs"
        exit 1
    fi
    sleep 2
    WAITED=$((WAITED + 2))
    echo "  Waiting... (${WAITED}s)"
done
echo "code-server is ready at http://localhost:3001/?folder=/home/coder/project"

# Step 5: Start webpack watch for auto-recompilation
echo ""
echo "Starting webpack watch mode for hot-reload..."
echo "  Changes to extension source will auto-rebuild."
echo "  After rebuild, reload code-server in browser to pick up changes."
echo ""
npm run watch
