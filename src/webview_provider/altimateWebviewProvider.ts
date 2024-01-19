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
import path = require("path");
import { sharedStateManager } from "./sharedStateManager";

export interface HandleCommandProps extends Record<string, unknown> {
  command: string;
  syncRequestId?: string;
}

type UpdateConfigProps = {
  key: string;
  value: string | boolean | number;
};

/**
 * This class is responsible for rendering the webview
 * Each panel needs to have its own provider which extends this class with correct viewPath and description
 */
@provideSingleton(AltimateWebviewProvider)
export class AltimateWebviewProvider implements WebviewViewProvider {
  public viewType = "dbtPowerUser.Default";
  protected viewPath = "/"; // webview route path from AppRoutes.tsx
  protected panelDescription = "Altimate default webview";

  protected _panel: WebviewView | undefined = undefined;
  protected _disposables: Disposable[] = [];

  public constructor(
    protected dbtProjectContainer: DBTProjectContainer,
    protected telemetry: TelemetryService,
  ) {}

  protected renderWebviewView(context: WebviewViewResolveContext) {
    const webview = this._panel!.webview!;
    this._panel!.webview.onDidReceiveMessage(this.handleCommand, this, []);

    webview.html = this.getHtml(
      webview,
      this.dbtProjectContainer.extensionPath,
    );
  }

  protected async handleCommand(message: HandleCommandProps): Promise<void> {
    const { command, syncRequestId, ...params } = message;

    switch (command) {
      case "datapilot:toggle":
        if (params.open) {
          await commands.executeCommand("dbtPowerUser.datapilot-webview.focus");
        }
        break;
      case "datapilot:message":
        sharedStateManager.postMessage(message);

        break;
      case "updateConfig":
        workspace
          .getConfiguration("dbt")
          .update(
            (params as UpdateConfigProps).key,
            (params as UpdateConfigProps).value,
          );
        break;
      default:
        break;
    }
  }

  resolveWebviewView(
    panel: WebviewView,
    context: WebviewViewResolveContext<unknown>,
    _token: CancellationToken,
  ): void | Thenable<void> {
    console.log("AltimateWebviewProvider:resolveWebviewView -> ");
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

    this._panel.webview.postMessage({
      command: "setTheme",
      args: { theme: this.getTheme() },
    });
  }

  private initWebView() {
    this.changedActiveColorTheme();
  }

  private setupWebviewOptions(context: WebviewViewResolveContext) {
    this._panel!.description = this.panelDescription;
    this._panel!.webview.options = <WebviewOptions>{
      enableScripts: true,
      localResourceRoots: [
        Uri.file(
          path.join(
            this.dbtProjectContainer.extensionPath,
            "webview_panels",
            "dist",
            "assets",
          ),
        ),
      ],
    };
  }

  private getTheme() {
    return [ColorThemeKind.Light, ColorThemeKind.HighContrastLight].includes(
      window.activeColorTheme.kind,
    )
      ? "light"
      : "dark";
  }
  private getHtml(webview: Webview, extensionUri: string) {
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
    const insightsCss = webview.asWebviewUri(
      Uri.file(
        path.join(
          extensionUri,
          "webview_panels",
          "dist",
          "assets",
          "Insights.css",
        ),
      ),
    );
    const nonce = getNonce();
    return `
        <!DOCTYPE html>
          <html lang="en" data-theme="${this.getTheme()}">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <!--
              Use a content security policy to only allow loading images from https or from our extension directory,
              and only allow scripts that have a specific nonce.
              Added unsafe-inline for css due to csp issue: https://github.com/JedWatson/react-select/issues/4631
              -->
              <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline' ${
                webview.cspSource
              }; img-src ${
                webview.cspSource
              } https: data:; script-src 'nonce-${nonce}';">
            <title>VSCode DBT Power user extension</title>
            <link rel="stylesheet" type="text/css" href="${indexCss}">
            <link rel="stylesheet" type="text/css" href="${insightsCss}">
          </head>
      
          <body>
            <div id="root"></div>
            <script nonce="${nonce}" >
              window.viewPath = "${this.viewPath}";
            </script>
            
            <script nonce="${nonce}" type="module" src="${indexJs}"></script>
          </body>
        </html>
      `;
  }
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
