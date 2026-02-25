import type {
  RunResultEntry,
  RunResultsEventData,
  RunStatus,
} from "@altimateai/dbt-integration";
import {
  ThemeColor,
  ThemeIcon,
  TreeItem,
  TreeItemCollapsibleState,
} from "vscode";

/** Number of runs beyond which new items default to collapsed */
const COLLAPSE_THRESHOLD = 5;

/**
 * Top-level tree item representing a dbt command execution (e.g., `dbt run`, `dbt test`).
 * This is the parent node displayed in the Run History treeview panel.
 * Each RunTreeItem contains child ResultTreeItems for individual model/test/seed results.
 */
export class RunTreeItem extends TreeItem {
  constructor(
    public readonly entry: RunResultsEventData,
    runCount: number,
  ) {
    super(
      RunTreeItem.getLabel(entry),
      RunTreeItem.getCollapsibleState(entry, runCount),
    );

    this.description = RunTreeItem.getDescription(entry);
    this.iconPath = RunTreeItem.getIcon(entry);
    this.tooltip = RunTreeItem.getTooltip(entry);
    this.contextValue = "runHistoryEntry";
  }

  private static getCollapsibleState(
    entry: RunResultsEventData,
    runCount: number,
  ): TreeItemCollapsibleState {
    if (entry.results.length === 0) {
      return TreeItemCollapsibleState.None;
    }
    return runCount > COLLAPSE_THRESHOLD
      ? TreeItemCollapsibleState.Collapsed
      : TreeItemCollapsibleState.Expanded;
  }

  private static getLabel(entry: RunResultsEventData): string {
    const args = entry.args.length > 0 ? ` ${entry.args.join(" ")}` : "";
    return `dbt ${entry.command}${args}`;
  }

  private static getDescription(entry: RunResultsEventData): string {
    const duration = `${(entry.elapsedTime ?? 0).toFixed(2)}s`;
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

  private static getIcon(entry: RunResultsEventData): ThemeIcon {
    const hasError = entry.results.some(
      (r: RunResultEntry) => r.status === "error",
    );
    if (hasError) {
      return new ThemeIcon("error", new ThemeColor("charts.red"));
    }
    const hasWarn = entry.results.some(
      (r: RunResultEntry) => r.status === "warn",
    );
    if (hasWarn) {
      return new ThemeIcon("warning", new ThemeColor("charts.yellow"));
    }
    return new ThemeIcon("pass", new ThemeColor("charts.green"));
  }

  private static getTooltip(entry: RunResultsEventData): string {
    const completedAt =
      entry.completedAt instanceof Date
        ? entry.completedAt
        : new Date(entry.completedAt);
    const lines: string[] = [];
    lines.push(`Project: ${entry.projectName}`);
    lines.push(`Completed: ${completedAt.toLocaleTimeString()}`);
    lines.push(`Duration: ${(entry.elapsedTime ?? 0).toFixed(2)}s`);
    lines.push(`Invocation: ${entry.id}`);
    return lines.join("\n");
  }
}

/** Maps normalized RunStatus to icon and theme color for display */
export function getStatusIcon(status: RunStatus): {
  icon: string;
  color: string;
} {
  switch (status) {
    case "success":
      return { icon: "check", color: "charts.green" };
    case "error":
      return { icon: "x", color: "charts.red" };
    case "warn":
      return { icon: "warning", color: "charts.yellow" };
    case "skipped":
    default:
      return { icon: "debug-step-over", color: "disabledForeground" };
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
    if (result.executionTime !== null && result.executionTime !== undefined) {
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
    if (result.executionTime !== null && result.executionTime !== undefined) {
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
