import {
  CancellationToken,
  commands,
  Disposable,
  env,
  TextEditor,
  Uri,
  WebviewView,
  WebviewViewProvider,
  WebviewViewResolveContext,
  window,
  workspace,
} from "vscode";
import { provideSingleton } from "../utils";
import { TelemetryService } from "../telemetry";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import {
  ManifestCacheChangedEvent,
  ManifestCacheProjectAddedEvent,
} from "../manifest/event/manifestCacheChangedEvent";
import { ModelGraphViewPanel } from "./modelGraphViewPanel";
import { NewLineagePanel } from "./newLineagePanel";
import { inject } from "inversify";

export interface LineagePanelView extends WebviewViewProvider {
  init(): void;
  eventMapChanged(eventMap: Map<string, ManifestCacheProjectAddedEvent>): void;
  changedActiveColorTheme(): void;
  changedActiveTextEditor(event: TextEditor | undefined): void;
}

@provideSingleton(LineagePanel)
export class LineagePanel implements WebviewViewProvider, Disposable {
  public static readonly viewType = "dbtPowerUser.Lineage";

  private panel: WebviewView | undefined;
  private context: WebviewViewResolveContext<unknown> | undefined;
  private token: CancellationToken | undefined;
  private eventMap: Map<string, ManifestCacheProjectAddedEvent> = new Map();
  private disposables: Disposable[] = [];

  public constructor(
    private lineagePanel: NewLineagePanel,
    private legacyLineagePanel: ModelGraphViewPanel,
    dbtProjectContainer: DBTProjectContainer,
    private telemetry: TelemetryService,
  ) {
    this.disposables.push(
      dbtProjectContainer.onManifestChanged((event) =>
        this.onManifestCacheChanged(event),
      ),
    );
    window.onDidChangeActiveColorTheme(
      async (e) => {
        // TODO: add code for
      },
      null,
      this.disposables,
    );
    window.onDidChangeActiveTextEditor((event: TextEditor | undefined) => {
      this.getPanel().changedActiveTextEditor(event);
    });
  }

  private getPanel() {
    const isEnableNewLineagePanel = workspace
      .getConfiguration("dbt")
      .get<boolean>("enableNewLineagePanel", false);
    return isEnableNewLineagePanel
      ? this.lineagePanel
      : this.legacyLineagePanel;
  }

  private onManifestCacheChanged(event: ManifestCacheChangedEvent): void {
    event.added?.forEach((added) => {
      this.eventMap.set(added.projectRoot.fsPath, added);
    });
    event.removed?.forEach((removed) => {
      this.eventMap.delete(removed.projectRoot.fsPath);
    });
    this.getPanel().eventMapChanged(this.eventMap);
  }

  dispose() {
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  private init = async () => {
    await this.getPanel().resolveWebviewView(
      this.panel!,
      this.context!,
      this.token!,
    );
    this.getPanel().eventMapChanged(this.eventMap);
  };

  resolveWebviewView(
    panel: WebviewView,
    context: WebviewViewResolveContext<unknown>,
    token: CancellationToken,
  ): void | Thenable<void> {
    console.log("abstract:resolveWebviewView -> ");
    this.panel = panel;
    this.context = context;
    this.token = token;
    const panelType = workspace
      .getConfiguration("dbt")
      .get<boolean>("enableNewLineagePanel", false);

    this.init();
    panel.webview.onDidReceiveMessage(this.handleWebviewMessage, null, []);
    const sendLineageViewEvent = () => {
      if (this.panel!.visible) {
        // keeping the legacy event name same for analysis
        this.telemetry.sendTelemetryEvent(
          panelType ? "NewLineagePanelActive" : "LineagePanelActive",
        );
      }
    };
    sendLineageViewEvent();
    panel.onDidChangeVisibility(sendLineageViewEvent);
  }

  private handleWebviewMessage = async (message: {
    command: string;
    args: any;
  }) => {
    const { command, args } = message;
    if (command === "openFile") {
      const { url } = args;
      if (!url) {
        return;
      }
      await commands.executeCommand("vscode.open", Uri.file(url), {
        preview: false,
        preserveFocus: true,
      });
      return;
    }

    if (command === "setNewLineageView") {
      await workspace
        .getConfiguration("dbt")
        .update("enableNewLineagePanel", true);
      this.init();
      this.telemetry.sendTelemetryEvent("NewLineagePanelSelected");
      return;
    }

    if (command === "setLegacyLineageView") {
      await workspace
        .getConfiguration("dbt")
        .update("enableNewLineagePanel", false);
      this.init();
      this.telemetry.sendTelemetryEvent("LegacyLineagePanelSelected");
      return;
    }

    if (command === "request") {
      (this.getPanel() as NewLineagePanel).handleRequest(args);
      return;
    }

    if (command === "init") {
      this.getPanel()?.init();
      return;
    }

    if (command === "openDocs") {
      env.openExternal(
        Uri.parse(
          "https://docs.google.com/forms/d/10_YT2XDwpbkDXio-7TEYPQXsJfCBFqYUa7t0ImzyZvE/edit",
        ),
      );
      return;
    }
  };
}
