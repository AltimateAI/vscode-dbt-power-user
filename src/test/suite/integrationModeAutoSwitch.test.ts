import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import { mkdtempSync, rmSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import * as path from "path";
import { ConfigurationTarget, Uri, window, workspace } from "vscode";
import {
  decideDbtIntegrationMode,
  getDbtIntegrationMode,
  readConfiguredDbtIntegration,
  setEffectiveDbtIntegrationMode,
} from "../../dbt_client/integrationMode";
import {
  AUTO_SWITCH_NOTIFIED_KEY,
  IntegrationModeService,
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

const V2 = {
  path: "/home/user/.local/bin/dbt",
  version: [2, 0, 9],
  location: "installer" as const,
};

function service({
  // null: no dbt 2.x binary on the path.
  binary = V2 as typeof V2 | null,
  dbtCore = { importable: false } as { importable: boolean; version?: string },
  pythonExtensionAvailable = true,
  // An override interpreter; without one, the extension's when it is there.
  pythonPath = undefined as string | undefined,
  env = { PATH: "/usr/bin" } as Record<string, string>,
} = {}) {
  const telemetry = {
    sendTelemetryEvent: jest.fn(),
    setTelemetryCustomAttribute: jest.fn(),
  };
  const findBinary = jest.fn(() => Promise.resolve(binary ?? undefined));
  const probeDbtCore = jest.fn(() => Promise.resolve(dbtCore));
  const svc = new IntegrationModeService(
    {
      initialize: () => Promise.resolve(),
      pythonPath:
        pythonPath ?? (pythonExtensionAvailable ? "/venv/bin/python" : ""),
      pythonExtensionAvailable,
      getEnvironmentVariables: () => env,
    } as never,
    telemetry as never,
    { info: jest.fn(), debug: jest.fn() } as never,
    { findBinary, probeDbtCore } as never,
  );
  return { svc, telemetry, findBinary, probeDbtCore };
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
  const onlyV2 = { dbtV2Found: true, pythonDbtCore: false, dbtLoom: false };
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
    expect(probeDbtCore).toHaveBeenCalledWith("/venv/bin/python", {
      PATH: "/usr/bin",
    });
    expect(getDbtIntegrationMode()).toBe("fusion");
    expect(new VSCodeDBTConfiguration().getDbtIntegration()).toBe("fusion");
    expect(telemetry.sendTelemetryEvent).toHaveBeenCalledWith(
      "dbtIntegrationAutoSwitched",
      {
        from: "core",
        to: "fusion",
        binaryVersion: "2.0.9",
        binaryLocation: "installer",
      },
    );
    expect(telemetry.setTelemetryCustomAttribute).toHaveBeenCalledWith(
      "dbtIntegrationAutoSwitched",
      "fusion",
    );
  });

  it("keeps core when dbt-core imports in the selected interpreter", async () => {
    const { svc, telemetry } = service({
      dbtCore: { importable: true, version: "1.12.6" },
    });
    await expect(svc.resolve(new FakeMemento() as never)).resolves.toBe("core");
    expect(getDbtIntegrationMode()).toBe("core");
    expect(svc.autoSwitched).toBeUndefined();
    expect(telemetry.sendTelemetryEvent).toHaveBeenCalledWith(
      "dbtIntegrationSwitchHeld",
      {
        reason: "dbtCore",
        binaryVersion: "2.0.9",
        binaryLocation: "installer",
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
      dbtCore: { importable: true, version: "1.10.4" },
    });
    await expect(svc.resolve(new FakeMemento() as never)).resolves.toBe("core");
    expect(probeDbtCore).toHaveBeenCalledTimes(1);
    expect(probeDbtCore).toHaveBeenCalledWith("/opt/dbt-env/bin/python", {
      PATH: "/usr/bin",
    });
    expect(svc.autoSwitched).toBeUndefined();
    await svc.notifySwitchHeld();
    expect(shown()[0][0]).toContain(
      "keeps dbt Core mode because the interpreter has dbt-core.",
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

describe("IntegrationModeService.notifySwitchHeld", () => {
  const withDbtCore = { dbtCore: { importable: true, version: "1.12.6" } };

  it("tells the workspace once why it kept dbt Core mode, across reloads", async () => {
    const memento = new FakeMemento();
    const first = service(withDbtCore).svc;
    await first.resolve(memento as never);
    await first.notifySwitchHeld();
    await first.notifySwitchHeld();
    expect(shown()).toEqual([
      [
        "dbt Fusion 2.0.9 was found at /home/user/.local/bin/dbt, but this window keeps dbt Core mode because the interpreter has dbt-core.",
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
      "keeps dbt Core mode because a dbt-loom config is present.",
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
      "dbtIntegrationUseFusion",
      { reason: "dbtCore", binaryVersion: "2.0.9" },
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
