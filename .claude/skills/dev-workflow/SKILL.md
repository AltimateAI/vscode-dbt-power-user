---
name: dev-workflow
description: End-to-end development workflow — build, deploy to Docker code-server, verify with Playwright, and iterate with hot-reload
user_invocable: true
---

# Docker Testing Workflow

You are helping the user develop and test the Datamates VS Code extension. The workflow involves making code changes in either the extension or the MCP engine repo, auto-building via rspack watch mode, deploying to a Docker code-server container, and verifying changes using Playwright MCP.

## Architecture

Two linked repositories:
- **vscode-dbt-power-user** (this repo) — the VS Code extension

The extension is **volume-mounted** into the container (no VSIX). The repo is mounted read-only at `/home/coder/extension-src`, and a symlink connects it to the code-server extensions directory.

## Step 1: Deploy

Run the deploy script (runs in foreground with watch mode):

```bash
yarn docker:deploy
```

This will:
1. Check `docker-setup/.env` exists (prompts for `DBT_PROJECT_PATH` if not)
2. Build the extension with `yarn rspack build`
3. Stop existing container, rebuild Docker image, start new container
4. Wait for code-server to be ready at http://localhost:3001
5. Start `yarn rspack build --watch` for automatic recompilation

Since deploy enters watch mode, run it in the background when using Claude:
```bash
cd /Users/saravananshanmugam/Desktop/projects/altimate/vscode-dbt-power-user && yarn docker:deploy
```

## Step 2: Verify with Playwright MCP

Use the Playwright MCP tools to verify the extension loads:

1. Navigate to `http://localhost:3001/?folder=/home/coder/project`
2. Wait 8 seconds for code-server to fully initialize
3. If a trust dialog appears ("Do you trust the authors?"), click "Yes, I trust the authors"
4. Click "Toggle Panel (⌘J)" button to open the bottom panel
5. The "Datamates" tab may be under "Additional Views" overflow menu — check there if not visible
6. Click the "Datamates" tab
7. Verify the extension UI loads inside the iframe (look for heading text, buttons, etc.)

To check engine-side logs:
1. Click the "Output" tab in the bottom panel
2. Select "Datamate" from the output channel dropdown
3. Look for log entries from the MCP engine

## Step 3: Hot-Reload After Code Changes

The watcher automatically recompiles when files change in either repo (~350-400ms). To pick up changes in code-server:

1. Save your code change (watcher auto-rebuilds)
2. **Reload code-server using Playwright**: use `browser_navigate` to `http://localhost:3001/?folder=/home/coder/project` — do NOT use the command palette approach
3. Wait 8 seconds for re-initialization
4. Verify the change in the Output > Datamate channel or UI

**IMPORTANT**: Always reload by navigating to the URL again. Do NOT open the command palette to run "Developer: Reload Window" — it's slower and more fragile.

## How It Works

- **No VSIX**: The Dockerfile does not build or install a VSIX. The extension source is mounted as a Docker volume.
- **Volume mount**: `docker-compose.yml` mounts the repo at `/home/coder/extension-src:ro`
- **Symlink**: `start-code-server.sh` creates a symlink from `/home/coder/.local/share/code-server/extensions/vscode-dbt-power-user` → `/home/coder/extension-src`
- **Watch mode**: `deploy.sh` enters `yarn rspack build --watch` after the container is ready, so code changes in either repo are auto-compiled
- **Settings injection**: `start-code-server.sh` sets `altimate.onboardedMcpServer: true` in user settings to skip onboarding

## Gotchas

### Watch mode covers both repos
Changes to `vscode-dbt-power-user` trigger a rebuild. No need to rebuild manually.

### Engine linking
The engine link requires modifications to `rspack.config.js` and `tsconfig.json`. See [docs/development.md](../../docs/development.md) → "Manual" section for the exact diff. If these files revert to their normal state, the engine will be pulled from `node_modules` instead of the local path.

### Trust dialog on first open
When opening a folder in code-server for the first time, a "Do you trust the authors?" dialog appears. You must accept it before extensions activate fully. The `--disable-workspace-trust` flag should suppress this, but check if it appears.

### Datamates tab location
The Datamates tab may appear directly in the bottom panel tabs, OR it may be hidden under the "Additional Views" overflow menu (the `...` button). Check both.

### Container auth disabled
code-server runs with `--auth none`. Do not expose port 3001 on public networks.

