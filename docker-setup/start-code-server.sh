#!/bin/bash

# Copy test projects from read-only extension-src mount to writable home dirs and install deps
for project in jaffle-shop-duckdb dbt-core-sample-duckdb; do
    src="/home/coder/extension-src/test-fixtures/$project"
    dest="/home/coder/$project"
    if [ -d "$src" ] && [ ! -d "$dest" ]; then
        echo "Setting up $project..."
        cp -r "$src" "$dest"
        cd "$dest" && dbt deps 2>&1 || true
    fi
done

# Symlink the volume-mounted extension source into code-server extensions directory
EXTENSIONS_DIR="$HOME/.local/share/code-server/extensions"
mkdir -p "$EXTENSIONS_DIR"

# Remove any stale symlink or directory (publisher.name must match package.json)
rm -rf "$EXTENSIONS_DIR/innoverio.vscode-dbt-power-user"
rm -rf "$EXTENSIONS_DIR/altimate.vscode-dbt-power-user"

# Create symlink to the mounted extension source
ln -s /home/coder/extension-src "$EXTENSIONS_DIR/innoverio.vscode-dbt-power-user"

# Register the symlinked extension in extensions.json so code-server doesn't mark it as obsolete.
# code-server only knows about extensions installed via `code-server --install-extension`;
# symlinked extensions must be added to the registry manually.
node -e "
  const fs = require('fs');
  const path = '$EXTENSIONS_DIR/extensions.json';
  const exts = JSON.parse(fs.readFileSync(path, 'utf8'));
  const pkg = JSON.parse(fs.readFileSync('/home/coder/extension-src/package.json', 'utf8'));
  const id = pkg.publisher + '.' + pkg.name;
  if (!exts.find(e => e.identifier && e.identifier.id === id)) {
    exts.push({
      identifier: { id },
      version: pkg.version,
      location: { \$mid: 1, path: '$EXTENSIONS_DIR/innoverio.vscode-dbt-power-user', scheme: 'file' },
      relativeLocation: 'innoverio.vscode-dbt-power-user',
      metadata: { installedTimestamp: Date.now() }
    });
    fs.writeFileSync(path, JSON.stringify(exts, null, 2));
    console.log('Registered', id, 'in extensions.json');
  }
"

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
