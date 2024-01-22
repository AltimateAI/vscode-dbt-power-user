import path = require("path");
import { ProgressLocation, WebviewView, window, workspace } from "vscode";
import { AltimateRequest } from "../altimate";
import { DBTProject } from "../manifest/dbtProject";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { ManifestCacheProjectAddedEvent } from "../manifest/event/manifestCacheChangedEvent";
import { TelemetryService } from "../telemetry";
import { extendErrorWithSupportLinks, provideSingleton } from "../utils";
import {
  AIColumnDescription,
  DBTDocumentation,
  Source,
} from "../webview_provider/docsEditPanel";

interface GenerateDocsForColumnsProps {
  panel: WebviewView | undefined;
  message: any;
  project: DBTProject | undefined;
  documentation: DBTDocumentation | undefined;
}

@provideSingleton(DocGenService)
export class DocGenService {
  public constructor(
    private altimateRequest: AltimateRequest,
    protected dbtProjectContainer: DBTProjectContainer,
    protected telemetry: TelemetryService,
  ) {}

  private async generateDocsForColumn(
    documentation: DBTDocumentation | undefined,
    compiledSql: string | undefined,
    adapter: string,
    message: any,
  ) {
    if (!documentation) {
      return null;
    }
    const enableNewDocsPanel = workspace
      .getConfiguration("dbt")
      .get<boolean>("enableNewDocsPanel", false);

    const columns = message.columnName
      ? [message.columnName]
      : message.columnNames;

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

    const result = enableNewDocsPanel
      ? await this.altimateRequest.generateModelDocsV2({
          ...baseRequest,
          user_instructions: message.user_instructions,
          follow_up_instructions: message.follow_up_instructions,
        })
      : await this.altimateRequest.generateModelDocs(baseRequest);

    return result;
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

  public getProject(): DBTProject | undefined {
    if (!window.activeTextEditor) {
      return undefined;
    }
    const currentFilePath = window.activeTextEditor.document.uri;
    return this.dbtProjectContainer.findDBTProject(currentFilePath);
  }

  public async getDocumentation(
    eventMap: Map<string, ManifestCacheProjectAddedEvent>,
  ): Promise<DBTDocumentation | undefined> {
    if (window.activeTextEditor === undefined || eventMap === undefined) {
      return undefined;
    }

    const currentFilePath = window.activeTextEditor.document.uri;
    const project = this.getProject();
    if (project === undefined) {
      return undefined;
    }
    const event = eventMap.get(project.projectRoot.fsPath);
    if (event === undefined) {
      return undefined;
    }
    const modelName = path.basename(currentFilePath.fsPath, ".sql");
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
        };
      }),
    } as DBTDocumentation;
  }

  public async generateDocsForColumns({
    project,
    message,
    documentation,
    panel,
  }: GenerateDocsForColumnsProps) {
    if (!project || !window.activeTextEditor) {
      return;
    }
    const queryText = window.activeTextEditor.document.getText();
    this.telemetry.sendTelemetryEvent("altimateGenerateDocsForColumn");
    window.withProgress(
      {
        title: "Generating column documentation",
        location: ProgressLocation.Notification,
        cancellable: false,
      },
      async () => {
        if (documentation === undefined) {
          return;
        }
        try {
          const compiledSql = await project.unsafeCompileQuery(queryText);
          const generatedDocsForColumn = await this.generateDocsForColumn(
            documentation,
            compiledSql,
            project.getAdapterType(),
            message,
          );

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
        } catch (error) {
          this.transmitError(panel);
          window.showErrorMessage(
            extendErrorWithSupportLinks(
              "An unexpected error occurred while generating documentation: " +
                error,
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
}
