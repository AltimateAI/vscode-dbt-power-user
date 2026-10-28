import { readFileSync, statSync } from "fs";
import {
  Disposable,
  Event,
  EventEmitter,
  ProgressLocation,
  TextDocument,
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
  /**
   * For each preview already served from its model's node, the modification
   * time the file had then. A preview missing from here is showing editor
   * text, so it is the one a fresh manifest can improve.
   */
  private nodeServedForMtime: Map<string, number> = new Map();

  constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private telemetry: TelemetryService,
  ) {
    // Register a single global listener for all document changes
    this.subscriptions.push(
      workspace.onDidChangeTextDocument((e: TextDocumentChangeEvent) => {
        // Check if this document has an associated preview
        const fileUriString = e.document.uri.toString();
        for (const [
          previewUriString,
          previewUri,
        ] of this.compilationDocs.entries()) {
          const actualFileUri = previewUri.with({ scheme: "file" });
          if (actualFileUri.toString() === fileUriString) {
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

    // A preview that fell back to the editor text because the manifest had not
    // caught up with the file is out of date as soon as it has: the node is
    // available now and carries the identity the editor text cannot. Nothing
    // else re-requests the preview, so without this a save leaves the
    // placeholder identity on screen until the next keystroke.
    this.subscriptions.push(
      this.dbtProjectContainer.onManifestChanged(() =>
        this.refreshPreviewsTheNodeCanNowAnswer(),
      ),
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
            this.nodeServedForMtime.delete(uriString);
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

  /**
   * Re-request every preview that was built from editor text and whose model's
   * node has since become usable.
   *
   * Only a preview whose content would change is re-requested, and only once
   * per saved version of its file, so a compile that rewrites
   * `target/manifest.json` — which is what `dbt compile` does on the
   * command-line integrations — cannot drive this round in a circle.
   */
  private refreshPreviewsTheNodeCanNowAnswer(): void {
    for (const [uriString, previewUri] of this.compilationDocs.entries()) {
      try {
        const fsPath = decodeURI(previewUri.fsPath);
        const project = this.dbtProjectContainer.findDBTProject(
          Uri.file(fsPath),
        );
        const canUseNode = project?.previewCanUseNode(
          fsPath,
          path.basename(fsPath, ".sql"),
          this.findOpenDocument(previewUri)?.isDirty === true,
        );
        if (canUseNode !== true) {
          continue;
        }
        const savedAt = statSync(fsPath).mtimeMs;
        if (this.nodeServedForMtime.get(uriString) === savedAt) {
          continue;
        }
        // Claimed before the request, not after it: the compile it leads to
        // rewrites `target/manifest.json` on the command-line integrations,
        // and that is another manifest change arriving here.
        this.nodeServedForMtime.set(uriString, savedAt);
        this._onDidChange.fire(previewUri);
      } catch (error) {
        // A preview whose file has gone is dropped when its editor closes.
      }
    }
  }

  private findOpenDocument(previewUri: Uri): TextDocument | undefined {
    const actualFileUri = previewUri.with({ scheme: "file" });
    return workspace.textDocuments.find(
      (doc) => doc.uri.toString() === actualFileUri.toString(),
    );
  }

  private async requestCompilation(uri: Uri) {
    const uriString = uri.toString();
    try {
      const fsPath = decodeURI(uri.fsPath);
      const modelName = path.basename(fsPath, ".sql");

      // Read from the active document if available, otherwise fall back to file
      const document = this.findOpenDocument(uri);
      const query = document
        ? document.getText()
        : readFileSync(fsPath, "utf8");

      const project = this.dbtProjectContainer.findDBTProject(Uri.file(fsPath));
      if (project === undefined) {
        this.telemetry.sendTelemetryError("sqlPreviewNotLoadingError");
        return "Still loading dbt project, please try again later...";
      }
      this.telemetry.sendTelemetryEvent("requestCompilation");
      await project.refreshProjectConfig();
      // A file the manifest already describes compiles as the node it actually
      // is, so identity-dependent Jinja resolves. Anything else still compiles
      // as written — see `previewCanUseNode`.
      const { compiledSql, fromNode } = await project.compileQueryForPreview(
        query,
        modelName,
        fsPath,
        document?.isDirty === true,
      );
      if (fromNode) {
        this.nodeServedForMtime.set(uriString, statSync(fsPath).mtimeMs);
      } else {
        this.nodeServedForMtime.delete(uriString);
      }
      return compiledSql;
    } catch (error: any) {
      const errorMessage = (error as Error).message;
      window.showErrorMessage(`Error while compiling: ${errorMessage}`);
      return errorMessage;
    }
  }
}
