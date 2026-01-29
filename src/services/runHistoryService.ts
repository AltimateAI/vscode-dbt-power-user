import {
  ResourceType,
  RunHistoryEntry,
  RunResultEntry,
  RunStatus,
} from "@altimateai/dbt-integration";
import { injectable } from "inversify";
import { Disposable, Event, EventEmitter } from "vscode";

// Re-export types for consumers
export type { RunHistoryEntry, RunResultEntry, RunStatus, ResourceType };

@injectable()
export class RunHistoryService implements Disposable {
  private history: RunHistoryEntry[] = [];

  private _onHistoryChanged = new EventEmitter<RunHistoryEntry | undefined>();
  readonly onHistoryChanged: Event<RunHistoryEntry | undefined> =
    this._onHistoryChanged.event;

  private disposables: Disposable[] = [this._onHistoryChanged];

  /**
   * Add a completed run to history.
   * Accepts pre-parsed RunHistoryEntry from dbt-integration.
   */
  addEntry(entry: RunHistoryEntry): RunHistoryEntry {
    this.history.unshift(entry);
    this._onHistoryChanged.fire(entry);
    return entry;
  }

  getHistory(): RunHistoryEntry[] {
    return [...this.history];
  }

  dispose(): void {
    this.disposables.forEach((d) => d.dispose());
  }
}
