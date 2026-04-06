import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { workspace } from "vscode";
import { NewLineagePanel } from "../../webview_provider/newLineagePanel";

describe("NewLineagePanel", () => {
  let panel: NewLineagePanel;
  let mockPostMessage: jest.Mock;

  beforeEach(() => {
    mockPostMessage = jest.fn();

    // Create a minimal instance by bypassing the constructor DI.
    // We only need the methods under test and the _panel webview stub.
    panel = Object.create(NewLineagePanel.prototype);

    // Stub the internal webview panel so postMessage is captured.
    (panel as any)._panel = {
      webview: { postMessage: mockPostMessage },
    };

    // Stub dependencies used by getStartingNode / renderStartingNode
    (panel as any).queryManifestService = {
      getEventByCurrentProject: jest.fn().mockReturnValue(undefined),
      getProject: jest.fn().mockReturnValue(undefined),
    };
    (panel as any).altimate = { enabled: jest.fn().mockReturnValue(false) };
    (panel as any).dbtTerminal = {
      info: jest.fn(),
      debug: jest.fn(),
      error: jest.fn(),
    };
  });

  describe("eventMapChanged", () => {
    it("should re-render the starting node when the event map updates", () => {
      const eventMap = new Map();

      panel.eventMapChanged(eventMap);

      // renderStartingNode posts a "render" command to the webview
      expect(mockPostMessage).toHaveBeenCalledWith(
        expect.objectContaining({ command: "render" }),
      );
    });

    it("should not throw when panel is not visible", () => {
      (panel as any)._panel = undefined;
      const eventMap = new Map();

      expect(() => panel.eventMapChanged(eventMap)).not.toThrow();
    });
  });

  describe("getLineageSettings — defaultExpansion cap", () => {
    it("should cap defaultExpansion at 5 when user sets a higher value", async () => {
      const mockConfig = {
        get: jest
          .fn<any>()
          .mockImplementation((key: string, defaultVal: unknown) => {
            if (key === "defaultExpansion") {
              return 10;
            }
            return defaultVal;
          }),
      };
      (workspace.getConfiguration as jest.Mock).mockReturnValue(mockConfig);

      // Call handleCommand with getLineageSettings
      await (panel as any).handleCommand({
        command: "getLineageSettings",
        args: {},
        syncRequestId: "test-sync-1",
      });

      expect(mockPostMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          command: "response",
          args: expect.objectContaining({
            body: expect.objectContaining({
              defaultExpansion: 5,
            }),
          }),
        }),
      );
    });

    it("should pass through defaultExpansion when within limit", async () => {
      const mockConfig = {
        get: jest
          .fn<any>()
          .mockImplementation((key: string, defaultVal: unknown) => {
            if (key === "defaultExpansion") {
              return 3;
            }
            return defaultVal;
          }),
      };
      (workspace.getConfiguration as jest.Mock).mockReturnValue(mockConfig);

      await (panel as any).handleCommand({
        command: "getLineageSettings",
        args: {},
        syncRequestId: "test-sync-2",
      });

      expect(mockPostMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          command: "response",
          args: expect.objectContaining({
            body: expect.objectContaining({
              defaultExpansion: 3,
            }),
          }),
        }),
      );
    });

    it("should use default value of 1 when setting is not configured", async () => {
      const mockConfig = {
        get: jest
          .fn<any>()
          .mockImplementation((_key: string, defaultVal: unknown) => {
            return defaultVal;
          }),
      };
      (workspace.getConfiguration as jest.Mock).mockReturnValue(mockConfig);

      await (panel as any).handleCommand({
        command: "getLineageSettings",
        args: {},
        syncRequestId: "test-sync-3",
      });

      expect(mockPostMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          command: "response",
          args: expect.objectContaining({
            body: expect.objectContaining({
              defaultExpansion: 1,
            }),
          }),
        }),
      );
    });
  });
});
