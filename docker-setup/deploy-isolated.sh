#!/bin/bash
#
# deploy-isolated.sh — deploy the code-server container with a unique
# compose project name, container name, and host port so multiple
# PR branches can run side-by-side.
#
# Usage:
#   ISSUE_NUM=1720 HOST_PORT=3020 ./docker-setup/deploy-isolated.sh
#
# Required env vars:
#   ISSUE_NUM       Issue / PR number (used for the compose project + container slug)
#   HOST_PORT       Host port to publish code-server on
#
# Optional env vars:
#   CONTAINER_NAME  Override the container name (defaults to dbtpu-<ISSUE_NUM>)
#   DBT_PROJECT_PATH  Host path to a custom dbt project (defaults to built-in)
#   NO_BUILD        If set, skip `npm run webpack` (use an already-built dist/)
#
# Unlike deploy.sh, this script starts the container detached and returns
# immediately — it does not block on `npm run watch`. Rebuild manually
# between test runs.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_ROOT"

: "${ISSUE_NUM:?ISSUE_NUM is required (e.g. ISSUE_NUM=1720)}"
: "${HOST_PORT:?HOST_PORT is required (e.g. HOST_PORT=3020)}"

export CONTAINER_NAME="${CONTAINER_NAME:-dbtpu-${ISSUE_NUM}}"
export COMPOSE_PROJECT_NAME="dbtpu-${ISSUE_NUM}"
export HOST_PORT

if docker compose version &>/dev/null; then
    DC="docker compose -f docker-setup/docker-compose.yml"
else
    DC="docker-compose -f docker-setup/docker-compose.yml"
fi

# Load .env overrides if present
if [ -f "$SCRIPT_DIR/.env" ]; then
    echo "Loading .env from docker-setup/.env"
    set -a
    . "$SCRIPT_DIR/.env"
    set +a
fi

echo "Isolated deploy config:"
echo "  ISSUE_NUM           = $ISSUE_NUM"
echo "  COMPOSE_PROJECT_NAME= $COMPOSE_PROJECT_NAME"
echo "  CONTAINER_NAME      = $CONTAINER_NAME"
echo "  HOST_PORT           = $HOST_PORT"
echo "  DBT_PROJECT_PATH    = ${DBT_PROJECT_PATH:-<built-in jaffle_shop_duckdb>}"

if [ -z "${NO_BUILD:-}" ]; then
    echo ""
    echo "Building extension with webpack..."
    npm run webpack
else
    echo ""
    echo "NO_BUILD set — skipping webpack build"
fi

echo ""
echo "Building and starting code-server container (detached)..."
$DC up --build -d

echo ""
echo "Waiting for code-server to be ready on port $HOST_PORT..."
MAX_WAIT=60
WAITED=0
until curl -sf "http://localhost:${HOST_PORT}/healthz" > /dev/null 2>&1; do
    if [ $WAITED -ge $MAX_WAIT ]; then
        echo "Timed out waiting for code-server after ${MAX_WAIT}s"
        echo "Logs:  $DC logs --tail=100"
        exit 1
    fi
    sleep 2
    WAITED=$((WAITED + 2))
    echo "  Waiting... (${WAITED}s)"
done

echo ""
echo "Ready: http://localhost:${HOST_PORT}/?folder=/home/coder/project"
echo ""
echo "To tear down:"
echo "  COMPOSE_PROJECT_NAME=$COMPOSE_PROJECT_NAME CONTAINER_NAME=$CONTAINER_NAME HOST_PORT=$HOST_PORT \\"
echo "    $DC down"
