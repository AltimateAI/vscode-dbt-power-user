import { describe, expect, it, jest } from "@jest/globals";
import { window, workspace } from "vscode";
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

  it("has registered the configuration listener when notifySwitchHeld runs", async () => {
    (window as unknown as Record<string, unknown>).registerUriHandler = jest.fn(
      () => ({ dispose: () => undefined }),
    );
    const onDidChangeConfiguration =
      workspace.onDidChangeConfiguration as unknown as jest.Mock;
    onDidChangeConfiguration.mockClear();
    let listenerAtNotice: boolean | undefined;
    const integrationModeService = {
      resolve: jest.fn(() => Promise.resolve("core")),
      notifySwitchHeld: jest.fn(() => {
        listenerAtNotice = onDidChangeConfiguration.mock.calls.length > 0;
        return Promise.resolve();
      }),
    };
    const container = {
      setContext: jest.fn(),
      initializeWalkthrough: jest.fn(),
      // Detection never settles: the rest of activate never runs.
      detectDBT: jest.fn(() => new Promise<void>(() => undefined)),
      initializeDBTProjects: jest.fn(),
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

    expect(integrationModeService.notifySwitchHeld).toHaveBeenCalledTimes(1);
    expect(listenerAtNotice).toBe(true);
  });
});
