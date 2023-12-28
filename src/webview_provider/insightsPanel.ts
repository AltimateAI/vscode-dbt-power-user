import {
  CancellationToken,
  ColorThemeKind,
  commands,
  Disposable,
  Uri,
  Webview,
  WebviewOptions,
  WebviewView,
  WebviewViewProvider,
  WebviewViewResolveContext,
  window,
  workspace,
} from "vscode";
import { provideSingleton } from "../utils";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { TelemetryService } from "../telemetry";
import { readFileSync, writeFileSync } from "fs";
import path = require("path");

type UpdateConfigProps = {
  key: string;
  value: string | boolean | number;
}

enum OutboundCommand{
  InjectConfig = "injectConfig",
}
type InjectConfig = {
  reducer: string;
  state: {
    defer: boolean;
    favorState: boolean;
    manifestPathForDeferral: string;
  }
}
@provideSingleton(InsightsPanel)
export class InsightsPanel implements WebviewViewProvider {
  public static readonly viewType = "dbtPowerUser.Insights";
  private _panel: WebviewView | undefined = undefined;
  private _disposables: Disposable[] = [];

  public constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private telemetry: TelemetryService,
  ) {}

  private renderWebviewView(context: WebviewViewResolveContext) {
    const webview = this._panel!.webview!;
    this._panel!.webview.onDidReceiveMessage(this.handleCommand, this, []);

    webview.html = getHtml(
      webview,
      this.dbtProjectContainer.getExtensionPath(),
    );
  }

  async handleCommand(message: { command: string; args: Record<string, unknown> }): Promise<void> {
    const { command, args } = message;
    const { id, params} = args;

    switch (command) {
      case "bigqueryCostEstimate":
        console.log("insights_panel:handleCommand -> bigqueryCostEstimate");
        const result = await commands.executeCommand("dbtPowerUser.bigqueryCostEstimate", {returnResult: true});

        this._panel!.webview.postMessage({
          command: "response",
          args: { id, body: result, status: true},
        });
        break;
      case "altimateScan":
        commands.executeCommand("dbtPowerUser.altimateScan", {});
        break;
      case "clearAltimateScanResults":
        commands.executeCommand("dbtPowerUser.clearAltimateScanResults", {});
        break;
      case "updateConfig":
        workspace
          .getConfiguration("dbt")
          .update((params as UpdateConfigProps).key, (params as UpdateConfigProps).value);
      default:
        break;
    }
  }

  /** Sends VSCode config data to webview */
  private transmitConfig() {
    
    if (this._panel) {
      this._panel.webview.postMessage({
        command: OutboundCommand.InjectConfig,
        args: [(<InjectConfig>{
          reducer: "deferState",
          state: {defer: workspace.getConfiguration("dbt").get<boolean>("defer"),
          favorState: workspace.getConfiguration("dbt").get<boolean>("favorState"),
          manifestPathForDeferral: workspace.getConfiguration("dbt").get<string>("manifestPathForDeferral"),}
        })],
      });
    }
  }
  
  resolveWebviewView(
    panel: WebviewView,
    context: WebviewViewResolveContext<unknown>,
    _token: CancellationToken,
  ): void | Thenable<void> {
    console.log("insights_panel:resolveWebviewView -> ");
    this._panel = panel;
    this.setupWebviewOptions(context);
    this.renderWebviewView(context);
    setTimeout(() => {
      this.initWebView();
    }, 1000);
  }

  changedActiveColorTheme() {
    if (!this._panel) {
      return;
    }
    const theme = [
      ColorThemeKind.Light,
      ColorThemeKind.HighContrastLight,
    ].includes(window.activeColorTheme.kind)
      ? "light"
      : "dark";
    this._panel.webview.postMessage({
      command: "setTheme",
      args: { theme },
    });
  }

  private initWebView() {
    this.changedActiveColorTheme();
    this.transmitConfig();
  }

  private setupWebviewOptions(context: WebviewViewResolveContext) {
    this._panel!.description = "Toggle Defer to prod and other features";
    this._panel!.webview.options = <WebviewOptions>{
      enableScripts: true,
      localResourceRoots: [
        Uri.file(
          path.join(
            this.dbtProjectContainer.getExtensionPath(),
            "webview_panels",
            "dist",
            "assets",
          ),
        ),
      ],
    };
  }
}

function getHtml(webview: Webview, extensionUri: string) {
  // const indexJs = getUri(webview, extensionUri, [
  //   "webview_panels",
  //   "dist",
  //   "assets",
  //   "main.js",
  // ]);
  const indexJs = webview.asWebviewUri(
    Uri.file(
      path.join(extensionUri, "webview_panels", "dist", "assets", "main.js"),
    ),
  );
  const indexCss = webview.asWebviewUri(
    Uri.file(
      path.join(extensionUri, "webview_panels", "dist", "assets", "main.css"),
    ),
  );
  return `
      <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>React App</title>
          <link rel="stylesheet" type="text/css" href="${indexCss}">
        </head>
    
        <body>
          <div id="root"></div>
          <script>
            window.viewPath = "/insights";
          </script>
          
          <script nonce="${getNonce()}" type="module" src="${indexJs}"></script>
        </body>
      </html>
    `;
}

function getNonce() {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function getUri(webview: Webview, extensionUri: Uri, pathList: string[]) {
  return webview.asWebviewUri(Uri.joinPath(extensionUri, ...pathList));
}
async function replaceInFile(
  filename: Uri,
  searchString: string,
  replacementString: string,
) {
  const contents = readFileSync(filename.fsPath, "utf8");
  const replacedContents = contents.replace(searchString, replacementString);
  writeFileSync(filename.fsPath, replacedContents, "utf8");
}
