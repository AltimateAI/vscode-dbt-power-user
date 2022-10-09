import {
  commands,
  Disposable,
  ProgressLocation,
  Uri,
  WebviewView,
  WebviewViewProvider,
  WebviewViewResolveContext,
  WebviewOptions,
  CancellationToken,
  window,
  Webview,
  ColorThemeKind,
  workspace
} from "vscode";

import { readFileSync } from "fs";

import { DBTClient } from "../dbt_client";
import { DBTCommandFactory } from "../dbt_client/dbtCommandFactory";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { provideSingleton } from '../utils';
import { isError, OsmosisRunResult, OsmosisErrorContainer } from "../osmosis_client";

interface JsonObj {
  [key: string]: string | number | undefined;
}

enum OutboundCommand {
  RenderQuery = "renderQuery",
  RenderLoading = "renderLoading",
  RenderError = "renderError",
  InjectConfig = "injectConfig",
  ResetState = "resetState",
}

interface RenderQuery {
  columns: JsonObj[],
  rows: JsonObj[],
  raw_sql: string,
  compiled_sql: string
}

interface RenderError {
  error: any,
  raw_sql: string,
  compiled_sql: string
}

interface InjectConfig {
  limit?: number
}

enum InboundCommand {
  Info = "info",
  Error = "error",
  UpdateConfig = "updateConfig",
}

interface RecInfo {
  text: string
}

interface RecError {
  text: string
}

interface RecConfig {
  limit?: number
}

@provideSingleton(QueryResultPanel)
export class QueryResultPanel implements WebviewViewProvider {
  public static readonly viewType = 'dbtPowerUser.PreviewResults';

  private _disposables: Disposable[] = [];
  private _panel: WebviewView | undefined;

  public constructor(
    private dbtClient: DBTClient,
    private commandFactory: DBTCommandFactory,
    private dbtProjectContainer: DBTProjectContainer,
  ) {
    window.onDidChangeActiveColorTheme(async (e) => {
      if (this._panel) {
        this._panel.webview.html = getHtml(this._panel.webview, this.dbtProjectContainer.extensionUri);
        await this.transmitConfig();
      }
    }, null, this._disposables);
  }

  public async resolveWebviewView(
    panel: WebviewView,
    context: WebviewViewResolveContext,
    _token: CancellationToken
  ) {
    this._panel = panel;
    this.setupWebviewOptions(context);
    this.renderWebviewView(context);
    this.setupWebviewHooks(context);
    await this.transmitConfig();
    _token.onCancellationRequested(async () => {
      await this.transmitReset();
    });
  }

  /** Sets options, note that retainContextWhen hidden is set on registration */
  private setupWebviewOptions(context: WebviewViewResolveContext) {
    this._panel!.title = "Query Results";
    this._panel!.description = "Preview dbt SQL Results";
    this._panel!.webview.options = <WebviewOptions>{ enableScripts: true };
  }

  /** Primary interface for WebviewView inbound communication */
  private setupWebviewHooks(context: WebviewViewResolveContext) {
    this._panel!.webview.onDidReceiveMessage(
      message => {
        switch (message.command) {
          case InboundCommand.Error:
            let error = message as RecError;
            window.showErrorMessage(error.text);
            break;
          case InboundCommand.Info:
            let info = message as RecInfo;
            window.withProgress(
              { title: info.text, location: ProgressLocation.Notification, cancellable: false },
              async () => {
                await new Promise(timer => setTimeout(timer, 3000));
              }
            );
            break;
          case InboundCommand.UpdateConfig:
            let config = message as RecConfig;
            if (config.limit) {
              workspace.getConfiguration("dbt.queryPreview")
                .update("queryLimit", config.limit);
            }
            break;
        }
      }, null, this._disposables
    );
  }

  /** Renders webview content */
  private async renderWebviewView(context: WebviewViewResolveContext) {
    const webview = this._panel!.webview!;
    this._panel!.webview.html = getHtml(webview, this.dbtProjectContainer.extensionUri);
  }

  /** Sends query result data to webview */
  private async transmitData(
    columns: JsonObj[],
    rows: JsonObj[],
    raw_sql: string,
    compiled_sql: string,
  ) {
    await this._panel!.webview.postMessage({
      command: OutboundCommand.RenderQuery,
      ...<RenderQuery>{ columns, rows, raw_sql, compiled_sql }
    });
  }

