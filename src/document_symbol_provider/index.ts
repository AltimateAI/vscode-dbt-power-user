import { Disposable, languages } from "vscode";
import { DBTPowerUserExtension } from "../dbtPowerUserExtension";
import { DbtDocumentSymbolProvider } from "./dbtDocumentSymbolProvider";

export class DocumentSymbolProviders implements Disposable {
  private disposables: Disposable[] = [];

  constructor(
    private dbtDocumentSymbolProvider: DbtDocumentSymbolProvider,
  ) {
    this.disposables.push(
      languages.registerDocumentSymbolProvider(
        DBTPowerUserExtension.DBT_SQL_SELECTOR,
        this.dbtDocumentSymbolProvider,
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
