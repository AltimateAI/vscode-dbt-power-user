import * as assert from "assert";
import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

const EXTENSION_ID = "innoverio.vscode-dbt-power-user";
// A command this extension contributes (proves contributions loaded), from package.json contributes.commands.
const STABLE_COMMAND = "dbtPowerUser.openInsights";
// Success/failure markers emitted to the file-backed "Log - dbt" LogOutputChannel and the exthost log.
const INIT_OK = "Initialized dbt project";
const INIT_FAIL = "Unable to register dbt project";

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function readAllLogs(uddDir: string): string {
  // VSCode writes LogOutputChannels + console output under <user-data-dir>/logs/**.
  const out: string[] = [];
  const stack = [path.join(uddDir, "logs")];
  while (stack.length) {
    const dir = stack.pop()!;
    let entries: fs.Dirent[] = [];
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const e of entries) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) {
        stack.push(p);
      } else if (e.name.endsWith(".log")) {
        try {
          out.push(fs.readFileSync(p, "utf8"));
        } catch {
          /* ignore unreadable rotating log */
        }
      }
    }
  }
  return out.join("\n");
}

suite("Matrix: installed VSIX activation + dbt project init", function () {
  this.timeout(120_000);

  test("extension is installed and activates", async function () {
    const ext = vscode.extensions.getExtension(EXTENSION_ID);
    assert.ok(
      ext,
      `${EXTENSION_ID} should be installed in the test extensions-dir`,
    );
    await ext!.activate();
    assert.strictEqual(ext!.isActive, true, "extension should be active");
  });

  test("contributed command is registered", async function () {
    const cmds = await vscode.commands.getCommands(true);
    assert.ok(
      cmds.includes(STABLE_COMMAND),
      `command ${STABLE_COMMAND} should be registered`,
    );
  });

  test("dbt fixture workspace is open", function () {
    const folders = vscode.workspace.workspaceFolders ?? [];
    assert.ok(folders.length > 0, "a workspace folder should be open");
    assert.ok(
      folders.some((f) =>
        fs.existsSync(path.join(f.uri.fsPath, "dbt_project.yml")),
      ),
      "the open workspace should contain dbt_project.yml",
    );
  });

  test("dbt project initializes (log shows 'Initialized dbt project')", async function () {
    const uddDir = process.env.MATRIX_UDD;
    assert.ok(uddDir, "MATRIX_UDD env must point at the --user-data-dir");
    const deadline = Date.now() + 90_000;
    let logs = "";
    while (Date.now() < deadline) {
      logs = readAllLogs(uddDir!);
      if (logs.includes(INIT_FAIL)) {
        assert.fail(
          `dbt project registration failed: found '${INIT_FAIL}' in logs`,
        );
      }
      if (logs.includes(INIT_OK)) {
        return; // success
      }
      await sleep(2000);
    }
    assert.fail(
      `did not observe '${INIT_OK}' within 90s (dbt project did not initialize)`,
    );
  });
});
