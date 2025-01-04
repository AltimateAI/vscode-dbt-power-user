import { DBTTerminal } from "../dbt_client/dbtTerminal";
import { Disposable } from "vscode";

export interface SourceFileWatchers extends Disposable {
  dispose(): void;
}

export class SourceFileWatchersFactory {
  constructor(private terminal: DBTTerminal) {}
  create(): Disposable {
    return {
      dispose: () => {},
    };
  }
  createSourceFileWatchers(): SourceFileWatchers {
    return {
      dispose: () => {},
    };
  }
}
