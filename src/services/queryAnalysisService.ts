import { Range, window } from "vscode";
import {
  AltimateRequest,
  QueryAnalysisRequest,
  QueryAnalysisType,
} from "../altimate";
import { ManifestCacheProjectAddedEvent } from "../manifest/event/manifestCacheChangedEvent";
import { provideSingleton } from "../utils";
import { DocGenService } from "./docGenService";
import { StreamingService } from "./streamingService";

@provideSingleton(QueryAnalysisService)
export class QueryAnalysisService {
  public constructor(
    private docGenService: DocGenService,
    private streamingService: StreamingService,
    private altimateRequest: AltimateRequest,
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
        fileName: `${fileName} (${selection.start.line + 1}-${
          selection.end.line + 1
        })`,
      };
    }

    return { query: editor.document.getText(), fileName };
  }

  public async executeQueryExplain(
    eventMap: Map<string, ManifestCacheProjectAddedEvent>,
    params: Partial<QueryAnalysisRequest>,
    syncRequestId?: string,
  ) {
    const { session_id } = params;
    if (!session_id) {
      console.error("Missing session id");
      throw new Error("Invalid session id");
    }

    const selectionData = this.getSelectedQuery();
    if (!selectionData) {
      console.error("Missing query");
      throw new Error("Invalid query");
    }
    const { query } = selectionData;
    const dbtProject = this.docGenService.getProject();

    if (!dbtProject) {
      console.error("Invalid dbt project");
      throw new Error("Invalid dbt project");
    }

    const adapter = dbtProject.getAdapterType() || "unknown";
    const documentation = await this.docGenService.getDocumentation(eventMap);
    if (!documentation) {
      console.error("Unable to find documentation for the model");
      throw new Error("Invalid model");
    }
    return this.streamingService.fetchAsStream<QueryAnalysisRequest>({
      endpoint: "dbt/v2/query-analysis",
      syncRequestId,
      request: {
        session_id,
        job_type: QueryAnalysisType.EXPLAIN,
        model: {
          model_name: documentation.name,
          adapter,
          compiled_sql: await dbtProject.compileQuery(query),
          columns: documentation.columns.map((c) => ({
            column_name: c.name,
            data_type: c.type,
          })),
        },
        ...params,
      },
    });
  }

  public async getFollowupQuestions(
    eventMap: Map<string, ManifestCacheProjectAddedEvent>,
    { query, user_request }: { query: string; user_request: string },
  ) {
    const adapter =
      this.docGenService.getProject()?.getAdapterType() || "unknown";
    const documentation = await this.docGenService.getDocumentation(eventMap);
    if (!documentation) {
      console.error("Unable to find documentation for the model");
      throw new Error("Invalid model");
    }
    return this.altimateRequest.fetch("dbt/v2/follow-up-questions", {
      method: "POST",
      body: JSON.stringify({
        model: {
          model_name: documentation.name,
          adapter,
          compiled_sql: query,
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
