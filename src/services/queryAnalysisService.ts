import { QueryAnalysisRequest, QueryAnalysisType } from "../altimate";
import { ManifestCacheProjectAddedEvent } from "../manifest/event/manifestCacheChangedEvent";
import { provideSingleton } from "../utils";
import { DocGenService } from "./docGenService";
import { StreamingService } from "./streamingService";

@provideSingleton(QueryAnalysisService)
export class QueryAnalysisService {
  public constructor(
    private docGenService: DocGenService,
    private streamingService: StreamingService,
  ) {}

  public async executeQueryExplain(
    query: string,
    eventMap: Map<string, ManifestCacheProjectAddedEvent>,
    session_id: string,
    syncRequestId?: string,
  ) {
    if (!session_id) {
      console.error("Missing session id");
      throw new Error("Invalid session id");
    }
    const adapter =
      this.docGenService.getProject()?.getAdapterType() || "unknown";
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
          compiled_sql: query,
          columns: documentation.columns.map((c) => ({
            column_name: c.name,
            data_type: c.type,
          })),
        },
      },
    });
  }
}
