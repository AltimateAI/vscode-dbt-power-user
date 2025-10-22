import { DBTTerminal } from "@altimateai/dbt-integration";
import { inject } from "inversify";
import {
  CancellationToken,
  commands,
  Disposable,
  TextEditor,
  Uri,
  WebviewView,
  WebviewViewProvider,
  WebviewViewResolveContext,
  window,
} from "vscode";
import { DBTProjectContainer } from "../dbt_client/dbtProjectContainer";
import {
  ManifestCacheChangedEvent,
  ManifestCacheProjectAddedEvent,
} from "../manifest/event/manifestCacheChangedEvent";
} from "../dbt_client/event/manifestCacheChangedEvent";
import { TelemetryService } from "../telemetry";
import { ModelGraphViewPanel } from "./modelGraphViewPanel";
import { NewLineagePanel } from "./newLineagePanel";

export interface LineagePanelView extends WebviewViewProvider {
  init(): void;
  eventMapChanged(eventMap: Map<string, ManifestCacheProjectAddedEvent>): void;
  changedActiveColorTheme(): void;
  changedActiveTextEditor(event: TextEditor | undefined): void;
  handleCommand(message: { command: string; args: any }): Promise<void> | void;
}

export class LineagePanel implements WebviewViewProvider, Disposable {
  public static readonly viewType = "dbtPowerUser.Lineage";

  private panel: WebviewView | undefined;
  private context: WebviewViewResolveContext<unknown> | undefined;
  private token: CancellationToken | undefined;
  private eventMap: Map<string, ManifestCacheProjectAddedEvent> = new Map();
  private disposables: Disposable[] = [];

  public constructor(
    private lineagePanel: NewLineagePanel,
    private dbtProjectContainer: DBTProjectContainer,
    private telemetry: TelemetryService,
    @inject("DBTTerminal")
    private dbtTerminal: DBTTerminal,
  ) {
    this.disposables.push(
      dbtProjectContainer.onManifestChanged((event) =>
        this.onManifestCacheChanged(event),
      ),
    );
    window.onDidChangeActiveColorTheme(
      async (e) => {
        this.getPanel().changedActiveColorTheme();
      },
      null,
      this.disposables,
    );
    window.onDidChangeActiveTextEditor((event: TextEditor | undefined) => {
      this.getPanel().changedActiveTextEditor(event);
    });
  }

  private getPanel() {
    return this.lineagePanel;
  }

  private onManifestCacheChanged(event: ManifestCacheChangedEvent): void {
    event.added?.forEach((added) => {
      this.eventMap.set(added.project.projectRoot.fsPath, added);
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
    this.panel = panel;
    this.context = context;
    this.token = token;

    this.init();
    panel.webview.onDidReceiveMessage(this.handleWebviewMessage, null, []);
    const sendLineageViewEvent = () => {
      if (this.panel!.visible) {
        this.telemetry.sendTelemetryEvent("NewLineagePanelActive");
      }
    };
    sendLineageViewEvent();
    panel.onDidChangeVisibility(sendLineageViewEvent);
  }

  private handleWebviewMessage = async (message: {
    command: string;
    args: any;
  }) => {
    this.dbtTerminal.debug(
      "lineagePanel:handleWebviewMessage",
      "message",
      message,
    );
    const { command, args } = message;
    // common commands
    if (command === "openFile") {
      const url = args.params?.url;
      if (!url) {
        return;
      }
      await commands.executeCommand("vscode.open", Uri.file(url), {
        preview: false,
        preserveFocus: true,
      });
      return;
    }

    if (command === "init") {
      this.getPanel()?.init();
      return;
    }

    if (command === "reactError") {
      const typeMapper: { [key: string]: string } = {
        generic: "Generic",
      };
      const { type } = args;
      this.telemetry.sendTelemetryEvent(
        "ReactError:" + typeMapper[type as keyof typeof typeMapper] ||
          "Unknown",
      );
    }

    // specific commands
    // Will add specific events in respective places in the future
    // this.telemetry.sendTelemetryEvent(command);
    this.getPanel().handleCommand(message);
  };
}
