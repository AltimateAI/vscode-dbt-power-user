import { window } from "vscode";
import { AltimateRequest, CreateDbtTestRequest } from "../altimate";
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
  ) {}

  public async createTest(
    params: Partial<CreateDbtTestRequest> & { column?: string },
    syncRequestId?: string,
  ) {
    if (!this.altimateRequest.handlePreviewFeatures()) {
      return;
    }

    const { session_id } = params;
    if (!session_id) {
      throw new Error("Invalid session id");
    }

    const dbtProject = this.queryManifestService.getProject();

    if (!dbtProject) {
      throw new Error("Invalid dbt project");
    }

    const adapter = dbtProject.getAdapterType();
    const documentation = await this.docGenService.getDocumentation();
    if (!documentation) {
      throw new Error("Unable to find documentation for the model");
    }

    const queryText = window.activeTextEditor?.document.getText();

    return this.streamingService.fetchAsStream<CreateDbtTestRequest>({
      endpoint: "dbt/v2/dbt-test",
      syncRequestId,
      request: {
        ...params,
        session_id: session_id as string,
        column_name: params.column as string | undefined,
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
