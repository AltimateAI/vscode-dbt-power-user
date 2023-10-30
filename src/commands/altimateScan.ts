import { ProgressLocation, commands, window } from "vscode";
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
import { FreeAltimateScanAgent } from "./agent/freeAltimateScanAgent";

const offlineAltimateScanSteps = [
  // check for missing schemas i.e. undocumented models
  new MissingSchemaTest(),
  // then check for duplicate sources
  // TODO
  // feel free to add more tests
];

// online tests rely on a connection to database
const onlineAltimateScanSteps = [
  // check for unmaterialized models
  new UnmaterializedModelTest(),
  // then check for undocumented models columns
  new UndocumentedModelColumnTest(),
  // then check for stale columns in models
  new StaleModelColumnTest(),
  // feel free to add more tests
];

//TODO
// altimate tests rely on an altimate account. these are assumed to be online as well.
const altimateScanSteps = [];

@provideSingleton(AltimateScan)
export class AltimateScan {
  private eventMap: Map<string, ManifestCacheProjectAddedEvent> = new Map();
  constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private telemetry: TelemetryService,
    private altimate: AltimateRequest,
  ) {
    dbtProjectContainer.onManifestChanged((event) =>
      this.onManifestCacheChanged(event),
    );
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
        cancellable: false,
      },
      async () => {
        const projects = this.dbtProjectContainer.findAllDBTProjects();
        for (const project of projects) {
          const agent = new FreeAltimateScanAgent(
            project,
            this.eventMap.get(project.projectRoot.fsPath),
          );

          // run all the offline steps first, no need to get the catalog yet
          for (const step of offlineAltimateScanSteps) {
            step.run(agent);
          }
          // get catalog before continuing to online steps
          await new InitCatalog().run(agent);
          for (const step of onlineAltimateScanSteps) {
            step.run(agent);
          }
          totalProblems += agent.showDiagnostics();
        }
        // we can select problem tab as soon as the first project is done maybe
        await commands.executeCommand("workbench.actions.view.problems");
        this.telemetry.sendTelemetryEvent("altimateScan:Done", {
          problemsFound: totalProblems.toString(),
        });
      },
    );
  }
}
