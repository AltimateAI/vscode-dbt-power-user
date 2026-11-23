import type {
  PythonDbtCore,
  PythonDbtCoreUnknownReason,
} from "@altimateai/dbt-integration";
import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import * as path from "path";
import { commands, ConfigurationTarget, Uri, window, workspace } from "vscode";
import { DBTClient } from "../../dbt_client";
import {
  DbtCoreCheck,
  decideDbtIntegrationMode,
  FusionAdapterCheck,
  fusionAdapterSupport,
  getDbtIntegrationMode,
  projectAdapterCheck,
  pythonDbtCoreFromCheck,
  readConfiguredDbtIntegration,
  setEffectiveDbtIntegrationMode,
  windowAdapterCheck,
} from "../../dbt_client/integrationMode";
import {
  AUTO_SWITCH_NOTIFIED_KEY,
  IntegrationModeService,
  PARSE_FAILED_OFFERED_KEY,
  SWITCH_HELD_NOTIFIED_KEY,
} from "../../dbt_client/integrationModeService";
import { VSCodeDBTConfiguration } from "../../dbt_client/vscodeConfiguration";

/**
 * A dbt 2.x binary on the project's path switches a window whose
 * `dbt.dbtIntegration` is left at its default to dbt Fusion, with one
 * notification per project, unless the project can run in dbt Core mode:
 * dbt-core imports in the selected interpreter, or a dbt-loom config is
 * present. Then the window keeps its mode and the workspace is told once,
 * with a way to dbt Fusion. An explicit setting is never switched.
 *
 * Before, the mode was always the setting's value: a core-mode window with
 * only a dbt 2.x binary ran the Python bridge, which failed on `import dbt`.
 */

type Inspected = {
  defaultValue?: string;
  globalValue?: string;
  workspaceValue?: string;
  workspaceFolderValue?: string;
};

let inspected: Inspected;
const update = jest.fn(() => Promise.resolve());

function useSetting(next: Inspected) {
  inspected = { defaultValue: "core", ...next };
}

beforeEach(() => {
  jest.clearAllMocks();
  setEffectiveDbtIntegrationMode(undefined);
  useSetting({});
  (workspace.getConfiguration as jest.Mock).mockImplementation(() => ({
    get: (key: string, fallback?: unknown) =>
      key === "dbtIntegration"
        ? (inspected.workspaceFolderValue ??
          inspected.workspaceValue ??
          inspected.globalValue ??
          inspected.defaultValue)
        : fallback,
    inspect: () => ({ key: "dbt.dbtIntegration", ...inspected }),
    update,
    has: jest.fn(),
  }));
  (window.showInformationMessage as jest.Mock).mockReturnValue(
    Promise.resolve(undefined),
  );
});

afterEach(() => {
  setEffectiveDbtIntegrationMode(undefined);
  (workspace as { workspaceFolders: unknown }).workspaceFolders = [];
  (workspace.getConfiguration as jest.Mock).mockReset();
  (workspace.getConfiguration as jest.Mock).mockReturnValue({
    get: jest.fn(),
    has: jest.fn(),
    update: jest.fn(),
  });
});

class FakeMemento {
  private values = new Map<string, unknown>();
  keys() {
    return [...this.values.keys()];
  }
  get<T>(key: string, fallback?: T): T {
    return (this.values.has(key) ? this.values.get(key) : fallback) as T;
  }
  update(key: string, value: unknown) {
    this.values.set(key, value);
    return Promise.resolve();
  }
}

const NOT_INSTALLED: PythonDbtCore = {
  importable: false,
  status: "notInstalled",
};
const IMPORTABLE: PythonDbtCore = {
  importable: true,
  status: "importable",
  version: "1.12.6",
};
const unknownBecause = (reason: PythonDbtCoreUnknownReason): PythonDbtCore => ({
  importable: false,
  status: "unknown",
  reason,
});

const V2 = {
  path: "/home/user/.local/bin/dbt",
  version: [2, 0, 9],
  location: "installer" as const,
};

function service({
  // null: no dbt 2.x binary on the path.
  binary = V2 as typeof V2 | null,
  // "never": the probe does not answer (a slow first `import dbt.version`).
  dbtCore = NOT_INSTALLED as PythonDbtCore | "never",
  pythonExtensionAvailable = true,
  // The Python extension's interpreter, when it is there and no override is set.
  extensionPath = "/venv/bin/python",
  // dbt_project.yml files per workspace folder root, as discovery would list them.
  projectFiles = {} as Record<string, string[]>,
  probeTimeoutMs = undefined as number | undefined,
  // An override interpreter; without one, the extension's when it is there.
  pythonPath = undefined as string | undefined,
  env = { PATH: "/usr/bin" } as Record<string, string>,
} = {}) {
  const telemetry = {
    sendTelemetryEvent: jest.fn(),
    setTelemetryCustomAttribute: jest.fn(),
  };
  const findBinary = jest.fn(() => Promise.resolve(binary ?? undefined));
  const probeDbtCore = jest.fn(() =>
    dbtCore === "never"
      ? new Promise<PythonDbtCore>(() => undefined)
      : Promise.resolve(dbtCore),
  );
  const findProjectFiles = jest.fn((folder: { uri: { fsPath: string } }) =>
    Promise.resolve(
      (projectFiles[folder.uri.fsPath] ?? []).map((file) => Uri.file(file)),
    ),
  );
  const terminal = { info: jest.fn(), debug: jest.fn() };
  const svc = new IntegrationModeService(
    {
      initialize: () => Promise.resolve(),
      pythonPath: pythonPath ?? (pythonExtensionAvailable ? extensionPath : ""),
      pythonPathFromOverride: pythonPath !== undefined,
      pythonExtensionAvailable,
      getEnvironmentVariables: () => env,
    } as never,
    telemetry as never,
    terminal as never,
    { findBinary, probeDbtCore, findProjectFiles } as never,
    probeTimeoutMs,
  );
  return {
    svc,
    telemetry,
    terminal,
    findBinary,
    probeDbtCore,
    findProjectFiles,
  };
}

const shown = () =>
  (window.showInformationMessage as jest.Mock).mock.calls as unknown[][];

describe("readConfiguredDbtIntegration", () => {
  it("tells the default from an explicit value at any level", () => {
    expect(readConfiguredDbtIntegration()).toEqual({
      value: "core",
      explicit: false,
    });
    useSetting({ globalValue: "core" });
    expect(readConfiguredDbtIntegration()).toEqual({
      value: "core",
      explicit: true,
    });
    useSetting({ globalValue: "core", workspaceValue: "corecommand" });
    expect(readConfiguredDbtIntegration()).toEqual({
      value: "corecommand",
      explicit: true,
    });
    useSetting({ workspaceFolderValue: "fusion" });
    expect(readConfiguredDbtIntegration().explicit).toBe(true);
  });
});

describe("decideDbtIntegrationMode", () => {
  const onlyV2 = {
    dbtV2Found: true,
    pythonDbtCore: false,
    dbtLoom: false,
    fusionAdapterUnsupported: false,
    fusionAdapterExperimental: false,
    profileNotFound: false,
  };
  it.each([
    [{ value: "core", explicit: false }, onlyV2, "fusion", true],
    [
      { value: "core", explicit: false },
      { ...onlyV2, dbtV2Found: false },
      "core",
      false,
    ],
    [{ value: "core", explicit: true }, onlyV2, "core", false],
    [{ value: "corecommand", explicit: true }, onlyV2, "corecommand", false],
    [{ value: "cloud", explicit: true }, onlyV2, "cloud", false],
    [
      { value: "fusion", explicit: true },
      { ...onlyV2, dbtV2Found: false },
      "fusion",
      false,
    ],
  ])("%j with %j runs %s", (configured, facts, mode, auto) => {
    expect(decideDbtIntegrationMode(configured, facts)).toEqual({
      mode,
      autoSwitched: auto,
    });
  });

  it.each([
    [{ pythonDbtCore: true }, "dbtCore"],
    [{ dbtLoom: true }, "dbtLoom"],
    [{ pythonDbtCore: true, dbtLoom: true }, "dbtCore"],
    [{ pythonDbtCore: "unknown" as const }, "dbtCoreUnknown"],
    [{ pythonDbtCore: "unknown" as const, dbtLoom: true }, "dbtLoom"],
    [{ fusionAdapterUnsupported: true }, "adapterUnsupported"],
    [{ pythonDbtCore: true, fusionAdapterUnsupported: true }, "dbtCore"],
    [{ fusionAdapterUnsupported: true, dbtLoom: true }, "adapterUnsupported"],
    [
      { pythonDbtCore: "unknown" as const, fusionAdapterUnsupported: true },
      "adapterUnsupported",
    ],
    // A missing profile stops both modes, so it is named before the adapter
    // and before a dbt-core check that could not tell.
    [{ profileNotFound: true }, "profileNotFound"],
    [{ fusionAdapterExperimental: true }, "adapterExperimental"],
    [
      { profileNotFound: true, fusionAdapterExperimental: true },
      "profileNotFound",
    ],
    [
      { pythonDbtCore: "unknown" as const, profileNotFound: true },
      "profileNotFound",
    ],
    [
      { pythonDbtCore: "unknown" as const, fusionAdapterExperimental: true },
      "adapterExperimental",
    ],
    [{ pythonDbtCore: true, profileNotFound: true }, "dbtCore"],
    [{ dbtLoom: true, profileNotFound: true }, "dbtLoom"],
    [
      { fusionAdapterUnsupported: true, profileNotFound: true },
      "adapterUnsupported",
    ],
  ])(
    "keeps the default when the project can run in dbt Core mode: %j",
    (facts, reason) => {
      expect(
        decideDbtIntegrationMode(
          { value: "core", explicit: false },
          { ...onlyV2, ...facts },
        ),
      ).toEqual({ mode: "core", autoSwitched: false, heldBack: reason });
    },
  );

  it("never holds back an explicit setting", () => {
    expect(
      decideDbtIntegrationMode(
        { value: "core", explicit: true },
        { ...onlyV2, pythonDbtCore: true },
      ),
    ).toEqual({ mode: "core", autoSwitched: false });
  });
});

