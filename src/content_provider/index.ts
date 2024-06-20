import { Disposable, workspace } from "vscode";
import { provideSingleton } from "../utils";
import { SqlPreviewContentProvider } from "./sqlPreviewContentProvider";
import { VirtualSqlContentProvider } from "./virtualSqlContentProvider";

@provideSingleton(ContentProviders)
export class ContentProviders implements Disposable {
  private disposables: Disposable[] = [];

  constructor(
    private sqlPreviewContentProvider: SqlPreviewContentProvider,
    private virtualSqlContentProvider: VirtualSqlContentProvider,
  ) {
    this.disposables.push(
      workspace.registerTextDocumentContentProvider(
        SqlPreviewContentProvider.SCHEME,
        this.sqlPreviewContentProvider,
      ),
      workspace.registerTextDocumentContentProvider(
        VirtualSqlContentProvider.SCHEME,
        this.virtualSqlContentProvider,
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
