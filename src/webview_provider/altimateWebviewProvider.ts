import {
  CancellationToken,
  ColorThemeKind,
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
};

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
      this.dbtProjectContainer.getExtensionPath(),
    );
  }

  protected async handleCommand(message: {
    command: string;
    args: Record<string, unknown>;
  }): Promise<void> {
    const { command, args } = message;
    const { id, params } = args;

    switch (command) {
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
  }

  private setupWebviewOptions(context: WebviewViewResolveContext) {
    this._panel!.description = this.panelDescription;
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
    return `
        <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>VSCode DBT Power user extension</title>
            <link rel="stylesheet" type="text/css" href="${indexCss}">
          </head>
      
          <body>
            <div id="root"></div>
            <script>
              window.viewPath = "${this.viewPath}";
            </script>
            
            <script nonce="${getNonce()}" type="module" src="${indexJs}"></script>
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
