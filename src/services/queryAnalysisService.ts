import { Range, window } from "vscode";
import {
  AltimateRequest,
  QueryAnalysisRequest,
  QueryAnalysisType,
} from "../altimate";
import { ManifestCacheProjectAddedEvent } from "../manifest/event/manifestCacheChangedEvent";
import { provideSingleton } from "../utils";
import { DbtProjectService } from "./dbtProjectService";
import { DocGenService } from "./docGenService";
import { StreamingService } from "./streamingService";
import { DBTTerminal } from "../dbt_client/dbtTerminal";

@provideSingleton(QueryAnalysisService)
export class QueryAnalysisService {
  public constructor(
    private docGenService: DocGenService,
    private streamingService: StreamingService,
    private altimateRequest: AltimateRequest,
    private dbtProjectService: DbtProjectService,
    private dbtTerminal: DBTTerminal,
  ) {}

  public getSelectedQuery() {
    const editor = window.activeTextEditor;
    if (!editor) {
      return null;
    }
    const fileName = editor.document.fileName.split("/").pop();
    const selection = editor.selection;
    if (selection && !selection.isEmpty) {
      const selectionRange = new Range(
        selection.start.line,
        selection.start.character,
        selection.end.line,
        selection.end.character,
      );
      return {
        query: editor.document.getText(selectionRange),
        fileName: `${fileName} (L${selection.start.line + 1}-L${
          selection.end.line + 1
        })`,
      };
    }

    return { query: editor.document.getText(), fileName };
  }

  public async executeQueryAnalysis(
    params: Partial<QueryAnalysisRequest>,
    job_type: QueryAnalysisType,
    syncRequestId?: string,
  ) {
    if (!this.altimateRequest.handlePreviewFeatures()) {
      return;
    }

    const { session_id } = params;
    if (!session_id) {
      const error = new Error("Invalid session id");
      this.dbtTerminal.error(
        "executeQueryAnalysisError",
        "Missing session id",
        error,
      );
      throw error;
    }

    const selectionData = this.getSelectedQuery();
    if (!selectionData) {
      const error = new Error("Invalid query");
      this.dbtTerminal.error(
        "executeQueryAnalysisError",
        "Missing query",
        error,
      );
      throw error;
    }
    const { query } = selectionData;
    const dbtProject = this.dbtProjectService.getProject();

    if (!dbtProject) {
      const error = new Error("Invalid dbt project");
      this.dbtTerminal.error(
        "executeQueryAnalysisError",
        "Invalid dbt project",
        error,
      );
      throw error;
    }

    const adapter = dbtProject.getAdapterType() || "unknown";
    const documentation = await this.docGenService.getDocumentation();
    if (!documentation) {
      const error = new Error("Invalid model");
      this.dbtTerminal.error(
        "executeQueryAnalysisError",
        "Unable to find documentation for the model",
        error,
      );
      throw error;
    }
    return this.streamingService.fetchAsStream<QueryAnalysisRequest>({
      endpoint: "dbt/v2/query-analysis",
      syncRequestId,
      request: {
        session_id,
        job_type,
        model: {
          model_name: documentation.name,
          adapter,
          compiled_sql: await dbtProject.unsafeCompileQuery(query),
          columns: documentation.columns.map((c) => ({
            column_name: c.name,
            data_type: c.type,
          })),
        },
        ...params,
      },
    });
  }

  public async getFollowupQuestions({
    query,
    user_request,
  }: {
    query: string;
    user_request: string;
  }) {
    if (!this.altimateRequest.handlePreviewFeatures()) {
      return;
    }
    const dbtProject = this.dbtProjectService.getProject();
    if (!dbtProject) {
      const error = new Error("Invalid dbt project");
      this.dbtTerminal.error(
        "getFollowupQuestionsError",
        "Invalid dbt project",
        error,
      );
      throw error;
    }

    const adapter = dbtProject.getAdapterType() || "unknown";
    const documentation = await this.docGenService.getDocumentation();

    if (!documentation) {
      const error = new Error("Unable to find documentation for the model");
      this.dbtTerminal.error(
        "getFollowupQuestionsError",
        "Unable to find documentation for the model",
        error,
      );
      throw error;
    }
    return this.altimateRequest.fetch("dbt/v2/follow-up-questions", {
      method: "POST",
      body: JSON.stringify({
        model: {
          model_name: documentation.name,
          adapter,
          compiled_sql: await dbtProject.unsafeCompileQuery(query),
          columns: documentation.columns.map((c) => ({
            column_name: c.name,
            data_type: c.type,
          })),
        },
        user_request,
      }),
    });
  }
}
