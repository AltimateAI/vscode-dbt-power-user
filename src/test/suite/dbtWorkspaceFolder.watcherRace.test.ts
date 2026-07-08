import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import * as path from "path";
import { EventEmitter, workspace } from "vscode";
import { DBTWorkspaceFolder } from "../../dbt_client/dbtWorkspaceFolder";

/**
 * Reproduces the startup race that registers `dbt_project.yml` files living
 * inside `dbt_packages/` as standalone dbt projects.
 *
 * The initial discovery pass (`discoverProjects`) statically excludes
 * `dbt_packages`, but the config file watcher does not: its only guard is
 * `notInDBtPackages`, which compares the new file against each registered
 * project's `getPackageInstallPath()`. That value is `undefined` until the
 * parent project's `initialize()` (which runs `dbt deps`) completes. When
 * `dbt deps` writes the packages' own `dbt_project.yml` files, the watcher
 * fires while the parent's install path is still `undefined`, the guard
 * passes, and each phantom package gets registered as its own project — each
 * spawning a Python bridge process (a visible console window on Windows).
 *
 * These tests drive the real watcher callback with the parent project in the
 * pre-initialize state (install path `undefined`) and assert that a file under
 * `dbt_packages/` is NOT registered, while a genuinely separate nested project
 * still is.
 */
describe("DBTWorkspaceFolder config watcher: dbt_packages race", () => {
  let tmpRoot: string;
  let capturedOnCreate: ((uri: { fsPath: string }) => void) | undefined;

  function buildWorkspaceFolder(): DBTWorkspaceFolder {
    // Capture the watcher's onDidCreate callback as the constructor wires it up.
    capturedOnCreate = undefined;
    (workspace.createFileSystemWatcher as jest.Mock).mockReturnValue({
      onDidChange: jest.fn().mockReturnValue({ dispose: jest.fn() }),
      onDidCreate: jest.fn((cb: unknown) => {
        capturedOnCreate = cb as (uri: { fsPath: string }) => void;
        return { dispose: jest.fn() };
      }),
      onDidDelete: jest.fn().mockReturnValue({ dispose: jest.fn() }),
      dispose: jest.fn(),
    });

    // Default-returning config so getAllowListFolders() yields [] (opt-in, empty).
    (workspace.getConfiguration as jest.Mock).mockReturnValue({
      get: (_key: string, dflt: unknown) => dflt,
      has: () => false,
      update: jest.fn(),
    });

    const terminal = {
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      log: jest.fn(),
    };
    const telemetry = {
      sendTelemetryEvent: jest.fn(),
      sendTelemetryError: jest.fn(),
    };

    return new DBTWorkspaceFolder(
      jest.fn() as never, // dbtProjectFactory — unused (registerDBTProject is spied)
      jest.fn() as never, // dbtProjectDetectionFactory — unused
      telemetry as never,
      terminal as never,
      { uri: { fsPath: tmpRoot }, name: "root", index: 0 } as never,
      new EventEmitter() as never,
      new EventEmitter() as never,
    );
  }

  beforeEach(() => {
    tmpRoot = mkdtempSync(path.join(tmpdir(), "dbt-ws-race-"));
    // A dbt_project.yml written by `dbt deps` inside dbt_packages.
    mkdirSync(path.join(tmpRoot, "dbt_packages", "dbt_utils"), {
      recursive: true,
    });
    writeFileSync(
      path.join(tmpRoot, "dbt_packages", "dbt_utils", "dbt_project.yml"),
      "name: dbt_utils\n",
    );
    // A genuinely separate nested project (must still be registered).
    mkdirSync(path.join(tmpRoot, "analytics"), { recursive: true });
    writeFileSync(
      path.join(tmpRoot, "analytics", "dbt_project.yml"),
      "name: analytics\n",
    );
  });

  afterEach(() => {
    rmSync(tmpRoot, { recursive: true, force: true });
    jest.restoreAllMocks();
  });

  it("does not register a dbt_project.yml under dbt_packages/ when the parent project's install path is not yet resolved", () => {
    const wf = buildWorkspaceFolder();
    // Parent project registered but mid-initialize: install path unknown.
    (wf as unknown as { dbtProjects: unknown[] }).dbtProjects = [
      { getPackageInstallPath: () => undefined },
    ];
    const registerSpy = jest
      .spyOn(
        wf as unknown as {
          registerDBTProject: (uri: unknown) => Promise<void>;
        },
        "registerDBTProject",
      )
      .mockResolvedValue(undefined);

    expect(capturedOnCreate).toBeDefined();
    capturedOnCreate!({
      fsPath: path.join(
        tmpRoot,
        "dbt_packages",
        "dbt_utils",
        "dbt_project.yml",
      ),
    });

    expect(registerSpy).not.toHaveBeenCalled();
  });

  it("still registers a genuinely separate nested project", () => {
    const wf = buildWorkspaceFolder();
    (wf as unknown as { dbtProjects: unknown[] }).dbtProjects = [
      { getPackageInstallPath: () => undefined },
    ];
    const registerSpy = jest
      .spyOn(
        wf as unknown as {
          registerDBTProject: (uri: unknown) => Promise<void>;
        },
        "registerDBTProject",
      )
      .mockResolvedValue(undefined);

    expect(capturedOnCreate).toBeDefined();
    capturedOnCreate!({
      fsPath: path.join(tmpRoot, "analytics", "dbt_project.yml"),
    });

    expect(registerSpy).toHaveBeenCalledTimes(1);
  });
});
