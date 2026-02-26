import {
  Disposable,
  Event,
  EventEmitter,
  TreeDataProvider,
  TreeItem,
} from "vscode";
import { RunHistoryService } from "../services/runHistoryService";
import {
  ResultTreeItem,
  RunHistoryTreeItem,
  RunTreeItem,
} from "./runHistoryTreeItems";

export class RunHistoryTreeviewProvider
  implements TreeDataProvider<RunHistoryTreeItem>, Disposable
{
  private _onDidChangeTreeData = new EventEmitter<
    RunHistoryTreeItem | undefined | void
  >();
  readonly onDidChangeTreeData: Event<RunHistoryTreeItem | undefined | void> =
    this._onDidChangeTreeData.event;

  private disposables: Disposable[] = [this._onDidChangeTreeData];

  constructor(private runHistoryService: RunHistoryService) {
    this.disposables.push(
      this.runHistoryService.onHistoryChanged(() => {
        this._onDidChangeTreeData.fire();
      }),
    );
  }

  // Called by VS Code's TreeDataProvider interface
  getTreeItem(element: RunHistoryTreeItem): TreeItem {
    return element;
  }

  // Called by VS Code's TreeDataProvider interface to populate the tree view
  getChildren(element?: RunHistoryTreeItem): RunHistoryTreeItem[] {
    if (!element) {
      const entries = this.runHistoryService.entries;
      return entries.map((entry) => new RunTreeItem(entry, entries.length));
    }

    if (element instanceof RunTreeItem) {
      return element.entry.results.map((result) => new ResultTreeItem(result));
    }

    return [];
  }

  dispose(): void {
    this.disposables.forEach((d) => d.dispose());
  }
}
