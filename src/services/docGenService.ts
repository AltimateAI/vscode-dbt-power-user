import path = require("path");
import {
  DBTTerminal,
  NodeMetaData,
  RateLimitException,
  RESOURCE_TYPE_MODEL,
} from "@altimateai/dbt-integration";
import { promises as fs } from "fs";
import { inject } from "inversify";
import * as yaml from "js-yaml";
import {
  env,
  ProgressLocation,
  Uri,
  WebviewPanel,
  WebviewView,
  window,
} from "vscode";
import { AltimateRequest, DocsGenerateResponse } from "../altimate";
import { DBTProject } from "../manifest/dbtProject";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { TelemetryService } from "../telemetry";
import { TelemetryEvents } from "../telemetry/events";
import { extendErrorWithSupportLinks, removeProtocol } from "../utils";
import {
  AIColumnDescription,
  DBTDocumentation,
  Source,
} from "../webview_provider/docsEditPanel";
import { AltimateAuthService } from "./altimateAuthService";
import { QueryManifestService } from "./queryManifestService";

interface DBTDocumentationMessage {
  documentation: DBTDocumentation | undefined;
  message?: { message: string; type: string };
}

export interface DocumentationSchemaColumn {
  name: string;
  description: string;
  data_type?: string;
  quote?: boolean;
  [key: string]: unknown;
}
interface DocumentationSchemaModel {
  name: string;
  description: string;
  tests: any;
  columns: { name: string; description?: string; data_type?: string }[];
}
export interface DocumentationSchema {
  version: number;
  models: DocumentationSchemaModel[];
}

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

export class DocGenService {
  public constructor(
    private altimateRequest: AltimateRequest,
    protected dbtProjectContainer: DBTProjectContainer,
    protected telemetry: TelemetryService,
    private queryManifestService: QueryManifestService,
    @inject("DBTTerminal")
    private dbtTerminal: DBTTerminal,
    private altimateAuthService: AltimateAuthService,
  ) {}

  private getCompiledDocumentationFromNode(
    currentNode: NodeMetaData | undefined,
    modelName: string,
    filePath: string,
  ): DBTDocumentation | undefined {
    if (!currentNode) {
      return;
    }
    const docColumns = currentNode.columns;
    return {
      aiEnabled: this.altimateRequest.enabled(),
      name: modelName,
      patchPath: currentNode.patch_path,
      description: currentNode.description,
      generated: false,
      uniqueId: currentNode.uniqueId,
      resource_type: currentNode.resource_type,
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
    };
  }