describe("IntegrationModeService.resolve", () => {
  it("switches a default window to fusion when only a dbt 2.x binary is found", async () => {
    const { svc, telemetry, findBinary, probeDbtCore } = service();
    await expect(svc.resolve(new FakeMemento() as never)).resolves.toBe(
      "fusion",
    );
    expect(findBinary).toHaveBeenCalledWith({
      pythonPath: "/venv/bin/python",
      cwd: undefined,
      env: { PATH: "/usr/bin" },
    });
    expect(probeDbtCore).toHaveBeenCalledWith(
      "/venv/bin/python",
      { PATH: "/usr/bin" },
      expect.any(Number),
    );
    expect(getDbtIntegrationMode()).toBe("fusion");
    expect(new VSCodeDBTConfiguration().getDbtIntegration()).toBe("fusion");
    expect(telemetry.sendTelemetryEvent).toHaveBeenCalledWith(
      "dbtIntegrationAutoSwitched",
      {
        from: "core",
        to: "fusion",
        binaryVersion: "2.0.9",
        binaryLocation: "installer",
        dbtCoreCheck: "notInstalled",
        fusionAdapterCheck: "noProjects",
        adapterTypes: "",
      },
    );
    expect(telemetry.setTelemetryCustomAttribute).toHaveBeenCalledWith(
      "dbtIntegrationAutoSwitched",
      "fusion",
    );
  });

  it("keeps an explicit setting made while the probes run", async () => {
    const { svc, telemetry, findBinary } = service();
    findBinary.mockImplementation(() => {
      useSetting({ workspaceValue: "core" });
      return Promise.resolve(V2);
    });
    await expect(svc.resolve(new FakeMemento() as never)).resolves.toBe("core");
    expect(getDbtIntegrationMode()).toBe("core");
    expect(svc.autoSwitched).toBeUndefined();
    expect(telemetry.sendTelemetryEvent).not.toHaveBeenCalledWith(
      "dbtIntegrationAutoSwitched",
      expect.anything(),
    );
    expect(svc.needsReload()).toBe(false);
  });

  it("keeps core when dbt-core imports in the selected interpreter", async () => {
    const { svc, telemetry } = service({ dbtCore: IMPORTABLE });
    await expect(svc.resolve(new FakeMemento() as never)).resolves.toBe("core");
    expect(getDbtIntegrationMode()).toBe("core");
    expect(svc.autoSwitched).toBeUndefined();
    expect(telemetry.sendTelemetryEvent).toHaveBeenCalledWith(
      "dbtIntegrationSwitchHeld",
      {
        reason: "dbtCore",
        binaryVersion: "2.0.9",
        binaryLocation: "installer",
        dbtCoreCheck: "importable",
        fusionAdapterCheck: "noProjects",
        adapterTypes: "",
      },
    );
    expect(telemetry.sendTelemetryEvent).not.toHaveBeenCalledWith(
      "dbtIntegrationAutoSwitched",
      expect.anything(),
    );
  });

  describe("with a dbt-loom config", () => {
    let dir: string;
    beforeEach(() => {
      dir = mkdtempSync(path.join(tmpdir(), "dbt-loom-"));
    });
    afterEach(() => rmSync(dir, { recursive: true, force: true }));

    it("keeps core when dbt_loom.config.yml is in a workspace folder", async () => {
      writeFileSync(path.join(dir, "dbt_loom.config.yml"), "manifests: []\n");
      (workspace as { workspaceFolders: unknown }).workspaceFolders = [
        { uri: Uri.file(path.join(dir, "..")), name: "parent", index: 0 },
        { uri: Uri.file(dir), name: "loom", index: 1 },
      ];
      const { svc, telemetry } = service();
      await expect(svc.resolve(new FakeMemento() as never)).resolves.toBe(
        "core",
      );
      expect(telemetry.sendTelemetryEvent).toHaveBeenCalledWith(
        "dbtIntegrationSwitchHeld",
        expect.objectContaining({ reason: "dbtLoom" }),
      );
    });

    it("keeps core when DBT_LOOM_CONFIG_PATH is set in the environment", async () => {
      (workspace as { workspaceFolders: unknown }).workspaceFolders = [
        { uri: Uri.file(dir), name: "plain", index: 0 },
      ];
      const { svc, telemetry } = service({
        env: { PATH: "/usr/bin", DBT_LOOM_CONFIG_PATH: "/etc/loom.yml" },
      });
      await expect(svc.resolve(new FakeMemento() as never)).resolves.toBe(
        "core",
      );
      expect(telemetry.sendTelemetryEvent).toHaveBeenCalledWith(
        "dbtIntegrationSwitchHeld",
        expect.objectContaining({ reason: "dbtLoom" }),
      );
    });

    it("keeps core when a nested dbt project has a dbt_loom.config.yml", async () => {
      // The library reads dbt-loom from each project's root, so a config
      // beside a project below the workspace folder holds the switch too.
      const nested = path.join(dir, "analytics");
      mkdirSync(nested);
      writeFileSync(
        path.join(nested, "dbt_loom.config.yml"),
        "manifests: []\n",
      );
      (workspace as { workspaceFolders: unknown }).workspaceFolders = [
        { uri: Uri.file(dir), name: "repo", index: 0 },
      ];
      const { svc, telemetry, findProjectFiles } = service({
        projectFiles: { [dir]: [path.join(nested, "dbt_project.yml")] },
      });
      await expect(svc.resolve(new FakeMemento() as never)).resolves.toBe(
        "core",
      );
      expect(findProjectFiles).toHaveBeenCalledTimes(1);
      expect(findProjectFiles).toHaveBeenCalledWith(
        expect.objectContaining({
          uri: expect.objectContaining({ fsPath: dir }),
        }),
      );
      expect(telemetry.sendTelemetryEvent).toHaveBeenCalledWith(
        "dbtIntegrationSwitchHeld",
        expect.objectContaining({ reason: "dbtLoom" }),
      );
    });

    it("looks under every workspace folder: a nested config in the second one holds the switch", async () => {
      const first = path.join(dir, "first");
      const second = path.join(dir, "second");
      const nested = path.join(second, "analytics");
      mkdirSync(first);
      mkdirSync(nested, { recursive: true });
      writeFileSync(
        path.join(nested, "dbt_loom.config.yml"),
        "manifests: []\n",
      );
      (workspace as { workspaceFolders: unknown }).workspaceFolders = [
        { uri: Uri.file(first), name: "first", index: 0 },
        { uri: Uri.file(second), name: "second", index: 1 },
      ];
      const { svc, telemetry, findProjectFiles } = service({
        projectFiles: {
          [first]: [path.join(first, "dbt_project.yml")],
          [second]: [path.join(nested, "dbt_project.yml")],
        },
      });
      await expect(svc.resolve(new FakeMemento() as never)).resolves.toBe(
        "core",
      );
      expect(findProjectFiles.mock.calls.map((c) => c[0].uri.fsPath)).toEqual([
        first,
        second,
      ]);
      expect(telemetry.sendTelemetryEvent).toHaveBeenCalledWith(
        "dbtIntegrationSwitchHeld",
        expect.objectContaining({ reason: "dbtLoom" }),
      );
    });

    it("switches when the folder has no dbt-loom config", async () => {
      (workspace as { workspaceFolders: unknown }).workspaceFolders = [
        { uri: Uri.file(dir), name: "plain", index: 0 },
      ];
      const { svc } = service();
      await expect(svc.resolve(new FakeMemento() as never)).resolves.toBe(
        "fusion",
      );
    });
  });

  it("does not probe for dbt Core without the Python extension or an override, and switches", async () => {
    const { svc, probeDbtCore } = service({ pythonExtensionAvailable: false });
    await expect(svc.resolve(new FakeMemento() as never)).resolves.toBe(
      "fusion",
    );
    expect(probeDbtCore).not.toHaveBeenCalled();
  });

  it("probes the override interpreter without the Python extension, and keeps core", async () => {
    const { svc, probeDbtCore } = service({
      pythonExtensionAvailable: false,
      pythonPath: "/opt/dbt-env/bin/python",
      dbtCore: { ...IMPORTABLE, version: "1.10.4" },
    });
    await expect(svc.resolve(new FakeMemento() as never)).resolves.toBe("core");
    expect(probeDbtCore).toHaveBeenCalledTimes(1);
    expect(probeDbtCore).toHaveBeenCalledWith(
      "/opt/dbt-env/bin/python",
      { PATH: "/usr/bin" },
      expect.any(Number),
    );
    expect(svc.autoSwitched).toBeUndefined();
    await svc.notifySwitchHeld();
    expect(shown()[0][0]).toContain(
      "the selected interpreter has dbt-core, so the window keeps dbt Core mode.",
    );
  });

  it("keeps the default when no dbt 2.x binary is found", async () => {
    const { svc, telemetry, probeDbtCore } = service({ binary: null });
    await expect(svc.resolve(new FakeMemento() as never)).resolves.toBe("core");
    expect(svc.autoSwitched).toBeUndefined();
    expect(probeDbtCore).not.toHaveBeenCalled();
    expect(telemetry.sendTelemetryEvent).not.toHaveBeenCalled();
  });

  it.each(["core", "corecommand"])(
    "never switches an explicit %s setting, and does not look for a binary",
    async (value) => {
      useSetting({ workspaceValue: value });
      const { svc, findBinary } = service();
      await expect(svc.resolve(new FakeMemento() as never)).resolves.toBe(
        value,
      );
      expect(findBinary).not.toHaveBeenCalled();
      expect(getDbtIntegrationMode()).toBe(value);
    },
  );
});

