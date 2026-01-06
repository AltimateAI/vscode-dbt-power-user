import * as crypto from "crypto";
import { Disposable, Event, EventEmitter } from "vscode";

/**
 * Structure of a single result item from dbt's run_results.json
 */
export interface RunResultItem {
  unique_id: string;
  status?: string;
  execution_time?: number;
  message?: string;
}

/**
 * Structure of dbt's run_results.json file
 */
export interface RunResultsData {
  metadata?: {
    invocation_id?: string;
  };
  results: RunResultItem[];
  elapsed_time: number;
}

/**
 * Processed model result for display in run history.
 * This is NOT a duplicate of RunResultItem - it's an enriched version with:
 * - Extracted model name (from unique_id)
 * - Extracted resource type (from unique_id)
 * - Simplified structure for UI display
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
 * Tracks a dbt command execution session.
 * This is NOT related to RunResultsData - it captures command metadata
 * (start/end times, args) that doesn't exist in dbt's run_results.json.
 */
export interface RunHistoryEntry {
  id: string;
  command: string;
  args: string[];
  startTime: Date;
  endTime?: Date;
  projectName: string;
  models: ModelRunResult[];
  elapsedTime?: number;
  invocationId?: string;
}

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
  startRun(command: string, args: string[], projectName: string): string {
    const id = this.generateId();
    const entry: RunHistoryEntry = {
      id,
      command,
      args,
      startTime: new Date(),
      projectName,
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
   * Generate a unique ID for a run entry
   */
  private generateId(): string {
    return crypto.randomUUID();
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
