import { Disposable, notebooks, workspace } from "vscode";
import { provideSingleton } from "../utils";
import { DatapilotNotebookSerializer } from "./serializer";
import { NotebookKernel } from "./controller";
import { NotebookStatusBarProvider } from "./statusBarItemProvider";

@provideSingleton(NotebookProviders)
export class NotebookProviders implements Disposable {
  private disposables: Disposable[] = [];
  constructor(
    private notebookProvider: DatapilotNotebookSerializer,
    private notebookController: NotebookKernel,
  ) {
    this.disposables.push(
      notebooks.registerNotebookCellStatusBarItemProvider(
        "datapilot-notebook",
        new NotebookStatusBarProvider(),
      ),
      workspace.registerNotebookSerializer(
        "datapilot-notebook",
        this.notebookProvider,
        {},
      ),
      this.notebookController,
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
