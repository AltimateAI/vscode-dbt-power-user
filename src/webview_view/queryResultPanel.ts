import {
    commands,
    Disposable,
    ProgressLocation,
    Uri,
    WebviewView,
    WebviewViewProvider,
    WebviewViewResolveContext,
    WebviewOptions,
    WebviewPanelOptions,
    CancellationToken,
    window,
    Webview,
    ColorThemeKind,
    workspace
} from "vscode";

import { DBTClient } from "../dbt_client";
import { DBTCommandFactory } from "../dbt_client/dbtCommandFactory";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { provideSingleton } from '../utils';
import { runQuery, isError, OsmosisRunResult, OsmosisErrorCode } from "../osmosis_client";

interface JsonObj {
    [key: string]: string | number | undefined;
}

@provideSingleton(QueryResultPanel)
export class QueryResultPanel implements WebviewViewProvider {
    public static readonly viewType = 'dbtPowerUser.PreviewResults';

    private readonly _extensionUri: Uri;
    private _disposables: Disposable[] = [];
    private _panel: WebviewView | undefined;

    public constructor(
        private dbtClient: DBTClient,
        private commandFactory: DBTCommandFactory,
        private dbtProjectContainer: DBTProjectContainer,
    ) {
        this._extensionUri = this.dbtProjectContainer.extensionUri;
        window.onDidChangeActiveColorTheme((e) => {
            if (this._panel) {
                this._panel.webview.html = getHtml(this._panel.webview, this.dbtProjectContainer.extensionUri);
            }
        }, null, this._disposables);
    }

    public resolveWebviewView(
        panel: WebviewView,
        context: WebviewViewResolveContext,
        _token: CancellationToken
    ) {
        this._panel = panel;
        this.setupWebviewOptions(context);
        this.renderWebviewView(context);
        this.setupWebviewHooks(context);
    }

    private setupWebviewOptions(context: WebviewViewResolveContext) {
        this._panel!.title = ""; // ?
        this._panel!.description = "Preview dbt SQL Results";
        this._panel!.webview.options = {
            enableScripts: true,
            retainContextWhenHidden: true
        } as WebviewOptions & WebviewPanelOptions;
    }

    private setupWebviewHooks(context: WebviewViewResolveContext) {
        this._panel!.webview.onDidReceiveMessage(
            message => {
                switch (message.command) {
                    case 'error':
                        // Errors should be acknowledged
                        window.showErrorMessage(message.text);
                        return;
                    case 'info':
                        // Info commands are transient notifications
                        window.withProgress(
                            { title: message.text, location: ProgressLocation.Notification, cancellable: false },
                            async () => {
                                await new Promise(timer => setTimeout(timer, 3000));
                            }
                        );
                        return;
                }
            }, null, this._disposables
        );
    }

    private renderWebviewView(context: WebviewViewResolveContext) {
        const webview = this._panel!.webview!;
        this._panel!.webview.html = getHtml(webview, this.dbtProjectContainer.extensionUri);
    }

    private async transmitData(
        columns: JsonObj[],
        rows: JsonObj[],
        raw_sql: string,
        compiled_sql: string,
    ) {
        await this._panel!.webview.postMessage({
            action: "queryResults",
            columns: columns,
            rows: rows,
            sql: raw_sql,
            compiled_sql: compiled_sql
        });
    }

    private async transmitError(error: any, raw_sql: string, compiled_sql: string) {
        await this._panel!.webview.postMessage({
            action: "error",
            error: error,
            sql: raw_sql,
            compiled_sql: compiled_sql
        });
    }

    private async transmitLoading() {
        await this._panel!.webview.postMessage({
            action: "loading"
        });
    }

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

    public async executeQuery(query: string, projectRootUri: Uri, profilesDir: Uri, target: string, title?: string) {
        // if (title) { this._panel!.title = title; }
        this.transmitLoading();
        let result = await runQuery(query, 100);
        if (isError(result)) {
            if (result.error.code !== OsmosisErrorCode.FailedToReachServer) {
                // Query hit live server but we have a legitimate error, return it
                await this.transmitError(result.error, query, query);
                return result.error.message;
            }
            // Assume from here server is not running
            const command = this.commandFactory.createRunQueryCommand(query, projectRootUri, profilesDir, target);
            const process = await this.dbtClient.executeCommand(command);
            try {
                const response = await process.complete();
                result = JSON.parse(response) as OsmosisRunResult;
                await this.transmitDataWrapper(result, query);
            } catch (error: any) {
                const errorObj = JSON.parse(error);
                if (errorObj.message.includes("No module named 'dbt_osmosis")) {
                    commands.executeCommand("dbtPowerUser.installDbtOsmosis");
                }
                await this.transmitError(errorObj, query, query);
                return errorObj.message;
            }
        } else {
            await this.transmitDataWrapper(result, query);
        }
    }

}

