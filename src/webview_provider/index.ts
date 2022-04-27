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
	return {
		// Enable javascript in the webview
		enableScripts: true,
		// And restrict the webview to only loading content from our extension's `media` directory.
		localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'media')],
    // Map ports
    portMapping: [
      { webviewPort: 8581, extensionHostPort: 8581}
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

		// If we already have a panel, we can show it here and return early
		// NOTE: Lets only show new panels so the user can compare previews between changes
			// if (QueryResultPanel.currentPanel) {
			//  QueryResultPanel.currentPanel._panel.reveal(column);
			//  return;
		// }

		vscode.commands.executeCommand('workbench.action.editorLayoutTwoRows');
		const panel = vscode.window.createWebviewPanel(
			QueryResultPanel.viewType,
			"Query Previewer",
			// column || vscode.ViewColumn.One,
			{viewColumn: vscode.ViewColumn.Two, preserveFocus: true},
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

	public async doQuery(sql: string, proxyPort: number) {

		const controller = new AbortController();
		const timeoutControllerId = setTimeout(() => {
			controller.abort();
			vscode.window.showErrorMessage("Failed query preview due to timeout");
			QueryResultPanel.currentPanel?.transmitError({
				code: -1,
				message: "Query timed out",
				data: {
					"error": `Is the server listening on http://localhost:${proxyPort} ?`,
					"sql": sql,
				},
			});
		}, 25000);

    	let resp;
		try {
		resp = await fetch(`http://localhost:${proxyPort}/run`, {
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
			QueryResultPanel.currentPanel?.transmitError({
				code: -1,
				message: "Query failed to reach dbt sync server",
				data: {
					"error": `Is the server listening on http://localhost:${proxyPort} ?`,
					"sql": sql,
				},
			});
			clearTimeout(timeoutControllerId);
			return;
		};

		const data: DbtSyncRunResp = await resp.json();
		
    if (!data.error && data.column_names && data.rows && data.compiled_sql) {
      let columnDefs: Dictionary<string | number>[] = [];
      let tableValues: Dictionary<string | number>[] = [];
      data.column_names.forEach(def => {
        columnDefs = [...columnDefs, {"title": def.toUpperCase(), "field": def}];
      });
      for (let row = 0; row < data.rows.length; row++) {
        data.rows[row].forEach((value, index) => {
          let colName = columnDefs[index]["field"];
          tableValues[row] = {...tableValues[row], [colName]: value};
        });
      }
      QueryResultPanel.currentPanel?.transmitData(columnDefs, tableValues, sql, data.compiled_sql);
    } else {
      if (data.error) {
        console.log(data.error);
        vscode.window.showErrorMessage(`
        Failed compilation... --
        Code: ${data.error.code} --
        Message: ${data.error.message} -- 
        Data: ${data.error.data.message}
        `);
        QueryResultPanel.currentPanel?.transmitError(data.error);
      } else {
        // We can brainstorm more ways to handle this case but haven't seen it
        vscode.window.showErrorMessage("Failed query preview... Unknown response");
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
	}) {
		this._panel.webview.postMessage({ action: "error", error: error });
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
		const spinnerPathOnDisk = vscode.Uri.joinPath(this._extensionUri, 'media', 'animated_logo_no_bg_small_15fps.gif');
		const tabulatorScriptUri = (tabulatorScriptPathOnDisk).with({ 'scheme': 'vscode-resource' });
		const spinnerUri = (spinnerPathOnDisk).with({ 'scheme': 'vscode-resource' });
		const stylesPathMainPath = vscode.Uri.joinPath(this._extensionUri, 'media', 'css', 'tabulator_site.min.css');
		const stylesMainUri = webview.asWebviewUri(stylesPathMainPath);
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
			<link href="${stylesMainUri}" rel="stylesheet">
	        <script nonce="${nonce}" src="${tabulatorScriptUri}"></script>
    	    <style nonce="${nonce}">
			#loader{
				display: block;
				min-width: 100px;
				margin-left: auto;
				margin-right: auto;		
			}
			#header-container {
				display: flex;
			}
			#header-container-title {
			}
			#status {
				float: right;
				text-align:right;
				min-width:100px;
				margin-left:auto;
				padding-top:4px;
			}
			pre {
				white-space: pre-wrap;
			}
			</style>
			<title>Query Results</title>
		</head>
		<body>
			<div id="header-container">
				<h3 id="header-container-title">🔍 &nbsp; Query Preview Panel</h3>
				<p id="status"></p>
			</div>
        <details>
          <summary>View Dispatched SQL 📝</summary>
		  <!-- Maybe we add a copy to clipbaord button at some point -->
          <pre id="sql"></pre>
        </details>
        <br />
		<div id="results-panel">
		</div>
		<img id="loader" src="${spinnerUri}" height="200px" width="200px"></img>
		<pre id="error"></pre>
        <script nonce="${nonce}">
		function showQuery(stateMessage, ts) {
			var table = new Tabulator("#results-panel", {
				height: 455,
				data: stateMessage.rows,
				layout: "fitColumns",
				columns: stateMessage.columns,
				clipboard: true,
				movableColumns: true
			});
			document.getElementById("loader").style.display = 'none';
			document.getElementById("status").textContent = "✅ " + stateMessage.rows.length + " rows loaded at " + ts;
			document.getElementById("sql").textContent = stateMessage.compiled_sql;
		};
		function showError(stateMessage, ts) {
			document.getElementById("status").textContent = "❌ query failed at " + ts;
			document.getElementById("loader").style.display = 'none';
			document.getElementById("error").textContent = JSON.stringify(stateMessage.error, null, 2);
		};
		function dispatchAction(stateMessage, ts) {
			switch (stateMessage.action) {
				case "queryResults":
					showQuery(stateMessage, ts);
					break;
				case "error": 
					showError(stateMessage, ts);
					break;
			}
		};
        // Restore State
		const windowRenderTime = new Date();
        const vscode = acquireVsCodeApi();
        const previousState = vscode.getState();
        const stateMessage = previousState ? previousState.message : undefined;
        if (stateMessage) {
			dispatchAction(stateMessage, previousState.timestamp);
        };

        // Listen For Data
		window.addEventListener('message', event => {
          const message = event.data; // The JSON data our extension sent
          const timestamp = new Date();
          vscode.setState({ message, timestamp, title: "${title}" });
          dispatchAction(message, timestamp);
		  if (!message.error) {
			vscode.postMessage({
				command: 'info',
				text: "Query compiled and executed in " + (Math.abs(timestamp - windowRenderTime) / 1000) + "s"
			})
		  };
		});
		</script>
	</body>
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
