import {
  Event,
  EventEmitter,
  TextDocumentContentProvider,
  Disposable,
  Uri,
  window
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
    const fsPath = decodeURI(uri.path);
    const query = readFileSync(fsPath).toString("utf8");
    // TODO: probably needs better error checking
    return this.dbtProjectContainer.findDBTProject(Uri.parse(fsPath))!.compileQuery(query);
  }
}