describe("IntegrationModeService.notifyProjects", () => {
  const jaffle = { root: "/projects/jaffle", name: "jaffle" };

  it("explains the switch without a way back when only the dbt 2.x binary exists", async () => {
    const { svc } = service();
    await svc.resolve(new FakeMemento() as never);
    await svc.notifyProjects([jaffle]);
    expect(shown()).toHaveLength(1);
    const [message, ...actions] = shown()[0];
    expect(message).toContain("using dbt Fusion for jaffle");
    expect(message).toContain("dbt 2.0.9");
    expect(actions).toEqual(["Open setting"]);
  });

  it("tells each project once, across rebuilds and reloads", async () => {
    const memento = new FakeMemento();
    const first = service().svc;
    await first.resolve(memento as never);
    await first.notifyProjects([jaffle]);
    await first.notifyProjects([jaffle]);
    expect(shown()).toHaveLength(1);
    expect(memento.get(AUTO_SWITCH_NOTIFIED_KEY)).toEqual(["/projects/jaffle"]);

    // A reload: a new service over the same workspace state.
    const second = service().svc;
    await second.resolve(memento as never);
    await second.notifyProjects([jaffle]);
    expect(shown()).toHaveLength(1);

    await second.notifyProjects([
      jaffle,
      { root: "/projects/shop", name: "shop" },
    ]);
    expect(shown()).toHaveLength(2);
    expect(shown()[1][0]).toContain("for shop:");
  });

  it("shows nothing without a switch", async () => {
    useSetting({ workspaceValue: "core" });
    const { svc } = service();
    await svc.resolve(new FakeMemento() as never);
    await svc.notifyProjects([jaffle]);
    expect(shown()).toHaveLength(0);
  });
});

describe("IntegrationModeService.resolve when the dbt-core probe does not answer", () => {
  it("holds the switch back as unknown instead of switching", async () => {
    // A slow first `import dbt.version` (a cold virus scan of a large venv)
    // must not read as "no dbt-core": a dbt Core user would be switched.
    const { svc, telemetry } = service({
      dbtCore: "never",
      probeTimeoutMs: 20,
    });
    await expect(svc.resolve(new FakeMemento() as never)).resolves.toBe("core");
    expect(getDbtIntegrationMode()).toBe("core");
    expect(svc.autoSwitched).toBeUndefined();
    expect(telemetry.sendTelemetryEvent).toHaveBeenCalledWith(
      "dbtIntegrationSwitchHeld",
      expect.objectContaining({
        reason: "dbtCoreUnknown",
        binaryVersion: "2.0.9",
        dbtCoreCheck: "timeout",
      }),
    );
    await svc.notifySwitchHeld();
    expect(shown()[0][0]).toContain(
      ": dbt-core could not be checked in the selected interpreter.",
    );
  });

  it("gives the library a longer timeout than its own, so the library's 'no dbt-core' never wins the race", async () => {
    const { svc, probeDbtCore } = service({ probeTimeoutMs: 20 });
    await svc.resolve(new FakeMemento() as never);
    expect(probeDbtCore).toHaveBeenCalledWith(
      "/venv/bin/python",
      { PATH: "/usr/bin" },
      5020,
    );
  });
});

describe("IntegrationModeService.notifySwitchHeld", () => {
  const withDbtCore = { dbtCore: IMPORTABLE };

  it("tells the workspace once why it kept dbt Core mode, across reloads", async () => {
    const memento = new FakeMemento();
    const first = service(withDbtCore).svc;
    await first.resolve(memento as never);
    await first.notifySwitchHeld();
    await first.notifySwitchHeld();
    expect(shown()).toEqual([
      [
        "Power User didn't switch this window to dbt Fusion 2.0.9 (/home/user/.local/bin/dbt): the selected interpreter has dbt-core, so the window keeps dbt Core mode.",
        "Use dbt Fusion",
        "Dismiss",
      ],
    ]);
    expect(memento.get(SWITCH_HELD_NOTIFIED_KEY)).toBe(true);

    const second = service(withDbtCore).svc;
    await second.resolve(memento as never);
    await second.notifySwitchHeld();
    expect(shown()).toHaveLength(1);
    // Projects are not told about a switch that did not happen.
    await second.notifyProjects([{ root: "/projects/jaffle", name: "jaffle" }]);
    expect(shown()).toHaveLength(1);
  });

  it("names the dbt-loom config as the reason", async () => {
    const { svc } = service({
      env: { DBT_LOOM_CONFIG_PATH: "/etc/loom.yml" },
    });
    await svc.resolve(new FakeMemento() as never);
    await svc.notifySwitchHeld();
    expect(shown()[0][0]).toContain(
      "a dbt-loom config is present, which only dbt Core mode reads.",
    );
  });

  it("writes fusion to the workspace settings on Use dbt Fusion", async () => {
    const { svc, telemetry } = service(withDbtCore);
    await svc.resolve(new FakeMemento() as never);
    (window.showInformationMessage as jest.Mock).mockReturnValueOnce(
      Promise.resolve("Use dbt Fusion"),
    );
    await svc.notifySwitchHeld();
    expect(update).toHaveBeenCalledWith(
      "dbtIntegration",
      "fusion",
      ConfigurationTarget.Workspace,
    );
    expect(telemetry.sendTelemetryEvent).toHaveBeenCalledWith(
      "dbtIntegrationSwitchHeldAnswer",
      {
        reason: "dbtCore",
        answer: "useFusion",
        shownAs: "notice",
        binaryVersion: "2.0.9",
      },
    );
    // The setting is now explicit and differs from the running mode.
    useSetting({ workspaceValue: "fusion" });
    expect(svc.needsReload()).toBe(true);
  });

  it("writes nothing on Dismiss, and shows nothing after a switch", async () => {
    const held = service(withDbtCore).svc;
    await held.resolve(new FakeMemento() as never);
    (window.showInformationMessage as jest.Mock).mockReturnValueOnce(
      Promise.resolve("Dismiss"),
    );
    await held.notifySwitchHeld();
    expect(update).not.toHaveBeenCalled();

    const switched = service().svc;
    await switched.resolve(new FakeMemento() as never);
    await switched.notifySwitchHeld();
    expect(shown()).toHaveLength(1);
  });
});

// A held window whose dbt Core mode can't start either (no dbt-core) used to
// get the hold notice and, on top of it, "Please ensure dbt core cli is
// installed.". Now the hold is that error: one message, the blocker first.
describe("IntegrationModeService.notifyHeldWithoutDbtCore", () => {
  const errors = () =>
    (window.showErrorMessage as jest.Mock).mock.calls as unknown[][];

  it("says why the window was held, as an error, and then shows no notice", async () => {
    const { svc, telemetry } = service({ dbtCore: unknownBecause("failed") });
    await svc.resolve(new FakeMemento() as never);
    (window.showErrorMessage as jest.Mock).mockReturnValueOnce(
      Promise.resolve("Select interpreter"),
    );
    await expect(svc.notifyHeldWithoutDbtCore()).resolves.toBe(true);
    expect(errors()).toEqual([
      [
        "Power User didn't switch this window to dbt Fusion 2.0.9 (/home/user/.local/bin/dbt): dbt-core could not be checked in the selected interpreter.",
        "Select interpreter",
        "Use dbt Fusion",
      ],
    ]);
    expect(commands.executeCommand).toHaveBeenCalledWith(
      "python.setInterpreter",
    );
    expect(telemetry.sendTelemetryEvent).toHaveBeenCalledWith(
      "dbtIntegrationSwitchHeldAnswer",
      {
        reason: "dbtCoreUnknown",
        answer: "selectInterpreter",
        shownAs: "error",
        binaryVersion: "2.0.9",
      },
    );
    // The activation's notice comes after detection: the window was told.
    await svc.notifySwitchHeld();
    expect(shown()).toHaveLength(0);
  });

  it("is shown again on each detection, as the error it replaces was", async () => {
    const { svc } = service({ env: { DBT_LOOM_CONFIG_PATH: "/etc/loom.yml" } });
    await svc.resolve(new FakeMemento() as never);
    await svc.notifyHeldWithoutDbtCore();
    await svc.notifyHeldWithoutDbtCore();
    expect(errors()).toHaveLength(2);
    expect(errors()[0]).toEqual([
      "Power User didn't switch this window to dbt Fusion 2.0.9 (/home/user/.local/bin/dbt): a dbt-loom config is present, which only dbt Core mode reads. dbt Core mode needs dbt-core, which the selected Python interpreter does not have.",
      "Install dbt Core",
      "Use dbt Fusion",
    ]);
  });

  it("installs dbt Core on Install dbt Core", async () => {
    const { svc } = service({ env: { DBT_LOOM_CONFIG_PATH: "/etc/loom.yml" } });
    await svc.resolve(new FakeMemento() as never);
    (window.showErrorMessage as jest.Mock).mockReturnValueOnce(
      Promise.resolve("Install dbt Core"),
    );
    await svc.notifyHeldWithoutDbtCore();
    expect(commands.executeCommand).toHaveBeenCalledWith(
      "dbtPowerUser.installDbt",
    );
  });

  it.each<[string, Parameters<typeof service>[0]]>([
    ["switched", {}],
    ["held for having dbt-core", { dbtCore: IMPORTABLE }],
  ])(
    "leaves the general error to the caller in a window %s",
    async (_, options) => {
      const { svc } = service(options);
      await svc.resolve(new FakeMemento() as never);
      await expect(svc.notifyHeldWithoutDbtCore()).resolves.toBe(false);
      expect(errors()).toHaveLength(0);
    },
  );

  it("shows the hold notice when dbt Core starts", async () => {
    const { svc } = service({ dbtCore: unknownBecause("timeout") });
    await svc.resolve(new FakeMemento() as never);
    await svc.notifySwitchHeld();
    expect(shown()).toEqual([
      [
        "Power User didn't switch this window to dbt Fusion 2.0.9 (/home/user/.local/bin/dbt): dbt-core could not be checked in the selected interpreter.",
        "Select interpreter",
        "Use dbt Fusion",
        "Dismiss",
      ],
    ]);
    expect(errors()).toHaveLength(0);
  });
});

