import {
  Disposable,
  Event,
  EventEmitter,
  ThemeColor,
  ThemeIcon,
  TreeDataProvider,
  TreeItem,
  TreeItemCollapsibleState,
} from "vscode";
import { provideSingleton } from "../utils";
import {
  RunHistoryService,
  RunHistoryEntry,
  ModelRunResult,
} from "../services/runHistoryService";

/**
 * Tree item representing a dbt command run
 */
class RunTreeItem extends TreeItem {
  constructor(public readonly entry: RunHistoryEntry) {
    super(
      RunTreeItem.getLabel(entry),
      entry.models.length > 0
        ? TreeItemCollapsibleState.Expanded
        : TreeItemCollapsibleState.None,
    );

    this.description = RunTreeItem.getDescription(entry);
    this.iconPath = RunTreeItem.getIcon(entry);
    this.tooltip = RunTreeItem.getTooltip(entry);
    this.contextValue = "runHistoryEntry";
  }

  private static getLabel(entry: RunHistoryEntry): string {
    const args = entry.args.length > 0 ? ` ${entry.args.join(" ")}` : "";
    return `dbt ${entry.command}${args}`;
  }

  private static getDescription(entry: RunHistoryEntry): string {
    if (!entry.endTime) {
      return "Running...";
    }

    const duration = entry.elapsedTime
      ? `${entry.elapsedTime.toFixed(2)}s`
      : "";
    const modelCount = entry.models.length;
    const successCount = entry.models.filter(
      (m) => m.status === "success",
    ).length;
    const failCount = entry.models.filter(
      (m) => m.status === "error" || m.status === "fail",
    ).length;

    const parts: string[] = [];
    if (duration) {
      parts.push(duration);
    }
    if (modelCount > 0) {
      if (failCount > 0) {
        parts.push(`${successCount}/${modelCount} passed`);
      } else {
        parts.push(`${modelCount} passed`);
      }
    }

    return parts.join(" • ");
  }

  private static getIcon(entry: RunHistoryEntry): ThemeIcon {
    if (!entry.endTime) {
      return new ThemeIcon("sync~spin", new ThemeColor("charts.yellow"));
    }

    const hasError = entry.models.some(
      (m) => m.status === "error" || m.status === "fail",
    );
    if (hasError) {
      return new ThemeIcon("error", new ThemeColor("charts.red"));
    }

    return new ThemeIcon("pass", new ThemeColor("charts.green"));
  }

  private static getTooltip(entry: RunHistoryEntry): string {
    const lines: string[] = [];
    lines.push(`Project: ${entry.projectName}`);
    lines.push(`Started: ${entry.startTime.toLocaleTimeString()}`);
    if (entry.endTime) {
      lines.push(`Ended: ${entry.endTime.toLocaleTimeString()}`);
    }
    if (entry.elapsedTime) {
      lines.push(`Duration: ${entry.elapsedTime.toFixed(2)}s`);
    }
    if (entry.invocationId) {
      lines.push(`Invocation: ${entry.invocationId}`);
    }
    return lines.join("\n");
  }
}

/**
 * Tree item representing a model/test/seed result within a run
 */
class ModelResultTreeItem extends TreeItem {
  constructor(public readonly result: ModelRunResult) {
    super(result.name, TreeItemCollapsibleState.None);

    this.description = ModelResultTreeItem.getDescription(result);
    this.iconPath = ModelResultTreeItem.getIcon(result);
    this.tooltip = ModelResultTreeItem.getTooltip(result);
    this.contextValue = `runHistoryModel.${result.resourceType}`;
  }

  private static getDescription(result: ModelRunResult): string {
    const parts: string[] = [];
    parts.push(result.resourceType);
    parts.push(`${result.executionTime.toFixed(2)}s`);
    return parts.join(" • ");
  }

  private static getIcon(result: ModelRunResult): ThemeIcon {
    switch (result.status) {
      case "success":
        return new ThemeIcon("check", new ThemeColor("charts.green"));
      case "error":
      case "fail":
        return new ThemeIcon("x", new ThemeColor("charts.red"));
      case "skipped":
        return new ThemeIcon("debug-step-over", new ThemeColor("charts.gray"));
      default:
        return new ThemeIcon("question");
    }
  }

  private static getTooltip(result: ModelRunResult): string {
    const lines: string[] = [];
    lines.push(`Name: ${result.name}`);
    lines.push(`Type: ${result.resourceType}`);
    lines.push(`Status: ${result.status}`);
    lines.push(`Execution Time: ${result.executionTime.toFixed(2)}s`);
    if (result.message) {
      lines.push(`Message: ${result.message}`);
    }
    lines.push(`Unique ID: ${result.uniqueId}`);
    return lines.join("\n");
  }
}

type RunHistoryTreeItem = RunTreeItem | ModelResultTreeItem;

@provideSingleton(RunHistoryTreeviewProvider)
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

  getTreeItem(element: RunHistoryTreeItem): TreeItem {
    return element;
  }

  getChildren(element?: RunHistoryTreeItem): RunHistoryTreeItem[] {
    if (!element) {
      // Root level: show all run entries
      const history = this.runHistoryService.getHistory();
      return history.map((entry) => new RunTreeItem(entry));
    }

    if (element instanceof RunTreeItem) {
      // Run entry level: show model results
      return element.entry.models.map(
        (result) => new ModelResultTreeItem(result),
      );
    }

    // Model result level: no children
    return [];
  }

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  clearHistory(): void {
    this.runHistoryService.clearHistory();
  }

  dispose(): void {
    this.disposables.forEach((d) => d.dispose());
  }
}
