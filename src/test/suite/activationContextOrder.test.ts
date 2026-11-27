import { afterEach, describe, expect, it, jest } from "@jest/globals";
import { window, workspace } from "vscode";
import { setEffectiveDbtIntegrationMode } from "../../dbt_client/integrationMode";
import { DBTPowerUserExtension } from "../../dbtPowerUserExtension";

jest.mock("vscode", () => jest.requireActual("../mock/vscode"));

// A webview view VS Code restores on window reload is resolved as soon as its
// provider is registered, which happens when the container builds the
// providers, before `activate` runs. Resolving reads `extensionUri` off the
// project container, so the container must hold the context before `activate`
// first yields to the event loop.
describe("activate hands the context to the project container before its first await", () => {
  const stub = () => ({ dispose: jest.fn() }) as never;

  it("has called setContext by the time updateMcpExtensionApi is awaited", () => {
    // The shared mock has no uri handler registration; `activate` registers
    // one before its first await.
    (window as unknown as Record<string, unknown>).registerUriHandler = jest.fn(
      () => ({ dispose: () => undefined }),
    );
    const setContext = jest.fn();
    const container = {
      setContext,
      initializeWalkthrough: jest.fn(),
      detectDBT: jest.fn(),
      initializeDBTProjects: jest.fn(),
      dispose: jest.fn(),
    };
    // Never settles: `activate` stays parked on its first await, so anything
    // sequenced after that await has provably not run when we assert.
    const updateMcpExtensionApi = jest.fn(
      () => new Promise<void>(() => undefined),
    );
    const mcpServer = { updateMcpExtensionApi, dispose: jest.fn() };
    const telemetry = {
      sendTelemetryError: jest.fn(),
      sendTelemetryEvent: jest.fn(),
      dispose: jest.fn(),
    };
    const extension = new DBTPowerUserExtension(
      container as never,
      stub(),
      stub(),
      stub(),
      stub(),
      stub(),
      stub(),
      stub(),
      stub(),
      stub(),
      stub(),
      telemetry as never,
      stub(),
      stub(),
      stub(),
      stub(),
      mcpServer as never,
      stub(),
      stub(),
      stub(),
      stub(),
      stub(),
    );
    const context = { subscriptions: [] } as never;

    void extension.activate(context);

    expect(updateMcpExtensionApi).toHaveBeenCalledTimes(1);
    expect(setContext).toHaveBeenCalledWith(context);
    expect(container.initializeWalkthrough).not.toHaveBeenCalled();
  });
});

describe("activate listens for dbt.dbtIntegration before the held-switch notice", () => {
  const stub = () => ({ dispose: jest.fn() }) as never;

  // The notice comes after dbt detection: where dbt Core mode can't start,
  // detection shows why the window was held instead (as its "dbt is not
  // installed" error), and the notice then shows nothing.
  it("has registered the configuration listener when notifySwitchHeld runs, after detection", async () => {
    (window as unknown as Record<string, unknown>).registerUriHandler = jest.fn(
      () => ({ dispose: () => undefined }),
    );
    const onDidChangeConfiguration =
      workspace.onDidChangeConfiguration as unknown as jest.Mock;
    onDidChangeConfiguration.mockClear();
    let listenerAtNotice: boolean | undefined;
    let detectedAtNotice: boolean | undefined;
    let detected = false;
    let finishDetection: () => void = () => undefined;
    const integrationModeService = {
      resolve: jest.fn(() => Promise.resolve("core")),
      notifySwitchHeld: jest.fn(() => {
        listenerAtNotice = onDidChangeConfiguration.mock.calls.length > 0;
        detectedAtNotice = detected;
        return Promise.resolve();
      }),
    };
    const container = {
      setContext: jest.fn(),
      initializeWalkthrough: jest.fn(),
      // Settles only when the test says so.
      detectDBT: jest.fn(
        () =>
          new Promise<void>((resolve) => {
            finishDetection = () => {
              detected = true;
              resolve();
            };
          }),
      ),
      // Never settles: the rest of activate never runs.
      initializeDBTProjects: jest.fn(() => new Promise<void>(() => undefined)),
      dispose: jest.fn(),
    };
    const mcpServer = {
      updateMcpExtensionApi: jest.fn(() => Promise.resolve()),
      dispose: jest.fn(),
    };
    const telemetry = {
      sendTelemetryError: jest.fn(),
      sendTelemetryEvent: jest.fn(),
      dispose: jest.fn(),
    };
    const whatsNewPanel = {
      checkAndShowOnActivation: jest.fn(() => Promise.resolve()),
      dispose: jest.fn(),
    };
    const args: unknown[] = [container];
    for (let i = 1; i < 22; i++) {
      args.push(stub());
    }
    args[11] = telemetry;
    args[16] = mcpServer;
    args[19] = whatsNewPanel;
    args[21] = integrationModeService;
    const extension = new (DBTPowerUserExtension as unknown as new (
      ...a: unknown[]
    ) => DBTPowerUserExtension)(...args);

    void extension.activate({
      subscriptions: [],
      workspaceState: {},
    } as never);
    await new Promise((r) => setImmediate(r));
    // Detection is still running: no notice yet.
    expect(container.detectDBT).toHaveBeenCalledTimes(1);
    expect(integrationModeService.notifySwitchHeld).not.toHaveBeenCalled();

    finishDetection();
    await new Promise((r) => setImmediate(r));
    expect(integrationModeService.notifySwitchHeld).toHaveBeenCalledTimes(1);
    expect(listenerAtNotice).toBe(true);
    expect(detectedAtNotice).toBe(true);
  });
});

