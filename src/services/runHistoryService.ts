import { injectable } from "inversify";
import { Disposable, Event, EventEmitter } from "vscode";

/** Valid dbt resource types for run results */
export type ResourceType = "model" | "test" | "seed" | "snapshot";

const VALID_RESOURCE_TYPES: readonly ResourceType[] = [
  "model",
  "test",
  "seed",
  "snapshot",
] as const;

interface RunResultItem {
  unique_id: string;
  status?: string;
  execution_time?: number;
  message?: string;
}

interface RunResultsData {
  metadata?: {
    invocation_id?: string;
  };
  /** Top-level args dict per dbt schema */
  args?: {
    which?: string;
    select?: string[];
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
  executionTime: number | null;
  message?: string;
  resourceType: ResourceType;
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

@injectable()
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
      command: runResults.args?.which || "unknown",
      args: runResults.args?.select || [],
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
      const resourceType = this.extractResourceType(result.unique_id);
      const name = this.extractModelName(result.unique_id);

      return {
        name,
        uniqueId: result.unique_id,
        status: result.status ?? "unknown",
        executionTime: result.execution_time ?? null,
        message: result.message,
        resourceType,
      };
    });
  }

  private extractResourceType(uniqueId: string): ResourceType {
    const type = uniqueId.split(".")[0];
    return VALID_RESOURCE_TYPES.includes(type as ResourceType)
      ? (type as ResourceType)
      : "model";
  }

  private extractModelName(uniqueId: string): string {
    return uniqueId.split(".").pop() || uniqueId;
  }

  dispose(): void {
    this.disposables.forEach((d) => d.dispose());
  }
}
