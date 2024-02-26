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
import { DBTTerminal } from "../dbt_client/dbtTerminal";

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
    private dbtTerminal: DBTTerminal,
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
      this.eventMap.set(added.project.projectRoot.fsPath, added);
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
        const projects = this.dbtProjectContainer.getProjects();
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
        const projects = this.dbtProjectContainer.getProjects();
        for (const project of projects) {
          try {
            const scanContext: ScanContext = new ScanContext(
              project,
              this.eventMap.get(project.projectRoot.fsPath),
            );
            await this.runSteps(scanContext);
            totalProblems += this.showDiagnostics(scanContext);
          } catch (err) {
            this.dbtTerminal.debug(
              "altimateScane:getProblems",
              `Error occurred for ${project.getProjectName()}`,
              err,
            );
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
    await Promise.all(
      this.offlineAltimateScanSteps.map(
        async (stepof) => await stepof.run(scanContext),
      ),
    );

    // get catalog before continuing to online steps
    // errors are caught on python side and returned as a catalog with 0 length
    // telemetry is sent from dbtproject.ts if there is an error
    await this.initCatalog(scanContext);
    // if there was some error in getting the catalog, we dont get anything back.
    // stop the remaining tests in that case.
    if (
      scanContext.scanResults["missingCatalog"] !== undefined &&
      scanContext.scanResults["missingCatalog"][
        scanContext.project.getProjectName() + scanContext.project.projectRoot
      ] === true
    ) {
      return;
    }
    await Promise.all(
      this.onlineAltimateScanSteps.map(
        async (stepon) => await stepon.run(scanContext),
      ),
    );
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
