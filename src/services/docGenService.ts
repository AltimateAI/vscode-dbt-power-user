import path = require("path");
import {
  ProgressLocation,
  Uri,
  WebviewPanel,
  WebviewView,
  env,
  window,
} from "vscode";
import { AltimateRequest, DocsGenerateResponse } from "../altimate";
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import { RateLimitException } from "../exceptions";
import { DBTProject } from "../manifest/dbtProject";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { TelemetryService } from "../telemetry";
import { extendErrorWithSupportLinks, provideSingleton } from "../utils";
import {
  AIColumnDescription,
  DBTDocumentation,
  Source,
} from "../webview_provider/docsEditPanel";
import { QueryManifestService } from "./queryManifestService";
import { TelemetryEvents } from "../telemetry/events";

interface GenerateDocsForColumnsProps {
  panel: WebviewView | WebviewPanel | undefined;
  message: any;
  project: DBTProject | undefined;
  documentation: DBTDocumentation | undefined;
  isBulkGen: boolean;
}

interface GenerateDocsForModelProps {
  panel: WebviewView | WebviewPanel | undefined;
  documentation: DBTDocumentation | undefined;
  queryText: string;
  project: DBTProject | undefined;
  message: any;
  columnIndexCount: number | undefined;
  isBulkGen: boolean;
}

interface FeedbackRequestProps {
  panel: WebviewView | WebviewPanel | undefined;
  queryText: string;
  message: any;
  syncRequestId?: string;
}

const COLUMNS_PER_CHUNK = 3;

@provideSingleton(DocGenService)
export class DocGenService {
  public constructor(
    private altimateRequest: AltimateRequest,
    protected dbtProjectContainer: DBTProjectContainer,
    protected telemetry: TelemetryService,
    private queryManifestService: QueryManifestService,
    private dbtTerminal: DBTTerminal,
  ) {}

  private async generateDocsForColumn(
    documentation: DBTDocumentation | undefined,
    compiledSql: string | undefined,
    adapter: string,
    message: any,
    columns: string[],
    columnIndexCount: number | undefined = undefined,
    sessionID: string | undefined = undefined,
    isBulkGen: boolean = false,
  ): Promise<DocsGenerateResponse | undefined> {
    return new Promise(async (resolve, reject) => {
      if (!documentation) {
        return resolve(undefined);
      }

      try {
        const result = await this.altimateRequest.generateModelDocsV2({
          columns,
          dbt_model: {
            model_name: documentation.name,
            model_description: message.description,
            compiled_sql: compiledSql,
            columns: message.columns.map((column: any) => ({
              column_name: column.name,
              description: column.description,
              data_type: column.type,
            })),
            adapter,
          },
          gen_model_description: false,
          user_instructions: message.user_instructions,
          follow_up_instructions: message.follow_up_instructions,
          column_index_count: columnIndexCount,
          session_id: sessionID,
          is_bulk_gen: isBulkGen,
        });

        return resolve(result);
      } catch (err) {
        this.dbtTerminal.debug(
          "docGenService:generateDocsForColumn",
          "error while generating column doc" + err,
          columns,
        );

        if (err instanceof RateLimitException) {
          setTimeout(async () => {
            this.dbtTerminal.debug(
              "docGenService:generateDocsForColumn",
              "retrying generating column doc",
              columns,
            );
            return resolve(
              await this.generateDocsForColumn(
                documentation,
                compiledSql,
                adapter,
                message,
                columns,
              ),
            );
          }, err.retryAfter);
          return;
        }
        reject(err);
      }
    });
  }

  private async transmitAIGeneratedColumnDocs(
    panel: WebviewView | WebviewPanel | undefined,
    generatedColumnDescriptions: AIColumnDescription[],
    syncRequestId?: string,
  ) {
    if (panel) {
      const result = syncRequestId
        ? {
            command: "response",
            args: {
              body: { columns: generatedColumnDescriptions },
              syncRequestId,
              status: true,
            },
          }
        : {
            command: "renderAIGeneratedColumnDocs",
            columns: generatedColumnDescriptions,
          };
      await panel.webview.postMessage(result);
    }
  }

  private async transmitError(panel?: WebviewView | WebviewPanel) {
    if (panel) {
      await panel.webview.postMessage({
        command: "renderError",
      });
    }
  }

  private async transmitAIGeneratedModelDocs(
    description: string,
    syncRequestId?: string,
    panel?: WebviewView | WebviewPanel,
  ) {
    if (panel) {
      const result = syncRequestId
        ? {
            command: "response",
            args: { body: { description }, syncRequestId, status: true },
          }
        : {
            command: "renderAIGeneratedModelDocs",
            description,
          };
      await panel.webview.postMessage(result);
    }
  }

  public async getDocumentationForCurrentActiveFile() {
    return this.getDocumentation(window.activeTextEditor?.document?.uri.fsPath);
  }

