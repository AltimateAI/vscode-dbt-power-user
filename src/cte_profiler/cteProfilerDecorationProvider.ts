import { DBTTerminal } from "@altimateai/dbt-integration";
import { inject } from "inversify";
import {
  DecorationOptions,
  Disposable,
  OverviewRulerLane,
  Range,
  TextEditor,
  TextEditorDecorationType,
  ThemeColor,
  Uri,
  window,
} from "vscode";
import { CteProfilerService } from "./cteProfilerService";
import { CteProfileEntry } from "./cteProfilerTypes";

export class CteProfilerDecorationProvider implements Disposable {
  private disposables: Disposable[] = [];
  private visible = true;

  private readonly hotDecorationType: TextEditorDecorationType;
  private readonly warmDecorationType: TextEditorDecorationType;
  private readonly coolDecorationType: TextEditorDecorationType;

  constructor(
    private cteProfilerService: CteProfilerService,
    @inject("DBTTerminal")
    private dbtTerminal: DBTTerminal,
  ) {
    this.hotDecorationType = window.createTextEditorDecorationType({
      gutterIconPath: Uri.file(
        __dirname + "/../../media/images/profiler-hot.svg",
      ),
      gutterIconSize: "contain",
      after: {
        margin: "0 0 0 8px",
        textDecoration: "none",
      },
      overviewRulerColor: new ThemeColor("editorError.foreground"),
      overviewRulerLane: OverviewRulerLane.Right,
    });

    this.warmDecorationType = window.createTextEditorDecorationType({
      gutterIconPath: Uri.file(
        __dirname + "/../../media/images/profiler-warm.svg",
      ),
      gutterIconSize: "contain",
      after: {
        margin: "0 0 0 8px",
        textDecoration: "none",
      },
      overviewRulerColor: new ThemeColor("editorWarning.foreground"),
      overviewRulerLane: OverviewRulerLane.Right,
    });

    this.coolDecorationType = window.createTextEditorDecorationType({
      after: {
        margin: "0 0 0 8px",
        textDecoration: "none",
      },
    });

    this.disposables.push(
      this.cteProfilerService.onResultChanged(() => {
        window.visibleTextEditors.forEach((editor) => {
          this.updateDecorations(editor);
        });
      }),
      window.onDidChangeActiveTextEditor((editor) => {
        if (editor) {
          this.updateDecorations(editor);
        }
      }),
    );
  }

  dispose() {
    this.hotDecorationType.dispose();
    this.warmDecorationType.dispose();
    this.coolDecorationType.dispose();
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  toggle(): void {
    this.visible = !this.visible;
    window.visibleTextEditors.forEach((editor) => {
      this.updateDecorations(editor);
    });
  }

  private updateDecorations(editor: TextEditor): void {
    const result = this.cteProfilerService.getResult(
      editor.document.uri.toString(),
    );

    if (!result || !this.visible) {
      editor.setDecorations(this.hotDecorationType, []);
      editor.setDecorations(this.warmDecorationType, []);
      editor.setDecorations(this.coolDecorationType, []);
      return;
    }

    const hot: DecorationOptions[] = [];
    const warm: DecorationOptions[] = [];
    const cool: DecorationOptions[] = [];

    for (const cte of result.ctes) {
      const line = cte.line;
      // Line numbers are captured at profile time; the document may have been
      // edited since, so skip entries that no longer point at a valid line.
      if (line < 0 || line >= editor.document.lineCount) {
        continue;
      }
      const lineLength = editor.document.lineAt(line).text.length;
      const range = new Range(line, lineLength, line, lineLength);

      const decoration: DecorationOptions = {
        range,
        renderOptions: {
          after: {
            contentText: formatProfileText(cte.marginalTimeMs, cte.rowCount),
            color: new ThemeColor(tierToThemeColor(cte.tier)),
          },
        },
      };

      if (cte.tier === "hot") {
        hot.push(decoration);
      } else if (cte.tier === "warm") {
        warm.push(decoration);
      } else {
        cool.push(decoration);
      }
    }

    // Add total summary on last content line of the document
    if (result.ctes.length > 0 && result.status !== "running") {
      const totalLine = editor.document.lineCount - 1;
      if (totalLine < 0) {
        editor.setDecorations(this.hotDecorationType, hot);
        editor.setDecorations(this.warmDecorationType, warm);
        editor.setDecorations(this.coolDecorationType, cool);
        return;
      }
      const totalLineLength = editor.document.lineAt(totalLine).text.length;
      const totalDecoration: DecorationOptions = {
        range: new Range(
          totalLine,
          totalLineLength,
          totalLine,
          totalLineLength,
        ),
        renderOptions: {
          after: {
            contentText: `  ⏱ Total: ${formatTime(result.totalTimeMs)} · ${formatRows(result.totalRows)} rows`,
            color: new ThemeColor("editorCodeLens.foreground"),
            fontStyle: "italic",
          },
        },
      };
      cool.push(totalDecoration);
    }

    editor.setDecorations(this.hotDecorationType, hot);
    editor.setDecorations(this.warmDecorationType, warm);
    editor.setDecorations(this.coolDecorationType, cool);

    this.dbtTerminal.debug(
      "CteProfiler",
      `Updated decorations: ${hot.length} hot, ${warm.length} warm, ${cool.length} cool`,
    );
  }
}

function formatProfileText(timeMs: number, rows: number): string {
  return `  ⏱ ${formatTime(timeMs)} · ${formatRows(rows)} rows`;
}

function formatTime(timeMs: number): string {
  if (timeMs >= 1000) {
    return `${(timeMs / 1000).toFixed(1)}s`;
  }
  return `${timeMs}ms`;
}

function formatRows(rows: number): string {
  if (rows >= 1_000_000) {
    return `${(rows / 1_000_000).toFixed(1)}M`;
  }
  if (rows >= 1_000) {
    return `${(rows / 1_000).toFixed(1)}k`;
  }
  return `${rows}`;
}

function tierToThemeColor(tier: CteProfileEntry["tier"]): string {
  switch (tier) {
    case "hot":
      return "editorError.foreground";
    case "warm":
      return "editorWarning.foreground";
    default:
      return "editorCodeLens.foreground";
  }
}
