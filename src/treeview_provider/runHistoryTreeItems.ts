import {
  ThemeColor,
  ThemeIcon,
  TreeItem,
  TreeItemCollapsibleState,
} from "vscode";
import type {
  RunHistoryEntry,
  RunResultEntry,
  RunStatus,
} from "../services/runHistoryService";

/**
 * Top-level tree item representing a dbt command execution (e.g., `dbt run`, `dbt test`).
 * This is the parent node displayed in the Run History treeview panel.
 * Each RunTreeItem contains child ResultTreeItems for individual model/test/seed results.
 */
export class RunTreeItem extends TreeItem {
  constructor(public readonly entry: RunHistoryEntry) {
    super(
      RunTreeItem.getLabel(entry),
      entry.results.length > 0
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
    const duration = `${entry.elapsedTime.toFixed(2)}s`;
    const resultCount = entry.results.length;
    const successCount = entry.results.filter(
      (r: RunResultEntry) => r.status === "success",
    ).length;
    const errorCount = entry.results.filter(
      (r: RunResultEntry) => r.status === "error",
    ).length;

    const parts: string[] = [duration];
    if (resultCount > 0) {
      if (errorCount > 0) {
        parts.push(`${successCount}/${resultCount} passed`);
      } else {
        parts.push(`${resultCount} passed`);
      }
    }

    return parts.join(" • ");
  }

  private static getIcon(entry: RunHistoryEntry): ThemeIcon {
    const hasError = entry.results.some(
      (r: RunResultEntry) => r.status === "error",
    );
    if (hasError) {
      return new ThemeIcon("error", new ThemeColor("charts.red"));
    }
    return new ThemeIcon("pass", new ThemeColor("charts.green"));
  }

  private static getTooltip(entry: RunHistoryEntry): string {
    const lines: string[] = [];
    lines.push(`Project: ${entry.projectName}`);
    lines.push(`Completed: ${entry.completedAt.toLocaleTimeString()}`);
    lines.push(`Duration: ${entry.elapsedTime.toFixed(2)}s`);
    lines.push(`Invocation: ${entry.id}`);
    return lines.join("\n");
  }
}

/** Maps normalized RunStatus to icon and theme color for display */
function getStatusIcon(status: RunStatus): { icon: string; color: string } {
  switch (status) {
    case "success":
      return { icon: "check", color: "charts.green" };
    case "error":
      return { icon: "x", color: "charts.red" };
    case "skipped":
      return { icon: "debug-step-over", color: "disabledForeground" };
    default:
      // Exhaustive check - this should never happen with the RunStatus type
      const _exhaustive: never = status;
      return { icon: "question", color: "disabledForeground" };
  }
}

/**
 * Child tree item representing an individual model, test, seed, or snapshot result.
 * These appear as expandable children under their parent RunTreeItem.
 * Displays the resource name, type, execution time, and status icon.
 */
export class ResultTreeItem extends TreeItem {
  constructor(public readonly result: RunResultEntry) {
    super(result.name, TreeItemCollapsibleState.None);

    this.description = ResultTreeItem.getDescription(result);
    this.iconPath = ResultTreeItem.getIcon(result);
    this.tooltip = ResultTreeItem.getTooltip(result);
    this.contextValue = `runHistoryResult.${result.resourceType}`;
  }

  private static getDescription(result: RunResultEntry): string {
    const parts: string[] = [];
    parts.push(result.resourceType);
    if (result.executionTime !== null) {
      parts.push(`${result.executionTime.toFixed(2)}s`);
    }
    return parts.join(" • ");
  }

  private static getIcon(result: RunResultEntry): ThemeIcon {
    const config = getStatusIcon(result.status);
    return new ThemeIcon(config.icon, new ThemeColor(config.color));
  }

  private static getTooltip(result: RunResultEntry): string {
    const lines: string[] = [];
    lines.push(`Name: ${result.name}`);
    lines.push(`Type: ${result.resourceType}`);
    lines.push(`Status: ${result.status}`);
    if (result.executionTime !== null) {
      lines.push(`Execution Time: ${result.executionTime.toFixed(2)}s`);
    }
    if (result.message) {
      lines.push(`Message: ${result.message}`);
    }
    lines.push(`Unique ID: ${result.uniqueId}`);
    return lines.join("\n");
  }
}

export type RunHistoryTreeItem = RunTreeItem | ResultTreeItem;
