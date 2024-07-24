import { Disposable, notebooks, workspace } from "vscode";
import { provideSingleton } from "../utils";
import { SampleSerializer } from "./sampleSerializer";
import { SampleKernel } from "./controller";
import { NotebookStatusBarProvider } from "./statusBarItemProvider";

@provideSingleton(NotebookProviders)
export class NotebookProviders implements Disposable {
  private disposables: Disposable[] = [];
  constructor(private notebookProvider: SampleSerializer) {
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
      new SampleKernel(),
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
