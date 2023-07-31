import { Disposable, workspace } from "vscode";
import { provideSingleton } from "../utils";
import { SqlPreviewContentProvider } from "./sqlPreviewContentProvider";

@provideSingleton(ContentProviders)
export class ContentProviders implements Disposable {
  private disposables: Disposable[] = [];

  constructor(private sqlPreviewContentProvider: SqlPreviewContentProvider) {
    this.disposables.push(
      workspace.registerTextDocumentContentProvider(
        SqlPreviewContentProvider.SCHEME,
        this.sqlPreviewContentProvider,
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
