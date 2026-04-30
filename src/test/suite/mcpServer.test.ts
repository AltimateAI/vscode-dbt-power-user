import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import { extensions } from "../mock/vscode";

const mockDbtTerminal = {
  error: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
};

const mockMcpServerTools = {
  getMcpTools: jest.fn().mockReturnValue([]),
  dispose: jest.fn(),
};

const mockAltimate = {};

const mockEventEmitter = {
  eventEmitter: {
    event: jest.fn().mockReturnValue({ dispose: jest.fn() }),
  },
};

const mockAltimateAuthService = {
  handlePreviewFeatures: jest.fn().mockReturnValue(true),
};

describe("DbtPowerUserMcpServer", () => {
  let DbtPowerUserMcpServer: any;

  beforeEach(async () => {
    jest.clearAllMocks();
    const mod = await import("../../mcp/index");
    DbtPowerUserMcpServer = mod.DbtPowerUserMcpServer;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const createServer = () => {
    return new DbtPowerUserMcpServer(
      mockMcpServerTools as any,
      mockDbtTerminal as any,
      mockAltimate as any,
      mockEventEmitter as any,
      mockAltimateAuthService as any,
    );
  };

  describe("updateMcpExtensionApi", () => {
    it("should handle missing MCP extension gracefully", async () => {
      (extensions.getExtension as jest.Mock).mockReturnValue(undefined);

      const server = createServer();
      await server.updateMcpExtensionApi();

      expect(mockDbtTerminal.error).toHaveBeenCalledWith(
        "DbtPowerUserMcpServer: enableMcpExtensionIntegration",
        "Failed to install MCP extension",
        expect.objectContaining({
          message: "Failed to install Altimate MCP Server extension",
        }),
      );
    });

    it("should handle extension with undefined exports without crashing", async () => {
      const mockExtension = {
        isActive: true,
        activate: jest.fn(),
        exports: undefined,
      };
      (extensions.getExtension as jest.Mock).mockReturnValue(mockExtension);

      const server = createServer();
      await server.updateMcpExtensionApi();

      expect(mockDbtTerminal.error).toHaveBeenCalledWith(
        "DbtPowerUserMcpServer:updateMcpExtensionApiError",
        "MCP extension exports not available",
        expect.objectContaining({
          message: "Extension activated but exports are undefined",
        }),
      );
    });

    it("should activate inactive extension before accessing exports", async () => {
      const activateFn = jest.fn().mockResolvedValue(undefined as never);
      const mockExtension = {
        isActive: false,
        activate: activateFn,
        exports: undefined,
      };
      (extensions.getExtension as jest.Mock).mockReturnValue(mockExtension);

      const server = createServer();
      await server.updateMcpExtensionApi();

      expect(activateFn).toHaveBeenCalled();
      expect(mockDbtTerminal.error).toHaveBeenCalledWith(
        "DbtPowerUserMcpServer:updateMcpExtensionApiError",
        "MCP extension exports not available",
        expect.any(Object),
      );
    });

    it("should await exports.ready and register API when exports are valid", async () => {
      const mockAddMcpIntegrationConfig = jest
        .fn()
        .mockResolvedValue(undefined as never);
      const mockExtension = {
        isActive: true,
        activate: jest.fn(),
        exports: {
          ready: Promise.resolve(),
          registerTools: jest.fn(),
          addMcpIntegrationConfig: mockAddMcpIntegrationConfig,
        },
      };
      (extensions.getExtension as jest.Mock).mockReturnValue(mockExtension);

      const server = createServer();
      await server.updateMcpExtensionApi();

      expect(mockAddMcpIntegrationConfig).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            title: "Advanced Data Tools",
          }),
        ]),
      );
    });

    it("should handle exports.ready rejection gracefully", async () => {
      const mockExtension = {
        isActive: true,
        activate: jest.fn(),
        exports: {
          ready: Promise.reject(new Error("Extension init failed")),
        },
      };
      (extensions.getExtension as jest.Mock).mockReturnValue(mockExtension);

      const server = createServer();
      await server.updateMcpExtensionApi();

      expect(mockDbtTerminal.error).toHaveBeenCalledWith(
        "DbtPowerUserMcpServer:updateMcpExtensionApiError",
        "Error updating MCP extension API",
        expect.objectContaining({ message: "Extension init failed" }),
      );
    });
  });
});
