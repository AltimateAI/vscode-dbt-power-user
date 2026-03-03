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
   * Matches on command + args + project so re-running the same command
   * updates the existing entry in-place rather than creating a duplicate.
   */
  addEntry(entry: RunResultsEventData): RunResultsEventData {
    const entryKey = RunHistoryService.entryKey(entry);
    const existingIndex = this.history.findIndex(
      (e) => RunHistoryService.entryKey(e) === entryKey,
    );
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

  private static entryKey(entry: RunResultsEventData): string {
    return `${entry.projectName}\0${entry.command}\0${entry.args.join(" ")}`;
  }

  get entries(): readonly RunResultsEventData[] {
    return this.history;
  }

  dispose(): void {
    this.disposables.forEach((d) => d.dispose());
  }
}
