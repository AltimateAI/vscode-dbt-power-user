import { window } from "vscode";
import { AltimateRequest, CreateDbtTestRequest } from "../altimate";
import { provideSingleton } from "../utils";
import { DocGenService } from "./docGenService";
import { StreamingService } from "./streamingService";
import { QueryManifestService } from "./queryManifestService";
import path = require("path");
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import { MacroMetaMap, TestMetaData } from "../domain";

@provideSingleton(DbtTestService)
export class DbtTestService {
  public constructor(
    private docGenService: DocGenService,
    private streamingService: StreamingService,
    private altimateRequest: AltimateRequest,
    private queryManifestService: QueryManifestService,
    private dbtTerminal: DBTTerminal,
  ) {}

  // Find the file path of test macro
  public getMacroFilePath = (
    macros: [string],
    projectName: string,
    macroMetaMap: MacroMetaMap,
    testName: string | undefined,
  ) => {
    if (!testName) {
      return;
    }

    // Find if current test depends on test macro in current project
    const macro = macros.find(
      (m) => m === `macro.${projectName}.test_${testName}`,
    );

    if (macro) {
      // return the file path if it ends with sql
      const macroData = macroMetaMap.get(`test_${testName}`);
      return macroData?.path.endsWith(".sql") ? macroData?.path : undefined;
    }
  };

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

  public async getTestsForCurrentModel() {
    const eventResult = this.queryManifestService.getEventByCurrentProject();
    if (!eventResult?.event || !eventResult?.currentDocument) {
      return undefined;
    }

    const project = this.queryManifestService.getProject();
    if (!project) {
      return undefined;
    }
    const projectName = project.getProjectName();

    const {
      event: { nodeMetaMap, graphMetaMap, testMetaMap, macroMetaMap },
      currentDocument,
    } = eventResult;
    const modelName = path.basename(currentDocument.uri.fsPath, ".sql");
    this.dbtTerminal.debug(
      "dbtTests",
      "getting tests by modelName:",
      false,
      modelName,
    );
    const _node = nodeMetaMap.get(modelName);
    if (!_node) {
      this.dbtTerminal.debug("no node for tableName:", modelName);
      return;
    }
    const key = _node.uniqueId;
    return (graphMetaMap["tests"].get(key)?.nodes || [])
      .map((n) => {
        const testKey = n.label.split(".")[0];
        const testData = testMetaMap.get(testKey);

        if (!testData) {
          return null;
        }

        // For singular tests, attached_node will be undefined
        if (!testData.attached_node) {
          return { ...testData, key: testKey };
        }

        // dbt sends tests (ex: relationships) to both source and connected models
        // do not send the test which has different model in attached_node
        if (testData.attached_node !== key) {
          return null;
        }

        const {
          depends_on: { macros },
          test_metadata,
        } = testData;

        const macroFilepath = this.getMacroFilePath(
          macros,
          projectName,
          macroMetaMap,
          test_metadata?.name,
        );

        return {
          ...testData,
          path: macroFilepath || testData.path,
          key: testKey,
        };
      })
      .filter((t) => Boolean(t));
  }
}
