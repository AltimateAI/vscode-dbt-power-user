# Local Docker Setup for Extension Testing

Test the dbt Power User extension in code-server (VS Code in browser) with a pre-configured dbt project.

## Quick Start

From the project root:

```bash
yarn docker:deploy
```

Then open http://localhost:3001 in your browser.

## What's Pre-Installed

- **code-server**: VS Code in the browser
- **Node.js 20**: For extension host
- **Python 3**: For dbt integration
- **dbt-duckdb**: dbt adapter for DuckDB
- **jaffle_shop_duckdb**: Sample dbt project (auto-opens on startup)
- **Python extension**: Required dependency for dbt Power User
- **Xvfb**: For headless testing
- **No authentication**: Accessible without password

The jaffle_shop_duckdb project is cloned from https://github.com/dbt-labs/jaffle_shop_duckdb and comes with:

- Pre-configured dbt profile (`~/.dbt/profiles.yml`)
- dbt dependencies already installed (`dbt deps`)
- Ready to run `dbt build` immediately

## Available Commands

| Command              | Description                               |
| -------------------- | ----------------------------------------- |
| `yarn docker:deploy` | Build extension and deploy to code-server |
| `yarn docker:logs`   | View container logs                       |
| `yarn docker:stop`   | Stop the container                        |

## Manual Setup

If you prefer to run commands manually:

```bash
# Build the extension
yarn build-vsix

# Copy to docker-setup (find the versioned VSIX file)
cp vscode-dbt-power-user-*.vsix docker-setup/extension.vsix

# Build and start container
cd docker-setup
docker-compose up --build
```

## Verification

1. Open http://localhost:3001
2. The jaffle_shop_duckdb project should open automatically
3. Verify the dbt Power User sidebar icon appears
4. Check that the extension activates (look for dbt status in bottom bar)
5. Try running a dbt command:
   - Open the terminal (Ctrl+`)
   - Run `dbt build` to build all models

## Testing dbt Commands

Once the container is running, you can test dbt commands in the terminal:

```bash
# Build all models
dbt build

# Run specific model
dbt run --select customers

# Test models
dbt test

# Generate docs
dbt docs generate
```

## Troubleshooting

**Container won't start:**

```bash
docker-compose down
docker-compose up --build
```

**Check extension logs:**

```bash
yarn docker:logs
```

**Rebuild from scratch:**

```bash
docker-compose down
docker-compose build --no-cache
docker-compose up
```

**dbt not found:**
The container installs dbt-duckdb globally. If you encounter issues, check:

```bash
docker exec -it docker-setup-code-server-1 dbt --version
```
