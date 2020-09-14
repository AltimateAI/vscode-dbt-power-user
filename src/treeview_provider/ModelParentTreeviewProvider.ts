import {
  TreeDataProvider,
  TreeItem,
  Event,
  TreeItemCollapsibleState,
  window,
  EventEmitter,
  workspace
} from "vscode";
import {
  DBTManifestCacheChangedEvent,
  Node,
  Model,
  GraphMetaMap,
  Test,
  Seed,
  Analysis,
} from "../dbtManifest";
import * as path from "path";
import { getPackageName, getProjectRootpath } from "../utils";

export class ModelTreeviewProvider implements TreeDataProvider<NodeTreeItem> {
  private eventMap: Map<string, DBTManifestCacheChangedEvent> = new Map();
  private treeType: keyof GraphMetaMap;

  constructor(treeType: keyof GraphMetaMap) {
    this.treeType = treeType;
    window.onDidChangeActiveTextEditor(() => {
      this._onDidChangeTreeData.fire();
    });
  }

  private _onDidChangeTreeData: EventEmitter<
    ModelTreeItem | undefined | void
  > = new EventEmitter<ModelTreeItem | undefined | void>();
  readonly onDidChangeTreeData: Event<ModelTreeItem | undefined | void> = this
    ._onDidChangeTreeData.event;

  onDBTManifestCacheChanged(event: DBTManifestCacheChangedEvent, rootpath: string): void {
    this.eventMap.set(rootpath, event);
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: NodeTreeItem): NodeTreeItem | Thenable<ModelTreeItem> {
    return element;
  }

  getChildren(element?: NodeTreeItem): Thenable<NodeTreeItem[]> {
    if (window.activeTextEditor === undefined || this.eventMap === undefined) {
      return Promise.resolve([]);
    }

    const workspaceFolders = workspace.workspaceFolders;
    if (workspaceFolders === undefined) {
      return Promise.resolve([]);
    }
    const currentFilePath = window.activeTextEditor!.document.uri.path;
    const projectRootpath = getProjectRootpath(workspaceFolders, currentFilePath);
    if (projectRootpath === undefined) {
      return Promise.resolve([]);
    }

    const event = this.eventMap.get(projectRootpath);
    if (event === undefined) {
      return Promise.resolve([]);
    }

    if (element) {
      return Promise.resolve(this.getTreeItems(element.key, event));
    }

    const { projectName } = event;
    const fileName = path.basename(
      window.activeTextEditor!.document.fileName,
      ".sql"
    );
    const packageName = getPackageName(currentFilePath) || projectName;
    return Promise.resolve(
      this.getTreeItems(`model.${packageName}.${fileName}`, event)
    );
  }

  private getTreeItems(elementName: string, event: DBTManifestCacheChangedEvent): NodeTreeItem[] {
    const { graphMetaMap } = event;
    const parentModels = graphMetaMap[this.treeType].get(elementName);
    if (parentModels === undefined) {
      return [];
    }
    return parentModels.nodes
      .filter((node) => !(node instanceof Test)
        && !(node instanceof Seed)
        && !(node instanceof Analysis))
      .map((node) => {
        const childNodes = graphMetaMap[this.treeType]
          .get(node.key)
          ?.nodes.filter(
            (node) => !(node instanceof Test)
              && !(node instanceof Seed)
              && !(node instanceof Analysis)
          );

        if (node instanceof Model && childNodes?.length === 0) {
          return new DashboardTreeItem(node);
        }
        return node instanceof Model
          ? new ModelTreeItem(node)
          : new SourceTreeItem(node);
      });
  }
}

export class NodeTreeItem extends TreeItem {
  collapsibleState = TreeItemCollapsibleState.Collapsed;
  key: string;
  url: string;

  constructor(node: Node) {
    super(node.label);
    this.key = node.key;
    this.url = node.url;
    if (node.iconPath !== undefined) {
      this.iconPath = node.iconPath;
    }
    this.command = {
      command: "navigateToFile",
      title: "Select Node",
      arguments: [node.url],
    };
  }
}

class ModelTreeItem extends NodeTreeItem {
  contextValue = "model";
}

class SourceTreeItem extends NodeTreeItem {
  collapsibleState = TreeItemCollapsibleState.None;

  contextValue = "source";
}

class DashboardTreeItem extends NodeTreeItem {
  collapsibleState = TreeItemCollapsibleState.None;

  iconPath = {
    light: path.join(
      path.resolve(__dirname),
      "../media/dashboard_light.svg"
    ),
    dark: path.join(path.resolve(__dirname), "../media/dashboard_dark.svg"),
  };

  contextValue = "dashboard";
}
