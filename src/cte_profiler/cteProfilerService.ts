import { DBTTerminal } from "@altimateai/dbt-integration";
import { inject, injectable } from "inversify";
import {
  CancellationTokenSource,
  Disposable,
  Event,
  EventEmitter,
  TextDocument,
  Uri,
  window,
} from "vscode";
import { CteInfo } from "../code_lens_provider/cteCodeLensProvider";
import { DBTProjectContainer } from "../dbt_client/dbtProjectContainer";
import {
  CteProfileEntry,
  CteProfileResult,
} from "./cteProfilerTypes";

@injectable()
export class CteProfilerService implements Disposable {
  private results: Map<string, CteProfileResult> = new Map();
  private cancellationTokenSource: CancellationTokenSource | undefined;

  private _onResultChanged = new EventEmitter<CteProfileResult | undefined>();
  readonly onResultChanged: Event<CteProfileResult | undefined> =
    this._onResultChanged.event;

  private disposables: Disposable[] = [
    this._onResultChanged,
  ];

  constructor(
    private dbtProjectContainer: DBTProjectContainer,
    @inject("DBTTerminal")
    private dbtTerminal: DBTTerminal,
  ) {}

  dispose() {
    this.cancellationTokenSource?.dispose();
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  getResult(uri: string): CteProfileResult | undefined {
    return this.results.get(uri);
  }

  get isRunning(): boolean {
    return this.cancellationTokenSource !== undefined;
  }

  async profileModel(
    uri: Uri,
    document: TextDocument,
    ctes: CteInfo[],
  ): Promise<void> {
    if (this.cancellationTokenSource) {
      window.showWarningMessage(
        "A CTE profiling run is already in progress. Cancel it first.",
      );
      return;
    }

    if (ctes.length === 0) {
      window.showInformationMessage("No CTEs found in this model to profile.");
      return;
    }

    const project = this.dbtProjectContainer.findDBTProject(uri);
    if (!project) {
      window.showErrorMessage("Could not find dbt project for this file.");
      return;
    }

    const modelName = this.extractModelName(uri);
    this.cancellationTokenSource = new CancellationTokenSource();
    const token = this.cancellationTokenSource.token;

    const result: CteProfileResult = {
      uri: uri.toString(),
      modelName,
      status: "running",
      totalTimeMs: 0,
      totalRows: 0,
      ctes: [],
      timestamp: Date.now(),
    };

    this.results.set(uri.toString(), result);
    this._onResultChanged.fire(result);

    this.dbtTerminal.debug(
      "CteProfiler",
      `Starting profiling for ${modelName} with ${ctes.length} CTEs`,
    );

    try {
      const text = document.getText();
      const cteEntries: CteProfileEntry[] = [];
      let previousCumulativeTime = 0;

      for (let i = 0; i < ctes.length; i++) {
        if (token.isCancellationRequested) {
          this.dbtTerminal.debug(
            "CteProfiler",
            `Profiling cancelled at CTE ${i}/${ctes.length}`,
          );
          result.status = "partial";
          break;
        }

        const targetCte = ctes[i];

        const query = this.buildCountQuery(text, ctes, targetCte, document);

        if (!query) {
          this.dbtTerminal.warn(
            "CteProfiler",
            `Failed to build query for CTE: ${targetCte.name}`,
          );
          continue;
        }

        this.dbtTerminal.debug(
          "CteProfiler",
          `Profiling CTE ${i + 1}/${ctes.length}: ${targetCte.name}`,
        );

        const start = Date.now();
        const queryResult = await project.immediatelyExecuteSQLWithLimit(
          query,
          `cte_profiler_${targetCte.name}`,
          1,
        );
        const elapsed = Date.now() - start;

        const rowCount = this.extractRowCount(queryResult.data);
        const marginalTime = Math.max(0, elapsed - previousCumulativeTime);
        previousCumulativeTime = elapsed;

        cteEntries.push({
          name: targetCte.name,
          line: targetCte.range.start.line,
          queryTimeMs: elapsed,
          marginalTimeMs: marginalTime,
          rowCount,
          tier: "cool", // classified after all CTEs complete
        });

        this.dbtTerminal.debug(
          "CteProfiler",
          `CTE ${targetCte.name}: ${elapsed}ms cumulative, ${marginalTime}ms marginal, ${rowCount} rows`,
        );

        // Update result with partial data so decorations refresh live
        result.ctes = this.classifyTiers(cteEntries);
        result.totalTimeMs = elapsed;
        result.totalRows = rowCount;
        this._onResultChanged.fire(result);
      }

      // Final classification and status
      result.ctes = this.classifyTiers(cteEntries);
      if (result.status === "running") {
        result.status = "complete";
      }
      result.totalTimeMs =
        cteEntries.length > 0
          ? cteEntries[cteEntries.length - 1].queryTimeMs
          : 0;
      result.totalRows =
        cteEntries.length > 0 ? cteEntries[cteEntries.length - 1].rowCount : 0;

      this.results.set(uri.toString(), result);
      this._onResultChanged.fire(result);

      this.dbtTerminal.debug(
        "CteProfiler",
        `Profiling ${result.status}: ${result.totalTimeMs}ms total, ${result.ctes.length} CTEs`,
      );
    } catch (error) {
      this.dbtTerminal.error("CteProfiler", "Profiling failed", error);
      result.status = "error";
      result.error = error instanceof Error ? error.message : "Unknown error";
      this.results.set(uri.toString(), result);
      this._onResultChanged.fire(result);
      window.showErrorMessage(`CTE profiling failed: ${result.error}`);
    } finally {
      this.cancellationTokenSource?.dispose();
      this.cancellationTokenSource = undefined;
    }
  }

  cancel(): void {
    if (this.cancellationTokenSource) {
      this.cancellationTokenSource.cancel();
      this.dbtTerminal.debug("CteProfiler", "Cancellation requested");
    }
  }

  clearResults(): void {
    this.results.clear();
    this._onResultChanged.fire(undefined);
  }

  private buildCountQuery(
    text: string,
    ctes: CteInfo[],
    targetCte: CteInfo,
    document: TextDocument,
  ): string | undefined {
    // Reuse exact pattern from runCteWithDependencies
    const sameScopeCtesUpToTarget = ctes.filter(
      (cte) =>
        cte.withClauseStart === targetCte.withClauseStart &&
        cte.index <= targetCte.index,
    );

    const cteDefinitions: string[] = [];

    for (const cte of sameScopeCtesUpToTarget) {
      const cteStartPos = document.offsetAt(cte.range.start);
      const cteNameMatch = text
        .substring(cteStartPos)
        .match(
          /^((?:[a-zA-Z_][a-zA-Z0-9_]*|"[^"]+"|`[^`]+`|\[[^\]]+\])(?:\.(?:[a-zA-Z_][a-zA-Z0-9_]*|"[^"]+"|`[^`]+`|\[[^\]]+\]))*(?:\s*\([^)]*\))?)\s+as\s*\(/i,
        );

      if (cteNameMatch) {
        const cteQuery = document.getText(cte.queryRange);
        cteDefinitions.push(`${cteNameMatch[1]} AS (\n${cteQuery}\n)`);
      }
    }

    if (cteDefinitions.length === 0) {
      return undefined;
    }

    // Include preamble (dbt configs, variables before WITH)
    const preamble = text.substring(0, targetCte.withClauseStart).trim();
    let query = "";
    if (preamble) {
      query += preamble + "\n\n";
    }

    query += "WITH ";
    query += cteDefinitions.join(",\n");

    const quotedName = this.quoteSqlIdentifier(targetCte.name);
    query += `\nSELECT COUNT(*) AS _profile_count FROM ${quotedName}`;

    return query;
  }

  private extractRowCount(data: Record<string, unknown>[]): number {
    if (data.length === 0) {
      return 0;
    }
    const count = data[0]["_profile_count"];
    return typeof count === "number" ? count : Number(count) || 0;
  }

  private classifyTiers(entries: CteProfileEntry[]): CteProfileEntry[] {
    if (entries.length === 0) {
      return entries;
    }

    const maxMarginal = Math.max(...entries.map((e) => e.marginalTimeMs));
    if (maxMarginal === 0) {
      return entries.map((e) => ({ ...e, tier: "cool" as const }));
    }

    return entries.map((e) => {
      const fraction = e.marginalTimeMs / maxMarginal;
      let tier: "hot" | "warm" | "cool";
      if (fraction >= 0.5) {
        tier = "hot";
      } else if (fraction >= 0.2) {
        tier = "warm";
      } else {
        tier = "cool";
      }
      return { ...e, tier };
    });
  }

  private quoteSqlIdentifier(identifier: string): string {
    if (identifier.match(/^["'`\[]/) || identifier.includes(".")) {
      return identifier;
    }
    if (!identifier.match(/^[a-zA-Z_][a-zA-Z0-9_]*$/)) {
      return `"${identifier}"`;
    }
    return identifier;
  }

  private extractModelName(uri: Uri): string {
    const path = uri.fsPath;
    const parts = path.split(/[/\\]/);
    const fileName = parts[parts.length - 1];
    return fileName.replace(/\.sql$/i, "");
  }
}
