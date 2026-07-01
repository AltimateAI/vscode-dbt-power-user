import { Disposable, languages } from "vscode";
import { DbtWorkspaceSymbolProvider } from "./dbtWorkspaceSymbolProvider";

export class WorkspaceSymbolProviders implements Disposable {
  private disposables: Disposable[] = [];

  constructor(
    private dbtWorkspaceSymbolProvider: DbtWorkspaceSymbolProvider,
  ) {
    this.disposables.push(
      languages.registerWorkspaceSymbolProvider(
        this.dbtWorkspaceSymbolProvider,
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
