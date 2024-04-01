import path = require("path");
import { ProgressLocation, WebviewView, window, workspace } from "vscode";
import {
  AltimateRequest,
  DocsGenerateModelRequest,
  DocsGenerateResponse,
} from "../altimate";
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
import { rmSync } from "fs";
import * as os from "os";

interface GenerateDocsForColumnsProps {
  panel: WebviewView | undefined;
  message: any;
  project: DBTProject | undefined;
  documentation: DBTDocumentation | undefined;
}

interface GenerateDocsForModelProps {
  panel: WebviewView | undefined;
  documentation: DBTDocumentation | undefined;
  queryText: string;
  project: DBTProject | undefined;
  message: any;
}

interface FeedbackRequestProps {
  panel: WebviewView | undefined;
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
  ): Promise<DocsGenerateResponse | undefined> {
    return new Promise(async (resolve) => {
      if (!documentation) {
        return resolve(undefined);
      }
      const enableNewDocsPanel = workspace
        .getConfiguration("dbt")
        .get<boolean>("enableNewDocsPanel", true);

      const baseRequest = {
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
      } as unknown as Parameters<
        typeof this.altimateRequest.generateModelDocs
      >["0"];

      try {
        const result = enableNewDocsPanel
          ? await this.altimateRequest.generateModelDocsV2({
              ...baseRequest,
              user_instructions: message.user_instructions,
              follow_up_instructions: message.follow_up_instructions,
            })
          : await this.altimateRequest.generateModelDocs(baseRequest);

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
        }
      }
    });
  }

  private async transmitAIGeneratedColumnDocs(
    panel: WebviewView | undefined,
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

  private async transmitError(panel?: WebviewView) {
    if (panel) {
      await panel.webview.postMessage({
        command: "renderError",
      });
    }
  }

  private async transmitAIGeneratedModelDocs(
    description: string,
    syncRequestId?: string,
    panel?: WebviewView,
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

  public async getDocumentation(
    filePath?: string,
  ): Promise<DBTDocumentation | undefined> {
    const eventResult = this.queryManifestService.getEventByCurrentProject();
    if (!eventResult) {
      return undefined;
    }
    const { event } = eventResult;

    if (!event || !filePath) {
      return undefined;
    }

    const modelName = path.basename(filePath, ".sql");
    const currentNode = event.nodeMetaMap.get(modelName);
    if (currentNode === undefined) {
      return undefined;
    }

    const docColumns = currentNode.columns;
    return {
      aiEnabled: this.altimateRequest.enabled(),
      name: modelName,
      patchPath: currentNode.patch_path,
      description: currentNode.description,
      generated: false,
      columns: Object.values(docColumns).map((column) => {
        return {
          name: column.name,
          description: column.description,
          generated: false,
          source: Source.YAML,
          type: column.data_type,
        };
      }),
    } as DBTDocumentation;
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

    this.telemetry.sendTelemetryEvent("altimateGenerateDocsForColumn", {
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

          const startTime = Date.now();
          const compiledSql = await project.unsafeCompileQuery(queryText);

          await Promise.all(
            chunks.map(async (chunk, i) => {
              const chunkResult = await this.generateDocsForColumn(
                documentation,
                compiledSql,
                project.getAdapterType(),
                message,
                chunk,
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
          this.telemetry.sendTelemetryEvent(
            "altimateGenerateDocsForColumn",
            {
              model: documentation?.name || "",
              columns: columns.join(","),
            },
            { timeTaken: Date.now() - startTime },
          );
        } catch (error) {
          this.transmitError(panel);
          window.showErrorMessage(
            extendErrorWithSupportLinks(
              "Could not generate documentation: " + (error as Error).message,
            ),
          );
          this.telemetry.sendTelemetryError(
            "generateDocsForColumnError",
            error,
          );
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
  }: GenerateDocsForModelProps) {
    if (!this.altimateRequest.handlePreviewFeatures()) {
      return;
    }
    if (!project) {
      return;
    }
    this.telemetry.sendTelemetryEvent("altimateGenerateDocsForModel", {
      model: documentation?.name || "",
    });

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
          const startTime = Date.now();
          const compiledSql = await project.unsafeCompileQuery(queryText);
          const enableNewDocsPanel = workspace
            .getConfiguration("dbt")
            .get<boolean>("enableNewDocsPanel", true);

          const baseRequest = {
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
          } as unknown as DocsGenerateModelRequest;
          const generateDocsForModel = enableNewDocsPanel
            ? await this.altimateRequest.generateModelDocsV2({
                ...baseRequest,
                user_instructions: {
                  ...message.user_instructions,
                  prompt_hint:
                    message.user_instructions.prompt_hint || "generate",
                },
                follow_up_instructions: message.follow_up_instructions,
              })
            : await this.altimateRequest.generateModelDocs(baseRequest);

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
          this.telemetry.sendTelemetryEvent(
            "altimateGenerateDocsForModel",
            {
              model: documentation?.name || "",
            },
            { timeTaken: Date.now() - startTime },
          );
        } catch (error) {
          this.transmitError(panel);
          window.showErrorMessage(
            extendErrorWithSupportLinks(
              "Could not generate documentation: " + (error as Error).message,
            ),
          );
          this.telemetry.sendTelemetryError("generateDocsForModelError", error);
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
          const documentation = await this.getDocumentation();
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

  public async shareDbtDocs(data: { name: string; description?: string }) {
    return new Promise((resolve, reject) => {
      window.withProgress(
        {
          title: "",
          location: ProgressLocation.Notification,
          cancellable: false,
        },
        async (progress) => {
          const project = this.queryManifestService.getProject();
          if (!project) {
            reject(new Error("Invalid dbt project"));
            return;
          }
          progress.report({ message: "Generating dbt docs..." });

          const hashedProjectRoot = DBTProject.hashProjectRoot(
            project.projectRoot.fsPath,
          );
          const tmpDirPath = path.join(os.tmpdir(), hashedProjectRoot);

          try {
            this.dbtTerminal.debug(
              "docGenService:shareDbtDocs",
              "generating docs in path:",
              tmpDirPath,
            );
            // generate docs in tmp directory
            await project.generateDocsImmediately([
              "--target-path",
              tmpDirPath,
            ]);

            this.dbtTerminal.debug(
              "docGenService:shareDbtDocs",
              "generated docs in path:",
              tmpDirPath,
            );
            this.dbtTerminal.debug(
              "docGenService:shareDbtDocs",
              "creating dbt share id",
              data,
            );

            // create a shareid
            progress.report({ message: "Creating conversation..." });
            const createShareResult = await this.altimateRequest.fetch<{
              share_id: number;
              manifest_presigned_url: string;
              catalog_presigned_url: string;
            }>("dbt/dbt_docs_share", {
              method: "POST",
              body: JSON.stringify(data),
            });
            this.dbtTerminal.debug(
              "docGenService:shareDbtDocs",
              "created dbt share id",
              createShareResult,
            );

            const filePathMapping = {
              "manifest.json": "manifest_presigned_url",
              "catalog.json": "catalog_presigned_url",
            };

            // Upload the artifacts
            progress.report({ message: "Uploading artifacts..." });
            const fileUploadResponses = await Promise.all(
              Object.keys(filePathMapping).map(async (file) => {
                // @ts-ignore
                const url = createShareResult[filePathMapping[file]];
                if (!url) {
                  throw new Error(`Invalid presigned url for ${file}`);
                }
                return this.altimateRequest.uploadToS3(
                  url,
                  {},
                  path.join(tmpDirPath, file),
                );
              }),
            );

            if (fileUploadResponses.length !== 2) {
              reject(
                new Error(
                  "Unable to upload required artifacts. Please try again later.",
                ),
              );
              return;
            }

            // verify the uploads
            progress.report({ message: "Verifying uploads..." });
            const verifyResult = await this.altimateRequest.fetch<{
              dbt_docs_share_url: string;
            }>("dbt/dbt_docs_share/verify_upload/", {
              method: "POST",
              body: JSON.stringify({ share_id: createShareResult.share_id }),
            });
            if (!verifyResult.dbt_docs_share_url) {
              reject(new Error("Unable to verify uploads. Please try again."));
              return;
            }

            progress.report({ message: "Resolving..." });
            resolve(verifyResult.dbt_docs_share_url);
          } catch (err) {
            reject(err);
          } finally {
            this.dbtTerminal.debug(
              "docGenService:shareDbtDocs",
              "deleting docs tmp directory",
              tmpDirPath,
            );
            rmSync(tmpDirPath, { force: true, recursive: true });
          }
        },
      );
    });
  }
}
