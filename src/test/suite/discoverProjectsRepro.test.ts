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
 * Fix: `retryWithBackoff` treats a consistently-empty result after the retry
 * budget as legitimately empty and returns `[]` instead of throwing. Real
 * errors (e.g. `findFiles` itself rejecting) still throw after retries —
 * preserving the existing escalation for non-empty failure modes.
 */
import { describe, expect, it, jest } from "@jest/globals";
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
  it("returns no projects (does not throw) when findFiles is consistently empty", async () => {
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

  it("real findFiles errors still propagate after retries (preserves existing escalation)", async () => {
    // Critical that the fix doesn't accidentally swallow genuine errors —
    // e.g. permission failures, malformed RelativePattern, indexer crashes.
    // Only the empty-array case is treated as legitimately empty; thrown
    // errors retain the retry-then-throw behaviour.
    let calls = 0;
    const findFilesMock = stubWorkspaceFindFiles(() => {
      calls += 1;
      return Promise.reject(new Error("EACCES: permission denied"));
    });

    const folder = makeFolder();

    await expect(folder.discoverProjects()).rejects.toThrow(
      "EACCES: permission denied",
    );
    expect(findFilesMock).toHaveBeenCalledTimes(5);
    expect(calls).toBe(5);
  }, 20000);
});
