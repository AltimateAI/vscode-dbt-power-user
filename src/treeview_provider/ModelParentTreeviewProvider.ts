import {
  TreeDataProvider,
  TreeItem,
  Event,
  TreeItemCollapsibleState,
  window,
  EventEmitter,
  Disposable,
} from "vscode";
import { Node, Model, GraphMetaMap, Test, Seed, Analysis } from "../domain";
import * as path from "path";
import { dbtProjectContainer } from "../manifest/dbtProjectContainer";
import {
  ManifestCacheChangedEvent,
  ManifestCacheProjectAddedEvent,
} from "../manifest/event/manifestCacheChangedEvent";

export class ModelTreeviewProvider
  implements TreeDataProvider<NodeTreeItem>, Disposable {
  private eventMap: Map<string, ManifestCacheProjectAddedEvent> = new Map();
  private treeType: keyof GraphMetaMap;

  constructor(treeType: keyof GraphMetaMap) {
    this.treeType = treeType;
    window.onDidChangeActiveTextEditor(() => {
      this._onDidChangeTreeData.fire();
    });
    dbtProjectContainer.onManifestChanged((event) =>
      this.onManifestCacheChanged(event)
    );
  }

  dispose() {
    this.disposables.forEach((disposable) => disposable.dispose());
  }

  private _onDidChangeTreeData: EventEmitter<
    ModelTreeItem | undefined | void
  > = new EventEmitter<ModelTreeItem | undefined | void>();
  readonly onDidChangeTreeData: Event<ModelTreeItem | undefined | void> = this
    ._onDidChangeTreeData.event;
  private disposables: Disposable[] = [this._onDidChangeTreeData];

  onManifestCacheChanged(event: ManifestCacheChangedEvent): void {
    event.added?.forEach((added) => {
      this.eventMap.set(added.projectRoot.fsPath, added);
    });
    event.removed?.forEach((removed) => {
      this.eventMap.delete(removed.projectRoot.fsPath);
    });
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: NodeTreeItem): NodeTreeItem | Thenable<ModelTreeItem> {
    return element;
  }

  getChildren(element?: NodeTreeItem): Thenable<NodeTreeItem[]> {
    if (window.activeTextEditor === undefined || this.eventMap === undefined) {
      return Promise.resolve([]);
    }

    const currentFilePath = window.activeTextEditor!.document.uri;
    const projectRootpath = dbtProjectContainer.getProjectRootpath(
      currentFilePath
    );
    if (projectRootpath === undefined) {
      return Promise.resolve([]);
    }

    const event = this.eventMap.get(projectRootpath.fsPath);
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
    const packageName =
      dbtProjectContainer.getPackageName(currentFilePath) || projectName;
    return Promise.resolve(
      this.getTreeItems(`model.${packageName}.${fileName}`, event)
    );
  }

  private getTreeItems(
    elementName: string,
    event: ManifestCacheProjectAddedEvent
  ): NodeTreeItem[] {
    const { graphMetaMap } = event;
    const parentModels = graphMetaMap[this.treeType].get(elementName);
    if (parentModels === undefined) {
      return [];
    }
    return parentModels.nodes
      .filter(
        (node) =>
          !(node instanceof Test) &&
          !(node instanceof Seed) &&
          !(node instanceof Analysis)
      )
      .map((node) => {
        const childNodes = graphMetaMap[this.treeType]
          .get(node.key)
          ?.nodes.filter(
            (node) =>
              !(node instanceof Test) &&
              !(node instanceof Seed) &&
              !(node instanceof Analysis)
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
    light: path.join(path.resolve(__dirname), "../media/dashboard_light.svg"),
    dark: path.join(path.resolve(__dirname), "../media/dashboard_dark.svg"),
  };

  contextValue = "dashboard";
}
