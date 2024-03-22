import {
  CancellationToken,
  DocumentFormattingEditProvider,
  FormattingOptions,
  ProviderResult,
  TextDocument,
  TextEdit,
  window,
  workspace,
} from "vscode";
import * as which from "which";
import { CommandProcessExecutionFactory } from "../commandProcessExecution";
import {
  extendErrorWithSupportLinks,
  provideSingleton,
  substituteSettingsVariables,
} from "../utils";
import { TelemetryService } from "../telemetry";

@provideSingleton(DbtDocumentFormattingEditProvider)
export class DbtDocumentFormattingEditProvider
  implements DocumentFormattingEditProvider
{
  constructor(
    private commandProcessExecutionFactory: CommandProcessExecutionFactory,
    private telemetry: TelemetryService,
  ) {}

  provideDocumentFormattingEdits(
    document: TextDocument,
    options: FormattingOptions,
    token: CancellationToken,
  ): ProviderResult<TextEdit[]> {
    return this.executeSqlFmt(document);
  }

  private getSqlFmtPathSetting(): string | undefined {
    const value = workspace
      .getConfiguration("dbt")
      .get<string>("sqlFmtPath", "");
    return value ? substituteSettingsVariables(value) : undefined;
  }

  private async executeSqlFmt(document: TextDocument) {
    const sqlFmtPathSetting = this.getSqlFmtPathSetting();
    const sqlFmtAdditionalParamsSetting = workspace
      .getConfiguration("dbt")
      .get<string[]>("sqlFmtAdditionalParams", [])
      .join(" ")
      .split(" ")
      .filter((s) => s !== "");

    const sqlFmtArgs = [
      "--no-progressbar",
      "--quiet",
      ...sqlFmtAdditionalParamsSetting,
      document.fileName,
    ];
    try {
      // try to find sqlfmt on PATH if not set
      const sqlFmtPath = sqlFmtPathSetting || (await which("sqlfmt"));
      this.telemetry.sendTelemetryEvent("formatDbtModel", {
        sqlFmtPath: sqlFmtPathSetting ? "setting" : "path",
      });
      try {
        const { code, fullOutput } = await this.commandProcessExecutionFactory
          .createCommandProcessExecution({
            command: sqlFmtPath,
            args: sqlFmtArgs,
          })
          .complete();
        if (code !== 0) {
          throw new Error(fullOutput);
        }
        return [];
      } catch (sqlfmtOutput) {
        this.telemetry.sendTelemetryError(
          "formatDbtModelSqlfmtFailed",
          sqlfmtOutput,
        );
        window.showErrorMessage(
          extendErrorWithSupportLinks(
            "sqlfmt returned an error. Did you set the absolute path of sqlfmt? Detailed error: " +
              sqlfmtOutput +
              ".",
          ),
        );
      }
    } catch (error) {
      this.telemetry.sendTelemetryError("formatDbtModelRunSqlfmtFailed", error);
      window.showErrorMessage(
        extendErrorWithSupportLinks(
          "Could not run sqlfmt. Did you install sqlfmt? Detailed error: " +
            error +
            ".",
        ),
      );
    }
    return [];
  }
}
