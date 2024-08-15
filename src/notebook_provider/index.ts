import { Disposable, notebooks, workspace } from "vscode";
import { provideSingleton } from "../utils";
import { DatapilotNotebookSerializer } from "./serializer";
import { DatapilotNotebookController } from "./controller";
import { NotebookStatusBarProvider } from "./statusBarItemProvider";
import { NotebookFileSystemProvider } from "./notebookFileSystemProvider";
import { DatapilotNotebookScheme, DatapilotNotebookType } from "./constants";

@provideSingleton(NotebookProviders)
export class NotebookProviders implements Disposable {
  private disposables: Disposable[] = [];
  constructor(
    private notebookProvider: DatapilotNotebookSerializer,
    private notebookController: DatapilotNotebookController,
    private notebookFileSystemProvider: NotebookFileSystemProvider,
  ) {
    this.disposables.push(
      notebooks.registerNotebookCellStatusBarItemProvider(
        DatapilotNotebookType,
        new NotebookStatusBarProvider(),
      ),
      workspace.registerNotebookSerializer(
        DatapilotNotebookType,
        this.notebookProvider,
        {},
      ),
      this.notebookController,
    );
    // Register your custom file system provider
    this.disposables.push(
      workspace.registerFileSystemProvider(
        DatapilotNotebookScheme,
        this.notebookFileSystemProvider,
        {
          isCaseSensitive: true,
          isReadonly: false,
        },
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
