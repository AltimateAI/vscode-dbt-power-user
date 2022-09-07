import * as vscode from 'vscode';
import fetch from 'node-fetch';
import { AbortController } from 'node-abort-controller';

interface Dictionary<T> {
	[Key: string]: T;
}

interface DbtSyncCompileResp {
	error?: string,
	result?: string
}

interface DbtSyncRunResp {
	error?: {
		code: number,
		message: string,
		data: Dictionary<string>
	},
	column_names?: string[],
	rows?: (string | number)[][],
	compiled_sql?: string,
	raw_sql?: string
}

// TODO: Move activation snippet
export function activate(context: vscode.ExtensionContext) {
	if (vscode.window.registerWebviewPanelSerializer) {
		// Make sure we register a serializer in activation event
		vscode.window.registerWebviewPanelSerializer(QueryResultPanel.viewType, {
			async deserializeWebviewPanel(webviewPanel: vscode.WebviewPanel, state: any) {
				console.log(`Got State: ${state}`);
				// Reset the webview options so we use latest uri for `localResourceRoots`.
				webviewPanel.webview.options = getWebviewOptions(context.extensionUri);
				QueryResultPanel.revive(webviewPanel, context.extensionUri, state.title ?? "untitled.sql");
			}
		});
	}
}

export function getWebviewOptions(extensionUri: vscode.Uri): vscode.WebviewOptions {
	const osmosisPort = vscode.workspace
		.getConfiguration("dbt")
		.get<number>("osmosisPort", 8581);
	return {
		// Enable javascript in the webview
		enableScripts: true,
		// And restrict the webview to only loading content from our extension's `media` directory.
		localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'media')],
		// Map ports
		portMapping: [
			{ webviewPort: osmosisPort, extensionHostPort: osmosisPort }
		],
		// Keep context
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

	public static createOrShow(extensionUri: vscode.Uri, title: string) {
		const column = vscode.window.activeTextEditor
			? vscode.window.activeTextEditor.viewColumn
			: undefined;

		const previewColumn: string = vscode.workspace
			.getConfiguration("dbt.previewPanel")
			.get<string>("displayColumn") || 'horizontal';

		const reusePanel: boolean = vscode.workspace
			.getConfiguration("dbt.previewPanel")
			.get<boolean>("reusePanel") || false;

		if (QueryResultPanel.currentPanel && reusePanel) {
			QueryResultPanel.currentPanel._panel.title = title + " preview";
			QueryResultPanel.currentPanel._panel.reveal(undefined, true);
			return;
		}

		if (previewColumn === 'horizontal') {
			vscode.commands.executeCommand('workbench.action.editorLayoutTwoRows');
		}
		const viewColumn = previewColumn === 'same' ? vscode.ViewColumn.Active : vscode.ViewColumn.Two;

		const panel = vscode.window.createWebviewPanel(
			QueryResultPanel.viewType,
			"Query Previewer",
			// column || vscode.ViewColumn.One,
			{ viewColumn: viewColumn, preserveFocus: true },
			getWebviewOptions(extensionUri),
		);

		QueryResultPanel.currentPanel = new QueryResultPanel(panel, extensionUri, title);
	}

	public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri, title: string) {
		QueryResultPanel.currentPanel = new QueryResultPanel(panel, extensionUri, title);
	}

	public constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri, title: string) {
		this._panel = panel;
		this._extensionUri = extensionUri;
		const webview = panel.webview;
		panel.title = title + " preview";
		panel.webview.html = this._getHtmlForWebview(webview, title);

		this._panel.onDidChangeViewState((state) => {
			if (state.webviewPanel.visible) {
				this._panel.webview.html = this._getHtmlForWebview(webview, title);
			}
		});

		this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

		this._panel.webview.onDidReceiveMessage(
			message => {
				switch (message.command) {
					case 'error':
						vscode.window.showErrorMessage(message.text);
						return;
					case 'info':
						vscode.window.showInformationMessage(message.text);
						return;
				}
			},
			null,
			this._disposables
		);
	};

	public async doQuery(sql: string, osmosisHost: string, osmosisPort: number) {
		const controller = new AbortController();
		const timeoutControllerId = setTimeout(() => {
			controller.abort();
			vscode.window.showErrorMessage("Failed query preview due to timeout");
			const error = {
				code: -1,
				message: "Query timed out",
				data: {
					"error": `Is the server listening on http://${osmosisHost}:${osmosisPort} ?`,
					"sql": sql,
				},
			};
			QueryResultPanel.currentPanel?.transmitError(error, sql, sql);
		}, 25000);

		let resp;
		try {
			resp = await fetch(`http://${osmosisHost}:${osmosisPort}/run`, {
				method: 'POST',
				headers: {
					'content-type': 'text/plain',
				},
				body: sql,
				signal: controller.signal
			});
		} catch (e) {
			console.log(e);
			vscode.window.showErrorMessage("Query failed to reach dbt sync server");
			const error = {
				code: -1,
				message: "Query failed to reach dbt sync server",
				data: {
					"error": `Is the server listening on http://${osmosisHost}:${osmosisPort} ?`,
					"sql": sql,
				},
			};
			QueryResultPanel.currentPanel?.transmitError(error, sql, sql);
			clearTimeout(timeoutControllerId);
			return;
		};

		const data: DbtSyncRunResp = await resp.json();

		if (!data.error && data.column_names && data.rows && data.compiled_sql) {
			let columnDefs: Dictionary<string | number>[] = [];
			let tableValues: Dictionary<string | number>[] = [];
			data.column_names.forEach(def => {
				columnDefs = [...columnDefs, { "title": def.toUpperCase(), "field": def }];
			});
			for (let row = 0; row < data.rows.length; row++) {
				data.rows[row].forEach((value, index) => {
					let colName = columnDefs[index]["field"];
					tableValues[row] = { ...tableValues[row], [colName]: value };
				});
			}
			QueryResultPanel.currentPanel?.transmitData(columnDefs, tableValues, sql, data.compiled_sql);
		} else {
			if (data.error) {
				console.log(data.error);
				vscode.window.showErrorMessage(data.error.message);
				QueryResultPanel.currentPanel?.transmitError(data.error, sql, data.error?.data?.compiled_sql || sql);
			} else {
				// We can brainstorm more ways to handle this case but haven't seen it
				vscode.window.showErrorMessage("Failed query preview...Unknown response");
				const error = {
					code: -1,
					message: "Failed query preview... Unknown response",
					data: {
						"error": `Unknown Response`,
						"sql": sql,
					},
				};
				QueryResultPanel.currentPanel?.transmitError(error, sql, sql);
			}
		}

		clearTimeout(timeoutControllerId);
	}

	public transmitData(columns: Dictionary<string | number>[], rows: Dictionary<string | number>[], sql: string, compiled_sql: string) {
		this._panel.webview.postMessage({ action: "queryResults", columns: columns, rows: rows, sql: sql, compiled_sql: compiled_sql });
	}

	public transmitError(error: {
		code: number,
		message: string,
		data: Dictionary<string>
	}, sql: string, compiled_sql: string) {
		this._panel.webview.postMessage({ action: "error", error: error, sql: sql, compiled_sql: compiled_sql });
	}

	public dispose() {
		QueryResultPanel.currentPanel = undefined;

		// Clean up our resources
		this._panel.dispose();

		while (this._disposables.length) {
			const x = this._disposables.pop();
			if (x) {
				x.dispose();
			}
		}
	}

	private _getHtmlForWebview(webview: vscode.Webview, title: string) {
		const tabulatorScriptPathOnDisk = vscode.Uri.joinPath(this._extensionUri, 'media', 'js', 'tabulator.min.js');
		const mainScriptPathOnDisk = vscode.Uri.joinPath(this._extensionUri, 'media', 'js', 'main.js');
		const spinnerPathOnDisk = vscode.Uri.joinPath(this._extensionUri, 'media', 'animated_logo_no_bg_small_15fps.gif');
		const tabulatorScriptUri = (tabulatorScriptPathOnDisk).with({ 'scheme': 'vscode-resource' });
		const mainScriptUri = (mainScriptPathOnDisk).with({ 'scheme': 'vscode-resource' });
		const spinnerUri = (spinnerPathOnDisk).with({ 'scheme': 'vscode-resource' });
		const tabulatorStylesPath = vscode.Uri.joinPath(this._extensionUri, 'media', 'css', 'tabulator_site.min.css');
		const mainStylesPath = vscode.Uri.joinPath(this._extensionUri, 'media', 'css', 'main.css');
		const tabulatorStylesUri = webview.asWebviewUri(tabulatorStylesPath);
		const mainStylesUri = webview.asWebviewUri(mainStylesPath);
		const nonce = getNonce();
		return `
<!DOCTYPE html>
	<html lang="en">
		<head>
			<meta charset="UTF-8">
			<!--
				Use a content security policy to only allow loading images from https or from our extension directory,
				and only allow scripts that have a specific nonce.
			-->
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
      <details>
        <summary>View Dispatched SQL &nbsp; &nbsp; &nbsp;<button id="clipboard-sql">📝</button></summary>
        <!-- Maybe we add a copy to clipbaord button at some point -->
        <pre id="sql"></pre>
      </details>
      <br id="results-break" />
      <div id="results-panel"></div>
      <img id="loader" src="${spinnerUri}" height="200px" width="200px"></img>
      <div id="error-container">
        <h3 id="error-container-title">Error</h3>
        <h4 id="error-container-type">Type</h4>
        <p id="error-type"></p>
        <h4 id="error-container-message">Message</h4>
        <p id="error-message"></p>
        <details>
          <summary>View Detailed Error &nbsp; &nbsp; &nbsp;<button id="clipboard-error">📝</button></summary>
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
