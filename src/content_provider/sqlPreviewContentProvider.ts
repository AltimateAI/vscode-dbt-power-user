import { readFileSync } from "fs";
import {
  Disposable,
  Event,
  EventEmitter,
  FileSystemWatcher,
  RelativePattern,
  TextDocumentContentProvider,
  Uri,
  workspace,
} from "vscode";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { debounce, provideSingleton } from "../utils";

@provideSingleton(SqlPreviewContentProvider)
export class SqlPreviewContentProvider
  implements TextDocumentContentProvider, Disposable
{
  static readonly SCHEME = "query-preview";

  private _onDidChange = new EventEmitter<Uri>();
  private compilationDocs = new Map<string, Uri>();
  private subscriptions: Disposable;
  private watchers: FileSystemWatcher[] = [];

  constructor(private dbtProjectContainer: DBTProjectContainer) {
    this.subscriptions = workspace.onDidCloseTextDocument((compilationDoc) =>
      this.compilationDocs.delete(compilationDoc.uri.toString()),
    );
  }

  dispose(): void {
    this._onDidChange.dispose();
    this.subscriptions.dispose();
    while (this.watchers.length) {
      const x = this.watchers.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  get onDidChange(): Event<Uri> {
    return this._onDidChange.event;
  }

  provideTextDocumentContent(uri: Uri): string | Thenable<string> {
    if (this.compilationDocs.get(uri.toString()) === undefined) {
      this.compilationDocs.set(uri.toString(), uri);
      const watcher = workspace.createFileSystemWatcher(
        new RelativePattern(uri, "*"),
      );
      this.watchers.push(watcher);
      watcher.onDidChange(debounce(() => this._onDidChange.fire(uri), 500));
      // TODO: onDelete? onCreate?
    }
    return this.requestCompilation(uri);
  }

  private requestCompilation(uri: Uri) {
    try {
      const fsPath = decodeURI(uri.fsPath);
      const query = readFileSync(fsPath, "utf8");
      const project = this.dbtProjectContainer.findDBTProject(Uri.file(fsPath));
      if (project === undefined) {
        return "Still loading dbt project, please try again later...";
      }
      return project.compileQuery(query);
    } catch (error: any) {
      return error;
    }
  }
}
