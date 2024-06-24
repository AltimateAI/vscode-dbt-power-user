import {
  TextDocumentContentProvider,
  Disposable,
  EventEmitter,
  Uri,
  workspace,
} from "vscode";
import { provideSingleton } from "../utils";

// TODO: validate if this is needed
@provideSingleton(VirtualSqlContentProvider)
export class VirtualSqlContentProvider
  implements TextDocumentContentProvider, Disposable
{
  private subscriptions: Disposable;
  static readonly SCHEME = "virtual-sql";
  // emitter and its event
  onDidChangeEmitter = new EventEmitter<Uri>();
  onDidChange = this.onDidChangeEmitter.event;

  constructor() {
    this.subscriptions = workspace.onDidCloseTextDocument(
      (compilationDoc) => {},
    );
  }

  provideTextDocumentContent(uri: Uri): string {
    return "-- Type your (dbt) SQL query here\nSELECT * FROM your_table;";
  }

  dispose() {
    this.subscriptions.dispose();
  }
}
