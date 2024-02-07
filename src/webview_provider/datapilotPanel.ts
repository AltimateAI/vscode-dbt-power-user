import { pipeline } from "node:stream";
import { promisify } from "node:util";
import { commands, window, workspace } from "vscode";
import { provideSingleton } from "../utils";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { TelemetryService } from "../telemetry";
import {
  AltimateWebviewProvider,
  SharedStateEventEmitterProps,
  HandleCommandProps,
} from "./altimateWebviewProvider";
import { DocGenService } from "../services/docGenService";
import { AltimateRequest, QueryAnalysisType } from "../altimate";
import { SharedStateService } from "../services/sharedStateService";
import { QueryAnalysisService } from "../services/queryAnalysisService";
import { createWriteStream } from "node:fs";

@provideSingleton(DataPilotPanel)
export class DataPilotPanel extends AltimateWebviewProvider {
  public static readonly viewType = "dbtPowerUser.datapilot-webview";
  protected viewPath = "/datapilot";
  protected panelDescription = "Datapilot view";
  private incomingMessages: Record<string, unknown>[] = [];

  public constructor(
    dbtProjectContainer: DBTProjectContainer,
    telemetry: TelemetryService,
    protected altimateRequest: AltimateRequest,
    private docGenService: DocGenService,
    protected emitterService: SharedStateService,
    protected queryAnalysisService: QueryAnalysisService,
  ) {
    super(dbtProjectContainer, altimateRequest, telemetry, emitterService);

    commands.registerCommand(
      "dbtPowerUser.resetDatapilot",
      () =>
        this._panel?.webview.postMessage({
          command: "datapilot:reset",
          args: {},
        }),
    );

    commands.registerCommand("dbtPowerUser.datapilotExplain", async () => {
      await commands.executeCommand("dbtPowerUser.datapilot-webview.focus");

      const fileName = window.activeTextEditor?.document.fileName;
      // TODO get current selection
      const query = window.activeTextEditor?.document.getText();
      const data = {
        command: "datapilot:message",
        id: "sarav",
        query: "Explain query",
        requestType: 2,
        state: 0,
        code: query,
        fileName,
        analysisType: QueryAnalysisType.EXPLAIN,
        actions: [{ title: "Explain", command: "queryAnalysis:explain" }],
      };

      if (!this.isWebviewReady) {
        this.incomingMessages.push(data);
        return;
      }
      this.postToWebview(data);
    });
  }

  // readChunks() reads from the provided reader and yields the results into an async iterable
  readChunks(reader: any) {
    return {
      async *[Symbol.asyncIterator]() {
        let readResult = await reader.read();
        while (!readResult.done) {
          yield readResult.value;
          readResult = await reader.read();
        }
      },
    };
  }

  streamToString(stream: NodeJS.ReadableStream, cb: (data: string) => void) {
    const chunks: Buffer[] = [];
    return new Promise((resolve, reject) => {
      stream.on("data", (chunk: Uint8Array) => {
        cb(new TextDecoder().decode(chunk));
        chunks.push(Buffer.from(chunk));
        // cb(Buffer.concat(chunks).toString("utf8"));
      });
      stream.on("error", (err: unknown) => reject(err));
      stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    });
  }

  async handleCommand(message: HandleCommandProps): Promise<void> {
    const { command, syncRequestId, ...params } = message;
    const queryText = window.activeTextEditor?.document.getText();

    switch (command) {
      case "getNewDocsPanelState":
        const newDocsPanelState = workspace
          .getConfiguration("dbt")
          .get<boolean>("enableNewDocsPanel", false);

        this._panel!.webview.postMessage({
          command: "response",
          args: {
            syncRequestId,
            body: {
              enabled: newDocsPanelState,
            },
            status: true,
          },
        });
        break;
      case "enableNewDocsPanel":
        this.emitterService.fire({
          command: "enableNewDocsPanel",
          payload: params,
        });
        break;
      case "sendFeedback":
        if (!queryText) {
          return;
        }
        this.docGenService.sendFeedback({
          queryText,
          message,
          eventMap: this.eventMap,
          panel: this._panel,
        });
        break;
      case "generateDocsForModel":
        if (!queryText) {
          return;
        }
        this.docGenService.generateDocsForModel({
          queryText,
          documentation: await this.docGenService.getDocumentation(
            this.eventMap,
          ),
          message,
          panel: this._panel,
          project: this.docGenService.getProject(),
        });
        break;
      case "generateDocsForColumn":
        await this.docGenService.generateDocsForColumns({
          documentation: await this.docGenService.getDocumentation(
            this.eventMap,
          ),
          panel: this._panel,
          message,
          project: this.docGenService.getProject(),
        });
        break;
      case "docgen:insert":
        this.emitterService.eventEmitter.fire({
          command: "docgen:insert",
          payload: params,
        });
        break;
      case "queryAnalysis:explain":
        const query = window.activeTextEditor?.document.getText() || "";
        const response = await this.queryAnalysisService.executeQueryExplain(
          query,
          this.eventMap,
        );
        if (!response?.body) {
          console.error("empty result");
          return;
        }
        // response.body is a ReadableStream
        // const reader = result.body.getReader();
        // for await (const chunk of this.readChunks(reader)) {
        //   console.log(`received chunk of size ${chunk.length}`, chunk);
        // }

        const responseText = await this.streamToString(
          response.body,
          (chunk: string) => {
            this._panel!.webview.postMessage({
              command: "response",
              args: {
                syncRequestId,
                body: { chunk },
                status: true,
              },
            });
          },
        );

        // res.on("readable", () => {
        //   let chunk;
        //   while (null !== (chunk = res.read())) {
        //     console.log(chunk.toString());
        //   }
        // });

        // const streamPipeline = promisify(pipeline);
        // await streamPipeline(response.body, createWriteStream("./octocat.png"));

        this._panel!.webview.postMessage({
          command: "response",
          args: {
            syncRequestId,
            body: { responseText },
            status: true,
          },
        });
        break;
      default:
        super.handleCommand(message);
        break;
    }
  }

  protected async onEvent({ command, payload }: SharedStateEventEmitterProps) {
    switch (command) {
      case "datapilot:toggle":
        await commands.executeCommand("dbtPowerUser.datapilot-webview.focus");
        break;
      case "datapilot:message":
        await commands.executeCommand("dbtPowerUser.datapilot-webview.focus");
        if (!this.isWebviewReady) {
          this.incomingMessages.push(payload);
          return;
        }
        this.postToWebview(payload);
        break;
      default:
        break;
    }
  }

  protected onWebviewReady() {
    super.onWebviewReady();

    if (!this._panel) {
      return;
    }

    while (this.incomingMessages.length) {
      this.postToWebview(this.incomingMessages.pop());
    }
  }

  private postToWebview(message: unknown) {
    if (this._panel) {
      this._panel.webview.postMessage({
        command: "datapilot:message",
        args: message,
      });
    }
  }
}
