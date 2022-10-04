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
    }

    private setupWebviewOptions(context: WebviewViewResolveContext) {
        this._panel!.title = ""; // ?
        this._panel!.description = "Preview dbt SQL Results";
        this._panel!.webview.options = {
            enableScripts: true,
            // retainContextWhenHidden: true
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
                    case 'updateConfig':
                        // Limit prop asks us to update dbt.queryPreview.queryLimit
                        if (message.limit) {
                            workspace.getConfiguration("dbt.queryPreview")
                                .update("queryLimit", message.limit);
                        }
                        return;
                }
            }, null, this._disposables
        );
    }

    private async renderWebviewView(context: WebviewViewResolveContext) {
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

    private async transmitConfig() {
        // dbt.queryPreview.queryLimit
        await this._panel!.webview.postMessage({
            action: "renderConfig",
            limit: workspace.getConfiguration("dbt.queryPreview").get<number>("queryLimit")
        });
    }

    public async executeQuery(query: string, projectRootUri: Uri, profilesDir: Uri, target: string, title?: string) {
        // if (title) { this._panel!.title = title; }
        this.transmitLoading();
        let result = await runQuery(query, workspace.getConfiguration("dbt.queryPreview").get<number>("queryLimit"));
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

/** Inline javascript / HTML based webview */
function getHtml(webview: Webview, extensionUri: Uri) {
    const nonce = getNonce();
    // Vscode
    const toolkitUri = getUri(webview, extensionUri, ["media", "js", "toolkit.min.js"]);
    // Tabulator.js
    const tabulatorScriptUri = getUri(webview, extensionUri, ["media", "js", "tabulator.min.js"]);
    const tabulatorStylesUri = getUri(webview, extensionUri, ["media", "css", "tabulator_site.min.css"]);
    // Prism.js
    const prismJsUri = getUri(webview, extensionUri, ["media", "js", "prism.js"]);
    window.activeColorTheme.kind in [ColorThemeKind.Light, ColorThemeKind.HighContrastLight]
    const prismCssUri = getUri(webview, extensionUri, ["media", "css",
        [ColorThemeKind.Light, ColorThemeKind.HighContrastLight].includes(window.activeColorTheme.kind)
            ? "prism-light.css" : "prism-dark.css"
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
        <vscode-panels id="panel-manager" activeid="tab-3" aria-label="dbt Query Results">
            <vscode-panel-tab id="tab-1">
                Query Results
                <vscode-badge id="row-badge" appearance="secondary">0</vscode-badge>
            </vscode-panel-tab>
            <vscode-panel-tab id="tab-2">Dispatched SQL</vscode-panel-tab>
            <vscode-panel-tab id="tab-3">Help</vscode-panel-tab>
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
                                <img id="clipboard-image" class="clipboard-image" src="${copyImageURI}"
                                    height="15px" width="15px"></img>
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
            <vscode-panel-view id="view-3">
                <!-- Config Settings -->
                <div>
                    <vscode-text-field id="limit-ctrl" type="number">Query Limit</vscode-text-field>
                </div>
                <br /><br /><br /><br />
                <div>
                    <br /><br /><br /><br />
                    <p>Press Cmd+Enter (Mac) or Control+Enter (Windows/Linux) to run a query. 
                    If nothing is highlighted by the cursor, the whole statement is ran with an injected limit.
                    If you highlight a part of the query such as a CTE, you can execute that snippet.</p>
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

/** React based webview */
function getHtmlV2(webview: Webview, extensionUri: Uri) {
    const nonce = getNonce();
    const uri = Uri.joinPath(extensionUri, 'dist', 'webview-create-pr-view.js');
    return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="Content-Security-Policy"
            content="default-src 'none'; img-src vscode-resource: https:; script-src 'nonce-${nonce}'; style-src vscode-resource: 'unsafe-inline' http: https: data:;">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Query Preview</title>
    </head>
    
    <body>
        <div id="app"></div>
        <script nonce="${nonce}" src="${webview.asWebviewUri(uri).toString()}"></script>
    </body>
    
    </html>
`;
}