import { Disposable, window } from "vscode";
import { provideSingleton } from "../utils";
import { QueryResultPanel } from "./queryResultPanel";

@provideSingleton(WebviewViewProviders)
export class WebviewViewProviders implements Disposable {
    private disposables: Disposable[] = [];

    constructor(
        private queryResultPanel: QueryResultPanel,
    ) {
        this.disposables.push(
            window.registerWebviewViewProvider(
                QueryResultPanel.viewType,
                this.queryResultPanel,
                { webviewOptions: { retainContextWhenHidden: true } }
            )
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