describe("DBTClient in a window held in dbt Core mode", () => {
  afterEach(() => setEffectiveDbtIntegrationMode(undefined));

  function client(held: boolean) {
    const notice = {
      notifyHeldWithoutDbtCore: jest.fn(() => Promise.resolve(held)),
    };
    const dbtClient = new DBTClient(
      {
        pythonPath: "/venv/bin/python",
        isPython3: true,
        pythonExtensionAvailable: true,
      } as never,
      jest.fn() as never,
      notice,
    );
    (dbtClient as unknown as { _pythonInstalled: boolean })._pythonInstalled =
      true;
    (dbtClient as unknown as { _dbtInstalled: boolean })._dbtInstalled = false;
    return { dbtClient, notice };
  }

  it.each(["core", "corecommand"])(
    "shows why the window was held instead of 'install dbt Core' in %s mode",
    async (mode) => {
      setEffectiveDbtIntegrationMode(mode);
      const { dbtClient, notice } = client(true);
      await expect(
        dbtClient.showErrorIfDbtOrPythonNotInstalled(),
      ).resolves.toBe(false);
      expect(notice.notifyHeldWithoutDbtCore).toHaveBeenCalledTimes(1);
      expect(window.showErrorMessage).not.toHaveBeenCalled();
    },
  );

  it("shows the general error when the window was not held", async () => {
    setEffectiveDbtIntegrationMode("core");
    const { dbtClient } = client(false);
    await dbtClient.showErrorIfDbtOrPythonNotInstalled();
    expect(window.showErrorMessage).toHaveBeenCalledWith(
      "Please ensure dbt core cli is installed.",
      "Install dbt core",
      "Detect from terminal",
      "Troubleshoot",
    );
  });

  it("does not ask in fusion mode", async () => {
    setEffectiveDbtIntegrationMode("fusion");
    const { dbtClient, notice } = client(true);
    await dbtClient.showErrorIfDbtOrPythonNotInstalled();
    expect(notice.notifyHeldWithoutDbtCore).not.toHaveBeenCalled();
  });
});

describe("IntegrationModeService.needsReload", () => {
  it("reloads after switching back, not after confirming fusion", async () => {
    const { svc } = service();
    await svc.resolve(new FakeMemento() as never);
    expect(svc.needsReload()).toBe(false);
    useSetting({ workspaceValue: "core" });
    expect(svc.needsReload()).toBe(true);
    useSetting({ workspaceValue: "fusion" });
    expect(svc.needsReload()).toBe(false);
  });

  it("reloads when an explicit setting is removed", async () => {
    useSetting({ workspaceValue: "core" });
    const { svc } = service();
    await svc.resolve(new FakeMemento() as never);
    useSetting({});
    expect(svc.needsReload()).toBe(true);
  });
});

describe("pythonDbtCoreFromCheck", () => {
  it.each<[DbtCoreCheck, boolean | "unknown"]>([
    ["importable", true],
    ["notInstalled", false],
    ["noInterpreter", false],
    ["unresolvedInterpreter", "unknown"],
    ["spawnError", "unknown"],
    ["timeout", "unknown"],
    ["failed", "unknown"],
    ["noVersion", "unknown"],
  ])("%s reads as %s", (check, pythonDbtCore) => {
    expect(pythonDbtCoreFromCheck(check)).toBe(pythonDbtCore);
  });
});

/**
 * Before, any failure of the dbt-core check (an interpreter that could not
 * start, a non-zero exit, no output) read as "no dbt-core", and the check ran
 * against the Python extension's default `python` before it had resolved the
 * workspace's interpreter: working dbt Core users were switched to dbt Fusion.
 */
describe("IntegrationModeService.resolve: the dbt-core check", () => {
  it.each<[PythonDbtCore, string, DbtCoreCheck]>([
    [IMPORTABLE, "core", "importable"],
    [NOT_INSTALLED, "fusion", "notInstalled"],
    [unknownBecause("spawnError"), "core", "spawnError"],
    [unknownBecause("timeout"), "core", "timeout"],
    [unknownBecause("failed"), "core", "failed"],
    [unknownBecause("noVersion"), "core", "noVersion"],
    [{ importable: false, status: "unknown" }, "core", "failed"],
  ])(
    "probe result %j runs %s, reported as %s",
    async (dbtCore, mode, check) => {
      const { svc, telemetry, terminal, probeDbtCore } = service({ dbtCore });
      await expect(svc.resolve(new FakeMemento() as never)).resolves.toBe(mode);
      expect(probeDbtCore).toHaveBeenCalledTimes(1);
      const event =
        mode === "fusion"
          ? "dbtIntegrationAutoSwitched"
          : "dbtIntegrationSwitchHeld";
      expect(telemetry.sendTelemetryEvent).toHaveBeenCalledTimes(1);
      expect(telemetry.sendTelemetryEvent).toHaveBeenCalledWith(
        event,
        expect.objectContaining({ dbtCoreCheck: check }),
      );
      if (mode === "core") {
        expect(telemetry.sendTelemetryEvent).toHaveBeenCalledWith(
          event,
          expect.objectContaining({
            reason: check === "importable" ? "dbtCore" : "dbtCoreUnknown",
          }),
        );
      }
      expect(terminal.info).toHaveBeenCalledWith(
        event,
        expect.stringContaining(
          `(dbt-core check: ${check}, adapter check: noProjects)`,
        ),
        false,
      );
    },
  );

  it.each(["python", "python3", ""])(
    "holds without probing when the Python extension reports %j, its interpreter not yet resolved",
    async (extensionPath) => {
      const { svc, telemetry, probeDbtCore } = service({ extensionPath });
      await expect(svc.resolve(new FakeMemento() as never)).resolves.toBe(
        "core",
      );
      expect(probeDbtCore).not.toHaveBeenCalled();
      expect(svc.autoSwitched).toBeUndefined();
      expect(telemetry.sendTelemetryEvent).toHaveBeenCalledWith(
        "dbtIntegrationSwitchHeld",
        expect.objectContaining({
          reason: "dbtCoreUnknown",
          dbtCoreCheck: "unresolvedInterpreter",
        }),
      );
    },
  );

  it("judges the interpreter by where it came from when it was read, not by an override set during the binary search", async () => {
    // The Python extension's bare default is read; the user sets an override
    // while the dbt Fusion binary is being looked for.
    let override = false;
    let resolveBinary: (binary: typeof V2) => void = () => undefined;
    const findBinary = jest.fn(
      () =>
        new Promise<typeof V2>((resolve) => {
          resolveBinary = resolve;
        }),
    );
    const probeDbtCore = jest.fn(() => Promise.resolve(NOT_INSTALLED));
    const telemetry = {
      sendTelemetryEvent: jest.fn(),
      setTelemetryCustomAttribute: jest.fn(),
    };
    const svc = new IntegrationModeService(
      {
        initialize: () => Promise.resolve(),
        get pythonPath() {
          return override ? "/venv/bin/python" : "python";
        },
        get pythonPathFromOverride() {
          return override;
        },
        pythonExtensionAvailable: true,
        getEnvironmentVariables: () => ({ PATH: "/usr/bin" }),
      } as never,
      telemetry as never,
      { info: jest.fn(), debug: jest.fn() } as never,
      {
        findBinary,
        probeDbtCore,
        findProjectFiles: () => Promise.resolve([]),
      } as never,
    );
    const resolving = svc.resolve(new FakeMemento() as never);
    await new Promise((resolve) => setImmediate(resolve));
    expect(findBinary).toHaveBeenCalled();
    override = true;
    resolveBinary(V2);

    await expect(resolving).resolves.toBe("core");
    expect(probeDbtCore).not.toHaveBeenCalled();
    expect(telemetry.sendTelemetryEvent).toHaveBeenCalledWith(
      "dbtIntegrationSwitchHeld",
      expect.objectContaining({ dbtCoreCheck: "unresolvedInterpreter" }),
    );
  });

  it("probes a bare command from dbt.dbtPythonPathOverride, with or without the Python extension", async () => {
    for (const pythonExtensionAvailable of [true, false]) {
      const { svc, probeDbtCore, telemetry } = service({
        pythonExtensionAvailable,
        pythonPath: "python",
      });
      await expect(svc.resolve(new FakeMemento() as never)).resolves.toBe(
        "fusion",
      );
      expect(probeDbtCore).toHaveBeenCalledWith(
        "python",
        { PATH: "/usr/bin" },
        expect.any(Number),
      );
      expect(telemetry.sendTelemetryEvent).toHaveBeenCalledWith(
        "dbtIntegrationAutoSwitched",
        expect.objectContaining({ dbtCoreCheck: "notInstalled" }),
      );
    }
  });

  it("switches without the Python extension or an override, reported as noInterpreter", async () => {
    const { svc, telemetry, terminal, probeDbtCore } = service({
      pythonExtensionAvailable: false,
    });
    await expect(svc.resolve(new FakeMemento() as never)).resolves.toBe(
      "fusion",
    );
    expect(probeDbtCore).not.toHaveBeenCalled();
    expect(svc.autoSwitched?.dbtCoreCheck).toBe("noInterpreter");
    expect(telemetry.sendTelemetryEvent).toHaveBeenCalledWith(
      "dbtIntegrationAutoSwitched",
      expect.objectContaining({ dbtCoreCheck: "noInterpreter" }),
    );
    expect(terminal.info).toHaveBeenCalledWith(
      "dbtIntegrationAutoSwitched",
      expect.stringContaining(
        "using dbt Fusion (dbt-core check: noInterpreter, adapter check: noProjects)",
      ),
      false,
    );
  });

  it("says the held reason without 'in time' for a check that failed", async () => {
    const { svc } = service({ dbtCore: unknownBecause("spawnError") });
    await svc.resolve(new FakeMemento() as never);
    await svc.notifySwitchHeld();
    expect(shown()[0][0]).toBe(
      "Power User didn't switch this window to dbt Fusion 2.0.9 (/home/user/.local/bin/dbt): dbt-core could not be checked in the selected interpreter.",
    );
  });
});

