import { readFileSync } from "fs";
import {
  Disposable,
  Event,
  EventEmitter,
  ProgressLocation,
  TextDocumentChangeEvent,
  TextDocumentContentProvider,
  Uri,
  window,
  workspace,
} from "vscode";
import { DBTProjectContainer } from "../dbt_client/dbtProjectContainer";
import { TelemetryService } from "../telemetry";
import path = require("path");

export class SqlPreviewContentProvider
  implements TextDocumentContentProvider, Disposable
{
  static readonly SCHEME = "query-preview";

  private _onDidChange = new EventEmitter<Uri>();
  private compilationDocs = new Map<string, Uri>();
  private subscriptions: Disposable[] = [];
  private debounceTimers: Map<string, NodeJS.Timeout> = new Map();

  constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private telemetry: TelemetryService,
  ) {
    // Register a single global listener for all document changes
    this.subscriptions.push(
      workspace.onDidChangeTextDocument((e: TextDocumentChangeEvent) => {
        // Check if this document has an associated preview
        for (const [
          previewUriString,
          previewUri,
        ] of this.compilationDocs.entries()) {
          const isSourceDocument =
            e.document.uri.path === previewUri.path &&
            e.document.uri.scheme !== SqlPreviewContentProvider.SCHEME;
          if (isSourceDocument) {
            // Debounce the update
            const existingTimer = this.debounceTimers.get(previewUriString);
            if (existingTimer) {
              clearTimeout(existingTimer);
            }
            const timer = setTimeout(() => {
              this._onDidChange.fire(previewUri);
              this.debounceTimers.delete(previewUriString);
            }, 500);
            this.debounceTimers.set(previewUriString, timer);
            break;
          }
        }
      }),
    );

    // Clean up when editors are closed, not when text documents are closed
    // This prevents premature cleanup during document lifecycle events
    this.subscriptions.push(
      window.onDidChangeVisibleTextEditors(() => {
        // Get all visible preview document URIs
        const visiblePreviewUris = new Set(
          window.visibleTextEditors
            .filter(
              (editor) =>
                editor.document.uri.scheme === SqlPreviewContentProvider.SCHEME,
            )
            .map((editor) => editor.document.uri.toString()),
        );

        // Remove documents that are no longer visible
        for (const [uriString] of this.compilationDocs.entries()) {
          if (!visiblePreviewUris.has(uriString)) {
            this.compilationDocs.delete(uriString);
            const timer = this.debounceTimers.get(uriString);
            if (timer) {
              clearTimeout(timer);
              this.debounceTimers.delete(uriString);
            }
          }
        }
      }),
    );
  }

  dispose(): void {
    this._onDidChange.dispose();
    for (const subscription of this.subscriptions) {
      subscription.dispose();
    }
    for (const timer of this.debounceTimers.values()) {
      clearTimeout(timer);
    }
    this.debounceTimers.clear();
  }

  get onDidChange(): Event<Uri> {
    return this._onDidChange.event;
  }

  provideTextDocumentContent(uri: Uri): string | Thenable<string> {
    const uriString = uri.toString();
    // Track this preview document for change detection
    this.compilationDocs.set(uriString, uri);
    return window.withProgress(
      {
        location: ProgressLocation.Notification,
        title: "Compiling dbt model...",
        cancellable: false,
      },
      async () => await this.requestCompilation(uri),
    );
  }

  private async requestCompilation(uri: Uri) {
    try {
      const fsPath = decodeURI(uri.fsPath);

      // Find the source document by matching the path component.
      // The preview URI preserves the original path (e.g. query-preview:Untitled-1
      // came from untitled:Untitled-1), so matching by path works for any scheme.
      const sourcePath = uri.path;
      const document = workspace.textDocuments.find(
        (doc) =>
          doc.uri.path === sourcePath &&
          doc.uri.scheme !== SqlPreviewContentProvider.SCHEME,
      );

      const isUntitled = document?.uri.scheme === "untitled";
      const query = document
        ? document.getText()
        : readFileSync(fsPath, "utf8");
      const modelName = isUntitled ? "untitled" : path.basename(fsPath, ".sql");

      // findDBTProject handles untitled URIs internally via resolveProjectUri
      const project = this.dbtProjectContainer.findDBTProject(
        document?.uri ?? Uri.file(fsPath),
      );
      if (project === undefined) {
        this.telemetry.sendTelemetryError("sqlPreviewNotLoadingError");
        return isUntitled
          ? "No dbt project selected. Please select a project first."
          : "Still loading dbt project, please try again later...";
      }
      this.telemetry.sendTelemetryEvent("requestCompilation");
      await project.refreshProjectConfig();
      return await project.unsafeCompileQuery(query, modelName);
    } catch (error: any) {
      const errorMessage = (error as Error).message;
      window.showErrorMessage(`Error while compiling: ${errorMessage}`);
      return errorMessage;
    }
  }
}
