import { CommandProcessExecutionFactory } from "@altimateai/dbt-integration";
import { exec } from "child_process";
import fs from "fs";
import { inject } from "inversify";
import os from "os";
import parseDiff from "parse-diff";
import path from "path";
import { promisify } from "util";
import {
  CancellationToken,
  DocumentFormattingEditProvider,
  FormattingOptions,
  ProviderResult,
  Range,
  TextDocument,
  TextEdit,
  window,
  workspace,
} from "vscode";
import which from "which";
import { PythonEnvironment } from "../dbt_client/pythonEnvironment";
import { TelemetryService } from "../telemetry";
import { extendErrorWithSupportLinks, getFirstWorkspacePath } from "../utils";

const execAsync = promisify(exec);

// prettier-ignore
export class DbtDocumentFormattingEditProvider implements DocumentFormattingEditProvider {
  private cachedSqlFmtPath: string | undefined;
  private cachedPythonPath: string | undefined;

  constructor(
    private commandProcessExecutionFactory: CommandProcessExecutionFactory,
    private telemetry: TelemetryService,
    @inject(PythonEnvironment)
    private pythonEnvironment: PythonEnvironment,
  ) {}

  provideDocumentFormattingEdits(
    document: TextDocument,
    options: FormattingOptions,
    token: CancellationToken,
  ): ProviderResult<TextEdit[]> {
    return this.executeSqlFmt(document);
  }

  private async executeSqlFmt(document: TextDocument) {
    const sqlFmtPathSetting =
      this.pythonEnvironment.getResolvedConfigValue("sqlFmtPath");
    const sqlFmtAdditionalParamsSetting = workspace
      .getConfiguration("dbt")
      .get<string[]>("sqlFmtAdditionalParams", [])
      .join(" ")
      .split(" ")
      .filter((s) => s !== "");

    const sqlFmtArgs = [
      "-",
      "--diff",
      "--no-progressbar",
      "--quiet",
      ...sqlFmtAdditionalParamsSetting,
    ];
    try {
      // try to find sqlfmt on PATH if not set
      const sqlFmtPath = sqlFmtPathSetting || (await this.findSqlFmtPath());
      if (!sqlFmtPath) {
        throw new Error("sqlfmt not found");
      }
      this.telemetry.sendTelemetryEvent("formatDbtModel", {
        sqlFmtPath: sqlFmtPathSetting ? "setting" : "path",
      });
      try {
        const { stderr } = await this.commandProcessExecutionFactory
          .createCommandProcessExecution({
            command: sqlFmtPath,
            args: sqlFmtArgs,
            stdin: document.getText(),
            cwd: getFirstWorkspacePath(),
          })
          .complete();
        if (stderr) {
          throw new Error(stderr);
        }
        return [];
      } catch (e) {
        try {
          return this.processDiffOutput(document, (e as Error).message);
        } catch (error) {
          this.telemetry.sendTelemetryError(
            "formatDbtModelApplyDiffFailed",
            error,
          );
          window.showErrorMessage(
            extendErrorWithSupportLinks(
              "Could not process difference output from sqlfmt. Detailed error: " +
                error +
                ".",
            ),
          );
        }
      }
    } catch (error) {
      this.telemetry.sendTelemetryError("formatDbtModelApplyDiffFailed", error);
      window.showErrorMessage(
        extendErrorWithSupportLinks(
          'Could not run sqlfmt. If sqlfmt is installed (e.g. via `uv tool install "shandy-sqlfmt[jinjafmt]"` or `pipx install "shandy-sqlfmt[jinjafmt]"`), ' +
            "try setting the `dbt.sqlFmtPath` setting to the full path of the sqlfmt binary, " +
            "or restart VS Code to pick up PATH changes. Detailed error: " +
            error +
            ".",
        ),
      );
    }
    return [];
  }

  private async findSqlFmtPath(): Promise<string | undefined> {
    const currentPythonPath = this.pythonEnvironment.pythonPath;

    // Return cached result if still valid (same interpreter + binary exists)
    if (
      this.cachedSqlFmtPath &&
      this.cachedPythonPath === currentPythonPath &&
      fs.existsSync(this.cachedSqlFmtPath)
    ) {
      return this.cachedSqlFmtPath;
    }

    const result = await this.discoverSqlFmtPath();
    this.cachedSqlFmtPath = result;
    this.cachedPythonPath = currentPythonPath;
    return result;
  }

