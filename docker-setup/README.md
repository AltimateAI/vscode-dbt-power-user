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

Use Playwright MCP tools to programmatically verify the extension:

```
mcp__playwright__browser_navigate → http://localhost:3001/?folder=/home/coder/project
mcp__playwright__browser_snapshot → verify extension loaded
```

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
