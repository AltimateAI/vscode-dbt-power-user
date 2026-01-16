import {
  Disposable,
  Event,
  EventEmitter,
  TreeDataProvider,
  TreeItem,
} from "vscode";
import { RunHistoryService } from "../services/runHistoryService";
import {
  ModelResultTreeItem,
  RunHistoryTreeItem,
  RunTreeItem,
} from "./runHistoryTreeItems";

/**
 * Provides data for the Run History treeview panel in VS Code's sidebar.
 * Implements VS Code's TreeDataProvider interface which defines how tree views are populated.
 *
 * TreeDataProvider requires two methods:
 * - getTreeItem(): Returns the visual representation of a tree element
 * - getChildren(): Returns child elements for hierarchy (root items or nested children)
 *
 * This provider displays a two-level hierarchy:
 * - Level 1: RunTreeItem (dbt command executions like "dbt run +model1")
 * - Level 2: ModelResultTreeItem (individual model/test/seed results)
 */
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
      return this.runHistoryService
        .getHistory()
        .map((entry) => new RunTreeItem(entry));
    }

    if (element instanceof RunTreeItem) {
      return element.entry.models.map(
        (result) => new ModelResultTreeItem(result),
      );
    }

    return [];
  }

  dispose(): void {
    this.disposables.forEach((d) => d.dispose());
  }
}
