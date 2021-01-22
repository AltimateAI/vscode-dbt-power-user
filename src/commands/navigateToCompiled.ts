import { commands, Disposable, Uri, window } from "vscode";
import { RunResultMetaMap } from "../domain";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { ManifestCacheChangedEvent } from "../manifest/event/manifestCacheChangedEvent";
import { provideSingleton } from "../utils";

@provideSingleton(NavigateToCompiled)
export class NavigateToCompiled implements Disposable {
  private runResultMetaMap: Map<string, RunResultMetaMap> = new Map();
  private disposables: Disposable[] = [];

  constructor(private dbtProjectContainer: DBTProjectContainer) {
    this.disposables.push(
      this.dbtProjectContainer.onManifestChanged((event) =>
        this.onManifestChanged(event)
      )
    );
  }

  async navigateToCompiled(uri?: Uri) {
    uri = uri === undefined ? window.activeTextEditor?.document.uri : uri;
    if(uri === undefined) {
      return;
    }
    const projectRootpath = this.dbtProjectContainer.getProjectRootpath(uri);
    if (projectRootpath === undefined) {
      return;
    }
    const runResultMap = this.runResultMetaMap.get(projectRootpath.fsPath);
    if (runResultMap === undefined) {
      return;
    }
    const runResult = runResultMap.get(uri.fsPath);
    if (runResult === undefined || runResult.compiledPath === undefined) {
      return;
    }
    const errorMessage = runResult.error;
      if (errorMessage) {
        window.showErrorMessage(errorMessage);
      }
      await commands.executeCommand("vscode.open", Uri.file(runResult.compiledPath), { preview: false });
  }

  dispose() {
    this.disposables.forEach((disposable) => disposable.dispose());
  }

  private onManifestChanged(event: ManifestCacheChangedEvent): void {
    event.added?.forEach((added) => {
      this.runResultMetaMap.set(
        added.projectRoot.fsPath,
        added.runResultMetaMap
      );
    });
    event.removed?.forEach((removed) => {
      this.runResultMetaMap.delete(removed.projectRoot.fsPath);
    });
  }
}
