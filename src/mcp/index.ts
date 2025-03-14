import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import express from "express";
import {
  commands,
  Disposable,
  ProgressLocation,
  Uri,
  window,
  workspace,
} from "vscode";
import { provideSingleton } from "../utils";
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import { DbtPowerUserMcpServerTools } from "./server";
import {
  AltimateRequest,
  DBTProjectContainer,
  TelemetryEvents,
  TelemetryService,
} from "@extension";
import { SharedStateService } from "../services/sharedStateService";

const PORT = 7891;

@provideSingleton(DbtPowerUserMcpServer)
export class DbtPowerUserMcpServer implements Disposable {
  private disposables: Disposable[] = [];
  constructor(
    private dbtPowerUserMcpServerTools: DbtPowerUserMcpServerTools,
    private dbtTerminal: DBTTerminal,
    private altimate: AltimateRequest,
    private emitterService: SharedStateService,
    private telemetry: TelemetryService,
    private dbtProjectContainer: DBTProjectContainer,
  ) {
    this.disposables.push(
      emitterService.eventEmitter.event((d) => {
        if (d.command === "dbtProjectsInitialized") {
          this.start();
          // this.startOnboarding();
        }
      }),
    );
  }

  private async startOnboarding() {
    this.dbtTerminal.info("DbtPowerUserMcpServer", "Starting onboarding");
    this.telemetry.sendTelemetryEvent(TelemetryEvents["MCP/Onboarding"], {
      name: "Onboarding",
    });

    const isCursorIde =
      process.env.VSCODE_CWD?.includes("Cursor") ||
      !!process.env.CURSOR_TRACE_ID;
    const mcpServerOnboardingCompleted =
      this.dbtProjectContainer.getFromGlobalState(
        "mcpServerOnboardingCompleted",
      );

    if (isCursorIde && !mcpServerOnboardingCompleted) {
      const answer = await window.showInformationMessage(
        "dbt Power User now supports enhanced features in Cursor IDE through MCP server integration. Would you like to set it up?",
        { modal: false },
        "Set Up Now",
        "Later",
      );

      if (answer === "Set Up Now") {
        this.telemetry.sendTelemetryEvent(
          TelemetryEvents["MCP/Onboarding/SetUpNow"],
        );
        const workspaceFolders = workspace.workspaceFolders;
        if (!workspaceFolders) {
          window.showErrorMessage(
            "Setting up MCP server currently requires opening a workspace",
          );
          return;
        }
        // convert this to series of window.showInformationMessage
        const steps = [
          "Step 1: Configure MCP server",
          "Step 2: Enable the MCP server in Cursor settings",
          "Step 3: Try out the chat",
        ];
        for (const step of steps) {
          const result = await window.showInformationMessage(step, "Next");
          if (result === "Next") {
            continue;
          }
          return;
        }
        return;
      }
      this.telemetry.sendTelemetryEvent(
        TelemetryEvents["MCP/Onboarding/Later"],
      );
    }
  }

  private async start() {
    if (!this.altimate.handlePreviewFeatures()) {
      this.dbtTerminal.info(
        "DbtPowerUserMcpServer",
        "Preview features are not enabled, skipping MCP server start",
      );
      return;
    }
    this.dbtTerminal.info("DbtPowerUserMcpServer", "Starting MCP server");
    const { server, cleanup } = this.dbtPowerUserMcpServerTools.createServer();
    const app = express();
    let transport: SSEServerTransport;

    // Add error handling middleware
    app.use(
      (
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
      ) => {
        this.dbtTerminal.error("DbtPowerUserMcpServer", "Express error", {
          error: err.message,
          stack: err.stack,
          path: req.path,
          method: req.method,
        });
        res.status(500).json({
          error: "Internal Server Error",
          message: err.message,
        });
      },
    );

    // Add async error handling wrapper
    const asyncHandler =
      (fn: Function) =>
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
      ) => {
        Promise.resolve(fn(req, res, next)).catch(next);
      };

    app.get(
      "/sse",
      asyncHandler(async (req: express.Request, res: express.Response) => {
        this.dbtTerminal.info("DbtPowerUserMcpServer", "Received connection");
        transport = new SSEServerTransport("/message", res);
        await server.connect(transport);

        server.onclose = async () => {
          await cleanup();
          await server.close();
        };

        transport.onerror = (error) => {
          this.dbtTerminal.error("DbtPowerUserMcpServer", "Error", { error });
        };
      }),
    );

    app.post(
      "/message",
      asyncHandler(async (req: express.Request, res: express.Response) => {
        this.dbtTerminal.debug("DbtPowerUserMcpServer", "Received message", {
          params: req.params,
        });

        try {
          await transport.handlePostMessage(req, res);
        } catch (error) {
          this.dbtTerminal.error("DbtPowerUserMcpServer", "Error", { error });
        }
      }),
    );

    app.listen(PORT, () => {
      this.dbtTerminal.debug("DbtPowerUserMcpServer", "Server is running", {
        port: PORT,
      });
    });
  }

  dispose() {
    this.disposables.forEach((disposable) => disposable.dispose());
  }
}
