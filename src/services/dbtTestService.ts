import { window } from "vscode";
import { AltimateRequest, CreateDbtTestRequest } from "../altimate";
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import { ManifestCacheProjectAddedEvent } from "../manifest/event/manifestCacheChangedEvent";
import { provideSingleton } from "../utils";
import { DocGenService } from "./docGenService";
import { StreamingService } from "./streamingService";
import { QueryManifestService } from "./queryManifestService";

@provideSingleton(DbtTestService)
export class DbtTestService {
  public constructor(
    private docGenService: DocGenService,
    private streamingService: StreamingService,
    private altimateRequest: AltimateRequest,
    private queryManifestService: QueryManifestService,
    private dbtTerminal: DBTTerminal,
  ) {}

  public async createTest(
    params: Record<string, unknown>,
    syncRequestId?: string,
  ) {
    if (!this.altimateRequest.handlePreviewFeatures()) {
      return;
    }

    const { session_id } = params;
    if (!session_id) {
      const error = new Error("Invalid session id");
      this.dbtTerminal.error("createTest", "Missing session id", error);
      throw error;
    }

    const dbtProject = this.queryManifestService.getProject();

    if (!dbtProject) {
      const error = new Error("Invalid dbt project");
      this.dbtTerminal.error("createTest", "Invalid dbt project", error);
      throw error;
    }

    const adapter = dbtProject.getAdapterType() || "unknown";
    const documentation = await this.docGenService.getDocumentation();
    if (!documentation) {
      const error = new Error("Invalid model");
      this.dbtTerminal.error(
        "createTest",
        "Unable to find documentation for the model",
        error,
      );
      throw error;
    }
    const queryText = window.activeTextEditor?.document.getText();

    return this.streamingService.fetchAsStream<CreateDbtTestRequest>({
      endpoint: "dbt/v2/dbt-test",
      syncRequestId,
      request: {
        ...params,
        session_id: session_id as string,
        column_name: params.column as string,
        model: {
          model_name: documentation.name,
          adapter,
          compiled_sql: await dbtProject.unsafeCompileQuery(queryText || ""),
          columns: documentation.columns.map((c) => ({
            column_name: c.name,
            data_type: c.type,
          })),
        },
      },
    });
  }
}