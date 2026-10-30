import { describe, expect, it, jest } from "@jest/globals";
import { window } from "vscode";
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
    );
    const context = { subscriptions: [] } as never;

    void extension.activate(context);

    expect(updateMcpExtensionApi).toHaveBeenCalledTimes(1);
    expect(setContext).toHaveBeenCalledWith(context);
    expect(container.initializeWalkthrough).not.toHaveBeenCalled();
  });
});
