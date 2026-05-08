/**
 * Regression tests for production telemetry cluster
 * `extensionActivationError` (83 machines / 104 events / 24h, top 2 versions),
 * stack pinned at:
 *   Error: no projects found. retrying
 *     at DBTWorkspaceFolder.retryWithBackoff
 *     at async DBTWorkspaceFolder.discoverProjects
 *     at async DBTProjectContainer.registerWorkspaceFolder
 *     at async Promise.all (index 0)
 *     at async DBTProjectContainer.initializeDBTProjects
 *     at async DBTPowerUserExtension.activate
 *
 * Bug: VS Code's `workspaceContains:**\/dbt_project.yml` activation matches
 * when ANY workspace folder contains a `dbt_project.yml`. The extension then
 * runs `discoverProjects` on EVERY workspace folder via
 * `Promise.all(folders.map(registerWorkspaceFolder))`. Pre-fix, a folder with
 * no `dbt_project.yml` exhausted `retryWithBackoff` (5 attempts, ~10s) and
 * threw `"no projects found. retrying"`, which propagated up and fired
 * `extensionActivationError` plus *short-circuited* the rest of `activate()`
 * (so `statusBars.initialize` and the workspace-folder change listener never
 * ran).
 *
 * Fix: `retryWithBackoff` throws a typed `NoProjectsFound` for the
 * consistently-empty case. `discoverProjects` catches at the call site —
 * silently for `NoProjectsFound` (expected for multi-root workspaces),
 * with `discoverProjectsError` telemetry for any other failure
 * (e.g. permission errors, malformed pattern). Both paths resolve to `[]`
 * so activation is never short-circuited by a single empty/erroring folder.
 */
import { afterAll, beforeAll, describe, expect, it, jest } from "@jest/globals";
import { EventEmitter, Uri, workspace } from "vscode";
import { DBTWorkspaceFolder } from "../../dbt_client/dbtWorkspaceFolder";

// Lightweight stand-ins for the DI graph. None of the project-registration
// path is exercised — we're testing the discoverProjects → retryWithBackoff
// boundary against the real source.
const fakeTelemetry = {
  sendTelemetryEvent: jest.fn(),
  sendTelemetryError: jest.fn(),
} as any;

const fakeTerminal = {
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  log: jest.fn(),
  trace: jest.fn(),
} as any;

const fakeProjectFactory = jest.fn() as any;
const fakeDetectionFactory = jest.fn(() => ({
  discoverProjects: jest.fn(async (paths: string[]) => paths),
})) as any;

function makeFolder(): DBTWorkspaceFolder {
  const ws = {
    uri: Uri.file("/tmp/empty-folder-without-dbt-project"),
    name: "folder-b",
    index: 0,
  } as any;
  return new DBTWorkspaceFolder(
    fakeProjectFactory,
    fakeDetectionFactory,
    fakeTelemetry,
    fakeTerminal,
    ws,
    new EventEmitter() as any,
    new EventEmitter() as any,
  );
}

function stubWorkspaceFindFiles(impl: () => Promise<Uri[]>) {
  (workspace as any).findFiles = jest.fn(impl);
  (workspace as any).getConfiguration = jest.fn(() => ({
    get: jest.fn(() => []),
  }));
  return (workspace as any).findFiles as jest.Mock;
}

