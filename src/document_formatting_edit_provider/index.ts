import { Disposable, languages } from "vscode";
import { DBTPowerUserExtension } from "../dbtPowerUserExtension";
import { provideSingleton } from "../utils";
import { DbtDocumentFormattingEditProvider } from "./dbtDocumentFormattingEditProvider";

@provideSingleton(DocumentFormattingEditProviders)
export class DocumentFormattingEditProviders implements Disposable {
  private disposables: Disposable[] = [];

  constructor(
    private dbtDocumentFormattingProvider: DbtDocumentFormattingEditProvider,
  ) {
    this.disposables.push(
      languages.registerDocumentFormattingEditProvider(
        DBTPowerUserExtension.DBT_SQL_SELECTOR,
        this.dbtDocumentFormattingProvider,
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
