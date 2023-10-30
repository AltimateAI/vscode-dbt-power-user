import { ProgressLocation, Uri, commands, window } from "vscode";
import { AltimateRequest } from "../altimate";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import {
  ManifestCacheChangedEvent,
  ManifestCacheProjectAddedEvent,
} from "../manifest/event/manifestCacheChangedEvent";
import { TelemetryService } from "../telemetry";
import { provideSingleton } from "../utils";
import { InitCatalog } from "./tests/initCatalog";
import { UndocumentedModelColumnTest } from "./tests/undocumentedModelColumnTest";
import { StaleModelColumnTest } from "./tests/staleModelColumnTest";
import { MissingSchemaTest } from "./tests/missingSchemaTest";
import { UnmaterializedModelTest } from "./tests/unmaterializedModelTest";
import { ScanContext } from "./tests/scanContext";
import { AltimateScanStep } from "./tests/step";

@provideSingleton(AltimateScan)
export class AltimateScan {
  private eventMap: Map<string, ManifestCacheProjectAddedEvent> = new Map();
  private offlineAltimateScanSteps: AltimateScanStep[];
  private onlineAltimateScanSteps: AltimateScanStep[];
  private altimateScanSteps: AltimateScanStep[];

  constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private telemetry: TelemetryService,
    private altimate: AltimateRequest,
    private missingSchemaTest: MissingSchemaTest,
    private undocumentedModelColumnTest: UndocumentedModelColumnTest,
    private unmaterializedModelTest: UnmaterializedModelTest,
    private staleModelColumnTest: StaleModelColumnTest,
  ) {
    dbtProjectContainer.onManifestChanged((event) =>
      this.onManifestCacheChanged(event),
    );

    this.offlineAltimateScanSteps = [missingSchemaTest];

    // online tests rely on a connection to database
    this.onlineAltimateScanSteps = [
      unmaterializedModelTest,
      undocumentedModelColumnTest,
      staleModelColumnTest,
      // feel free to add more tests
    ];

    //TODO
    // altimate tests rely on an altimate account. these are assumed to be online as well.
    this.altimateScanSteps = [];
  }

  private async onManifestCacheChanged(event: ManifestCacheChangedEvent) {
    event.added?.forEach((added) => {
      this.eventMap.set(added.projectRoot.fsPath, added);
    });
    event.removed?.forEach((removed) => {
      this.eventMap.delete(removed.projectRoot.fsPath);
    });
  }

  async clearProblems() {
    this.telemetry.sendTelemetryEvent("altimateScan:Clear");
    window.withProgress(
      {
        location: ProgressLocation.Notification,
        title: "Clearing problems...",
        cancellable: false,
      },
      async () => {
        const projects = this.dbtProjectContainer.findAllDBTProjects();
        for (const project of projects) {
          project.projectHealth.clear();
        }
      },
    );
  }

  async getProblems() {
    this.telemetry.sendTelemetryEvent("altimateScan:Start");
    let totalProblems: number = 0;
    window.withProgress(
      {
        location: ProgressLocation.Notification,
        title: "Scanning for problems...",
        cancellable: true,
      },
      async () => {
        const projects = this.dbtProjectContainer.findAllDBTProjects();
        for (const project of projects) {
          try {
            const scanContext: ScanContext = new ScanContext(
              project,
              this.eventMap.get(project.projectRoot.fsPath),
            );
            await this.runSteps(scanContext);
            totalProblems += this.showDiagnostics(scanContext);
          } catch (err) {
            console.log(err);
          }
        }
        // we can select problem tab as soon as the first project is done maybe
        await commands.executeCommand("workbench.actions.view.problems");
        this.telemetry.sendTelemetryEvent("altimateScan:Done", {
          problemsFound: totalProblems.toString(),
        });
      },
    );
  }

  async runSteps(scanContext: ScanContext) {
    // run all the offline steps first, no need to get the catalog yet
    for (const stepof of this.offlineAltimateScanSteps) {
      stepof.run(scanContext);
    }
    // get catalog before continuing to online steps
    await this.initCatalog(scanContext);
    for (const stepon of this.onlineAltimateScanSteps) {
      stepon.run(scanContext);
    }
  }

  public async initCatalog(scanContext: ScanContext): Promise<void> {
    if (scanContext === undefined) {
      throw new Error("Scan Context has not been set");
    }

    const projectCatalog = await new InitCatalog().run(scanContext);
    scanContext.catalog[
      scanContext.project.getProjectName() + scanContext.project.projectRoot
    ] = projectCatalog;
  }

  showDiagnostics(scanContext: ScanContext) {
    if (scanContext === undefined) {
      throw new Error("Scan Context has not been set");
    }
    scanContext.project.projectHealth.clear();
    let totalProblems = 0;
    for (const [filePath, fileDiagnostics] of Object.entries(
      scanContext.diagnostics,
    )) {
      scanContext.project.projectHealth.set(
        Uri.file(filePath),
        fileDiagnostics,
      );
      totalProblems += fileDiagnostics.length;
    }
    return totalProblems;
  }
}
