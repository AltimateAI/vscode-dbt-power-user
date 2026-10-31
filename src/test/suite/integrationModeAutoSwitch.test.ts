import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import { ConfigurationTarget, window, workspace } from "vscode";
import {
  decideDbtIntegrationMode,
  getDbtIntegrationMode,
  readConfiguredDbtIntegration,
  setEffectiveDbtIntegrationMode,
} from "../../dbt_client/integrationMode";
import {
  AUTO_SWITCH_NOTIFIED_KEY,
  IntegrationModeService,
} from "../../dbt_client/integrationModeService";
import { VSCodeDBTConfiguration } from "../../dbt_client/vscodeConfiguration";

/**
 * A dbt 2.x binary on the project's path switches a window whose
 * `dbt.dbtIntegration` is left at its default to dbt Fusion, with one
 * notification per project; an explicit setting is never switched.
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
      pythonPath: pythonExtensionAvailable ? "/venv/bin/python" : "",
      pythonExtensionAvailable,
      getEnvironmentVariables: () => ({ PATH: "/usr/bin" }),
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
  it.each([
    [{ value: "core", explicit: false }, true, "fusion", true],
    [{ value: "core", explicit: false }, false, "core", false],
    [{ value: "core", explicit: true }, true, "core", false],
    [{ value: "corecommand", explicit: true }, true, "corecommand", false],
    [{ value: "cloud", explicit: true }, true, "cloud", false],
    [{ value: "fusion", explicit: true }, false, "fusion", false],
  ])("%j with a dbt 2.x binary %s runs %s", (configured, found, mode, auto) => {
    expect(decideDbtIntegrationMode(configured, found)).toEqual({
      mode,
      autoSwitched: auto,
    });
  });
});

describe("IntegrationModeService.resolve", () => {
  it("switches a default window to fusion when a dbt 2.x binary is found", async () => {
    const { svc, telemetry, findBinary } = service();
    await expect(svc.resolve(new FakeMemento() as never)).resolves.toBe(
      "fusion",
    );
    expect(findBinary).toHaveBeenCalledWith({
      pythonPath: "/venv/bin/python",
      cwd: undefined,
      env: { PATH: "/usr/bin" },
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
        pythonDbtCoreAvailable: "false",
        pythonDbtCoreVersion: "",
      },
    );
    expect(telemetry.setTelemetryCustomAttribute).toHaveBeenCalledWith(
      "dbtIntegrationAutoSwitched",
      "fusion",
    );
  });

  it("stamps whether dbt Core imports too", async () => {
    const { svc, telemetry } = service({
      dbtCore: { importable: true, version: "1.12.6" },
    });
    await svc.resolve(new FakeMemento() as never);
    expect(telemetry.sendTelemetryEvent).toHaveBeenCalledWith(
      "dbtIntegrationAutoSwitched",
      expect.objectContaining({
        pythonDbtCoreAvailable: "true",
        pythonDbtCoreVersion: "1.12.6",
      }),
    );
  });

  it("does not probe for dbt Core without the Python extension", async () => {
    const { svc, probeDbtCore } = service({ pythonExtensionAvailable: false });
    await svc.resolve(new FakeMemento() as never);
    expect(probeDbtCore).not.toHaveBeenCalled();
    expect(svc.autoSwitched?.pythonDbtCore).toEqual({ importable: false });
  });

  it("keeps the default when no dbt 2.x binary is found", async () => {
    const { svc, telemetry } = service({ binary: null });
    await expect(svc.resolve(new FakeMemento() as never)).resolves.toBe("core");
    expect(svc.autoSwitched).toBeUndefined();
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

  it("offers to switch back when dbt Core imports, and writes core to the workspace", async () => {
    const { svc, telemetry } = service({
      dbtCore: { importable: true, version: "1.12.6" },
    });
    await svc.resolve(new FakeMemento() as never);
    (window.showInformationMessage as jest.Mock).mockReturnValueOnce(
      Promise.resolve("Switch back to dbt Core"),
    );
    await svc.notifyProjects([jaffle]);
    const [message, ...actions] = shown()[0];
    expect(message).toContain("dbt Core 1.12.6 is also installed");
    expect(actions).toEqual(["Switch back to dbt Core", "Open setting"]);
    expect(update).toHaveBeenCalledWith(
      "dbtIntegration",
      "core",
      ConfigurationTarget.Workspace,
    );
    expect(telemetry.sendTelemetryEvent).toHaveBeenCalledWith(
      "dbtIntegrationSwitchBack",
      { binaryVersion: "2.0.9" },
    );
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
