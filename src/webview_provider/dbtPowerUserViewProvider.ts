import { commands, TreeItemCollapsibleState, window, workspace } from "vscode";
import { AltimateRequest } from "../altimate";
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { QueryManifestService } from "../services/queryManifestService";
import { SharedStateService } from "../services/sharedStateService";
import { UsersService } from "../services/usersService";
import { TelemetryService } from "../telemetry";
import { provideSingleton } from "../utils";
import {
  AltimateWebviewProvider,
  HandleCommandProps,
} from "./altimateWebviewProvider";
import {
  AnalysisTreeItem,
  ExposureTreeItem,
  ModelTreeItem,
  NodeTreeItem,
  SeedTreeItem,
  SnapshotTreeItem,
  SourceTreeItem,
  TestTreeItem,
} from "../treeview_provider/modelTreeviewProvider";
import {
  Analysis,
  Exposure,
  GraphMetaMap,
  Node,
  Seed,
  Snapshot,
  Source,
  Test,
} from "../domain";
import { basename } from "path";

@provideSingleton(DbtPowerUserViewProvider)
export class DbtPowerUserViewProvider extends AltimateWebviewProvider {
  public static readonly viewType = "dbt_poweruser_view";
  protected viewPath = "/dbtPowerUser-view";
  protected panelDescription = "";

  public constructor(
    protected dbtProjectContainer: DBTProjectContainer,
    protected altimateRequest: AltimateRequest,
    protected telemetry: TelemetryService,
    protected emitterService: SharedStateService,
    protected dbtTerminal: DBTTerminal,
    protected queryManifestService: QueryManifestService,
    protected usersService: UsersService,
  ) {
    super(
      dbtProjectContainer,
      altimateRequest,
      telemetry,
      emitterService,
      dbtTerminal,
      queryManifestService,
      usersService,
    );

    this._disposables.push(
      workspace.onDidChangeConfiguration(
        (e) => {
          if (e.affectsConfiguration("dbt.enableNewDbtPoweruserView")) {
            this.updateEnableNewDbtPoweruserViewInContext();
            if (this._panel) {
              this.renderWebviewView(this._panel.webview);
            }
          }
        },
        this,
        this._disposables,
      ),
    );
    this.updateEnableNewDbtPoweruserViewInContext();
  }

  private updateEnableNewDbtPoweruserViewInContext() {
    // Setting this here to access it in package.json for enabling new file command
    commands.executeCommand(
      "setContext",
      "dbt.enableNewDbtPoweruserView",
      workspace
        .getConfiguration("dbt")
        .get<boolean>("enableNewDbtPoweruserView", false),
    );
  }

  private getNodeTreeItem(node: Node): NodeTreeItem {
    if (node instanceof Snapshot) {
      return new SnapshotTreeItem(node);
    }
    if (node instanceof Exposure) {
      return new ExposureTreeItem(node);
    }
    if (node instanceof Analysis) {
      return new AnalysisTreeItem(node);
    }
    if (node instanceof Test) {
      return new TestTreeItem(node);
    }
    if (node instanceof Source) {
      return new SourceTreeItem(node);
    }
    if (node instanceof Seed) {
      return new SeedTreeItem(node);
    }
    return new ModelTreeItem(node);
  }

  private getTreeItems(
    treeType: keyof GraphMetaMap,
    elementKey?: string,
  ): NodeTreeItem[] {
    const eventResult = this.queryManifestService.getEventByCurrentProject();
    if (!eventResult?.event || !window.activeTextEditor) {
      return [];
    }
    const { graphMetaMap, project } = eventResult.event;
    const fileName = basename(
      window.activeTextEditor.document.fileName,
      ".sql",
    );
    const currentFilePath = window.activeTextEditor.document.uri;
    const packageName =
      this.dbtProjectContainer.getPackageName(currentFilePath) ||
      project.getProjectName();
    const elementName = elementKey || `model.${packageName}.${fileName}`;
    const parentModels = graphMetaMap[treeType].get(elementName);
    if (parentModels === undefined) {
      return [];
    }
    return parentModels.nodes
      .filter((node) => node.displayInModelTree)
      .map((node) => {
        const childNodes = graphMetaMap[treeType]
          .get(node.key)
          ?.nodes.filter((node) => node.displayInModelTree);

        const treeItem = this.getNodeTreeItem(node);
        treeItem.collapsibleState =
          childNodes?.length !== 0
            ? TreeItemCollapsibleState.Collapsed
            : TreeItemCollapsibleState.None;
        return treeItem;
      });
  }

  protected async handleCommand(message: HandleCommandProps): Promise<void> {
    const { command, syncRequestId, ...params } = message;
    switch (command) {
      case "getParentModels":
        this.sendResponseToWebview({
          command: "response",
          data: {
            parentModels: this.getTreeItems(
              params.treeType as keyof GraphMetaMap,
              params.elementKey as string,
            ),
          },
          syncRequestId,
        });
        break;

      default:
        break;
    }
  }
}