function getHtml(webview: Webview, extensionUri: Uri) {
    const nonce = getNonce();
    // Vscode
    const toolkitUri = getUri(webview, extensionUri, ["media", "js", "toolkit.min.js"]);
    // Tabulator.js
    const tabulatorScriptUri = getUri(webview, extensionUri, ["media", "js", "tabulator.min.js"]);
    const tabulatorStylesUri = getUri(webview, extensionUri, ["media", "css", "tabulator_site.min.css"]);
    // Prism.js
    const prismJsUri = getUri(webview, extensionUri, ["media", "js", "prism.js"]);
    const prismCssUri = getUri(webview, extensionUri, ["media", "css",
        window.activeColorTheme.kind === ColorThemeKind.Light
            || window.activeColorTheme.kind === ColorThemeKind.HighContrastLight ? "prism-light.css" : "prism-dark.css"
    ]);
    // Power User
    const spinnerUri = getUri(webview, extensionUri, ["media", "images", "animated_logo_no_bg_small_15fps.gif"]);
    const copyImageURI = getUri(webview, extensionUri, ["media", "images", "copy-regular.svg"]);
    const mainScriptUri = getUri(webview, extensionUri, ["media", "js", "main.js"]);
    const mainStylesUri = getUri(webview, extensionUri, ["media", "css", "main.css"]);
    return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <!-- Relax posture for now
        <meta http-equiv="Content-Security-Policy"
            content="default-src 'none'; style-src ${webview.cspSource} 'nonce-${nonce}'; img-src ${webview.cspSource} https:; script-src 'nonce-${nonce}';"> -->
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="${tabulatorStylesUri}" rel="stylesheet">
        <link href="${prismCssUri}" rel="stylesheet">
        <link href="${mainStylesUri}" rel="stylesheet">
        <script nonce="${nonce}" src="${tabulatorScriptUri}"></script>
        <script type="module" nonce="${nonce}" src="${toolkitUri}"></script>
        <title>Query Results</title>
    </head>
    
    <body>
        <!-- Main Container -->
        <vscode-panels activeid="tab-1" aria-label="dbt Query Results">
            <vscode-panel-tab id="tab-1">
                Query Results
                <vscode-badge id="row-badge" appearance="secondary">0</vscode-badge>
            </vscode-panel-tab>
            <vscode-panel-tab id="tab-2">Dispatched SQL</vscode-panel-tab>
            <vscode-panel-view id="view-1">
                <!-- Result container shown on success -->
                <div id="results-container">
                    <br id="results-break" />
                    <!-- Tabulator table is rendered here -->
                    <div id="results-panel"></div>
                </div>
                <!-- Error container shown on failure -->
                <div id="error-container">
                    <h3 id="error-title">Error</h3>
                    <h4 id="error-message">Message</h4>
                    <details>
                        <summary>View Detailed Error &nbsp; &nbsp; &nbsp;
                            <button id="clipboard-error" class="tooltip">
                                <img id="clipboard-image" class="clipboard-image" src="${copyImageURI}" height="15px"
                                    width="15px"></img>
                                <span class="tooltiptext">Click to copy error message</span>
                            </button>
                        </summary>
                        <pre id="error-details"></pre>
                    </details>
                    <br />
                </div>
            </vscode-panel-view>
            <vscode-panel-view id="view-2">
                <!-- Introspectable Dispatch SQL -->
                <div id="sql-container">
                    <pre><code id="sql" class="language-sql line-numbers" data-prismjs-copy="Copy SQL"></code></pre>
                </div>
            </vscode-panel-view>
        </vscode-panels>
        <!-- Loader -->
        <img id="loader" src="${spinnerUri}" height="200px" width="200px"></img>
    </body>
    <script nonce="${nonce}" src="${prismJsUri}"></script>
    <script nonce="${nonce}" src="${mainScriptUri}"></script>
    </html>`;
}

function getNonce() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function getUri(webview: Webview, extensionUri: Uri, pathList: string[]) {
    return webview.asWebviewUri(Uri.joinPath(extensionUri, ...pathList));
}