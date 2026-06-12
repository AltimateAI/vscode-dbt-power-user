import { Disposable, languages } from "vscode";
import { DBTPowerUserExtension } from "../dbtPowerUserExtension";
import { DBTProjectContainer } from "../dbt_client/dbtProjectContainer";
import { CteCodeLensProvider } from "./cteCodeLensProvider";
import { SourceModelCreationCodeLensProvider } from "./sourceModelCreationCodeLensProvider";
import { SqlActionsCodeLensProvider } from "./sqlActionsCodeLensProvider";
import { VirtualSqlCodeLensProvider } from "./virtualSqlCodeLensProvider";

export class CodeLensProviders implements Disposable {
  private disposables: Disposable[] = [];
  constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private sourceModelCreationCodeLensProvider: SourceModelCreationCodeLensProvider,
    private virtualSqlCodeLensProvider: VirtualSqlCodeLensProvider,
    private cteCodeLensProvider: CteCodeLensProvider,
    private sqlActionsCodeLensProvider: SqlActionsCodeLensProvider,
  ) {
    // Add codelens after projects are initialized to avoid race conditions in executing notebook cells
    this.dbtProjectContainer.onDBTProjectsInitialization(() => {
      this.disposables.push(
        languages.registerCodeLensProvider(
          DBTPowerUserExtension.DBT_YAML_SELECTOR,
          this.sourceModelCreationCodeLensProvider,
        ),
      );
      this.disposables.push(
        languages.registerCodeLensProvider(
          DBTPowerUserExtension.DBT_SQL_SELECTOR,
          this.virtualSqlCodeLensProvider,
        ),
      );
      this.disposables.push(
        languages.registerCodeLensProvider(
          DBTPowerUserExtension.DBT_SQL_SELECTOR,
          this.cteCodeLensProvider,
        ),
      );
      this.disposables.push(
        languages.registerCodeLensProvider(
          DBTPowerUserExtension.DBT_SQL_SELECTOR,
          this.sqlActionsCodeLensProvider,
        ),
        languages.registerCodeLensProvider(
          DBTPowerUserExtension.DBT_YAML_SELECTOR,
          this.sqlActionsCodeLensProvider,
        ),
      );
    });
  }

  dispose() {
    this.sqlActionsCodeLensProvider.dispose();
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }
}
