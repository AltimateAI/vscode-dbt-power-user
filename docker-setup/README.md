# Docker Development Setup

Develop and test the dbt Power User extension in code-server (VS Code in browser) with volume-mounted source for hot-reload.

## Quick Start

```bash
npm run docker:deploy
```

This builds the extension, starts the container, and enters webpack watch mode. Open http://localhost:3001/?folder=/home/coder/project in your browser.

## How It Works

The extension source is **volume-mounted** into the container (read-only), so you don't need to rebuild a VSIX or the Docker image for every change:

1. `deploy.sh` runs `npm run webpack` to build the extension
2. Docker container starts with the repo mounted at `/home/coder/extension-src`
3. `start-code-server.sh` symlinks the mounted source into code-server's extensions directory
4. `npm run watch` runs on the host — any source change triggers a webpack rebuild
5. Reload the browser to pick up changes

## Configuration

### Custom dbt Project

By default, the container uses the built-in `jaffle_shop_duckdb` project. To use your own:

1. Copy `.env.example` to `.env`
2. Set `DBT_PROJECT_PATH=/absolute/path/to/your/project`
3. Re-run `npm run docker:deploy`

## What's Pre-Installed

- **code-server**: VS Code in the browser (port 3001, no auth)
- **Node.js 20**: For extension host
- **Python 3 + dbt-duckdb**: For dbt integration
- **jaffle_shop_duckdb**: Sample dbt project with pre-configured profile and deps
- **Python extension**: Required dependency for dbt Power User
- **Xvfb**: For headless testing

## Commands

| Command                 | Description                                  |
| ----------------------- | -------------------------------------------- |
| `npm run docker:deploy` | Build, start container, and enter watch mode |
| `npm run docker:logs`   | View container logs                          |
| `npm run docker:stop`   | Stop the container                           |

## Playwright MCP Testing

Use Playwright MCP tools to programmatically verify the extension in Docker.

### Prerequisites

Add to `.mcp.json` (project or global):

```json
{
  "playwright": {
    "command": "npx",
    "args": [
      "@playwright/mcp@latest",
      "--executable-path",
      "/usr/bin/chromium-browser",
      "--headless"
    ]
  }
}
```

The package is `@playwright/mcp` (NOT `@anthropic-ai/mcp-playwright`). Use `--executable-path` to point to the system Chromium to avoid needing `npx playwright install`.

### Automated E2E Test Checklist

Follow this exact sequence — each step is one tool call:

**1. Verify bundle before deploying** (saves debugging stale code later):

```bash
grep -c "myKeyFunction" dist/extension.js  # confirm expected code is bundled
```

**2. Deploy with `--build`** (NEVER use `docker compose restart` — code-server caches extension state):

```bash
docker compose -f docker-setup/docker-compose.yml up --build -d
```

**3. Wait for ready + seed dbt** (seed BEFORE browser connects — extension gets its own DuckDB connection):

```bash
for i in $(seq 1 15); do curl -sf http://localhost:3001/healthz > /dev/null 2>&1 && break; sleep 2; done
CID=$(docker ps -q --filter "name=docker-setup-code-server")
docker exec $CID bash -c 'cd /home/coder/jaffle-shop-duckdb && dbt seed && dbt run'
```

**4. Check extension activation via logs** (don't waste time clicking through the UI):

```bash
CID=$(docker ps -q --filter "name=docker-setup-code-server")
latest=$(docker exec $CID bash -c 'ls -td /home/coder/.local/share/code-server/logs/*/ | head -1')
docker exec $CID grep "innoverio\|removed" "${latest}remoteagent.log"
docker exec $CID grep "innoverio" "${latest}exthost1/remoteexthost.log"
```

- ✅ `ExtensionService#_doActivateExtension innoverio.vscode-dbt-power-user` = activated
- ❌ `Marked extension as removed` = `.obsolete` bug (fixed in PR #1859)

**5. Create test SQL files** (do this from the host before connecting Playwright):

```bash
docker exec $CID bash -c 'cat > /home/coder/jaffle-shop-duckdb/test_query.sql << "SQL"
SELECT * FROM {{ ref("customers") }} LIMIT 10
SQL'
```

**6. Connect Playwright and navigate**:

```
mcp__playwright__browser_navigate → http://localhost:3001/?folder=/home/coder/jaffle-shop-duckdb
mcp__playwright__browser_wait_for → 20 seconds (extension activation + dbt parsing)
```

**7. Open file via evaluate** (faster than Ctrl+P → type → Enter cycle):

```
mcp__playwright__browser_press_key → Control+P
mcp__playwright__browser_evaluate → document.querySelector('[placeholder*="Search files"]').value = 'test_query'; ...dispatchEvent(...)
mcp__playwright__browser_wait_for → 1 second
mcp__playwright__browser_press_key → Enter
```

**8. Execute and capture**:

```
mcp__playwright__browser_wait_for → 2 seconds
mcp__playwright__browser_press_key → Control+Enter
mcp__playwright__browser_wait_for → 12 seconds
mcp__playwright__browser_take_screenshot
```

### Common Pitfalls

| Pitfall                                   | Symptom                                | Fix                                                                                       |
| ----------------------------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------- |
| `docker compose restart` after rebuild    | Tests pass/fail inconsistently         | Always use `up --build`                                                                   |
| Browser connects before `dbt seed`        | "Table does not exist" error           | Seed first, then navigate                                                                 |
| Extension marked as "removed"             | No dbt commands in palette             | PR #1859 fixes `.obsolete` — ensure `start-code-server.sh` registers in `extensions.json` |
| Wrong Playwright package                  | MCP fails to connect                   | Use `@playwright/mcp`, not `@anthropic-ai/mcp-playwright`                                 |
| `cd` into `node_modules/` for symlink ops | Subsequent commands run from wrong dir | Use absolute paths or don't cd                                                            |

## Troubleshooting

**Container won't start:**

```bash
npm run docker:stop
cd docker-setup && docker compose up --build
```

**Extension not loading:**

```bash
# Check the symlink exists
docker exec -it docker-setup-code-server-1 ls -la ~/.local/share/code-server/extensions/

# Check extension source is mounted
docker exec -it docker-setup-code-server-1 ls /home/coder/extension-src/package.json
```

**Rebuild from scratch:**

```bash
npm run docker:stop
cd docker-setup && docker compose build --no-cache && docker compose up -d
```

**Check dbt installation:**

```bash
docker exec -it docker-setup-code-server-1 dbt --version
```
