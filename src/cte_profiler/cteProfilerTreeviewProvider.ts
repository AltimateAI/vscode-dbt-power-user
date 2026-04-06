import {
  Disposable,
  Event,
  EventEmitter,
  ThemeIcon,
  TreeDataProvider,
  TreeItem,
  TreeItemCollapsibleState,
} from "vscode";
import { CteProfilerService } from "./cteProfilerService";
import { CteProfileEntry, CteProfileResult } from "./cteProfilerTypes";

type CteProfilerTreeItem = ProfiledModelItem | ProfiledCteItem;

export class CteProfilerTreeviewProvider
  implements TreeDataProvider<CteProfilerTreeItem>, Disposable
{
  private _onDidChangeTreeData = new EventEmitter<
    CteProfilerTreeItem | undefined | void
  >();
  readonly onDidChangeTreeData: Event<CteProfilerTreeItem | undefined | void> =
    this._onDidChangeTreeData.event;

  private disposables: Disposable[] = [this._onDidChangeTreeData];

  constructor(private cteProfilerService: CteProfilerService) {
    this.disposables.push(
      this.cteProfilerService.onResultChanged(() => {
        this._onDidChangeTreeData.fire();
      }),
    );
  }

  dispose(): void {
    this.disposables.forEach((d) => d.dispose());
  }

  getTreeItem(element: CteProfilerTreeItem): TreeItem {
    return element;
  }

  getChildren(element?: CteProfilerTreeItem): CteProfilerTreeItem[] {
    if (!element) {
      return this.cteProfilerService.allResults.map(
        (r) => new ProfiledModelItem(r),
      );
    }

    if (element instanceof ProfiledModelItem) {
      return element.result.ctes.map((c) => new ProfiledCteItem(c));
    }

    return [];
  }
}

class ProfiledModelItem extends TreeItem {
  constructor(public readonly result: CteProfileResult) {
    super(result.modelName, TreeItemCollapsibleState.Expanded);
    this.description = `${formatTime(result.totalTimeMs)} · ${formatRows(result.totalRows)} rows`;
    this.iconPath = statusIcon(result.status);
  }
}

class ProfiledCteItem extends TreeItem {
  constructor(public readonly entry: CteProfileEntry) {
    super(entry.name, TreeItemCollapsibleState.None);
    this.description = `${formatTime(entry.marginalTimeMs)} · ${formatRows(entry.rowCount)} rows`;
    this.iconPath = tierIcon(entry.tier);
  }
}

function statusIcon(status: CteProfileResult["status"]): ThemeIcon | undefined {
  switch (status) {
    case "running":
      return new ThemeIcon("loading~spin");
    case "complete":
      return new ThemeIcon("pass");
    case "partial":
      return new ThemeIcon("warning");
    case "error":
      return new ThemeIcon("error");
  }
}

function tierIcon(tier: CteProfileEntry["tier"]): ThemeIcon | undefined {
  switch (tier) {
    case "hot":
      return new ThemeIcon("flame");
    case "warm":
      return new ThemeIcon("warning");
    default:
      return new ThemeIcon("circle-outline");
  }
}

function formatTime(timeMs: number): string {
  if (timeMs >= 1000) {
    return `${(timeMs / 1000).toFixed(1)}s`;
  }
  return `${timeMs}ms`;
}

function formatRows(rows: number): string {
  if (rows >= 1_000_000) {
    return `${(rows / 1_000_000).toFixed(1)}M`;
  }
  if (rows >= 1_000) {
    return `${(rows / 1_000).toFixed(1)}k`;
  }
  return `${rows}`;
}
