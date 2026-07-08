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
  this.timeout(40_000);

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

  test("registers a separate nested project but not one under dbt_packages/", async function () {
    const dbtPackagesProject = path.join(
      workspaceRoot,
      "dbt_packages",
      "dbt_utils",
      "dbt_project.yml",
    );
    const analyticsProject = path.join(
      workspaceRoot,
      "analytics",
      "dbt_project.yml",
    );

    fs.writeFileSync(dbtPackagesProject, validProjectYaml("dbt_utils"));
    fs.writeFileSync(analyticsProject, validProjectYaml("analytics"));

    const analyticsRoot = path.join(workspaceRoot, "analytics");
    const dbtPackagesRoot = path.join(
      workspaceRoot,
      "dbt_packages",
      "dbt_utils",
    );

    // Wait until the observer has seen BOTH create events. Because the observer
    // is registered after wf's watcher on the same pattern, once it has
    // received an event, wf's handler has already run for it.
    const deadline = Date.now() + 30_000;
    while (
      !(
        observedCreates.has(dbtPackagesProject) &&
        observedCreates.has(analyticsProject)
      ) &&
      Date.now() < deadline
    ) {
      await new Promise((r) => setTimeout(r, 100));
    }
    assert.ok(
      observedCreates.has(dbtPackagesProject) &&
        observedCreates.has(analyticsProject),
      `watcher did not deliver both create events; observed=${JSON.stringify([
        ...observedCreates,
      ])}`,
    );

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