  private getMissingDocumentationMessage(filePath?: string) {
    const message =
      "A valid dbt model file needs to be open and active in the editor area above to view documentation for that model.";
    if (!filePath) {
      return { message, type: "warning" };
    }
    try {
      this.queryManifestService
        .getProjectByUri(Uri.file(filePath))
        ?.throwDiagnosticsErrorIfAvailable();
    } catch (err) {
      return { message: (err as Error).message, type: "error" };
    }

    return { message, type: "warning" };
  }

  public async getDocumentation(filePath?: string): Promise<{
    documentation: DBTDocumentation | undefined;
    message?: { message: string; type: string };
  }> {
    const eventResult = this.queryManifestService.getEventByCurrentProject();
    if (!eventResult) {
      return {
        documentation: undefined,
        message: this.getMissingDocumentationMessage(filePath),
      };
    }
    const { event } = eventResult;

    if (!event || !filePath) {
      return {
        documentation: undefined,
        message: this.getMissingDocumentationMessage(filePath),
      };
    }

    const modelName = path.basename(filePath, ".sql");
    const currentNode = event.nodeMetaMap.get(modelName);
    if (currentNode === undefined) {
      return {
        documentation: undefined,
        message: this.getMissingDocumentationMessage(filePath),
      };
    }

    const docColumns = currentNode.columns;
    return {
      documentation: {
        aiEnabled: this.altimateRequest.enabled(),
        name: modelName,
        patchPath: currentNode.patch_path,
        description: currentNode.description,
        generated: false,
        resource_type: currentNode.resource_type,
        uniqueId: currentNode.uniqueId,
        filePath,
        columns: Object.values(docColumns).map((column) => {
          return {
            name: column.name,
            description: column.description,
            generated: false,
            source: Source.YAML,
            type: column.data_type?.toLowerCase(),
          };
        }),
      } as DBTDocumentation,
    };
  }

  private chunk(a: string[], n: number) {
    return [...Array(Math.ceil(a.length / n))].map((_, i) =>
      a.slice(n * i, n + n * i),
    );
  }

  /**
   * handles single or multi column bulk generation
   */
  public async generateDocsForColumns({
    project,
    message,
    documentation,
    panel,
    isBulkGen,
  }: GenerateDocsForColumnsProps) {
    if (!this.altimateRequest.handlePreviewFeatures()) {
      return;
    }
    if (!project || !window.activeTextEditor) {
      return;
    }

    const queryText = window.activeTextEditor.document.getText();
    const columns: string[] = message.columnName
      ? [message.columnName]
      : message.columnNames;

    const chunks = this.chunk(columns, COLUMNS_PER_CHUNK);
    const telemetryEventName = isBulkGen
      ? message.isAll
        ? TelemetryEvents["DocumentationEditor/BulkGenerateAllClick"]
        : TelemetryEvents["DocumentationEditor/BulkGenerateMissingColumnsClick"]
      : TelemetryEvents["DocumentationEditor/GenerateDescForColumnClick"];

    this.telemetry.startTelemetryEvent(telemetryEventName, {
      model: documentation?.name || "",
      columns: columns.join(","),
    });

    window.withProgress(
      {
        title: "",
        location: ProgressLocation.Notification,
        cancellable: false,
      },
      async (progress) => {
        if (documentation === undefined) {
          return;
        }
        try {
          const results: (DocsGenerateResponse | undefined)[] = [];
          const progressMessage =
            columns.length > COLUMNS_PER_CHUNK
              ? `Generating documentation for ${columns.length} columns`
              : `Generating documentation for ${
                  columns.length > 1 ? "columns" : "column"
                } ${columns.join(", ")}`;
          progress.report({
            message: progressMessage,
            increment: 0,
          });

          const compiledSql = await project.unsafeCompileQuery(queryText);
          const columnIndexCount = isBulkGen
            ? chunks.length * COLUMNS_PER_CHUNK
            : 1;
          const sessionID = `${
            env.sessionId
          }-${documentation?.name}-numColumns-${columnIndexCount}-${Date.now()}`;

          await Promise.all(
            chunks.map(async (chunk, i) => {
              const chunkResult = await this.generateDocsForColumn(
                documentation,
                compiledSql,
                project.getAdapterType(),
                message,
                chunk,
                i * COLUMNS_PER_CHUNK,
                sessionID,
                isBulkGen,
              );
              results.push(chunkResult);
              this.dbtTerminal.debug(
                "docGenService:generateDocsForColumns",
                "generate docs for columns chunk result",
                chunkResult,
              );
              progress.report({
                message: `Generated docs for ${Math.min(
                  results.length * COLUMNS_PER_CHUNK,
                  columns.length,
                )} of ${columns.length} columns`,
                increment: (chunk.length / columns.length) * 100,
              });
            }),
          );
          const generatedDocsForColumn = {
            column_descriptions: results
              .map((response) => response?.column_descriptions)
              .filter(
                (
                  item,
                ): item is NonNullable<
                  DocsGenerateResponse["column_descriptions"]
                > => !!item,
              )
              .flatMap((r) => r),
          };

          if (
            !generatedDocsForColumn ||
            !generatedDocsForColumn.column_descriptions
          ) {
            // nothing to do if nothing happened
            return;
          }
          this.transmitAIGeneratedColumnDocs(
            panel,
            generatedDocsForColumn.column_descriptions.map((entry) => ({
              name: entry.column_name,
              description: entry.column_description,
            })),
            message.syncRequestId,
          );
          this.telemetry.endTelemetryEvent(telemetryEventName, undefined, {
            model: documentation?.name || "",
            columns: columns.join(","),
          });
        } catch (error) {
          this.transmitError(panel);
          window.showErrorMessage(
            extendErrorWithSupportLinks(
              "Could not generate documentation: " + (error as Error).message,
            ),
          );
          this.telemetry.endTelemetryEvent(telemetryEventName, error, {
            model: documentation?.name || "",
            columns: columns.join(","),
          });
        }
      },
    );
  }

