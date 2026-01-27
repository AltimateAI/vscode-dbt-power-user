#!/bin/bash

# Symlink the volume-mounted extension source into code-server extensions directory
EXTENSIONS_DIR="$HOME/.local/share/code-server/extensions"
mkdir -p "$EXTENSIONS_DIR"

# Remove any stale symlink or directory (publisher.name must match package.json)
rm -rf "$EXTENSIONS_DIR/innoverio.vscode-dbt-power-user"
rm -rf "$EXTENSIONS_DIR/altimate.vscode-dbt-power-user"

# Create symlink to the mounted extension source
ln -s /home/coder/extension-src "$EXTENSIONS_DIR/innoverio.vscode-dbt-power-user"

# Determine project directory
if [ -d "/home/coder/project" ] && [ "$(ls -A /home/coder/project 2>/dev/null)" ]; then
    PROJECT_DIR="/home/coder/project"
else
    PROJECT_DIR="/home/coder/jaffle_shop_duckdb"
fi

# Start code-server with the project open
exec code-server \
    --bind-addr 0.0.0.0:${PORT:-3001} \
    --auth none \
    --disable-telemetry \
    --disable-workspace-trust \
    --log debug \
    "$PROJECT_DIR"
