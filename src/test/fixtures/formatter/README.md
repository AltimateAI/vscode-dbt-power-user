# SQL Formatter Test Fixtures

Each `.sql` file is a test case for `processDiffOutput()`, containing the original SQL before formatting.

## How tests work

The integration tests use **real sqlfmt** and **real VSCode APIs** via `@vscode/test-electron`:

```text
fixture.sql -> real sqlfmt (child_process.spawnSync) -> diff output + formatted output
                                                            |
real vscode.TextDocument (from temp file) + diff -> processDiffOutput() -> real TextEdit[]
                                                                                |
                                                    vscode.workspace.applyEdit() -> compare vs sqlfmt output
```

No mocks, no pre-generated `.diff` files. The diff and expected output are both generated live by invoking `sqlfmt` with the same args used in production. The sqlfmt CLI formatted output is the source of truth.

## Prerequisites

Install sqlfmt with jinja support:

```bash
pip install "shandy-sqlfmt[jinjafmt]"
```

## Running tests

```bash
# If sqlfmt is on PATH:
npm run test:integration

# Or point to sqlfmt explicitly (useful in CI or virtualenvs):
SQLFMT_PATH=/path/to/venv/bin/sqlfmt npm run test:integration
```

If sqlfmt is not installed (or only the Go `sqlfmt` variant is found), all tests are gracefully skipped via Mocha's `this.skip()`.

## Adding a new fixture

1. Create a new `.sql` file under `src/test/fixtures/formatter/`
2. Write the SQL to test (the unformatted input)
3. The test suite auto-discovers all `.sql` files in this directory