### Port conflict
If port 3001 is already in use: `yarn docker:stop` first.

### CRITICAL: Always `up --build`, never `restart`
After any rspack/webpack rebuild, always use `docker compose up --build -d` (or `yarn docker:deploy`), **never** `docker compose restart`. code-server caches extension state in memory — `restart` reuses the stale cache and the new bundle won't take effect. This causes tests to pass/fail inconsistently and wastes debugging time.

### Docker build cache
If changes don't appear after `up --build`, force a clean build:
```bash
cd docker-setup && docker compose build --no-cache && docker compose up -d
```

### deploy.sh blocks the terminal
`yarn docker:deploy` enters watch mode and doesn't return. When running from Claude, use `run_in_background: true` on the Bash tool, then check output with `TaskOutput`.

## Efficient E2E Testing with Playwright MCP

When using Playwright MCP to verify the extension, follow this exact sequence to minimize tool calls:

**1. Verify bundle** (1 call):
```bash
grep -c "myKeyFunction" dist/extension.js
```

**2. Deploy + seed** (1 call — combine with `&&`):
```bash
docker compose -f docker-setup/docker-compose.yml up --build -d && \
for i in $(seq 1 15); do curl -sf http://localhost:3001/healthz > /dev/null 2>&1 && break; sleep 2; done && \
CID=$(docker ps -q --filter "name=docker-setup-code-server") && \
docker exec $CID bash -c 'cd /home/coder/project && dbt seed && dbt run'
```

**3. Check activation via logs** (1 call — NOT by clicking through the UI):
```bash
CID=$(docker ps -q --filter "name=docker-setup-code-server")
latest=$(docker exec $CID bash -c 'ls -td /home/coder/.local/share/code-server/logs/*/ | head -1')
docker exec $CID grep "innoverio\|altimateai\|removed" "${latest}remoteagent.log"
```

**4. Navigate + wait** (2 calls):
```
browser_navigate → http://localhost:3001/?folder=/home/coder/project
browser_wait_for → 20 seconds
```

**5. Open file + execute + screenshot** (5 calls):

