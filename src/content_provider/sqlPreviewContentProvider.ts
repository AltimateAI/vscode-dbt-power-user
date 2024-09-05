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
  window,
  ProgressLocation,
} from "vscode";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { debounce, provideSingleton } from "../utils";
import { TelemetryService } from "../telemetry";
import { DeferToProdService } from "../services/deferToProdService";
import { AltimateRequest } from "../altimate";
import { ManifestPathType } from "../constants";
import path = require("path");

@provideSingleton(SqlPreviewContentProvider)
export class SqlPreviewContentProvider
  implements TextDocumentContentProvider, Disposable
{
  static readonly SCHEME = "query-preview";

  private _onDidChange = new EventEmitter<Uri>();
  private compilationDocs = new Map<string, Uri>();
  private subscriptions: Disposable;
  private watchers: FileSystemWatcher[] = [];

  constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private deferToProdService: DeferToProdService,
    private altimateRequest: AltimateRequest,
    private telemetry: TelemetryService,
  ) {
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
      const modelName = path.basename(fsPath, ".sql");
      const query = readFileSync(fsPath, "utf8");
      const project = this.dbtProjectContainer.findDBTProject(Uri.file(fsPath));
      if (project === undefined) {
        this.telemetry.sendTelemetryError("sqlPreviewNotLoadingError");
        return "Still loading dbt project, please try again later...";
      }
      this.telemetry.sendTelemetryEvent("requestCompilation");
      await project.refreshProjectConfig();
      const result = await project.unsafeCompileQuery(query, modelName);
      const { manifestPathType } =
        this.deferToProdService.getDeferConfigByProjectRoot(
          project.projectRoot.fsPath,
        );
      const dbtIntegrationMode = workspace
        .getConfiguration("dbt")
        .get<string>("dbtIntegration", "core");
      if (
        dbtIntegrationMode.startsWith("core") &&
        manifestPathType === ManifestPathType.REMOTE
      ) {
        this.altimateRequest.sendDeferToProdEvent(ManifestPathType.REMOTE);
      }
      return result;
    } catch (error: any) {
      const errorMessage = (error as Error).message;
      window.showErrorMessage(`Error while compiling: ${errorMessage}`);
      return errorMessage;
    }
  }
}
