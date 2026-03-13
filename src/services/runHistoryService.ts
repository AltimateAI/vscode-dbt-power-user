import type { RunResultsEventData } from "@altimateai/dbt-integration";
import { injectable } from "inversify";
import { Disposable, Event, EventEmitter } from "vscode";

export type {
  RunResultEntry,
  RunResultsEventData,
  RunStatus,
} from "@altimateai/dbt-integration";

@injectable()
export class RunHistoryService implements Disposable {
  private static readonly MAX_ENTRIES = 50;

  private history: RunResultsEventData[] = [];

  private _onHistoryChanged = new EventEmitter<
    RunResultsEventData | undefined
  >();
  readonly onHistoryChanged: Event<RunResultsEventData | undefined> =
    this._onHistoryChanged.event;

  private disposables: Disposable[] = [this._onHistoryChanged];

  /**
   * Add a completed run to history.
   * Accepts pre-parsed RunResultsEventData from dbt-integration.
   *
   * Dedup by invocation ID (`entry.id`). Each dbt run generates a unique
   * invocation_id, so re-running the same command creates a new entry —
   * this is intentional so users can compare stats across runs. The only
   * case where dedup fires is fs.watch emitting multiple events for the
   * same file write (same invocation_id read twice).
   */
  addEntry(entry: RunResultsEventData): RunResultsEventData {
    const existingIndex = this.history.findIndex((e) => e.id === entry.id);
    if (existingIndex !== -1) {
      this.history[existingIndex] = entry;
      this._onHistoryChanged.fire(entry);
      return entry;
    }

    this.history.unshift(entry);
    if (this.history.length > RunHistoryService.MAX_ENTRIES) {
      this.history.pop();
    }
    this._onHistoryChanged.fire(entry);
    return entry;
  }

  clear(): void {
    this.history = [];
    this._onHistoryChanged.fire(undefined);
  }

  get entries(): readonly RunResultsEventData[] {
    return this.history;
  }

  dispose(): void {
    this.disposables.forEach((d) => d.dispose());
  }
}