  private getCurrentNode(modelName: string): NodeMetaData | undefined {
    const eventResult = this.queryManifestService.getEventByCurrentProject();
    if (!eventResult || !eventResult.event) {
      return undefined;
    }

    const { event } = eventResult;
    return event.nodeMetaMap.lookupByBaseName(modelName);
  }

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
    response: DocsGenerateResponse,
    syncRequestId?: string,
    panel?: WebviewView | WebviewPanel,
  ) {
    if (panel) {
      const result = syncRequestId
        ? {
            command: "response",
            args: { body: response, syncRequestId, status: true },
          }
        : {
            command: "renderAIGeneratedModelDocs",
            response,
          };
      await panel.webview.postMessage(result);
    }
  }

  public async getCompiledDocumentationForCurrentActiveFile() {
    return this.getCompiledDocumentation(
      window.activeTextEditor?.document?.uri.fsPath,
    );
  }

  public async getUncompiledDocumentationForCurrentActiveFile() {
    return this.getUncompiledDocumentation(
      window.activeTextEditor?.document?.uri.fsPath,
    );
  }

  private getDocumentationValidationMessage(
    filePath?: string,
    context?: "project" | "node" | "resource_type" | "model_path",
  ) {
    // File is not a .sql file
    if (!filePath?.endsWith(".sql")) {
      return {
        message:
          "Documentation is only available for .sql files. Please open a dbt model (.sql) file.",
        type: "warning",
      };
    }

    // Check for project diagnostics errors
    try {
      this.queryManifestService
        .getProjectByUri(Uri.file(filePath))
        ?.throwDiagnosticsErrorIfAvailable();
    } catch (err) {
      return { message: (err as Error).message, type: "error" };
    }

    // Context-specific error messages
    if (context === "project") {
      return {
        message:
          "Unable to find dbt project or project root for this file. Ensure the file is part of a valid dbt project.",
        type: "warning",
      };
    }

    if (context === "node") {
      return {
        message:
          "Model not found in dbt manifest. Ensure the model has been compiled and exists in the dbt project.",
        type: "warning",
      };
    }

    if (context === "resource_type") {
      return {
        message:
          "Documentation is only available for dbt models. This file appears to be a snapshot, macro, test, or other dbt resource type which is not supported.",
        type: "warning",
      };
    }

    // Default generic message
    return {
      message:
        "A valid dbt model file needs to be open and active in the editor area above to view documentation for that model.",
      type: "warning",
    };
  }

  private async getDocumentation(
    filePath?: string,
    compiled: boolean = true,
  ): Promise<DBTDocumentationMessage> {
    // Initial validation (file path, .sql extension, diagnostics)
    const initialValidation = this.getDocumentationValidationMessage(filePath);
    if (initialValidation.type === "error" || !filePath) {
      return { documentation: undefined, message: initialValidation };
    }

    const modelName = path.basename(filePath, ".sql");
    const project = this.dbtProjectContainer.findDBTProject(Uri.file(filePath));

    // Project validation
    if (!project || !project.projectRoot) {
      return {
        documentation: undefined,
        message: this.getDocumentationValidationMessage(filePath, "project"),
      };
    }

    // Model path validation - ensure file is in configured model directories
    const modelPaths = project.getModelPaths();
    if (
      !modelPaths ||
      !modelPaths.some(
        (modelPath) =>
          filePath.startsWith(modelPath + path.sep) ||
          path.dirname(filePath) === modelPath,
      )
    ) {
      return {
        documentation: undefined,
        message: this.getDocumentationValidationMessage(filePath, "model_path"),
      };
    }

    // Node validation
    const currentNode = this.getCurrentNode(modelName);
    if (!currentNode) {
      return {
        documentation: undefined,
        message: this.getDocumentationValidationMessage(filePath, "node"),
      };
    }

    // Resource type validation - ensure it's a model
    if (currentNode.resource_type !== RESOURCE_TYPE_MODEL) {
      return {
        documentation: undefined,
        message: this.getDocumentationValidationMessage(
          filePath,
          "resource_type",
        ),
      };
    }

    // Branch based on compiled vs uncompiled
    if (compiled) {
      // Compiled documentation path
      const documentation = this.getCompiledDocumentationFromNode(
        currentNode,
        modelName,
        filePath,
      );
      return { documentation };
    } else {
      // Uncompiled documentation path
      if (!currentNode.patch_path) {
        return {
          documentation: {
            aiEnabled: this.altimateRequest.enabled(),
            name: modelName,
            description: "",
            uniqueId: currentNode.uniqueId,
            resource_type: currentNode.resource_type,
            generated: false,
            filePath,
            columns: [],
          },
        };
      }

      try {
        // Read and parse the YAML file
        const yamlPath = path.join(
          project.projectRoot.fsPath,
          removeProtocol(currentNode.patch_path),
        );
        const content = await fs.readFile(yamlPath, "utf8");
        const parsedDoc = yaml.load(content) as DocumentationSchema;

        // Find matching model definition
        const modelDef = parsedDoc.models?.find((m) => m.name === modelName);
        if (!modelDef) {
          return {
            documentation: {
              aiEnabled: this.altimateRequest.enabled(),
              name: modelName,
              description: "",
              uniqueId: currentNode.uniqueId,
              resource_type: currentNode.resource_type,
              filePath,
              generated: false,
              columns: [],
            },
          };
        }

        // Map to DBTDocumentation format
        return {
          documentation: {
            aiEnabled: this.altimateRequest.enabled(),
            name: modelName,
            patchPath: currentNode.patch_path,
            description: modelDef.description || "",
            generated: false,
            uniqueId: currentNode.uniqueId,
            resource_type: currentNode.resource_type,
            filePath,
            columns: (modelDef.columns || []).map((column) => ({
              name: column.name,
              description: column.description || "",
              generated: false,
              source: Source.YAML,
              type: column.data_type?.toLowerCase(),
            })),
          },
        };
      } catch (error) {
        this.dbtTerminal.error(
          "docGenService:getDocumentationYamlError",
          `Error reading YAML documentation: ${error}`,
          error,
        );
      }
      // falling back on compiled implementation
      return this.getDocumentation(filePath, true);
    }
  }

  public async getCompiledDocumentation(
    filePath?: string,
  ): Promise<DBTDocumentationMessage> {
    return this.getDocumentation(filePath, true);
  }

  public async getUncompiledDocumentation(
    filePath?: string,
  ): Promise<DBTDocumentationMessage> {
    return this.getDocumentation(filePath, false);
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
    if (!this.altimateAuthService.handlePreviewFeatures()) {
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
              citations: entry.column_citations,
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
    if (!this.altimateAuthService.handlePreviewFeatures()) {
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
            generateDocsForModel,
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
    this.telemetry.startTelemetryEvent(TelemetryEvents["Datapilot/Feedback"]);
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
          const { documentation } = await this.getUncompiledDocumentation();
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
          this.telemetry.endTelemetryEvent(
            TelemetryEvents["Datapilot/Feedback"],
          );
        } catch (error) {
          this.telemetry.endTelemetryEvent(
            TelemetryEvents["Datapilot/Feedback"],
            error,
          );
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
