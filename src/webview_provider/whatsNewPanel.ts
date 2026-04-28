import { DBTTerminal } from "@altimateai/dbt-integration";
import { inject, injectable } from "inversify";
import {
  ConfigurationTarget,
  Disposable,
  Uri,
  ViewColumn,
  WebviewPanel,
  window,
  workspace,
} from "vscode";
import { DBTProjectContainer } from "../dbt_client/dbtProjectContainer";
import { TelemetryService } from "../telemetry";

type ShowReason = "manual" | "update";

@injectable()
export class WhatsNewPanel implements Disposable {
  public static readonly viewType = "dbtPowerUser.WhatsNew";

  private panel: WebviewPanel | undefined;
  private disposables: Disposable[] = [];

  public constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private telemetry: TelemetryService,
    @inject("DBTTerminal") private dbtTerminal: DBTTerminal,
  ) {}

  public async show(reason: ShowReason): Promise<void> {
    if (this.panel) {
      this.panel.reveal(ViewColumn.One);
      return;
    }

    let bodyHtml: string;
    try {
      bodyHtml = await this.readContent();
    } catch (err) {
      this.dbtTerminal.error(
        "whatsNewPanel:readContent",
        "Failed to read whats-new.html",
        err,
      );
      return;
    }

    const version = this.dbtProjectContainer.extensionVersion;
    const showOnUpdate = workspace
      .getConfiguration("dbt")
      .get<boolean>("showChangelogOnUpdate", true);

    this.panel = window.createWebviewPanel(
      WhatsNewPanel.viewType,
      "What's New in dbt Power User",
      ViewColumn.One,
      { enableScripts: true, retainContextWhenHidden: true },
    );

    this.panel.webview.html = this.renderHtml(bodyHtml, version, showOnUpdate);

    this.panel.webview.onDidReceiveMessage(
      (message) => this.handleMessage(message),
      null,
      this.disposables,
    );

    this.panel.onDidDispose(
      () => {
        this.panel = undefined;
      },
      null,
      this.disposables,
    );

    this.telemetry.sendTelemetryEvent("whatsNewShown", {
      reason,
      version,
    });
  }

  private async readContent(): Promise<string> {
    const uri = Uri.joinPath(
      this.dbtProjectContainer.extensionUri,
      "resources",
      "whats-new.html",
    );
    const bytes = await workspace.fs.readFile(uri);
    return Buffer.from(bytes).toString("utf8");
  }

  private async handleMessage(message: {
    command?: string;
    value?: boolean;
  }): Promise<void> {
    if (message?.command !== "setShowOnUpdate") {
      return;
    }
    const value = message.value !== false;
    try {
      await workspace
        .getConfiguration("dbt")
        .update("showChangelogOnUpdate", value, ConfigurationTarget.Global);
      this.telemetry.sendTelemetryEvent("whatsNewToggled", {
        showOnUpdate: String(value),
      });
    } catch (err) {
      this.dbtTerminal.error(
        "whatsNewPanel:setShowOnUpdate",
        "Failed to update dbt.showChangelogOnUpdate",
        err,
      );
    }
  }

  private renderHtml(
    bodyHtml: string,
    version: string,
    showOnUpdate: boolean,
  ): string {
    const checkedAttr = showOnUpdate ? "checked" : "";
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta http-equiv="Content-Security-Policy"
      content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline';" />
<title>What's New in dbt Power User</title>
<style>
  body {
    font-family: var(--vscode-font-family);
    color: var(--vscode-editor-foreground);
    background: var(--vscode-editor-background);
    line-height: 1.55;
    padding: 24px 36px 48px;
    max-width: 820px;
    margin: 0 auto;
  }
  h1 {
    margin-bottom: 4px;
  }
  h2 {
    margin-top: 28px;
    border-bottom: 1px solid var(--vscode-editorWidget-border, rgba(128,128,128,0.3));
    padding-bottom: 4px;
  }
  ul { padding-left: 22px; }
  li { margin-bottom: 8px; }
  code {
    font-family: var(--vscode-editor-font-family);
    background: var(--vscode-textCodeBlock-background, rgba(128,128,128,0.15));
    padding: 1px 4px;
    border-radius: 3px;
  }
  a {
    color: var(--vscode-textLink-foreground);
    text-decoration: none;
  }
  a:hover { text-decoration: underline; }
  .version-tag {
    display: inline-block;
    margin-left: 8px;
    padding: 2px 8px;
    border-radius: 10px;
    font-size: 12px;
    background: var(--vscode-badge-background);
    color: var(--vscode-badge-foreground);
    vertical-align: middle;
  }
  .opt-out {
    margin-top: 32px;
    padding-top: 16px;
    border-top: 1px solid var(--vscode-editorWidget-border, rgba(128,128,128,0.3));
    font-size: 13px;
    opacity: 0.85;
  }
  .opt-out label { cursor: pointer; }
  .whats-new-intro { opacity: 0.85; }
  .whats-new-footer {
    margin-top: 24px;
    font-size: 13px;
    opacity: 0.8;
  }
</style>
</head>
<body>
  <h1>What's New<span class="version-tag">v${escapeHtml(version)}</span></h1>
  ${bodyHtml}
  <div class="opt-out">
    <label>
      <input id="showOnUpdate" type="checkbox" ${checkedAttr} />
      Show this page automatically when the extension is updated
    </label>
  </div>
  <script>
    (function () {
      const vscode = acquireVsCodeApi();
      const cb = document.getElementById('showOnUpdate');
      cb.addEventListener('change', function () {
        vscode.postMessage({
          command: 'setShowOnUpdate',
          value: cb.checked,
        });
      });
    })();
  </script>
</body>
</html>`;
  }

  public dispose(): void {
    while (this.disposables.length) {
      const d = this.disposables.pop();
      if (d) {
        d.dispose();
      }
    }
    this.panel?.dispose();
    this.panel = undefined;
  }
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
