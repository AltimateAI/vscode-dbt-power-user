import * as vscode from 'vscode';
import { getPort, runQuery, isError, OsmosisError } from '../osmosis_client';


interface JsonObj {
	[key: string]: string | number | undefined;
}

declare global {
	var currentSql: string;
}

export function getWebviewOptions(extensionUri: vscode.Uri): (vscode.WebviewPanelOptions & vscode.WebviewOptions) {
	return {
		// Enable javascript in the webview
		enableScripts: true,
		// And restrict the webview to only loading content from our extension's `media` directory.
		localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'media')],
		// Map ports
		portMapping: [
			{ webviewPort: getPort(), extensionHostPort: getPort() }
		],
		// Keep context
		retainContextWhenHidden: true
	};
}

/**
 * Manages query webview panels
 */
export class QueryResultPanel {
	/**
	 * Track the currently panel. Only allow a single panel to exist at a time.
	 */
	public static currentPanel: QueryResultPanel | undefined;
	public static readonly viewType = 'queryResult';
	private readonly _panel: vscode.WebviewPanel;
	private readonly _extensionUri: vscode.Uri;
	private _disposables: vscode.Disposable[] = [];

	public constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri, title: string = "Query Result") {
		this._panel = panel;
		this._extensionUri = extensionUri;
		// Render base view (data transmission is the mechanism for last mile rendering)
		panel.title = title;
		panel.webview.html = this._getHtmlForWebview(this._panel.webview, title);
		// Dispose when removed
		this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
		// Permit bidirectional communication
		this._panel.webview.onDidReceiveMessage(
			message => {
				switch (message.command) {
					case 'error':
						vscode.window.showErrorMessage(message.text);
						return;
					case 'info':
						vscode.window.withProgress(
							{ title: message.text, location: vscode.ProgressLocation.Notification, cancellable: false },
							async () => {
								await new Promise(f => setTimeout(f, 3000));
							}
						);
						return;
				}
			},
			null,
			this._disposables
		);
	};

	public static createOrShow(extensionUri: vscode.Uri, title: string) {
		// Show
		if (QueryResultPanel.currentPanel) {
			QueryResultPanel.currentPanel._panel.title = title;
			QueryResultPanel.currentPanel._panel.reveal(undefined, true);
			return;
		}
		// Create
		const previewColumn: string = vscode.workspace
			.getConfiguration("dbt.previewPanel")
			.get<string>("displayLocation", "horizontal");
		if (previewColumn === 'horizontal') {
			vscode.commands.executeCommand('workbench.action.editorLayoutTwoRows');
		}
		const viewColumn = previewColumn === 'same' ? vscode.ViewColumn.Active : vscode.ViewColumn.Two;
		const panel = vscode.window.createWebviewPanel(
			QueryResultPanel.viewType,
			"Query Result",
			{ viewColumn: viewColumn, preserveFocus: true },
			getWebviewOptions(extensionUri),
		);
		QueryResultPanel.currentPanel = new QueryResultPanel(panel, extensionUri, title);
	}

	public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri, title: string = "Query Result") {
		QueryResultPanel.currentPanel = new QueryResultPanel(panel, extensionUri, title);
	}

	public async executeQuery(query: string) {
		QueryResultPanel.currentPanel?.transmitLoading();
		const result = await runQuery(query);
		if (isError(result)) {
			console.log(result.error);
			vscode.window.showErrorMessage(result.error.message);
			QueryResultPanel.currentPanel?.transmitError(result.error, query, query);
		} else {
			let columns: JsonObj[] = [];
			let rows: JsonObj[] = [];
			// Convert compressed array format to dict[]
			for (let i = 0; i < result.rows.length; i++) {
				result.rows[i].forEach((value, j) => {
					rows[i] = { ...rows[i], [result.column_names[j]]: value };
				});
			}
			// Define column spec for Tabulator
			result.column_names.forEach(def => {
				columns = [...columns, { "title": def.toUpperCase(), "field": def }];
			});
			await QueryResultPanel.currentPanel?.transmitData(columns, rows, query, result.compiled_sql);
		}
	}

	public async transmitData(
		columns: JsonObj[],
		rows: JsonObj[],
		raw_sql: string,
		compiled_sql: string,
	) {
		await this._panel.webview.postMessage({
			action: "queryResults",
			columns: columns,
			rows: rows,
			sql: raw_sql,
			compiled_sql: compiled_sql
		});
	}

	public async transmitError(error: OsmosisError, raw_sql: string, compiled_sql: string) {
		await this._panel.webview.postMessage({
			action: "error",
			error: error,
			sql: raw_sql,
			compiled_sql: compiled_sql
		});
	}

	public async transmitLoading() {
		await this._panel.webview.postMessage({
			action: "loading"
		});
	}

	public dispose() {
		QueryResultPanel.currentPanel = undefined;
		this._panel.dispose();
		while (this._disposables.length) {
			const x = this._disposables.pop();
			if (x) {
				x.dispose();
			}
		}
	}

	private _getHtmlForWebview(webview: vscode.Webview, title: string) {
		const nonce = getNonce();
		const spinnerUri = webview.asWebviewUri(
			vscode.Uri.joinPath(this._extensionUri, 'media', 'images', 'animated_logo_no_bg_small_15fps.gif'));
		const copyImageURI = webview.asWebviewUri(
			vscode.Uri.joinPath(this._extensionUri, 'media', 'images', 'copy-regular.svg'));
		const tabulatorScriptUri = webview.asWebviewUri(
			vscode.Uri.joinPath(this._extensionUri, 'media', 'js', 'tabulator.min.js'));
		const tabulatorStylesUri = webview.asWebviewUri(
			vscode.Uri.joinPath(this._extensionUri, 'media', 'css', 'tabulator_site.min.css'));
		const mainScriptUri = webview.asWebviewUri(
			vscode.Uri.joinPath(this._extensionUri, 'media', 'js', 'main.js'));
		const mainStylesUri = webview.asWebviewUri(
			vscode.Uri.joinPath(this._extensionUri, 'media', 'css', 'main.css'));
		return `
		<!DOCTYPE html>
		<html lang="en">
		   <head>
			  <meta charset="UTF-8">
			  <meta 
				 http-equiv="Content-Security-Policy" 
				 content="default-src 'none'; style-src ${webview.cspSource} 'nonce-${nonce}'; img-src ${webview.cspSource} https:; script-src 'nonce-${nonce}';">
			  <meta name="viewport" content="width=device-width, initial-scale=1.0">
			  <link href="${tabulatorStylesUri}" rel="stylesheet">
			  <link href="${mainStylesUri}" rel="stylesheet">
			  <script nonce="${nonce}" src="${tabulatorScriptUri}"></script>
			  <title>Query Results</title>
		   </head>
		   <body>
			  <div id="header-container">
				 <h3 id="header-container-title">🔍 &nbsp; Query Preview Panel</h3>
				 <p id="status"></p>
			  </div>
			  <img id="loader" src="${spinnerUri}" height="200px" width="200px"></img>
			  <div id="sql-container">
				 <details>
					<summary>View Dispatched SQL &nbsp; &nbsp; &nbsp;
					   <button id="clipboard-sql" class="tooltip">
					   <img id="clipboard-image" class="clipboard-image" src="${copyImageURI}" height="15px" width="15px"></img>
					   <span class="tooltiptext">Click to copy SQL</span>
					   </button>
					</summary>
					<pre id="sql"></pre>
				 </details>
			  </div>
			  <div id="results-container">
				 <br id="results-break" />
				 <div id="results-panel"></div>
			  </div>
			  <div id="error-container">
				 <h3 id="error-title">Error</h3>
				 <h4 id="error-message">Message</h4>
				 <details>
					<summary>View Detailed Error &nbsp; &nbsp; &nbsp;
					   <button id="clipboard-error" class="tooltip">
					   <img id="clipboard-image" class="clipboard-image" src="${copyImageURI}" height="15px" width="15px"></img>
					   <span class="tooltiptext">Click to copy error message</span>
					   </button>
					</summary>
					<pre id="error-details"></pre>
				 </details>
				 <br />
			  </div>
		   </body>
		   <script nonce="${nonce}" src="${mainScriptUri}"></script>
		</html>`;
	}
}

function getNonce() {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}
