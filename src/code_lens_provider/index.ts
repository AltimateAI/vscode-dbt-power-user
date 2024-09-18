import { Disposable, languages } from "vscode";
import { DBTPowerUserExtension } from "../dbtPowerUserExtension";
import { provideSingleton } from "../utils";
import { SourceModelCreationCodeLensProvider } from "./sourceModelCreationCodeLensProvider";
import { VirtualSqlCodeLensProvider } from "./virtualSqlCodeLensProvider";
import { DocumentationCodeLensProvider } from "./documentationCodeLensProvider";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";

@provideSingleton(CodeLensProviders)
export class CodeLensProviders implements Disposable {
  private disposables: Disposable[] = [];
  constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private sourceModelCreationCodeLensProvider: SourceModelCreationCodeLensProvider,
    private virtualSqlCodeLensProvider: VirtualSqlCodeLensProvider,
    private documentationCodeLensProvider: DocumentationCodeLensProvider,
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
          DBTPowerUserExtension.DBT_YAML_SELECTOR,
          this.documentationCodeLensProvider,
        ),
      );
      this.disposables.push(
        languages.registerCodeLensProvider(
          DBTPowerUserExtension.DBT_SQL_SELECTOR,
          this.documentationCodeLensProvider,
        ),
      );
    });
  }

  dispose() {
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }
}
