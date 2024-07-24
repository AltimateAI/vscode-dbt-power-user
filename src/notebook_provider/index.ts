import { Disposable, notebooks, workspace } from "vscode";
import { provideSingleton } from "../utils";
import { SampleSerializer } from "./sampleSerializer";
import { NotebookKernel } from "./controller";
import { NotebookStatusBarProvider } from "./statusBarItemProvider";

@provideSingleton(NotebookProviders)
export class NotebookProviders implements Disposable {
  private disposables: Disposable[] = [];
  constructor(
    private notebookProvider: SampleSerializer,
    private notebookController: NotebookKernel,
  ) {
    this.disposables.push(
      notebooks.registerNotebookCellStatusBarItemProvider(
        "my-notebook",
        new NotebookStatusBarProvider(),
      ),
      workspace.registerNotebookSerializer(
        "my-notebook",
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