  /** Sends error result data to webview */
  private async transmitError(
    error: any,
    raw_sql: string,
    compiled_sql: string
  ) {
    await this._panel!.webview.postMessage({
      command: OutboundCommand.RenderError,
      ...<RenderError>{ error, raw_sql, compiled_sql }
    });
  }

  /** Sends VSCode config data to webview */
  private async transmitConfig(extraConfig = {}) {
    const limit = workspace.getConfiguration("dbt.queryPreview").get<number>("queryLimit");
    await this._panel!.webview.postMessage({
      command: OutboundCommand.InjectConfig,
      ...<InjectConfig>{ limit, ...extraConfig }
    });
  }

  /** Sends VSCode render loading command to webview */
  private async transmitLoading() {
    await this._panel!.webview.postMessage({
      command: OutboundCommand.RenderLoading
    });
  }

  /** Sends VSCode clear state command */
  private async transmitReset() {
    await this._panel!.webview.postMessage({
      command: OutboundCommand.ResetState
    });
  }

  /** A wrapper for {@link transmitData} which converts server 
   * results interface ({@link OsmosisRunResult}) to what the webview expects */
  private async transmitDataWrapper(result: OsmosisRunResult, query: string) {
    let columns: JsonObj[] = [];
    let rows: JsonObj[] = [];
    // Convert compressed array format to dict[]
    for (let i = 0; i < result.rows.length; i++) {
      result.rows[i].forEach((value: any, j: any) => {
        rows[i] = { ...rows[i], [result.column_names[j]]: value };
      });
    }
    // Define column spec for Tabulator
    result.column_names.forEach((def: any) => {
      columns = [...columns, { "title": def.toUpperCase(), "field": def }];
    });
    await this.transmitData(columns, rows, query, result.compiled_sql);
  };

  /** In the same vein as dbt cloud, get the query limit based 
   * on an explicitly set limit in ther users query or via settings */
  private getQueryLimit(query: string): number {
    const queryLimit = workspace.getConfiguration("dbt.queryPreview").get<number>("queryLimit", 200);
    const result = query.match(/limit (\d+)[^\w]*$/i) ?? [];
    const setLimit = result.length > 1 ? Number(result[1]) : queryLimit;
    return isNaN(setLimit) ? queryLimit : setLimit;
  }

  /** Runs a query transmitting appropriate notifications to webview */
  public async executeQuery(query: string, projectRootUri: Uri, profilesDir: Uri, target: string, title?: string) {
    // if (title) { this._panel!.title = title; }
    commands.executeCommand("workbench.view.extension.dbt_preview_results");
    this.transmitLoading();
    const command = this.commandFactory.createRunQueryCommand(query, projectRootUri, profilesDir, target);
    const process = await this.dbtClient.executeCommand(command);
    try {
      const response = await process.complete();
      const output: OsmosisRunResult | OsmosisErrorContainer = JSON.parse(response);
      if (isError(output)) {
        await this.transmitError(output.error, query, query);
      } else {
        await this.transmitDataWrapper(output, query);
      }
    } catch (error: any) {
      // Unknown error, not JSON
      window.showErrorMessage(error);
      await this.transmitError({
        error: { code: -1, message: error, data: {} }
      }, query, query);
    }
  }
}

/** Gets webview HTML */
function getHtml(webview: Webview, extensionUri: Uri) {
  let indexPath = getUri(webview, extensionUri, ['query_panel', 'index.html']);
  let resourceDir = getUri(webview, extensionUri, ['query_panel']);
  let theme = [ColorThemeKind.Light, ColorThemeKind.HighContrastLight].includes(window.activeColorTheme.kind)
    ? "light" : "dark";
  return readFileSync(indexPath.path).toString()
    .replace(/__ROOT__/g, resourceDir.toString())
    .replace(/__THEME__/g, theme)
    .replace(/__NONCE__/g, getNonce())
    .replace(/__CSPSOURCE__/g, webview.cspSource);
}

/** Used to enforce a secure CSP */
function getNonce() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

/** Utility method for generating webview Uris for resources */
function getUri(webview: Webview, extensionUri: Uri, pathList: string[]) {
  return webview.asWebviewUri(Uri.joinPath(extensionUri, ...pathList));
}