  private async discoverSqlFmtPath(): Promise<string | undefined> {
    const isWindows = process.platform === "win32";
    const exe = isWindows ? "sqlfmt.exe" : "sqlfmt";

    // 1. Check Python venv bin directory
    const pythonPath = this.pythonEnvironment.pythonPath;
    if (pythonPath) {
      const candidatePath = path.join(path.dirname(pythonPath), exe);
      if (fs.existsSync(candidatePath)) {
        return candidatePath;
      }
    }

    // 2. Check well-known tool binary locations (uv, pipx)
    for (const candidate of this.getToolBinCandidates(exe)) {
      if (fs.existsSync(candidate)) {
        return candidate;
      }
    }

    // 3. Try uv tool dir (async, non-blocking) for custom uv install locations
    const uvToolPath = await this.findSqlFmtInUvTools(exe);
    if (uvToolPath) {
      return uvToolPath;
    }

    // 4. Fall back to system PATH via which
    try {
      return await which("sqlfmt");
    } catch {
      return undefined;
    }
  }

  private getToolBinCandidates(exe: string): string[] {
    const home = os.homedir();
    const candidates: string[] = [];

    // UV_TOOL_BIN_DIR / PIPX_BIN_DIR override default locations
    const uvToolBinDir = process.env.UV_TOOL_BIN_DIR;
    if (uvToolBinDir) {
      candidates.push(path.join(uvToolBinDir, exe));
    }
    const pipxBinDir = process.env.PIPX_BIN_DIR;
    if (pipxBinDir) {
      candidates.push(path.join(pipxBinDir, exe));
    }

    if (process.platform === "win32") {
      const appData = process.env.APPDATA;
      if (appData) {
        candidates.push(
          path.join(
            appData,
            "uv",
            "data",
            "tools",
            "shandy-sqlfmt",
            "Scripts",
            exe,
          ),
          path.join(appData, "Python", "Scripts", exe),
        );
      }
      candidates.push(
        path.join(home, ".local", "bin", exe),
        path.join(home, "pipx", "venvs", "shandy-sqlfmt", "Scripts", exe),
      );
    } else {
      // Linux/macOS: default location for uv tool install and pipx
      candidates.push(path.join(home, ".local", "bin", exe));
    }

    return candidates;
  }

  private async findSqlFmtInUvTools(exe: string): Promise<string | undefined> {
    try {
      const { stdout } = await execAsync("uv tool dir", { timeout: 3000 });
      const uvToolDir = stdout.trim();
      if (uvToolDir) {
        const executable =
          process.platform === "win32"
            ? path.join(uvToolDir, "shandy-sqlfmt", "Scripts", exe)
            : path.join(uvToolDir, "shandy-sqlfmt", "bin", exe);
        if (fs.existsSync(executable)) {
          return executable;
        }
      }
    } catch {
      // uv is not installed or not on PATH — ignore
    }
    return undefined;
  }

  private processDiffOutput(
    document: TextDocument,
    diffOutput: string,
  ): TextEdit[] {
    const textEdits: TextEdit[] = [];
    const diffs = parseDiff(diffOutput);

    if (document.lineCount === 0) {
      return textEdits;
    }

    diffs.forEach((diff) => {
      diff.chunks.forEach((chunk) => {
        // Build new content from add + normal changes (these are the lines
        // that should appear in the formatted output for this chunk's range).
        const newLines = chunk.changes
          .filter((c) => this.isAddChange(c) || this.isNormalChange(c))
          .map((c) => c.content.slice(1));
        const newContent =
          newLines.length > 0 ? newLines.join("\n") + "\n" : "";

        if (chunk.oldLines === 0) {
          // Pure insertion — no old lines to replace
          const insertLine = Math.min(chunk.oldStart, document.lineCount) - 1;
          textEdits.push(
            TextEdit.insert(
              document.lineAt(Math.max(insertLine, 0)).range.start,
              newContent,
            ),
          );
        } else {
          // Replace the chunk's old range with new content.
          // VSCode applies all TextEdits simultaneously against the original
          // document, so each chunk references original line positions.
          const startLine = Math.max(chunk.oldStart - 1, 0);
          const endLine = Math.min(
            startLine + chunk.oldLines - 1,
            document.lineCount - 1,
          );
          if (startLine >= document.lineCount) {
            return;
          }
          const range = new Range(
            document.lineAt(startLine).range.start,
            document.lineAt(endLine).rangeIncludingLineBreak.end,
          );
          textEdits.push(TextEdit.replace(range, newContent));
        }
      });
    });
    return textEdits;
  }

  private isAddChange(change: parseDiff.Change): change is parseDiff.AddChange {
    return change.type === "add";
  }

  private isNormalChange(
    change: parseDiff.Change,
  ): change is parseDiff.NormalChange {
    return change.type === "normal";
  }

  private isDeleteChange(
    change: parseDiff.Change,
  ): change is parseDiff.DeleteChange {
    return (
      /*
          parseDiff reads sqlfmt's "\ No newline at end of file" diff output as a delete change.
          This deceptive delete change should be skipped. So, adding an edge case to the expression.
      */
      change.type === "del" && change.content !== "\\ No newline at end of file"
    );
  }
}
