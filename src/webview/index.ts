import {
  commands,
  Disposable,
  ProgressLocation,
  Uri,
  ViewColumn,
  WebviewOptions,
  WebviewPanel,
  WebviewPanelOptions,
  window,
  workspace,
} from "vscode";
import { DBTClient } from "../dbt_client";
import { DBTCommandFactory } from "../dbt_client/dbtCommandFactory";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { provideSingleton } from "../utils";

interface JsonObj {
  [key: string]: string | number | undefined;
}

export function getWebviewOptions(
  extensionUri: Uri
): WebviewPanelOptions & WebviewOptions {
  return {
    // Enable javascript in the webview
    enableScripts: true,
    // And restrict the webview to only loading content from our extension's `media` directory.
    localResourceRoots: [Uri.joinPath(extensionUri, "media")],
    // Keep context
    retainContextWhenHidden: true,
  };
}

/**
 * Manages query webview panels
 */
@provideSingleton(QueryResultPanelLoader)
export class QueryResultPanelLoader implements Disposable {
  private disposables: Disposable[] = [];
  private panels: QueryResultPanel[] = [];
  public static VIEW_TYPE = "query-result";

  // TODO: clean up dependencies
  constructor(
    private dbtClient: DBTClient,
    private commandFactory: DBTCommandFactory,
    private dbtProjectContainer: DBTProjectContainer
  ) {
    this.dbtClient = dbtClient;
    this.commandFactory = commandFactory;
  }

  dispose() {
    throw new Error("Method not implemented.");
  }

  showWebview(title: string) {
    // Create
    const previewColumn: string = workspace
      .getConfiguration("dbt.previewPanel")
      .get<string>("displayLocation", "horizontal");
    if (previewColumn === "horizontal") {
      commands.executeCommand("workbench.action.editorLayoutTwoRows");
    }

    const viewColumn =
      previewColumn === "same" ? ViewColumn.Active : ViewColumn.Two;

    const panel = window.createWebviewPanel(
      QueryResultPanelLoader.VIEW_TYPE,
      title,
      { viewColumn: viewColumn, preserveFocus: true },
      getWebviewOptions(this.dbtProjectContainer.extensionUri)
    );
    const queryResultPanel = this.createQueryResultPanel(panel);
    this.panels.push(queryResultPanel);
    this.disposables.push(queryResultPanel);
    return queryResultPanel;
  }

  public revive(panel: WebviewPanel) {
    this.panels.push(this.createQueryResultPanel(panel));
  }

  public createQueryResultPanel(panel: WebviewPanel) {
    return new QueryResultPanel(
      this.dbtClient,
      this.commandFactory,
      this.dbtProjectContainer.extensionUri,
      panel
    );
  }
}
class QueryResultPanel implements Disposable {
  private disposables: Disposable[] = [];

  constructor(
    private dbtClient: DBTClient,
    private commandFactory: DBTCommandFactory,
    private extensionUri: Uri,
    private panel: WebviewPanel
  ) {
    // render webview
    this.renderWebview();

    // Permit bidirectional communication
    this.panel.webview.onDidReceiveMessage(
      (message) => {
        switch (message.command) {
          case "error":
            window.showErrorMessage(message.text);
            return;
          case "info":
            window.withProgress(
              {
                title: message.text,
                location: ProgressLocation.Notification,
                cancellable: false,
              },
              async () => {
                await new Promise((f) => setTimeout(f, 3000));
              }
            );
            return;
        }
      },
      null,
      this.disposables
    );

    this.panel.onDidDispose(
      () => {
        this.dispose();
      },
      null,
      this.disposables
    );
  }

  dispose() {
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
    this.panel?.dispose();
  }

  public async executeQuery(
    query: string,
    projectRootUri: Uri,
    profilesDir: Uri,
    target: string
  ) {
    this.transmitLoading();

    const command = this.commandFactory.createRunQueryCommand(
      query,
      projectRootUri,
      profilesDir,
      target
    );

    const process = await this.dbtClient.executeCommand(command);
    try {
      const response = await process.complete();
      const result: any = JSON.parse(response);
      let columns: JsonObj[] = [];
      const rows: JsonObj[] = [];
      // Convert compressed array format to dict[]
      for (let i = 0; i < result.rows.length; i++) {
        result.rows[i].forEach((value: any, j: any) => {
          rows[i] = { ...rows[i], [result.column_names[j]]: value };
        });
      }
      // Define column spec for Tabulator
      result.column_names.forEach((def: any) => {
        columns = [...columns, { title: def.toUpperCase(), field: def }];
      });
      await this.transmitData(columns, rows, query, result.compiled_sql);
    } catch (error: any) {
      const errorObj = JSON.parse(error);
      if (errorObj.message.includes("No module named 'dbt_osmosis")) {
        commands.executeCommand("dbtPowerUser.installDbtOsmosis");
      }
      this.transmitError(errorObj, query, query);
    }
  }

  private renderWebview() {
    if (this.panel === undefined) {
      return;
    }
    this.panel.webview.html = this.render();
  }

  private async transmitData(
    columns: JsonObj[],
    rows: JsonObj[],
    raw_sql: string,
    compiled_sql: string
  ) {
    await this.panel!.webview.postMessage({
      action: "queryResults",
      columns: columns,
      rows: rows,
      sql: raw_sql,
      compiled_sql: compiled_sql,
    });
  }

  private async transmitError(
    error: any,
    raw_sql: string,
    compiled_sql: string
  ) {
    await this.panel!.webview.postMessage({
      action: "error",
      error: error,
      sql: raw_sql,
      compiled_sql: compiled_sql,
    });
  }

  private async transmitLoading() {
    await this.panel!.webview.postMessage({
      action: "loading",
    });
  }

  private render() {
    const webview = this.panel?.webview!;
    const nonce = this.getNonce();
    const spinnerUri = webview.asWebviewUri(
      Uri.joinPath(
        this.extensionUri,
        "media",
        "images",
        "animated_logo_no_bg_small_15fps.gif"
      )
    );
    const copyImageURI = webview.asWebviewUri(
      Uri.joinPath(this.extensionUri, "media", "images", "copy-regular.svg")
    );
    const tabulatorScriptUri = webview.asWebviewUri(
      Uri.joinPath(this.extensionUri, "media", "js", "tabulator.min.js")
    );
    const tabulatorStylesUri = webview.asWebviewUri(
      Uri.joinPath(this.extensionUri, "media", "css", "tabulator_site.min.css")
    );
    const mainScriptUri = webview.asWebviewUri(
      Uri.joinPath(this.extensionUri, "media", "js", "main.js")
    );
    const mainStylesUri = webview.asWebviewUri(
      Uri.joinPath(this.extensionUri, "media", "css", "main.css")
    );
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
			  <img id="loader" src="${spinnerUri}" height="200px" width="200px"></img>
			  <div id="sql-container">
        <div id="header-container">
          <details>
            <summary>View Dispatched SQL &nbsp; &nbsp; &nbsp;
              <button id="clipboard-sql" class="tooltip">
              <img id="clipboard-image" class="clipboard-image" src="${copyImageURI}" height="15px" width="15px"></img>
              <span class="tooltiptext">Click to copy SQL</span>
              </button>
            </summary>
            <pre id="sql"></pre>
          </details>
          <p id="status"></p>
        </div>
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

  private getNonce() {
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 32; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}
