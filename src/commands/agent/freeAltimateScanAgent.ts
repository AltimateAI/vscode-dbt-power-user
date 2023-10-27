import { InitCatalog } from "../tests/initCatalog";
import { UndocumentedModelColumnTest } from "../tests/undocumentedModelColumnTest";
import { StaleModelColumnTest } from "../tests/staleModelColumnTest";
import { MissingSchemaTest } from "../tests/missingSchemaTest";
import { UnmaterializedModelTest } from "../tests/unmaterializedModelTest";
import { AltimateScanStep } from "../tests/step";
import { BaseAltimateScanAgent } from "./baseAltimateScanAgent";

export class FreeAltimateScanAgent extends BaseAltimateScanAgent {
  public async runStep(test: AltimateScanStep): Promise<void> {
    if (test instanceof UnmaterializedModelTest) {
      await (test as UnmaterializedModelTest).flagUnmaterializedModels(
        this.scanContext,
      );
    } else if (test instanceof UndocumentedModelColumnTest) {
      await (test as UndocumentedModelColumnTest).flagUndocumentedColumns(
        this.scanContext,
      );
    } else if (test instanceof StaleModelColumnTest) {
      await (test as StaleModelColumnTest).flagStaleColumns(this.scanContext);
    } else if (test instanceof MissingSchemaTest) {
      await (test as MissingSchemaTest).flagMissingSchemas(this.scanContext);
    } else if (test instanceof InitCatalog) {
      await this.initCatalog(test as InitCatalog);
    } else {
      console.log("Test not supported for free accounts");
    }
  }
}
