import {
    Event,
    EventEmitter,
    TextDocumentContentProvider,
    Disposable,
    Uri,
    window
} from 'vscode';
import { provideSingleton } from '../utils';
import { compileQuery, isError } from '../osmosis_client';

@provideSingleton(SqlPreviewContentProvider)
export class SqlPreviewContentProvider implements TextDocumentContentProvider, Disposable {
    static readonly SCHEME = 'query-preview';
    static readonly URI = Uri.parse(`${SqlPreviewContentProvider.SCHEME}:Compiled SQL?dbt-osmosis-server`);

    public onDidChangeEmitter = new EventEmitter<Uri>();
    public static instance: SqlPreviewContentProvider | undefined;
    public constructor() {
        SqlPreviewContentProvider.instance = this;
        // Seed the doc with text if vscode was opened with SQL file in active editor
        // otherwise our watchers will do it
        if (window.activeTextEditor?.document.languageId === "jinja-sql") {
            globalThis.currentSql = window.activeTextEditor?.document.getText() ?? "";
        }
    }

    dispose(): void {
        SqlPreviewContentProvider.instance = undefined;
        this.onDidChangeEmitter.dispose();
    }

    get onDidChange(): Event<Uri> {
        return this.onDidChangeEmitter.event;
    }

    async getQuery(): Promise<string> {
        let res = await compileQuery(globalThis.currentSql);
        if (isError(res)) {
            return res.error.message;
        } else {
            return res.result;
        }
    }

    provideTextDocumentContent(): string | Thenable<string> {
        return this.getQuery();
    }
}
