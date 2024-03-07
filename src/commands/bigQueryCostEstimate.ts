import { window } from "vscode";
import path = require("path");
import { extendErrorWithSupportLinks, provideSingleton } from "../utils";
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import { TelemetryService } from "../telemetry";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { PythonException } from "python-bridge";

@provideSingleton(BigQueryCostEstimate)
export class BigQueryCostEstimate {
  constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private dbtTerminal: DBTTerminal,
    private telemetry: TelemetryService,
  ) {}

  async estimateCost({ returnResult }: { returnResult?: boolean }) {
    const modelName = path.basename(
      window.activeTextEditor!.document.fileName,
      ".sql",
    );
    if (!returnResult) {
      this.dbtTerminal.show(true);
    }
    try {
      const query = window.activeTextEditor?.document.getText();
      if (!query) {
        window.showErrorMessage(
          "We need a valid query to get a cost estimate.",
        );
        return;
      }
      const compiledQuery = await this.getProject()?.unsafeCompileQuery(query);
      if (!compiledQuery) {
        window.showErrorMessage(
          "We need a valid query to get a cost estimate.",
        );
        return;
      }
      const result = await this.getProject()?.validateSQLDryRun(compiledQuery);
      if (!result) {
        return;
      }
      this.dbtTerminal.log(
        `The query for ${modelName} will process ${result.bytes_processed}.\r\n`,
      );
      if (returnResult) {
        return { modelName, result };
      }
    } catch (error) {
      if (error instanceof PythonException) {
        window.showErrorMessage(
          extendErrorWithSupportLinks(
            `An error occured while trying to compile your node: ${modelName}` +
              error.exception.message +
              ".",
          ),
        );
        this.telemetry.sendTelemetryError(
          "bigqueryCostEstimatePythonError",
          error,
        );
        return;
      }
      window.showErrorMessage(
        "Could not perform bigquery cost estimate: " + (error as Error).message,
      );
    }
  }

  private getProject() {
    const currentFilePath = window.activeTextEditor?.document.uri;
    if (!currentFilePath) {
      return;
    }
    return this.dbtProjectContainer.findDBTProject(currentFilePath);
  }
}
