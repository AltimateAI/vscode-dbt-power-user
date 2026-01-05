import { Disposable, Event, EventEmitter } from "vscode";
import { RunResultsData, RunResultItem } from "@altimateai/dbt-integration";
import { provideSingleton } from "../utils";

// Re-export for consumers that were importing from this file
export type { RunResultsData, RunResultItem };

/**
 * Represents the result of a single model/test/seed execution within a dbt run
 */
export interface ModelRunResult {
  name: string;
  uniqueId: string;
  status: "success" | "error" | "skipped" | "fail";
  executionTime: number; // seconds
  message?: string;
  resourceType: "model" | "test" | "seed" | "snapshot";
  compiledCode?: string;
}

/**
 * Represents a single dbt command execution (e.g., dbt run, dbt test)
 */
export interface RunHistoryEntry {
  id: string;
  command: string; // "run", "build", "test"
  args: string[];
  startTime: Date;
  endTime?: Date;
  projectName: string;
  projectRoot: string;
  models: ModelRunResult[];
  elapsedTime?: number; // seconds
  invocationId?: string;
}

@provideSingleton(RunHistoryService)
export class RunHistoryService implements Disposable {
  private history: RunHistoryEntry[] = [];
  private maxEntries = 50;

  private _onHistoryChanged = new EventEmitter<RunHistoryEntry | undefined>();
  readonly onHistoryChanged: Event<RunHistoryEntry | undefined> =
    this._onHistoryChanged.event;

  private disposables: Disposable[] = [this._onHistoryChanged];

  /**
   * Start tracking a new run. Call this when a dbt command begins.
   * Returns the entry ID for later reference.
   */
  startRun(
    command: string,
    args: string[],
    projectName: string,
    projectRoot: string,
  ): string {
    const id = this.generateId();
    const entry: RunHistoryEntry = {
      id,
      command,
      args,
      startTime: new Date(),
      projectName,
      projectRoot,
      models: [],
    };

    this.history.unshift(entry);
    this.trimHistory();
    this._onHistoryChanged.fire(entry);

    return id;
  }

  /**
   * Complete a run with results from run_results.json
   */
  completeRun(id: string, runResults: RunResultsData): void {
    const entry = this.history.find((e) => e.id === id);
    if (!entry) {
      return;
    }

    entry.endTime = new Date();
    entry.elapsedTime = runResults.elapsed_time;
    entry.invocationId = runResults.metadata?.invocation_id;
    entry.models = this.parseResults(runResults.results);

    this._onHistoryChanged.fire(entry);
  }

  /**
   * Mark a run as failed (when command errors before completing)
   */
  failRun(id: string, errorMessage?: string): void {
    const entry = this.history.find((e) => e.id === id);
    if (!entry) {
      return;
    }

    entry.endTime = new Date();
    // Add a synthetic error result
    entry.models = [
      {
        name: "Command Error",
        uniqueId: "error",
        status: "error",
        executionTime: 0,
        message: errorMessage || "Command failed to complete",
        resourceType: "model",
      },
    ];

    this._onHistoryChanged.fire(entry);
  }

  /**
   * Get the full run history
   */
  getHistory(): RunHistoryEntry[] {
    return [...this.history];
  }

  /**
   * Get a specific run by ID
   */
  getRunById(id: string): RunHistoryEntry | undefined {
    return this.history.find((e) => e.id === id);
  }

  /**
   * Get the most recent run
   */
  getLatestRun(): RunHistoryEntry | undefined {
    return this.history[0];
  }

  /**
   * Clear all history
   */
  clearHistory(): void {
    this.history = [];
    this._onHistoryChanged.fire(undefined);
  }

  /**
   * Compute overall status from model results
   */
  getRunStatus(
    entry: RunHistoryEntry,
  ): "running" | "success" | "failed" | "error" {
    if (!entry.endTime) {
      return "running";
    }

    if (entry.models.length === 0) {
      return "success"; // No models selected, but command completed
    }

    const hasError = entry.models.some(
      (m) => m.status === "error" || m.status === "fail",
    );
    if (hasError) {
      return "failed";
    }

    return "success";
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
        status: this.mapStatus(result.status ?? "unknown"),
        executionTime: result.execution_time ?? 0,
        message: result.message,
        resourceType,
        compiledCode: result.compiled_code,
      };
    });
  }

  /**
   * Extract resource type from unique_id
   * e.g., "model.jaffle_shop.stg_customers" -> "model"
   */
  private extractResourceType(
    uniqueId: string,
  ): "model" | "test" | "seed" | "snapshot" {
    const type = uniqueId.split(".")[0];
    if (
      type === "model" ||
      type === "test" ||
      type === "seed" ||
      type === "snapshot"
    ) {
      return type;
    }
    return "model"; // default
  }

  /**
   * Extract model name from unique_id
   * e.g., "model.jaffle_shop.stg_customers" -> "stg_customers"
   */
  private extractModelName(uniqueId: string): string {
    const parts = uniqueId.split(".");
    return parts[parts.length - 1] || uniqueId;
  }

  /**
   * Map dbt status strings to our status type
   */
  private mapStatus(status: string): "success" | "error" | "skipped" | "fail" {
    switch (status.toLowerCase()) {
      case "success":
      case "pass":
        return "success";
      case "error":
        return "error";
      case "fail":
        return "fail";
      case "skipped":
      case "skip":
        return "skipped";
      default:
        return "error";
    }
  }

  /**
   * Generate a unique ID for a run entry
   */
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }

  /**
   * Keep history within maxEntries limit
   */
  private trimHistory(): void {
    if (this.history.length > this.maxEntries) {
      this.history = this.history.slice(0, this.maxEntries);
    }
  }

  dispose(): void {
    this.disposables.forEach((d) => d.dispose());
  }
}
