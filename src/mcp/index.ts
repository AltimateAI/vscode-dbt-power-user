import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import express from "express";
import { Disposable } from "vscode";
import { provideSingleton } from "../utils";
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import { DbtPowerUserMcpServerTools } from "./server";
import { AltimateRequest } from "@extension";

const PORT = 7891;

@provideSingleton(DbtPowerUserMcpServer)
export class DbtPowerUserMcpServer implements Disposable {
  private disposables: Disposable[] = [];
  constructor(
    private dbtPowerUserMcpServerTools: DbtPowerUserMcpServerTools,
    private dbtTerminal: DBTTerminal,
    private altimate: AltimateRequest,
  ) {
    this.start();
  }

  private async start() {
    if (!this.altimate.handlePreviewFeatures()) {
      this.dbtTerminal.info(
        "DbtPowerUserMcpServer",
        "Preview features are not enabled, skipping MCP server start",
      );
      return;
    }
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
