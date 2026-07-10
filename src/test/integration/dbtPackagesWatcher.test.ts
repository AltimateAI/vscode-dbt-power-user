import * as assert from "assert";
import * as fs from "fs";
import * as path from "path";
import "reflect-metadata";
import * as vscode from "vscode";
import { DBTWorkspaceFolder } from "../../dbt_client/dbtWorkspaceFolder";

/**
 * End-to-end check of the config file watcher's package-directory exclude,
 * exercising the REAL vscode FileSystemWatcher and REAL filesystem events
 * (not a mocked onDidCreate).
 *
 * A `dbt_project.yml` created under `dbt_packages/` at runtime — as happens
 * when `dbt deps` populates packages while a project is still initializing and
 * its package install path is not yet known — must NOT be registered as a
 * standalone project. A genuinely separate nested project must still register.
 *
 * A second, independent watcher (the "observer") on the same pattern is used
 * as the synchronization signal: the test waits until the observer has seen
 * BOTH create events before asserting. Since the observer is registered after
 * the DBTWorkspaceFolder watcher, once it receives an event that watcher's
 * handler has already run for it — so the negative assertion is race-free
 * without arbitrary sleeps, and does not rely on cross-directory event order.
 *
 * The workspace folder is the empty `dbt-packages-watcher` fixture opened by
 * runTests. It has no dbt_project.yml at launch, so the extension itself never
 * activates; this suite drives its own DBTWorkspaceFolder instance.
 */
suite("dbt_packages watcher exclude (integration)", function () {
  this.timeout(90_000);

  let workspaceRoot: string;
  let wf: DBTWorkspaceFolder | undefined;
  let observer: vscode.FileSystemWatcher | undefined;
  const registeredRoots: string[] = [];
  const observedCreates = new Set<string>();
  const createdPaths: string[] = [];

  const validProjectYaml = (name: string) =>
    `name: ${name}\nprofile: ${name}\nversion: "1.0.0"\nconfig-version: 2\n`;

  function makeStubProject(projectRoot: vscode.Uri, name: string) {
    return {
      projectRoot,
      getProjectName: () => name,
      getPackageInstallPath: () => undefined,
      getAdapterType: () => "postgres",
      onRebuildManifestStatusChange: () => ({ dispose: () => undefined }),
      initialize: async () => undefined,
      dispose: async () => undefined,
    };
  }

  suiteSetup(function () {
    const folder = vscode.workspace.workspaceFolders?.[0];
    assert.ok(folder, "expected an open workspace folder (fixture)");
    workspaceRoot = folder.uri.fsPath;

    fs.mkdirSync(path.join(workspaceRoot, "dbt_packages", "dbt_utils"), {
      recursive: true,
    });
    fs.mkdirSync(path.join(workspaceRoot, "analytics"), { recursive: true });
    createdPaths.push(
      path.join(workspaceRoot, "dbt_packages"),
      path.join(workspaceRoot, "analytics"),
    );

    // Recording factory: registerDBTProject calls this only for paths that
    // pass every guard. We assert on which roots reach it.
    const dbtProjectFactory = ((uri: vscode.Uri) => {
      registeredRoots.push(uri.fsPath);
      return makeStubProject(uri, path.basename(uri.fsPath));
    }) as unknown as ConstructorParameters<typeof DBTWorkspaceFolder>[0];

    const noop = () => undefined;
    const terminal = {
      debug: noop,
      info: noop,
      warn: noop,
      error: noop,
      log: noop,
    };
    const telemetry = { sendTelemetryEvent: noop, sendTelemetryError: noop };

    wf = new DBTWorkspaceFolder(
      dbtProjectFactory,
      (() => ({})) as never,
      telemetry as never,
      terminal as never,
      folder,
      new vscode.EventEmitter() as never,
      new vscode.EventEmitter() as never,
    );

    // Model the race window: the parent project is registered but still
    // initializing, so its package install path is not yet resolved.
    (wf as unknown as { dbtProjects: unknown[] }).dbtProjects = [
      makeStubProject(folder.uri, "root"),
    ];

    // Independent observer on the same pattern. Registered after wf's watcher,
    // it confirms a create event was actually delivered for a given path — the
    // signal we wait on before asserting (each directory is watched
    // independently, so waiting on the sibling alone would not prove the
    // dbt_packages event was processed).
    observer = vscode.workspace.createFileSystemWatcher(
      new vscode.RelativePattern(folder, `**/dbt_project.yml`),
    );
    observer.onDidCreate((uri) => observedCreates.add(uri.fsPath));
  });

  suiteTeardown(function () {
    wf?.dispose();
    observer?.dispose();
    for (const p of createdPaths) {
      fs.rmSync(p, { recursive: true, force: true });
    }
  });

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  /**
   * Create `filePath` and wait until the observer confirms its create event was
   * delivered, re-firing (delete + recreate) if needed. Headless watchers can
   * drop events issued before the recursive watch is fully established, so a
   * single write is not reliable. Returns whether the event was ever observed.
   */
  async function createUntilObserved(
    filePath: string,
    name: string,
    timeoutMs = 30_000,
  ): Promise<boolean> {
    const deadline = Date.now() + timeoutMs;
    fs.writeFileSync(filePath, validProjectYaml(name));
    while (!observedCreates.has(filePath) && Date.now() < deadline) {
      await sleep(250);
      if (!observedCreates.has(filePath)) {
        try {
          fs.rmSync(filePath);
        } catch {
          /* ignore */
        }
        await sleep(100);
        fs.writeFileSync(filePath, validProjectYaml(name));
      }
    }
    return observedCreates.has(filePath);
  }

  test("registers a separate nested project but not one under dbt_packages/", async function () {
    const analyticsRoot = path.join(workspaceRoot, "analytics");
    const dbtPackagesRoot = path.join(
      workspaceRoot,
      "dbt_packages",
      "dbt_utils",
    );
    const analyticsProject = path.join(analyticsRoot, "dbt_project.yml");
    const dbtPackagesProject = path.join(dbtPackagesRoot, "dbt_project.yml");

    // Confirm (and warm up) the watcher via the sibling first. If create events
    // are not delivered at all in this environment (e.g. some headless CI file
    // watchers), skip rather than fail — the code under test is covered by the
    // deterministic unit test; this integration test verifies the real watcher
    // path only where the platform actually delivers the events.
    if (!(await createUntilObserved(analyticsProject, "analytics"))) {
      this.skip();
    }
    if (!(await createUntilObserved(dbtPackagesProject, "dbt_utils"))) {
      this.skip();
    }

    // Both create events were delivered; because the observer is registered
    // after wf's watcher on the same pattern, wf's handler has already run for
    // each. The sibling must be registered; the dbt_packages one must not.
    assert.ok(
      registeredRoots.includes(analyticsRoot),
      `expected the sibling project to register; registered=${JSON.stringify(
        registeredRoots,
      )}`,
    );
    assert.ok(
      !registeredRoots.includes(dbtPackagesRoot),
      `dbt_packages project must not be registered; registered=${JSON.stringify(
        registeredRoots,
      )}`,
    );
  });
});
