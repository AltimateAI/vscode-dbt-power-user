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
   */
  addEntry(entry: RunResultsEventData): RunResultsEventData {
    this.history.unshift(entry);
    if (this.history.length > RunHistoryService.MAX_ENTRIES) {
      this.history.pop();
    }
    this._onHistoryChanged.fire(entry);
    return entry;
  }

  get entries(): readonly RunResultsEventData[] {
    return this.history;
  }

  dispose(): void {
    this.disposables.forEach((d) => d.dispose());
  }
}
