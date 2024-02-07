import { EventEmitter, window } from "vscode";
import { AltimateRequest, QueryAnalysisType } from "../altimate";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { ManifestCacheProjectAddedEvent } from "../manifest/event/manifestCacheChangedEvent";
import { provideSingleton } from "../utils";
import { DocGenService } from "./docGenService";

@provideSingleton(QueryAnalysisService)
export class QueryAnalysisService {
  public constructor(
    private altimateRequest: AltimateRequest,
    protected dbtProjectContainer: DBTProjectContainer,
    protected docGenService: DocGenService,
  ) {}

  public async executeQueryExplain(
    query: string,
    eventMap: Map<string, ManifestCacheProjectAddedEvent>,
  ) {
    const adapter =
      this.docGenService.getProject()?.getAdapterType() || "unknown";
    const documentation = await this.docGenService.getDocumentation(eventMap);
    if (!documentation) {
      return;
    }
    return this.altimateRequest.executeQueryAnalysis({
      job_type: QueryAnalysisType.EXPLAIN,
      dbt_model: {
        model_name: documentation.name,
        adapter,
        compiled_sql: query,
        columns: documentation.columns.map((c) => ({
          column_name: c.name,
          data_type: c.type,
        })),
      },
      model_dialect: adapter,
    });
  }
}
