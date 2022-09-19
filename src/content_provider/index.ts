import { Disposable, workspace } from "vscode";
import { SqlPreviewContentProvider } from "./sqlPreviewContentProvider";
import { provideSingleton } from "../utils";

@provideSingleton(ContentProviders)
export class ContentProviders implements Disposable {
    private disposables: Disposable[] = [];

    constructor(
        private sqlPreviewContentProvider: SqlPreviewContentProvider,
    ) {
        this.disposables.push(
            workspace.registerTextDocumentContentProvider(
                SqlPreviewContentProvider.SCHEME,
                this.sqlPreviewContentProvider
            )
        );
    }

    dispose() {
        this.disposables.forEach((disposable) => disposable.dispose());
    }
}