describe("IntegrationModeService.rebuildStatusChanged", () => {
  const jaffle = { root: "/projects/jaffle", name: "jaffle" };
  const shop = { root: "/projects/shop", name: "shop" };
  const warned = () =>
    (window.showWarningMessage as jest.Mock).mock.calls as unknown[][];

  beforeEach(() => {
    (window.showWarningMessage as jest.Mock).mockReturnValue(
      Promise.resolve(undefined),
    );
  });

  async function rebuild(
    svc: IntegrationModeService,
    project: { root: string; name: string },
    errorCount: number,
  ) {
    await svc.rebuildStatusChanged({
      ...project,
      inProgress: true,
      errorCount: 0,
    });
    await svc.rebuildStatusChanged({
      ...project,
      inProgress: false,
      errorCount,
    });
  }

  async function switchedService(memento = new FakeMemento()) {
    const created = service();
    await created.svc.resolve(memento as never);
    expect(created.svc.autoSwitched).toBeDefined();
    return { ...created, memento };
  }

  it("offers dbt Core once when the first rebuild after a switch fails", async () => {
    const { svc, memento } = await switchedService();
    await rebuild(svc, jaffle, 2);
    expect(warned()).toEqual([
      [
        "dbt Fusion could not parse jaffle. Power User switched this window to dbt Fusion because dbt 2.0.9 is on your path and the selected Python interpreter has no dbt-core. dbt Core mode needs dbt-core in the selected interpreter.",
        "Switch back to dbt Core",
        "Keep dbt Fusion",
      ],
    ]);
    expect(memento.get(PARSE_FAILED_OFFERED_KEY)).toBe(true);

    // Another project failing, and a reload, do not offer it again.
    await rebuild(svc, shop, 1);
    const reloaded = service().svc;
    await reloaded.resolve(memento as never);
    await rebuild(reloaded, jaffle, 2);
    expect(warned()).toHaveLength(1);
  });

  it("says what dbt Core mode needs when the window was switched for having no interpreter", async () => {
    const created = service({
      pythonExtensionAvailable: false,
      extensionPath: "",
    });
    await created.svc.resolve(new FakeMemento() as never);
    expect(created.svc.autoSwitched?.dbtCoreCheck).toBe("noInterpreter");
    await rebuild(created.svc, jaffle, 1);
    expect(warned()[0][0]).toBe(
      "dbt Fusion could not parse jaffle. Power User switched this window to dbt Fusion because dbt 2.0.9 is on your path and there is no Python interpreter. dbt Core mode needs a Python interpreter with dbt-core.",
    );
  });

  it("does not offer it when the first rebuild parses, even if a later one fails", async () => {
    const { svc, telemetry } = await switchedService();
    await rebuild(svc, jaffle, 0);
    await rebuild(svc, jaffle, 3);
    expect(warned()).toHaveLength(0);
    expect(telemetry.sendTelemetryEvent).not.toHaveBeenCalledWith(
      "dbtIntegrationAutoSwitchParseFailed",
      expect.anything(),
      expect.anything(),
    );
  });

  it("waits for overlapping rebuilds to end before judging the first one", async () => {
    // A newer rebuild aborts an older one, which still reports its end.
    const { svc } = await switchedService();
    await svc.rebuildStatusChanged({
      ...jaffle,
      inProgress: true,
      errorCount: 0,
    });
    await svc.rebuildStatusChanged({
      ...jaffle,
      inProgress: true,
      errorCount: 0,
    });
    await svc.rebuildStatusChanged({
      ...jaffle,
      inProgress: false,
      errorCount: 0,
    });
    expect(warned()).toHaveLength(0);
    await svc.rebuildStatusChanged({
      ...jaffle,
      inProgress: false,
      errorCount: 4,
    });
    expect(warned()).toHaveLength(1);
  });

  it("does not offer it in a window that was held back or set explicitly", async () => {
    const held = service({ dbtCore: IMPORTABLE }).svc;
    await held.resolve(new FakeMemento() as never);
    await rebuild(held, jaffle, 2);

    useSetting({ workspaceValue: "fusion" });
    const explicit = service().svc;
    await explicit.resolve(new FakeMemento() as never);
    expect(getDbtIntegrationMode()).toBe("fusion");
    await rebuild(explicit, jaffle, 2);

    expect(warned()).toHaveLength(0);
  });

  it.each([
    ["Switch back to dbt Core", "switchBack"],
    ["Keep dbt Fusion", "keepFusion"],
    [undefined, "dismissed"],
  ])("records %j as %s", async (choice, answer) => {
    const { svc, telemetry } = await switchedService();
    (window.showWarningMessage as jest.Mock).mockReturnValueOnce(
      Promise.resolve(choice),
    );
    await rebuild(svc, jaffle, 3);
    expect(telemetry.sendTelemetryEvent).toHaveBeenCalledWith(
      "dbtIntegrationAutoSwitchParseFailed",
      { answer, binaryVersion: "2.0.9", dbtCoreCheck: "notInstalled" },
      { errorCount: 3 },
    );
    if (answer === "switchBack") {
      expect(update).toHaveBeenCalledTimes(1);
      expect(update).toHaveBeenCalledWith(
        "dbtIntegration",
        "core",
        ConfigurationTarget.Workspace,
      );
      // The window runs fusion; the explicit core setting reloads it.
      useSetting({ workspaceValue: "core" });
      expect(svc.needsReload()).toBe(true);
    } else {
      expect(update).not.toHaveBeenCalled();
    }
  });
});

describe("fusionAdapterSupport", () => {
  it.each<[string, number[], string]>([
    ["snowflake", [2, 0, 0], "supported"],
    ["databricks", [2, 0, 12], "supported"],
    // Builds that report 2.0.0 list from 7 to 14 types: only the 7 are sure.
    ["duckdb", [2, 0, 0], "unconfirmed"],
    ["clickhouse", [2, 0, 5], "unconfirmed"],
    ["duckdb", [2, 0, 6], "supported"],
    // Only with DBT_ALLOW_EXPERIMENTAL_ADAPTERS, whatever the version.
    ["lakecompute", [2, 0, 12], "experimental"],
    ["duckdb", [2, 1, 0], "supported"],
    ["spark", [3], "experimental"],
    ["postgres", [2, 0, 12], "experimental"],
    // An empty version is older than every entry.
    ["snowflake", [], "unconfirmed"],
    ["sqlserver", [2, 0, 12], "unsupported"],
    ["athena", [2, 0, 0], "unsupported"],
    ["fabricspark", [2, 0, 12], "unsupported"],
    // As written: dbt Fusion matches the type exactly.
    ["Snowflake", [2, 0, 12], "unsupported"],
    ["constructor", [2, 0, 12], "unsupported"],
  ])("%s on dbt Fusion %j is %s", (type, version, support) => {
    expect(fusionAdapterSupport(type, version)).toBe(support);
  });

  it.each<[string, number[], string]>([
    ["lakecompute", [2, 0, 12], "supported"],
    ["spark", [3], "supported"],
    ["fabric", [2, 0, 5], "unconfirmed"],
    ["snowflake", [2, 0, 0], "supported"],
    ["sqlserver", [2, 0, 12], "unsupported"],
  ])(
    "%s on dbt Fusion %j is %s with experimental adapters allowed",
    (type, version, support) => {
      expect(fusionAdapterSupport(type, version, true)).toBe(support);
    },
  );
});

