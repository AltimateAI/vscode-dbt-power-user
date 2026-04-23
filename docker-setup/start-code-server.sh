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

# Read version from package.json for the symlink name.
# code-server's obsolete scanner matches directory names against the registry format
# `publisher.name-version`. Without the version suffix, it marks the extension as
# removed on every boot — even if extensions.json has the correct entry.
EXT_VERSION=$(node -e "console.log(require('/home/coder/extension-src/package.json').version)")
EXT_DIR_NAME="innoverio.vscode-dbt-power-user-${EXT_VERSION}"

# Remove any stale symlink or directory
rm -rf "$EXTENSIONS_DIR/innoverio.vscode-dbt-power-user"
rm -rf "$EXTENSIONS_DIR"/innoverio.vscode-dbt-power-user-*
rm -rf "$EXTENSIONS_DIR/altimate.vscode-dbt-power-user"

# Create symlink with version suffix (required by code-server)
ln -s /home/coder/extension-src "$EXTENSIONS_DIR/$EXT_DIR_NAME"

# Register the symlinked extension in extensions.json so code-server doesn't mark it as obsolete.
# code-server only knows about extensions installed via `code-server --install-extension`;
# symlinked extensions must be added to the registry manually.
EXTJSON="$EXTENSIONS_DIR/extensions.json"
if [ ! -f "$EXTJSON" ]; then
    echo "[]" > "$EXTJSON"
fi
node -e "
  const fs = require('fs');
  const pkg = JSON.parse(fs.readFileSync('/home/coder/extension-src/package.json', 'utf8'));
  const id = pkg.publisher + '.' + pkg.name;
  const dirName = '$EXT_DIR_NAME';
  let exts = JSON.parse(fs.readFileSync('$EXTJSON', 'utf8'));
  exts = exts.filter(e => !e.identifier || e.identifier.id !== id);
  exts.push({
    identifier: { id },
    version: pkg.version,
    location: { \$mid: 1, path: '$EXTENSIONS_DIR/' + dirName, scheme: 'file' },
    relativeLocation: dirName,
    metadata: { installedTimestamp: Date.now(), source: 'vsix' }
  });
  fs.writeFileSync('$EXTJSON', JSON.stringify(exts, null, 2));
  console.log('Registered', id, '@' + pkg.version, 'in extensions.json');
"

# Clear .obsolete so code-server doesn't skip our extension on first scan
echo '{}' > "$EXTENSIONS_DIR/.obsolete"

# Seed code-server user settings with Altimate credentials if the host-mounted
# credentials file is present. Reads altimateApiKey / altimateInstanceName /
# altimateUrl (the shape of ~/.altimate/altimate.json) and writes them into
# settings.json as dbt.altimateAiKey, dbt.altimateInstanceName, dbt.altimateUrl.
SETTINGS_DIR="$HOME/.local/share/code-server/User"
SETTINGS_FILE="$SETTINGS_DIR/settings.json"
mkdir -p "$SETTINGS_DIR"
if [ ! -f "$SETTINGS_FILE" ]; then
    echo '{}' > "$SETTINGS_FILE"
fi
if [ -f "$HOME/.altimate-host/altimate.json" ]; then
    echo "Seeding Altimate credentials from mounted altimate.json..."
    node -e "
      const fs = require('fs');
      let creds = {};
      try {
        creds = JSON.parse(
          fs.readFileSync('$HOME/.altimate-host/altimate.json', 'utf8'),
        );
      } catch (e) {
        console.warn(
          'Skipping Altimate credential seeding: altimate.json is not valid JSON',
        );
        process.exit(0);
      }
      let settings = {};
      try { settings = JSON.parse(fs.readFileSync('$SETTINGS_FILE', 'utf8')); } catch (e) {}
      const nonEmpty = (v) => typeof v === 'string' && v.trim().length > 0;
      if (nonEmpty(creds.altimateApiKey)) {
        settings['dbt.altimateAiKey'] = creds.altimateApiKey;
      }
      if (nonEmpty(creds.altimateInstanceName)) {
        settings['dbt.altimateInstanceName'] = creds.altimateInstanceName;
      }
      if (nonEmpty(creds.altimateUrl)) {
        settings['dbt.altimateUrl'] = creds.altimateUrl;
      }
      // Only mark MCP onboarding complete once all three required credentials are
      // present — the flag gates MCP tool registration in src/mcp/index.ts, so we
      // must not bypass onboarding with partial auth.
      const hasAllCredentials =
        nonEmpty(creds.altimateApiKey) &&
        nonEmpty(creds.altimateInstanceName) &&
        nonEmpty(creds.altimateUrl);
      if (hasAllCredentials) {
        settings['altimate.onboardedMcpServer'] = true;
      }
      fs.writeFileSync('$SETTINGS_FILE', JSON.stringify(settings, null, 2));
      console.log('Wrote Altimate credentials to', '$SETTINGS_FILE');
    "
fi

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
