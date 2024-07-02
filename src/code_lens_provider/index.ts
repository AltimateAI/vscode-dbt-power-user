import { Disposable, languages } from "vscode";
import { DBTPowerUserExtension } from "../dbtPowerUserExtension";
import { provideSingleton } from "../utils";
import { SourceModelCreationCodeLensProvider } from "./sourceModelCreationCodeLensProvider";
import { VirtualSqlCodeLensProvider } from "./virtualSqlCodeLensProvider";

@provideSingleton(CodeLensProviders)
export class CodeLensProviders implements Disposable {
  private disposables: Disposable[] = [];
  constructor(
    private sourceModelCreationCodeLensProvider: SourceModelCreationCodeLensProvider,
    private virtualSqlCodeLensProvider: VirtualSqlCodeLensProvider,
  ) {
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