describe("projectAdapterCheck and windowAdapterCheck", () => {
  it.each<[(string | undefined)[], number[], FusionAdapterCheck]>([
    [["snowflake"], [2, 0, 9], "supported"],
    [["sqlserver"], [2, 0, 9], "unsupported"],
    [["duckdb"], [2, 0, 0], "unconfirmed"],
    [["snowflake", "duckdb"], [2, 0, 0], "unconfirmed"],
    // Every candidate unsupported: whichever target dbt picks fails.
    [["sqlserver", "athena"], [2, 0, 9], "unsupported"],
    // Candidates that disagree, or an unreadable one, cannot be told.
    [["sqlserver", "snowflake"], [2, 0, 9], "unknown"],
    [["snowflake", undefined], [2, 0, 9], "unknown"],
    [[undefined], [2, 0, 9], "unknown"],
    [[], [2, 0, 9], "unknown"],
  ])("a project with %j on %j is %s", (types, version, check) => {
    expect(projectAdapterCheck(types, version)).toBe(check);
  });

  it.each<[FusionAdapterCheck[], FusionAdapterCheck]>([
    [[], "noProjects"],
    [["supported"], "supported"],
    [["supported", "unconfirmed"], "unconfirmed"],
    [["unconfirmed", "unknown"], "unknown"],
    [["supported", "unknown", "unsupported"], "unsupported"],
  ])("a window with %j is %s", (checks, check) => {
    expect(windowAdapterCheck(checks)).toBe(check);
  });
});