// The recent dbt Core hold rests on this: a dbt Core mode window whose
// project read dbt 1.x records it, so other windows aren't switched to dbt
// Fusion for a while.
describe("activate records dbt Core working from a dbt Core mode window", () => {
  const stub = () => ({ dispose: jest.fn() }) as never;
  type Rebuild = {
    project: { getDBTVersion: () => number[] | undefined };
    inProgress: boolean;
  };

  afterEach(() => setEffectiveDbtIntegrationMode(undefined));

  async function activateIn(mode: string) {
    (window as unknown as Record<string, unknown>).registerUriHandler = jest.fn(
      () => ({ dispose: () => undefined }),
    );
    const listeners: ((event: Rebuild) => void)[] = [];
    const integrationModeService = {
      resolve: jest.fn(() => {
        setEffectiveDbtIntegrationMode(mode);
        return Promise.resolve(mode);
      }),
      notifySwitchHeld: jest.fn(() => Promise.resolve()),
      dbtCoreWorked: jest.fn(() => Promise.resolve()),
      dispose: jest.fn(),
    };
    const container = {
      setContext: jest.fn(),
      initializeWalkthrough: jest.fn(),
      onProjectRebuildManifestStatusChange: jest.fn(
        (listener: (event: Rebuild) => void) => {
          listeners.push(listener);
          return { dispose: jest.fn() };
        },
      ),
      detectDBT: jest.fn(() => Promise.resolve()),
      // Never settles: the rest of activate never runs.
      initializeDBTProjects: jest.fn(() => new Promise<void>(() => undefined)),
      dispose: jest.fn(),
    };
    const args: unknown[] = [container];
    for (let i = 1; i < 22; i++) {
      args.push(stub());
    }
    args[11] = {
      sendTelemetryError: jest.fn(),
      sendTelemetryEvent: jest.fn(),
      dispose: jest.fn(),
    };
    args[16] = {
      updateMcpExtensionApi: jest.fn(() => Promise.resolve()),
      dispose: jest.fn(),
    };
    args[19] = {
      checkAndShowOnActivation: jest.fn(() => Promise.resolve()),
      dispose: jest.fn(),
    };
    args[21] = integrationModeService;
    const extension = new (DBTPowerUserExtension as unknown as new (
      ...a: unknown[]
    ) => DBTPowerUserExtension)(...args);
    void extension.activate({
      subscriptions: [],
      workspaceState: {},
      globalState: {},
    } as never);
    await new Promise((r) => setImmediate(r));
    const rebuilt = (version: number[] | undefined, inProgress = false) =>
      listeners.forEach((listener) =>
        listener({ project: { getDBTVersion: () => version }, inProgress }),
      );
    return { extension, rebuilt, listeners, integrationModeService };
  }

  it("stops the window's trial when the extension is disposed", async () => {
    const { extension, integrationModeService } = await activateIn("core");

    extension.dispose();

    expect(integrationModeService.dispose).toHaveBeenCalledTimes(1);
  });

  it.each(["core", "corecommand"])(
    "records it in a %s window when a project's rebuild read dbt 1.x",
    async (mode) => {
      const { rebuilt, listeners, integrationModeService } =
        await activateIn(mode);

      rebuilt([1, 9, 0], true);
      rebuilt([2, 0, 12]);
      rebuilt(undefined);
      expect(integrationModeService.dbtCoreWorked).not.toHaveBeenCalled();
      // A version reader that throws doesn't throw out of the rebuild event.
      expect(() =>
        listeners.forEach((listener) =>
          listener({
            project: {
              getDBTVersion: () => {
                throw new Error("not initialized");
              },
            },
            inProgress: false,
          }),
        ),
      ).not.toThrow();
      expect(integrationModeService.dbtCoreWorked).not.toHaveBeenCalled();

      rebuilt([1, 9, 0]);
      expect(integrationModeService.dbtCoreWorked).toHaveBeenCalledTimes(1);
    },
  );

  it.each(["fusion", "cloud"])(
    "doesn't listen in a %s window",
    async (mode) => {
      const { listeners } = await activateIn(mode);
      expect(listeners).toHaveLength(0);
    },
  );
});
