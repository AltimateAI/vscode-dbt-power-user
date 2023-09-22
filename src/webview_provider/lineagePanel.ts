import {
  CancellationToken,
  commands,
  env,
  Uri,
  WebviewView,
  WebviewViewProvider,
  WebviewViewResolveContext,
  workspace,
} from "vscode";
import { provideSingleton } from "../utils";
import { TelemetryService } from "../telemetry";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { ManifestCacheChangedEvent } from "../manifest/event/manifestCacheChangedEvent";
import { ModelGraphViewPanel } from "./modelGraphViewPanel";
import { NewLineagePanel } from "./newLineageView";
import { inject } from "inversify";

export interface LineagePanelView extends WebviewViewProvider {
  onManifestCacheChanged(event: ManifestCacheChangedEvent): void;
  init(): void;
}

@provideSingleton(LineagePanel)
export class LineagePanel implements WebviewViewProvider {
  public static readonly viewType = "dbtPowerUser.Lineage";

  private lineagePanel: LineagePanelView | undefined;
  private panel: WebviewView | undefined;
  private context: WebviewViewResolveContext<unknown> | undefined;
  private token: CancellationToken | undefined;

  private manifestEvent: ManifestCacheChangedEvent | undefined;

  public constructor(
    @inject("Factory<NewLineagePanel>")
    private newLineageFactory: () => NewLineagePanel,
    @inject("Factory<ModelGraphViewPanel>")
    private legacyLineageFactory: () => ModelGraphViewPanel,
    dbtProjectContainer: DBTProjectContainer,
    private telemetry: TelemetryService,
  ) {
    dbtProjectContainer.onManifestChanged((event) => {
      console.log("abstract:onManifestChanged -> ");
      this.manifestEvent = event;
      this.lineagePanel?.onManifestCacheChanged(event);
    });
  }

  private init = async (newLineagePanel: boolean) => {
    console.log("abstract:init -> ");
    this.lineagePanel = newLineagePanel
      ? this.newLineageFactory()
      : this.legacyLineageFactory();
    await this.lineagePanel?.resolveWebviewView(
      this.panel!,
      this.context!,
      this.token!,
    );
    if (this.manifestEvent) {
      this.lineagePanel.onManifestCacheChanged(this.manifestEvent!);
    }
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
    this.init(
      workspace
        .getConfiguration("dbt")
        .get<boolean>("enableNewLineagePanel", false),
    );
    panel.webview.onDidReceiveMessage(this.handleWebviewMessage, null, []);
    const sendLineageViewEvent = () => {
      if (this.panel!.visible) {
        this.telemetry.sendTelemetryEvent("LineagePanelActive");
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
    console.log("host:handleWebviewMessage -> ", command, args);
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
      this.init(true);
      return;
    }

    if (command === "setLegacyLineageView") {
      await workspace
        .getConfiguration("dbt")
        .update("enableNewLineagePanel", false);
      this.init(false);
      return;
    }

    if (command === "request") {
      (this.lineagePanel as NewLineagePanel).handleRequest(args);
      return;
    }

    if (command === "init") {
      this.lineagePanel?.init();
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
