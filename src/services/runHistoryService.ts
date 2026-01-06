import { Disposable, Event, EventEmitter } from "vscode";
// TODO: Import from @altimateai/dbt-integration once PR #14 is merged and published
// import { RunResultItem, RunResultsData } from "@altimateai/dbt-integration";

interface RunResultItem {
  unique_id: string;
  status?: string;
  execution_time?: number;
  message?: string;
}

interface RunResultsData {
  metadata?: {
    invocation_id?: string;
    args?: {
      which?: string;
      select?: string[];
    };
  };
  results: RunResultItem[];
  elapsed_time: number;
}

/**
 * Processed model result for display in run history
 */
export interface ModelRunResult {
  name: string;
  uniqueId: string;
  status: string;
  executionTime: number;
  message?: string;
  resourceType: "model" | "test" | "seed" | "snapshot";
}

/**
 * A completed dbt command execution
 */
export interface RunHistoryEntry {
  id: string;
  command: string;
  args: string[];
  completedAt: Date;
  projectName: string;
  models: ModelRunResult[];
  elapsedTime: number;
}

export class RunHistoryService implements Disposable {
  private history: RunHistoryEntry[] = [];

  private _onHistoryChanged = new EventEmitter<RunHistoryEntry | undefined>();
  readonly onHistoryChanged: Event<RunHistoryEntry | undefined> =
    this._onHistoryChanged.event;

  private disposables: Disposable[] = [this._onHistoryChanged];

  /**
   * Add a completed run to history from run_results.json data
   */
  addCompletedRun(
    runResults: RunResultsData,
    projectName: string,
  ): RunHistoryEntry {
    const result: RunHistoryEntry = {
      id: runResults.metadata?.invocation_id || `run-${Date.now()}`,
      command: runResults.metadata?.args?.which || "unknown",
      args: runResults.metadata?.args?.select || [],
      completedAt: new Date(),
      projectName,
      models: this.parseResults(runResults.results),
      elapsedTime: runResults.elapsed_time,
    };

    this.history.unshift(result);
    this._onHistoryChanged.fire(result);
    return result;
  }

  getHistory(): RunHistoryEntry[] {
    return [...this.history];
  }

  /**
   * Parse dbt run_results.json results into our ModelRunResult format
   */
  private parseResults(results: RunResultItem[]): ModelRunResult[] {
    return results.map((result) => {
      // Extract resource type from unique_id (e.g., "model.jaffle_shop.stg_customers")
      const resourceType = this.extractResourceType(result.unique_id);
      // Extract model name from unique_id
      const name = this.extractModelName(result.unique_id);

      return {
        name,
        uniqueId: result.unique_id,
        status: result.status ?? "error",
        executionTime: result.execution_time ?? 0,
        message: result.message,
        resourceType,
      };
    });
  }

  private static readonly VALID_RESOURCE_TYPES = [
    "model",
    "test",
    "seed",
    "snapshot",
  ] as const;

  /**
   * Extract resource type from unique_id
   * e.g., "model.jaffle_shop.stg_customers" -> "model"
   */
  private extractResourceType(
    uniqueId: string,
  ): "model" | "test" | "seed" | "snapshot" {
    const type = uniqueId.split(".")[0];
    return RunHistoryService.VALID_RESOURCE_TYPES.includes(type as any)
      ? (type as "model" | "test" | "seed" | "snapshot")
      : "model";
  }

  /**
   * Extract model name from unique_id
   * e.g., "model.jaffle_shop.stg_customers" -> "stg_customers"
   */
  private extractModelName(uniqueId: string): string {
    return uniqueId.split(".").pop() || uniqueId;
  }

  dispose(): void {
    this.disposables.forEach((d) => d.dispose());
  }
}
