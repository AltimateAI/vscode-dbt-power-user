import {
  ThemeColor,
  ThemeIcon,
  TreeItem,
  TreeItemCollapsibleState,
} from "vscode";
import { ModelRunResult, RunHistoryEntry } from "../services/runHistoryService";

/**
 * Top-level tree item representing a dbt command execution (e.g., `dbt run`, `dbt test`).
 * This is the parent node displayed in the Run History treeview panel.
 * Each RunTreeItem contains child ModelResultTreeItems for individual model/test/seed results.
 */
export class RunTreeItem extends TreeItem {
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
    const duration = `${entry.elapsedTime.toFixed(2)}s`;
    const modelCount = entry.models.length;
    const successCount = entry.models.filter(
      (m) => m.status === "success" || m.status === "pass",
    ).length;
    const failCount = entry.models.filter(
      (m) => m.status === "error" || m.status === "fail",
    ).length;

    const parts: string[] = [duration];
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
    lines.push(`Completed: ${entry.completedAt.toLocaleTimeString()}`);
    lines.push(`Duration: ${entry.elapsedTime.toFixed(2)}s`);
    lines.push(`Invocation: ${entry.id}`);
    return lines.join("\n");
  }
}

/** Maps dbt status to icon and theme color for display */
function getStatusIcon(status: string): { icon: string; color: string } {
  switch (status) {
    case "success":
    case "pass":
      return { icon: "check", color: "charts.green" };
    case "error":
    case "fail":
      return { icon: "x", color: "charts.red" };
    case "skipped":
    case "skip":
      return { icon: "debug-step-over", color: "disabledForeground" };
    default:
      return { icon: "question", color: "" };
  }
}

/**
 * Child tree item representing an individual model, test, seed, or snapshot result.
 * These appear as expandable children under their parent RunTreeItem.
 * Displays the resource name, type, execution time, and status icon.
 */
export class ModelResultTreeItem extends TreeItem {
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
    if (result.executionTime !== null) {
      parts.push(`${result.executionTime.toFixed(2)}s`);
    }
    return parts.join(" • ");
  }

  private static getIcon(result: ModelRunResult): ThemeIcon {
    const config = getStatusIcon(result.status);
    return config.color
      ? new ThemeIcon(config.icon, new ThemeColor(config.color))
      : new ThemeIcon(config.icon);
  }

  private static getTooltip(result: ModelRunResult): string {
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

export type RunHistoryTreeItem = RunTreeItem | ModelResultTreeItem;
