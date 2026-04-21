# Dev Workflow: Docker + Playwright MCP

## Overview

This skill enables developing and testing the dbt Power User VSCode extension inside a Docker container running code-server, with Playwright MCP for browser automation.

## Architecture

- **Single repo**: All extension code lives in `vscode-dbt-power-user`
- **Build system**: webpack (main extension) + Vite (webview panels in `webview_panels/`)
- **Volume mount**: Extension source is mounted read-only into the container at `/home/coder/extension-src`
- **Hot-reload**: `npm run watch` on the host auto-recompiles; reload the browser to pick up changes

## Deploy

```bash
npm run docker:deploy
```

This script:
1. Builds the extension with `npm run webpack`
2. Starts the Docker container with `docker compose up --build -d`
3. Waits for code-server to be ready at `http://localhost:3001/healthz`
4. Enters `npm run watch` mode (blocks the terminal)

## Verify with Playwright MCP

After deploy, use Playwright MCP tools to verify the extension is working:

```
mcp__playwright__browser_navigate → http://localhost:3001/?folder=/home/coder/project
mcp__playwright__browser_snapshot → check that code-server loaded
```

### What to look for
- The **dbt Power User sidebar icon** (look for "dbt" or the dbt icon in the activity bar)
- The **status bar** at the bottom should show dbt-related status items
- The **Explorer** should show the jaffle_shop_duckdb project files (or your custom project)

## Hot-Reload Workflow

1. Make a code change to the extension source
2. `npm run watch` (running in deploy terminal) detects the change and rebuilds
3. Wait for webpack to finish compiling (watch the terminal output)
4. Use Playwright MCP to reload the browser:
   ```
   mcp__playwright__browser_navigate → http://localhost:3001/?folder=/home/coder/project
   ```
5. Take a snapshot to verify the change:
   ```
   mcp__playwright__browser_snapshot
   ```

## Custom dbt Project

To use your own dbt project instead of jaffle_shop:

1. Create `docker-setup/.env` (see `docker-setup/.env.example`)
2. Set `DBT_PROJECT_PATH=/absolute/path/to/your/project`
3. Re-run `npm run docker:deploy`

## Other Commands

```bash
npm run docker:logs   # View container logs
npm run docker:stop   # Stop the container
```

## Gotchas

- **deploy.sh blocks the terminal**: The script ends with `npm run watch` which runs indefinitely. Use a separate terminal for other commands.
- **Workspace Trust dialog**: The container starts with `--disable-workspace-trust` to avoid the trust prompt, but if it appears, click "Yes, I trust the authors".
- **Xvfb**: The container has Xvfb installed for headless testing scenarios but code-server itself runs without it.
- **dbt sidebar vs bottom panel**: The dbt Power User extension adds both a sidebar panel and contributes to the bottom panel. Check both locations.
- **Webview panels**: If you change webview panel code (in `webview_panels/`), you need to rebuild those separately with `npm run panel:webviews` before webpack picks them up.
- **Extension symlink**: The container's `start-code-server.sh` creates a symlink from the mounted source to the extensions directory. If the extension doesn't appear, check `docker exec <container> ls -la ~/.local/share/code-server/extensions/`.