  public async generateDocsForModel({
    documentation,
    queryText,
    project,
    message,
    panel,
    columnIndexCount,
    isBulkGen,
  }: GenerateDocsForModelProps) {
    if (!this.altimateRequest.handlePreviewFeatures()) {
      return;
    }
    if (!project) {
      return;
    }
    this.telemetry.startTelemetryEvent(
      TelemetryEvents["DocumentationEditor/GenerateDescForModelClick"],
      {
        model: documentation?.name || "",
      },
    );

    window.withProgress(
      {
        title: `Generating documentation for model ${documentation?.name}`,
        location: ProgressLocation.Notification,
        cancellable: false,
      },
      async () => {
        if (documentation === undefined) {
          return;
        }
        try {
          const compiledSql = await project.unsafeCompileQuery(queryText);
          const sessionID = `${
            env.sessionId
          }-${documentation?.name}-numColumns-0-${Date.now()}`;
          const generateDocsForModel =
            await this.altimateRequest.generateModelDocsV2({
              columns: [],
              dbt_model: {
                model_name: documentation?.name,
                model_description: message.description,
                compiled_sql: compiledSql,
                columns: message.columns.map((column: any) => ({
                  column_name: column.name,
                  description: column.description,
                  data_type: column.type,
                  modelName: documentation?.name,
                })),
                adapter: project.getAdapterType(),
              },
              prompt_hint: message.promptHint || "generate",
              gen_model_description: true,
              user_instructions: {
                ...message.user_instructions,
                prompt_hint:
                  message.user_instructions.prompt_hint || "generate",
              },
              follow_up_instructions: message.follow_up_instructions,
              column_index_count: columnIndexCount,
              session_id: sessionID,
              is_bulk_gen: isBulkGen,
            });

          if (
            !generateDocsForModel ||
            !generateDocsForModel.model_description
          ) {
            // nothing to do if nothing happened
            return;
          }
          this.transmitAIGeneratedModelDocs(
            generateDocsForModel.model_description,
            message.syncRequestId,
            panel,
          );
          this.telemetry.endTelemetryEvent(
            TelemetryEvents["DocumentationEditor/GenerateDescForModelClick"],
            undefined,
            {
              model: documentation?.name || "",
            },
          );
        } catch (error) {
          this.transmitError(panel);
          window.showErrorMessage(
            extendErrorWithSupportLinks(
              "Could not generate documentation: " + (error as Error).message,
            ),
          );
          this.telemetry.endTelemetryEvent(
            TelemetryEvents["DocumentationEditor/GenerateDescForModelClick"],
            error,
            {
              model: documentation?.name || "",
            },
          );
        }
      },
    );
  }

  public async sendFeedback({
    queryText,
    message,
    panel,
    syncRequestId,
  }: FeedbackRequestProps) {
    this.telemetry.sendTelemetryEvent("altimateGenerateDocsSendFeedback");
    window.withProgress(
      {
        title: "Sending feedback",
        location: ProgressLocation.Notification,
        cancellable: false,
      },
      async () => {
        try {
          const project = this.queryManifestService.getProject();
          if (!project) {
            throw new Error("Unable to find project");
          }
          const { documentation } = await this.getDocumentation();
          const compiledSql = await project.unsafeCompileQuery(queryText);
          const request = message.data;
          request["feedback_text"] = message.comment;
          request["additional_prompt_inputs"] = {
            model_name: documentation?.name,
            model_description: documentation?.description,
            compiled_sql: compiledSql,
            columns: documentation?.columns.map((column) => ({
              column_name: column.name,
              description: column.description,
              data_type: column.type,
            })),
          };
          await this.altimateRequest.sendFeedback({
            data: request,
            feedback_src: "dbtpu-extension",
            feedback_text: message.comment,
            feedback_value: message.rating,
          });
          if (panel) {
            await panel.webview.postMessage({
              command: "response",
              args: {
                syncRequestId,
                body: {
                  status: true,
                },
                status: true,
              },
            });
          }
        } catch (error) {
          this.transmitError(panel);
          window.showErrorMessage(
            extendErrorWithSupportLinks(
              "Could not send feedback: " + (error as Error).message,
            ),
          );
          this.telemetry.sendTelemetryError(
            "altimateGenerateDocsSendFeedbackError",
            error,
          );
        }
      },
    );
  }
}