*Preferred: click file tree* (Quick Open via `Ctrl+P` is unreliable in Playwright — sometimes the file doesn't open):
```
browser_evaluate →
  const items = document.querySelectorAll('[role="treeitem"]');
  const target = Array.from(items).find(i => i.getAttribute('aria-label') === 'test_query.sql');
  if (target) { target.click(); target.click(); } // double-click to pin tab
browser_wait_for → 2 seconds
browser_press_key → Control+Enter
browser_wait_for → 12 seconds
browser_take_screenshot
```

*Fallback: Quick Open* (retry if document title doesn't change):
```
browser_press_key → Control+P
browser_snapshot → find textbox ref
browser_type → ref=<textbox>, text='test_query.sql', submit=true
browser_press_key → Control+Enter (after 2s wait)
browser_take_screenshot (after 12s wait)
```

Total: ~10 tool calls per test, not 30+.

### Multiple worktrees on same Docker setup

When testing multiple branches simultaneously, each needs its own container:
```bash
# Use -p for unique project names and different ports in docker-compose.override.yml
docker compose -p feature-a-e2e up --build -d  # port 3004
docker compose -p feature-b-e2e up --build -d  # port 3005
```
Without `-p`, containers from different worktrees share the same project name and collide.

### Extension symlink gotchas

The symlink directory name **must include the version suffix** (e.g. `innoverio.vscode-dbt-power-user-0.60.1`). A bare name like `innoverio.vscode-dbt-power-user` gets re-marked as removed by code-server's obsolete scanner on every boot — even if `extensions.json` has the correct entry. The `extensions.json` registration is necessary but not sufficient without the versioned name.

### Language mode timing

`.sql` files may open as "MS SQL" instead of "Jinja SQL" if the `jinjahtml` extension hasn't activated yet when the file opens. This is a race condition — `jinjahtml` maps `.sql` → `jinja-sql` but activation order varies. Workaround: reopen the file or manually switch language mode after extension activation.

## Updating altimate-code in Docker

The Docker container installs `@altimateai/altimate-code` from npm. To test local changes from the `altimate-code` repo:

### Build locally

```bash
cd /Users/saravananshanmugam/Desktop/projects/altimate/altimate-code

# Requires bun >= 1.3.10 (upgrade with: bun upgrade)
npx turbo build --filter=@altimateai/altimate-code
```

This produces platform-specific binaries in `packages/opencode/dist/@altimateai/`.

### Replace binary in Docker

The installed binary is a compiled ELF at `/usr/lib/node_modules/@altimateai/altimate-code/bin/.altimate-code`. To replace it:

```bash
# 1. Copy the linux-arm64 binary (Docker runs on Colima aarch64)
docker cp /Users/saravananshanmugam/Desktop/projects/altimate/altimate-code/packages/opencode/dist/@altimateai/altimate-code-linux-arm64/bin/altimate docker-setup-code-server-1:/tmp/altimate-new

# 2. Kill running altimate-code processes (binary is "text file busy" otherwise)
docker exec -u root docker-setup-code-server-1 pkill -f 'altimate-code serve'

# 3. Remove old binary and copy new one
docker exec -u root docker-setup-code-server-1 bash -c "rm /usr/lib/node_modules/@altimateai/altimate-code/bin/.altimate-code && cp /tmp/altimate-new /usr/lib/node_modules/@altimateai/altimate-code/bin/.altimate-code && chmod +x /usr/lib/node_modules/@altimateai/altimate-code/bin/.altimate-code && rm /tmp/altimate-new"

# 4. Reload browser to restart extension (spawns new altimate-code process)
```

**Note**: The built binary `altimate-code` is a symlink to `altimate` — copy the `altimate` file, not the symlink.

### Update from npm (no local changes)

```bash
docker exec -u root docker-setup-code-server-1 npm install -g @altimateai/altimate-code@latest
```

### Clean state after update

After replacing the binary, you may need to clean stale state:

```bash
# Remove stale DB and config (fresh start)
docker exec docker-setup-code-server-1 rm -f \
  /home/coder/.local/share/altimate-code/opencode.db \
  /home/coder/.local/share/altimate-code/opencode.db-shm \
  /home/coder/.local/share/altimate-code/opencode.db-wal \
  /home/coder/project/config.json
```

## Useful Commands

| Command | Description |
|---------|-------------|
| `yarn docker:deploy` | Full build + deploy + watch mode |
| `yarn docker:logs` | Stream container logs |
| `yarn docker:stop` | Stop the container |

## Configuration

Stored in `docker-setup/.env` (gitignored):

| Variable | Description |
|----------|-------------|
| `DBT_PROJECT_PATH` | Absolute path to local dbt project directory, mounted at `/home/coder/project`. Leave unset to use the bundled `test-fixtures/jaffle-shop-duckdb` instead (see below). |

To change: edit `docker-setup/.env` or delete it and run `yarn docker:deploy` to be re-prompted.

## Test Fixtures

Two ready-to-use DuckDB projects are bundled in the repo under `test-fixtures/`:

| Fixture | Profile | Notes |
|---------|---------|-------|
| `test-fixtures/jaffle-shop-duckdb` | `jaffle_shop` | Classic dbt-labs jaffle-shop (customers, orders, payments) |
| `test-fixtures/dbt-core-sample-duckdb` | `dbt_core_sample_duckdb` | go-sales sample with Python + SQL models, macros, snapshots |

### How the container uses them

`start-code-server.sh` copies both fixtures from the read-only `/home/coder/extension-src` mount into writable home dirs on first boot and runs `dbt deps` in each:

```
/home/coder/extension-src/test-fixtures/jaffle-shop-duckdb       →  /home/coder/jaffle-shop-duckdb
/home/coder/extension-src/test-fixtures/dbt-core-sample-duckdb   →  /home/coder/dbt-core-sample-duckdb
```

The `Dockerfile` pre-seeds `~/.dbt/profiles.yml` with both profiles pointing at DuckDB files, so the fixtures work without any local setup — no warehouse credentials required.

### Choosing which project to open

There are three common setups:

1. **Fastest smoke test — use a bundled fixture in-container** (recommended for throwaway verification).
   Leave `DBT_PROJECT_PATH` unset and open the container copy directly:
   ```
   http://localhost:3001/?folder=/home/coder/jaffle-shop-duckdb
   http://localhost:3001/?folder=/home/coder/dbt-core-sample-duckdb
   ```
   Changes stay inside the container and are wiped when the volume is rebuilt.

2. **Point `DBT_PROJECT_PATH` at a fixture path on the host** (when you want to edit the fixture and keep the change).
   ```bash
   # docker-setup/.env
   DBT_PROJECT_PATH=/absolute/path/to/vscode-dbt-power-user/test-fixtures/jaffle-shop-duckdb
   ```
   The fixture is mounted at `/home/coder/project`, so `http://localhost:3001/?folder=/home/coder/project` opens it. **Edits land in the repo** — commit or `git checkout` to reset.

3. **Point `DBT_PROJECT_PATH` at an unrelated real dbt project** (for debugging user-reported issues). Same mechanism as #2 — the project is mounted at `/home/coder/project`.

### Gotchas with fixtures

- **Fixture already has `target/` committed.** `test-fixtures/jaffle-shop-duckdb/target/manifest.json` is checked in so the extension has something to parse before the first `dbt run`. Running dbt will overwrite it; don't commit the churn.
- **`dbt_core_sample_duckdb` profile expects `/home/coder/dbt-core-sample-duckdb/go_sales.db`.** That path only exists inside the container copy — running dbt against this fixture from the host mount (#2) will fail unless you also create `go_sales.db` locally.
- **The volume-mount fallback doesn't land on a fixture.** If `DBT_PROJECT_PATH` is unset, compose mounts a host path that usually doesn't exist, and `start-code-server.sh` then opens `/home/coder/jaffle_shop_duckdb` (underscores), which also doesn't exist. Always either set `DBT_PROJECT_PATH` or navigate explicitly to `/home/coder/jaffle-shop-duckdb` (dashes).

---

## Harness Sandbox Contract

This section is the machine-readable contract for the harness sandbox system. The CLI parses the YAML block below to render the pod template.

### Two-phase sandbox lifecycle

| Phase | Marker file | What's available |
|---|---|---|
| **Phase 1: code-ready** | `/workspace/.code-ready` | Source code, `node_modules`, linters, `tsc` |
| **Phase 2: server-ready** | `/workspace/.server-ready` | code-server running on :3001, extension loaded |

`harness spawn` returns at phase 1 (~5s with base image). Agent reads codebase while code-server starts (~30-60s for yarn compile + code-server boot).

```yaml
repo: vscode-dbt-power-user
repo_url: https://github.com/AltimateAI/vscode-dbt-power-user.git
base_image: altimateacr.azurecr.io/vscode-dbt-power-user-base:latest
working_dir: /workspace/vscode-dbt-power-user
port: 3001
health_path: /healthz

provides:
  - name: CODE_SERVER_URL
    value: "http://sandbox-{{ sandbox_id }}.{{ namespace }}.svc.cluster.local:3001"

needs: []

sidecars: []

setup_commands:
  - name: enable-corepack
    cmd: corepack enable
  - name: install-root-deps
    cmd: yarn install --immutable 2>&1 | tail -5 || yarn install 2>&1 | tail -5
  - name: install-webview-deps
    cmd: cd webview_panels && (yarn install --immutable 2>&1 | tail -5 || yarn install 2>&1 | tail -5)
  - name: compile-extension
    cmd: yarn compile
  - name: setup-code-server-extension
    cmd: |
      EXT_DIR="$HOME/.local/share/code-server/extensions"
      mkdir -p "$EXT_DIR"
      ln -sf /workspace/vscode-dbt-power-user "$EXT_DIR/vscode-dbt-power-user"
  - name: setup-code-server-settings
    cmd: |
      SETTINGS_DIR="$HOME/.local/share/code-server/User"
      mkdir -p "$SETTINGS_DIR"
      if [ ! -f "$SETTINGS_DIR/settings.json" ]; then
        echo '{"altimate.onboardedMcpServer": true}' > "$SETTINGS_DIR/settings.json"
      fi

start_command: >
  code-server
  --bind-addr 0.0.0.0:3001
  --auth none
  --disable-telemetry
  --disable-workspace-trust
  --log debug
```

### Sandbox troubleshooting

- **Extension not loading in sandbox**: Check symlink at `~/.local/share/code-server/extensions/vscode-dbt-power-user` and that `dist/extension.js` was built by `yarn compile`.
- **Slow phase 1**: Base image may be stale. Rebuild with `az acr build --registry altimateacr --image vscode-dbt-power-user-base:latest -f Dockerfile.base .`
- **MCP server not starting**: Verify `altimate.onboardedMcpServer: true` in code-server settings.