describe("IntegrationModeService.resolve: the adapter check", () => {
  let dir: string;
  beforeEach(() => {
    dir = mkdtempSync(path.join(tmpdir(), "fusion-adapter-"));
    (workspace as { workspaceFolders: unknown }).workspaceFolders = [
      { uri: Uri.file(dir), name: "repo", index: 0 },
    ];
  });
  afterEach(() => rmSync(dir, { recursive: true, force: true }));

  /** A dbt project under the folder using profile `name`, with its own profiles.yml when given. */
  function project(name: string, profilesYml?: string): string {
    const root = path.join(dir, name);
    mkdirSync(root, { recursive: true });
    writeFileSync(
      path.join(root, "dbt_project.yml"),
      `name: ${name}\nversion: "1.0"\nprofile: ${name}\n`,
    );
    if (profilesYml !== undefined) {
      writeFileSync(path.join(root, "profiles.yml"), profilesYml);
    }
    return root;
  }

  const profile = (name: string, target: string, outputs: object) =>
    JSON.stringify({ [name]: { target, outputs } });

  const projectsIn = (...roots: string[]) => ({
    [dir]: roots.map((root) => path.join(root, "dbt_project.yml")),
  });

  it("holds a window whose profile uses an adapter dbt Fusion does not support, and says what dbt Core mode needs", async () => {
    const root = project(
      "warehouse",
      profile("warehouse", "dev", { dev: { type: "sqlserver" } }),
    );
    const { svc, telemetry, terminal } = service({
      projectFiles: projectsIn(root),
    });
    await expect(svc.resolve(new FakeMemento() as never)).resolves.toBe("core");
    expect(svc.autoSwitched).toBeUndefined();
    expect(telemetry.sendTelemetryEvent).toHaveBeenCalledWith(
      "dbtIntegrationSwitchHeld",
      {
        reason: "adapterUnsupported",
        binaryVersion: "2.0.9",
        binaryLocation: "installer",
        dbtCoreCheck: "notInstalled",
        fusionAdapterCheck: "unsupported",
        adapterTypes: "sqlserver",
      },
    );
    expect(terminal.info).toHaveBeenCalledWith(
      "dbtIntegrationSwitchHeld",
      "/home/user/.local/bin/dbt is dbt 2.0.9, but dbt Fusion does not support the profile's adapter (sqlserver): keeping core (dbt-core check: notInstalled, adapter check: unsupported)",
      false,
    );
    await svc.notifySwitchHeld();
    expect(shown()[0][0]).toBe(
      "Power User didn't switch this window to dbt Fusion 2.0.9 (/home/user/.local/bin/dbt): the dbt profile uses the sqlserver adapter, which dbt Fusion does not support. dbt Core mode needs dbt-core, which the selected Python interpreter does not have.",
    );
  });

  it("says a Python interpreter is needed when there is none", async () => {
    const root = project(
      "warehouse",
      profile("warehouse", "dev", { dev: { type: "athena" } }),
    );
    const { svc } = service({
      projectFiles: projectsIn(root),
      pythonExtensionAvailable: false,
    });
    await expect(svc.resolve(new FakeMemento() as never)).resolves.toBe("core");
    await svc.notifySwitchHeld();
    expect(shown()[0][0]).toContain(
      "the dbt profile uses the athena adapter, which dbt Fusion does not support. dbt Core mode needs a Python interpreter with dbt-core.",
    );
  });

  it("adds nothing about dbt Core mode when the dbt-core check could not tell", async () => {
    const root = project(
      "warehouse",
      profile("warehouse", "dev", { dev: { type: "sqlserver" } }),
    );
    const { svc } = service({
      projectFiles: projectsIn(root),
      dbtCore: unknownBecause("spawnError"),
    });
    await expect(svc.resolve(new FakeMemento() as never)).resolves.toBe("core");
    await svc.notifySwitchHeld();
    expect(shown()[0][0]).toMatch(
      /the sqlserver adapter, which dbt Fusion does not support\.$/,
    );
  });

  it("reports dbt-core over the adapter when dbt-core imports", async () => {
    const root = project(
      "warehouse",
      profile("warehouse", "dev", { dev: { type: "sqlserver" } }),
    );
    const { svc, telemetry } = service({
      projectFiles: projectsIn(root),
      dbtCore: IMPORTABLE,
    });
    await expect(svc.resolve(new FakeMemento() as never)).resolves.toBe("core");
    expect(telemetry.sendTelemetryEvent).toHaveBeenCalledWith(
      "dbtIntegrationSwitchHeld",
      expect.objectContaining({
        reason: "dbtCore",
        fusionAdapterCheck: "unsupported",
      }),
    );
  });

  it("switches when dbt Fusion supports the adapter", async () => {
    const root = project(
      "shop",
      profile("shop", "dev", { dev: { type: "snowflake" } }),
    );
    const { svc, telemetry } = service({ projectFiles: projectsIn(root) });
    await expect(svc.resolve(new FakeMemento() as never)).resolves.toBe(
      "fusion",
    );
    expect(svc.autoSwitched?.fusionAdapterCheck).toBe("supported");
    expect(telemetry.sendTelemetryEvent).toHaveBeenCalledWith(
      "dbtIntegrationAutoSwitched",
      expect.objectContaining({
        fusionAdapterCheck: "supported",
        adapterTypes: "snowflake",
      }),
    );
  });

  it("switches a build that reports 2.0.0 for an adapter only later versions are sure to accept", async () => {
    const root = project(
      "local",
      profile("local", "dev", { dev: { type: "duckdb" } }),
    );
    const { svc, telemetry } = service({
      projectFiles: projectsIn(root),
      binary: { ...V2, version: [2, 0, 0] },
    });
    await expect(svc.resolve(new FakeMemento() as never)).resolves.toBe(
      "fusion",
    );
    expect(telemetry.sendTelemetryEvent).toHaveBeenCalledWith(
      "dbtIntegrationAutoSwitched",
      expect.objectContaining({
        binaryVersion: "2.0.0",
        fusionAdapterCheck: "unconfirmed",
        adapterTypes: "duckdb",
      }),
    );
  });

  it("reads the target DBT_TARGET names and profiles.yml from DBT_PROFILES_DIR, relative to the project", async () => {
    const root = project("shop");
    mkdirSync(path.join(root, "config"));
    writeFileSync(
      path.join(root, "config", "profiles.yml"),
      profile("shop", "dev", {
        dev: { type: "snowflake" },
        legacy: { type: "sqlserver" },
      }),
    );
    // A profiles.yml in the project itself is not read while DBT_PROFILES_DIR is set.
    writeFileSync(
      path.join(root, "profiles.yml"),
      profile("shop", "dev", { dev: { type: "snowflake" } }),
    );
    const { svc, telemetry } = service({
      projectFiles: projectsIn(root),
      env: {
        PATH: "/usr/bin",
        DBT_PROFILES_DIR: "config",
        DBT_TARGET: "legacy",
      },
    });
    await expect(svc.resolve(new FakeMemento() as never)).resolves.toBe("core");
    expect(telemetry.sendTelemetryEvent).toHaveBeenCalledWith(
      "dbtIntegrationSwitchHeld",
      expect.objectContaining({
        reason: "adapterUnsupported",
        adapterTypes: "sqlserver",
      }),
    );
  });

  it("judges every output when the default target is a template: all unsupported holds", async () => {
    const root = project(
      "warehouse",
      profile("warehouse", "{{ env_var('WAREHOUSE_TARGET') }}", {
        dev: { type: "sqlserver" },
        prod: { type: "athena" },
      }),
    );
    const { svc, telemetry } = service({ projectFiles: projectsIn(root) });
    await expect(svc.resolve(new FakeMemento() as never)).resolves.toBe("core");
    expect(telemetry.sendTelemetryEvent).toHaveBeenCalledWith(
      "dbtIntegrationSwitchHeld",
      expect.objectContaining({
        reason: "adapterUnsupported",
        fusionAdapterCheck: "unsupported",
        adapterTypes: "athena,sqlserver",
      }),
    );
    await svc.notifySwitchHeld();
    expect(shown()[0][0]).toContain(
      ": the dbt profile targets use the athena and sqlserver adapters, which dbt Fusion does not support.",
    );
  });

  it("switches when a templated default target could pick a supported adapter", async () => {
    const root = project(
      "warehouse",
      profile("warehouse", "{{ env_var('WAREHOUSE_TARGET') }}", {
        dev: { type: "snowflake" },
        legacy: { type: "sqlserver" },
      }),
    );
    const { svc, telemetry } = service({ projectFiles: projectsIn(root) });
    await expect(svc.resolve(new FakeMemento() as never)).resolves.toBe(
      "fusion",
    );
    expect(telemetry.sendTelemetryEvent).toHaveBeenCalledWith(
      "dbtIntegrationAutoSwitched",
      expect.objectContaining({
        fusionAdapterCheck: "unknown",
        adapterTypes: "snowflake,sqlserver",
      }),
    );
  });

  // dbt Fusion fails on a profile it can't find, and so does dbt Core: the
  // window keeps dbt Core mode and says what is missing. Before, it switched,
  // and 95% of such windows then failed to parse.
  describe("a profile that is certainly missing", () => {
    const heldFor = (telemetry: { sendTelemetryEvent: jest.Mock }) =>
      expect(telemetry.sendTelemetryEvent).toHaveBeenCalledWith(
        "dbtIntegrationSwitchHeld",
        expect.objectContaining({ reason: "profileNotFound" }),
      );

    it("holds when there is no profiles.yml where dbt looks, and names where it looked", async () => {
      const empty = path.join(dir, "no-profiles");
      mkdirSync(empty);
      const root = project("shop");
      const { svc, telemetry } = service({
        projectFiles: projectsIn(root),
        // dbt does not fall back from DBT_PROFILES_DIR to the project or ~/.dbt.
        env: { PATH: "/usr/bin", DBT_PROFILES_DIR: empty },
      });
      await expect(svc.resolve(new FakeMemento() as never)).resolves.toBe(
        "core",
      );
      expect(telemetry.sendTelemetryEvent).toHaveBeenCalledWith(
        "dbtIntegrationSwitchHeld",
        expect.objectContaining({
          reason: "profileNotFound",
          profileCheck: "noProfilesFile",
          fusionAdapterCheck: "unknown",
        }),
      );
      await svc.notifySwitchHeld();
      expect(shown()[0]).toEqual([
        `Power User didn't switch shop to dbt Fusion 2.0.9 (/home/user/.local/bin/dbt): no profiles.yml in DBT_PROFILES_DIR (${path.join(empty, "profiles.yml")}). dbt Fusion and dbt Core both need it: add the profile, then reload the window.`,
        "Use dbt Fusion",
        "Dismiss",
      ]);
    });

    it("names the profile that is not in profiles.yml, and opens the file", async () => {
      const root = project(
        "shop",
        profile("warehouse", "dev", { dev: { type: "snowflake" } }),
      );
      const { svc, telemetry } = service({ projectFiles: projectsIn(root) });
      await expect(svc.resolve(new FakeMemento() as never)).resolves.toBe(
        "core",
      );
      expect(telemetry.sendTelemetryEvent).toHaveBeenCalledWith(
        "dbtIntegrationSwitchHeld",
        expect.objectContaining({ profileCheck: "profileMissing" }),
      );
      (window.showInformationMessage as jest.Mock).mockReturnValueOnce(
        Promise.resolve("Open profiles.yml"),
      );
      await svc.notifySwitchHeld();
      const profilesFile = path.join(root, "profiles.yml");
      expect(shown()[0]).toEqual([
        `Power User didn't switch shop to dbt Fusion 2.0.9 (/home/user/.local/bin/dbt): profile 'shop' is not in ${profilesFile}. dbt Fusion and dbt Core both need it: add it, then reload the window.`,
        "Open profiles.yml",
        "Use dbt Fusion",
        "Dismiss",
      ]);
      expect(window.showTextDocument).toHaveBeenCalledWith(
        Uri.file(profilesFile),
      );
      expect(update).not.toHaveBeenCalled();
    });

    it("holds when dbt_project.yml names no profile", async () => {
      const root = path.join(dir, "shop");
      mkdirSync(root);
      writeFileSync(
        path.join(root, "dbt_project.yml"),
        'name: shop\nversion: "1.0"\n',
      );
      const { svc, telemetry } = service({ projectFiles: projectsIn(root) });
      await expect(svc.resolve(new FakeMemento() as never)).resolves.toBe(
        "core",
      );
      expect(telemetry.sendTelemetryEvent).toHaveBeenCalledWith(
        "dbtIntegrationSwitchHeld",
        expect.objectContaining({ profileCheck: "noProfileName" }),
      );
      (window.showInformationMessage as jest.Mock).mockReturnValueOnce(
        Promise.resolve("Open dbt_project.yml"),
      );
      await svc.notifySwitchHeld();
      expect(shown()[0][0]).toContain(
        "shop to dbt Fusion 2.0.9 (/home/user/.local/bin/dbt): its dbt_project.yml names no profile. dbt Fusion and dbt Core both need one: add a profile: line, then reload the window.",
      );
      expect(window.showTextDocument).toHaveBeenCalledWith(
        Uri.file(path.join(root, "dbt_project.yml")),
      );
    });

    it.each<[string, Record<string, string>, string]>([
      ["the profile's target:", {}, "target 'prod'"],
      ["DBT_TARGET", { DBT_TARGET: "qa" }, "target 'qa'"],
    ])(
      "holds when the target %s names is not in the profile",
      async (_, extraEnv, named) => {
        const root = project(
          "shop",
          profile("shop", "prod", { dev: { type: "snowflake" } }),
        );
        const { svc, telemetry } = service({
          projectFiles: projectsIn(root),
          env: { PATH: "/usr/bin", ...extraEnv },
        });
        await expect(svc.resolve(new FakeMemento() as never)).resolves.toBe(
          "core",
        );
        expect(telemetry.sendTelemetryEvent).toHaveBeenCalledWith(
          "dbtIntegrationSwitchHeld",
          expect.objectContaining({
            profileCheck: "targetMissing",
            // The outputs dbt could have picked are still read.
            adapterTypes: "snowflake",
          }),
        );
        await svc.notifySwitchHeld();
        expect(shown()[0][0]).toContain(
          `: ${named} is not in profile 'shop' (${path.join(root, "profiles.yml")}). Add it or select another target, then reload the window.`,
        );
      },
    );

    // dbt resolves a target written as one env_var call from the same
    // environment dbt Fusion runs with, so a name it doesn't define fails there too.
    it("holds when a target written as env_var names an output the profile lacks, and names it", async () => {
      const root = project(
        "shop",
        profile("shop", "{{ env_var('DEPLOY_TARGET') }}", {
          dev: { type: "snowflake" },
        }),
      );
      const { svc, telemetry } = service({
        projectFiles: projectsIn(root),
        env: { PATH: "/usr/bin", DEPLOY_TARGET: "prod" },
      });
      await expect(svc.resolve(new FakeMemento() as never)).resolves.toBe(
        "core",
      );
      expect(telemetry.sendTelemetryEvent).toHaveBeenCalledWith(
        "dbtIntegrationSwitchHeld",
        expect.objectContaining({ profileCheck: "targetMissing" }),
      );
      await svc.notifySwitchHeld();
      expect(shown()[0][0]).toContain(
        ": target 'prod' is not in profile 'shop'",
      );
    });

    it("switches when a target written as env_var names an output the profile has", async () => {
      const root = project(
        "shop",
        profile("shop", "{{ env_var('DEPLOY_TARGET', 'dev') }}", {
          dev: { type: "snowflake" },
        }),
      );
      const { svc } = service({ projectFiles: projectsIn(root) });
      await expect(svc.resolve(new FakeMemento() as never)).resolves.toBe(
        "fusion",
      );
    });

    it("holds when dbt_project.yml names a profile that only looks present (__proto__)", async () => {
      const root = path.join(dir, "shop");
      mkdirSync(root);
      writeFileSync(
        path.join(root, "dbt_project.yml"),
        'name: shop\nversion: "1.0"\nprofile: __proto__\n',
      );
      writeFileSync(
        path.join(root, "profiles.yml"),
        profile("shop", "dev", { dev: { type: "snowflake" } }),
      );
      const { svc, telemetry } = service({ projectFiles: projectsIn(root) });
      await expect(svc.resolve(new FakeMemento() as never)).resolves.toBe(
        "core",
      );
      expect(telemetry.sendTelemetryEvent).toHaveBeenCalledWith(
        "dbtIntegrationSwitchHeld",
        expect.objectContaining({ profileCheck: "profileMissing" }),
      );
    });

    it.each([
      ["a Jinja statement", "{% if true %}dev{% endif %}"],
      ["a Jinja comment", "dev{# the default #}"],
    ])(
      "switches when the target is written with %s, which only dbt renders",
      async (_, target) => {
        const root = project(
          "shop",
          profile("shop", target, { dev: { type: "snowflake" } }),
        );
        const { svc } = service({ projectFiles: projectsIn(root) });
        await expect(svc.resolve(new FakeMemento() as never)).resolves.toBe(
          "fusion",
        );
      },
    );

    it("switches when dbt_project.yml is a YAML list, not a mapping", async () => {
      const root = path.join(dir, "shop");
      mkdirSync(root);
      writeFileSync(
        path.join(root, "dbt_project.yml"),
        "- name: shop\n- profile: shop\n",
      );
      writeFileSync(
        path.join(root, "profiles.yml"),
        profile("shop", "dev", { dev: { type: "snowflake" } }),
      );
      const { svc } = service({ projectFiles: projectsIn(root) });
      await expect(svc.resolve(new FakeMemento() as never)).resolves.toBe(
        "fusion",
      );
    });

    it("names the missing profile before an adapter dbt Fusion runs only as experimental", async () => {
      const shop = project(
        "shop",
        profile("shop", "dev", { dev: { type: "postgres" } }),
      );
      const lake = project("lake", profile("other", "dev", {}));
      const { svc, telemetry } = service({
        projectFiles: projectsIn(shop, lake),
      });
      await svc.resolve(new FakeMemento() as never);
      heldFor(telemetry);
      await svc.notifySwitchHeld();
      expect(shown()[0][0]).toContain("profile 'lake' is not in");
    });

    it.each<[string, string, string]>([
      [
        "a templated profile name",
        "profile: \"{{ env_var('DBT_PROFILE') }}\"\n",
        profile("shop", "dev", { dev: { type: "snowflake" } }),
      ],
      [
        "a templated target",
        "profile: shop\n",
        profile("shop", "{{ var('target') }}", {
          dev: { type: "snowflake" },
          prod: { type: "snowflake" },
        }),
      ],
      [
        "a profiles.yml that does not parse",
        "profile: shop\n",
        "shop: [unclosed\n",
      ],
    ])(
      "still switches on %s, which only dbt can read",
      async (_, profileLine, profilesYml) => {
        const root = path.join(dir, "shop");
        mkdirSync(root);
        writeFileSync(
          path.join(root, "dbt_project.yml"),
          `name: shop\nversion: "1.0"\n${profileLine}`,
        );
        writeFileSync(path.join(root, "profiles.yml"), profilesYml);
        const { svc, telemetry } = service({ projectFiles: projectsIn(root) });
        await expect(svc.resolve(new FakeMemento() as never)).resolves.toBe(
          "fusion",
        );
        expect(telemetry.sendTelemetryEvent).not.toHaveBeenCalledWith(
          "dbtIntegrationSwitchHeld",
          expect.anything(),
        );
      },
    );
  });

  // dbt Fusion refuses its experimental adapters (postgres, trino, spark,
  // fabric, exasol, datafusion, lakecompute) unless
  // DBT_ALLOW_EXPERIMENTAL_ADAPTERS is set. Before, they counted as
  // supported: 34 of 36 such switched windows failed to parse.
  describe("an adapter dbt Fusion runs only as experimental", () => {
    const os =
      process.platform === "win32"
        ? "windows"
        : process.platform === "darwin"
          ? "osx"
          : "linux";

    it("holds, says how to allow it, and opens that setting", async () => {
      const root = project(
        "shop",
        profile("shop", "dev", { dev: { type: "postgres" } }),
      );
      const { svc, telemetry } = service({ projectFiles: projectsIn(root) });
      await expect(svc.resolve(new FakeMemento() as never)).resolves.toBe(
        "core",
      );
      expect(telemetry.sendTelemetryEvent).toHaveBeenCalledWith(
        "dbtIntegrationSwitchHeld",
        expect.objectContaining({
          reason: "adapterExperimental",
          fusionAdapterCheck: "experimental",
          adapterTypes: "postgres",
        }),
      );
      (window.showInformationMessage as jest.Mock).mockReturnValueOnce(
        Promise.resolve("Open setting"),
      );
      await svc.notifySwitchHeld();
      expect(shown()[0]).toEqual([
        `Power User didn't switch this window to dbt Fusion 2.0.9 (/home/user/.local/bin/dbt): the dbt profile uses the postgres adapter, which dbt Fusion runs only as an experimental adapter. To use dbt Fusion with it, add DBT_ALLOW_EXPERIMENTAL_ADAPTERS=true to terminal.integrated.env.${os}, then reload the window. dbt Core mode needs dbt-core, which the selected Python interpreter does not have.`,
        "Open setting",
        "Use dbt Fusion",
        "Dismiss",
      ]);
      expect(commands.executeCommand).toHaveBeenCalledWith(
        "workbench.action.openSettings",
        `terminal.integrated.env.${os}`,
      );
      // Nothing is written for the user.
      expect(update).not.toHaveBeenCalled();
    });

    it.each(["true", "TRUE", "1", "yes", "on"])(
      "switches when DBT_ALLOW_EXPERIMENTAL_ADAPTERS is %s",
      async (value) => {
        const root = project(
          "shop",
          profile("shop", "dev", { dev: { type: "postgres" } }),
        );
        const { svc } = service({
          projectFiles: projectsIn(root),
          env: { PATH: "/usr/bin", DBT_ALLOW_EXPERIMENTAL_ADAPTERS: value },
        });
        await expect(svc.resolve(new FakeMemento() as never)).resolves.toBe(
          "fusion",
        );
      },
    );

    // dbt Fusion 2.0.12 refuses these.
    it.each(["false", "0", "", "y", " true"])(
      "still holds when DBT_ALLOW_EXPERIMENTAL_ADAPTERS is %j",
      async (value) => {
        const root = project(
          "shop",
          profile("shop", "dev", { dev: { type: "trino" } }),
        );
        const { svc } = service({
          projectFiles: projectsIn(root),
          env: { PATH: "/usr/bin", DBT_ALLOW_EXPERIMENTAL_ADAPTERS: value },
        });
        await expect(svc.resolve(new FakeMemento() as never)).resolves.toBe(
          "core",
        );
      },
    );

    it("holds when no target is runnable without the opt-in, and names only the experimental adapters", async () => {
      const root = project(
        "shop",
        profile("shop", "{{ var('target') }}", {
          a: { type: "sqlserver" },
          b: { type: "fabric" },
        }),
      );
      const { svc } = service({ projectFiles: projectsIn(root) });
      await expect(svc.resolve(new FakeMemento() as never)).resolves.toBe(
        "core",
      );
      await svc.notifySwitchHeld();
      expect(shown()[0][0]).toContain(
        ": the dbt profile uses the fabric adapter, which dbt Fusion runs only as an experimental adapter.",
      );
    });

    it("switches when one of a templated target's adapters runs without the opt-in", async () => {
      const root = project(
        "shop",
        profile("shop", "{{ var('target') }}", {
          a: { type: "snowflake" },
          b: { type: "postgres" },
        }),
      );
      const { svc } = service({ projectFiles: projectsIn(root) });
      await expect(svc.resolve(new FakeMemento() as never)).resolves.toBe(
        "fusion",
      );
    });
  });

  it("switches when dbt_project.yml cannot be parsed", async () => {
    const root = path.join(dir, "broken");
    mkdirSync(root);
    writeFileSync(path.join(root, "dbt_project.yml"), "name: [unclosed\n");
    const { svc, terminal } = service({ projectFiles: projectsIn(root) });
    await expect(svc.resolve(new FakeMemento() as never)).resolves.toBe(
      "fusion",
    );
    expect(terminal.debug).toHaveBeenCalledWith(
      "dbtIntegrationAdapterCheck",
      expect.stringContaining(`Could not read the profile of ${root}`),
    );
  });

  it("sends an adapter type that is not a plain name as other", async () => {
    const root = project(
      "shop",
      profile("shop", "dev", { dev: { type: "my adapter: secret?" } }),
    );
    const { svc, telemetry } = service({ projectFiles: projectsIn(root) });
    await expect(svc.resolve(new FakeMemento() as never)).resolves.toBe("core");
    expect(telemetry.sendTelemetryEvent).toHaveBeenCalledWith(
      "dbtIntegrationSwitchHeld",
      expect.objectContaining({
        reason: "adapterUnsupported",
        adapterTypes: "other",
      }),
    );
  });

  it("holds the window when one of its projects uses an unsupported adapter, and names that adapter", async () => {
    const shop = project(
      "shop",
      profile("shop", "dev", { dev: { type: "snowflake" } }),
    );
    const lake = project(
      "lake",
      profile("lake", "dev", { dev: { type: "athena" } }),
    );
    const { svc, telemetry } = service({
      projectFiles: projectsIn(shop, lake),
    });
    await expect(svc.resolve(new FakeMemento() as never)).resolves.toBe("core");
    expect(telemetry.sendTelemetryEvent).toHaveBeenCalledWith(
      "dbtIntegrationSwitchHeld",
      expect.objectContaining({
        reason: "adapterUnsupported",
        adapterTypes: "athena,snowflake",
      }),
    );
    await svc.notifySwitchHeld();
    expect(shown()[0][0]).toContain(
      ": the dbt profile uses the athena adapter, which dbt Fusion does not support.",
    );
  });
});
