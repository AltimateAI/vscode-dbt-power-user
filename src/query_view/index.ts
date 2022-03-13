import * as vscode from 'vscode';
import { provideSingleton } from '../utils';

@provideSingleton(QueryView)
export class QueryView {

  createWebviewPanel(sql: string, data: any) {
    const panel = vscode.window.createWebviewPanel(
      'dbtPowerUser.queryView',
      'Execute query',
      vscode.ViewColumn.One,
      {
        // Enable scripts in the webview
        enableScripts: true,
      }
    );

    const updateWebview = () => {
      panel.webview.html = this.getWebviewContent(sql, data);
    };

    // Set initial content
    updateWebview();
  }

  private getWebviewContent(sql: string, agate: any[]) {
    const columns = Object.keys(agate[0]).map(k => ({title: k}));
    const data = agate.map(row => Object.values(row));
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="Content-Security-Policy" content="default-src 'self';
            script-src vscode-resource: 'self' 'unsafe-inline' 'unsafe-eval' https:;
            style-src vscode-resource: 'self' 'unsafe-inline' https:;
            img-src vscode-resource: 'self' 'unsafe-inline' https:;"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Query view</title>
      <link rel="stylesheet" href="https://cdn.datatables.net/1.11.5/css/jquery.dataTables.min.css"></link>
      <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
      <script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
      <script>
      $(document).ready(function() {
        var data = ${JSON.stringify(data)};
        $('#data').DataTable( {
          data,
          columns: ${JSON.stringify(columns)}
        });
      });
      </script>
  </head>
  <body>
  <textarea>${sql}</textarea>
  </textarea>
  <table id="data" class="display" width="100%"></table>
  </body>
  </html>`;
  }
  
}


