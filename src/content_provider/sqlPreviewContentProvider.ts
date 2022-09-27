import {
  Event,
  EventEmitter,
  TextDocumentContentProvider,
  Disposable,
  Uri,
} from 'vscode';
import { readFileSync } from "fs";
import { DBTProjectContainer } from '../manifest/dbtProjectContainer';
import { provideSingleton } from '../utils';

@provideSingleton(SqlPreviewContentProvider)
export class SqlPreviewContentProvider implements TextDocumentContentProvider, Disposable {
  static readonly SCHEME = 'query-preview';

  public onDidChangeEmitter = new EventEmitter<Uri>();
  
  constructor(
    private dbtProjectContainer: DBTProjectContainer
  ) {}

  dispose(): void {
    this.onDidChangeEmitter.dispose();
  }

  get onDidChange(): Event<Uri> {
    return this.onDidChangeEmitter.event;
  }

  provideTextDocumentContent(uri: Uri): string | Thenable<string> {
    // TODO: implement recompilation when file is changed.
    const fsPath = decodeURI(uri.path);
    try {
      const query = readFileSync(fsPath, "utf8");
      return this.dbtProjectContainer.findDBTProject(Uri.parse("file://" + fsPath))!.compileQuery(query);
    } catch(error: any) {
      return error;
    }
  }
}