describe("discoverProjects: multi-root activation no-projects-found regression", () => {
  // `stubWorkspaceFindFiles` mutates the shared `vscode` module object.
  // Capture and restore so other suites in the same Jest worker aren't
  // contaminated by our stubs.
  let originalFindFiles: typeof workspace.findFiles;
  let originalGetConfiguration: typeof workspace.getConfiguration;

  beforeAll(() => {
    originalFindFiles = workspace.findFiles;
    originalGetConfiguration = workspace.getConfiguration;
  });

  afterAll(() => {
    (workspace as any).findFiles = originalFindFiles;
    (workspace as any).getConfiguration = originalGetConfiguration;
  });

  it("returns no projects (does not throw) when findFiles is consistently empty", async () => {
    fakeTelemetry.sendTelemetryError.mockClear();
    const findFilesMock = stubWorkspaceFindFiles(() =>
      Promise.resolve([] as Uri[]),
    );

    const folder = makeFolder();
    // Pre-fix this rejected with "no projects found. retrying" — and that
    // rejection bubbled up to extensionActivationError + short-circuited
    // the rest of activate(). Post-fix it resolves cleanly so activation
    // continues to set up status bars and workspace listeners.
    await expect(folder.discoverProjects()).resolves.toBeUndefined();

    // Five attempts (1 initial + 4 retries with 1s/2s/3s/4s backoff). The
    // budget is the same as before — only the terminal disposition changed
    // from throw to graceful return.
    expect(findFilesMock).toHaveBeenCalledTimes(5);

    // Empty folders are an expected multi-root case, not a failure — they
    // must NOT fire `discoverProjectsError` telemetry, otherwise we just
    // swap one noisy cluster for another.
    expect(fakeTelemetry.sendTelemetryError).not.toHaveBeenCalled();
  }, 20000);

  it("retry budget is still ~10s — confirms backoff schedule unchanged", async () => {
    stubWorkspaceFindFiles(() => Promise.resolve([] as Uri[]));
    const folder = makeFolder();

    const start = Date.now();
    await folder.discoverProjects();
    const elapsed = Date.now() - start;

    // 1+2+3+4 = 10s of waits. Same window as the pre-fix timing assertion;
    // the fix only changes the terminal action, not the schedule.
    expect(elapsed).toBeGreaterThanOrEqual(9500);
    expect(elapsed).toBeLessThan(12000);
  }, 20000);

  it("multi-root: empty folder no longer fails Promise.all alongside happy folder", async () => {
    // Reproduces the production stack frame `at async Promise.all (index 0)`:
    // initializeDBTProjects does `Promise.all(folders.map(registerWorkspaceFolder))`
    // — pre-fix, one folder rejecting caused the whole activation to throw.
    // Post-fix, both branches resolve and activate() runs to completion.
    stubWorkspaceFindFiles(() => Promise.resolve([] as Uri[]));

    const emptyFolder = makeFolder();
    const happyFolder = {
      discoverProjects: () => Promise.resolve(),
    };

    const start = Date.now();
    await expect(
      Promise.all([
        happyFolder.discoverProjects(),
        emptyFolder.discoverProjects(),
      ]),
    ).resolves.toBeDefined();
    const elapsed = Date.now() - start;

    // Slowest branch (empty folder) still drives the duration.
    expect(elapsed).toBeGreaterThanOrEqual(9500);
  }, 20000);

  it("real findFiles errors resolve to [] AND fire discoverProjectsError telemetry", async () => {
    // Activation must never crash on a single folder, so genuine errors
    // (permission failures, malformed RelativePattern, indexer crashes)
    // also resolve to []. They DO fire `discoverProjectsError` telemetry
    // — we don't observe these in production today, but if they ever
    // start firing we want the signal instead of silently swallowing.
    fakeTelemetry.sendTelemetryError.mockClear();
    let calls = 0;
    const findFilesMock = stubWorkspaceFindFiles(() => {
      calls += 1;
      return Promise.reject(new Error("EACCES: permission denied"));
    });

    const folder = makeFolder();

    await expect(folder.discoverProjects()).resolves.toBeUndefined();
    expect(findFilesMock).toHaveBeenCalledTimes(5);
    expect(calls).toBe(5);

    // Telemetry fires once with the underlying error — not the
    // NoProjectsFound sentinel — so the cluster is meaningful.
    expect(fakeTelemetry.sendTelemetryError).toHaveBeenCalledTimes(1);
    const [eventName, error] = fakeTelemetry.sendTelemetryError.mock.calls[0];
    expect(eventName).toBe("discoverProjectsError");
    expect((error as Error).message).toBe("EACCES: permission denied");
  }, 20000);
});
