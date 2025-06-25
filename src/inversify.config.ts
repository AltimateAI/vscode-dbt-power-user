import { Container, interfaces } from "inversify";
import { buildProviderModule } from "inversify-binding-decorators";
import { EventEmitter, Uri, workspace, WorkspaceFolder } from "vscode";
import { VSCodeDBTTerminal } from "./dbt_client/vscodeTerminal";
import { DBTDiagnosticData } from "./dbt_client/diagnostics";
import { DBTProject, DeferConfig } from "./manifest/dbtProject";
import {
  DBTProjectContainer,
  ProjectRegisteredUnregisteredEvent,
} from "./manifest/dbtProjectContainer";
import { DBTWorkspaceFolder } from "./manifest/dbtWorkspaceFolder";
import { ManifestCacheChangedEvent } from "./manifest/event/manifestCacheChangedEvent";
import { DBTProjectLogFactory } from "./manifest/modules/dbtProjectLog";
import { SourceFileWatchersFactory } from "./manifest/modules/sourceFileWatchers";
import { TargetWatchersFactory } from "./manifest/modules/targetWatchers";
import { PythonEnvironment } from "./manifest/pythonEnvironment";
import { TelemetryService } from "./telemetry";
import {
  DBTCoreDetection,
  DBTCoreProjectDetection,
  DBTCoreProjectIntegration,
} from "./dbt_client/dbtCoreIntegration";
import {
  CLIDBTCommandExecutionStrategy,
  DBTCommandExecutionInfrastructure,
  DBTCommandExecutionStrategy,
  DBTCommandFactory,
  DBTDetection,
  DBTProjectDetection,
  PythonDBTCommandExecutionStrategy,
} from "./dbt_client/dbtIntegration";
import {
  DBTCloudDetection,
  DBTCloudProjectDetection,
  DBTCloudProjectIntegration,
} from "./dbt_client/dbtCloudIntegration";
import { CommandProcessExecutionFactory } from "./commandProcessExecution";
import { AltimateRequest } from "./altimate";
import { ValidationProvider } from "./validation_provider";
import { DBTConfiguration } from "./dbt_client/configuration";
import { VSCodeDBTConfiguration } from "./dbt_client/vscodeConfiguration";
import { DeferToProdService } from "./services/deferToProdService";
import { SharedStateService } from "./services/sharedStateService";
import { NotebookKernelClient, NotebookDependencies } from "@lib";
import {
  DBTCoreCommandDetection,
  DBTCoreCommandProjectDetection,
  DBTCoreCommandProjectIntegration,
} from "./dbt_client/dbtCoreCommandIntegration";
import {
  DBTFusionCommandDetection,
  DBTFusionCommandProjectDetection,
  DBTFusionCommandProjectIntegration,
} from "./dbt_client/dbtFusionCommandIntegration";
import { DBTTerminal } from "./dbt_client/terminal";

export const container = new Container();
container.load(buildProviderModule());

// Bind core dbt integration classes using factory functions
container
  .bind(CLIDBTCommandExecutionStrategy)
  .toDynamicValue(() => {
    // Note: CLIDBTCommandExecutionStrategy requires projectRoot and dbtPath at construction time
    // These will be provided by the factory functions that create instances
    throw new Error(
      "CLIDBTCommandExecutionStrategy should be created via Factory<CLIDBTCommandExecutionStrategy>",
    );
  })
  .inSingletonScope();

container
  .bind(PythonDBTCommandExecutionStrategy)
  .toDynamicValue((context) => {
    return new PythonDBTCommandExecutionStrategy(
      context.container.get(CommandProcessExecutionFactory),
      context.container.get(PythonEnvironment),
      context.container.get("DBTTerminal"),
      context.container.get(TelemetryService),
      context.container.get("DBTConfiguration"),
    );
  })
  .inSingletonScope();

container.bind(DBTCommandExecutionInfrastructure).toDynamicValue((context) => {
  return new DBTCommandExecutionInfrastructure(
    context.container.get(PythonEnvironment),
    context.container.get("DBTTerminal"),
  );
});

container
  .bind(DBTCommandFactory)
  .toDynamicValue((context) => {
    return new DBTCommandFactory(context.container.get("DBTConfiguration"));
  })
  .inSingletonScope();

// Bind dbt core integration classes using factory functions
container
  .bind(DBTCoreDetection)
  .toDynamicValue((context) => {
    return new DBTCoreDetection(
      context.container.get(PythonEnvironment),
      context.container.get(CommandProcessExecutionFactory),
    );
  })
  .inSingletonScope();

container
  .bind(DBTCoreProjectDetection)
  .toDynamicValue((context) => {
    return new DBTCoreProjectDetection(
      context.container.get(DBTCommandExecutionInfrastructure),
      context.container.get("DBTTerminal"),
    );
  })
  .inSingletonScope();

// Note: DBTCoreProjectIntegration requires projectRoot at construction time
// It will be created via Factory<DBTCoreProjectIntegration>
container
  .bind(DBTCoreProjectIntegration)
  .toDynamicValue(() => {
    throw new Error(
      "DBTCoreProjectIntegration should be created via Factory<DBTCoreProjectIntegration>",
    );
  })
  .inSingletonScope();

// Bind dbt cloud integration classes using factory functions
container
  .bind(DBTCloudDetection)
  .toDynamicValue((context) => {
    return new DBTCloudDetection(
      context.container.get(CommandProcessExecutionFactory),
      context.container.get(PythonEnvironment),
      context.container.get("DBTTerminal"),
    );
  })
  .inSingletonScope();

container
  .bind(DBTCloudProjectDetection)
  .toDynamicValue((context) => {
    return new DBTCloudProjectDetection(context.container.get(AltimateRequest));
  })
  .inSingletonScope();

// Note: DBTCloudProjectIntegration requires projectRoot at construction time
// It will be created via Factory<DBTCloudProjectIntegration>
container
  .bind(DBTCloudProjectIntegration)
  .toDynamicValue(() => {
    throw new Error(
      "DBTCloudProjectIntegration should be created via Factory<DBTCloudProjectIntegration>",
    );
  })
  .inSingletonScope();

// Bind dbt fusion integration classes using factory functions
container
  .bind(DBTFusionCommandDetection)
  .toDynamicValue((context) => {
    return new DBTFusionCommandDetection(
      context.container.get(CommandProcessExecutionFactory),
      context.container.get(PythonEnvironment),
      context.container.get("DBTTerminal"),
    );
  })
  .inSingletonScope();

container
  .bind(DBTFusionCommandProjectDetection)
  .toDynamicValue(() => {
    return new DBTFusionCommandProjectDetection();
  })
  .inSingletonScope();

// Note: DBTFusionCommandProjectIntegration requires projectRoot at construction time
// It will be created via Factory<DBTFusionCommandProjectIntegration>
container
  .bind(DBTFusionCommandProjectIntegration)
  .toDynamicValue(() => {
    throw new Error(
      "DBTFusionCommandProjectIntegration should be created via Factory<DBTFusionCommandProjectIntegration>",
    );
  })
  .inSingletonScope();

// Bind dbt core command integration classes using factory functions
container
  .bind(DBTCoreCommandDetection)
  .toDynamicValue((context) => {
    return new DBTCoreCommandDetection(
      context.container.get(PythonEnvironment),
      context.container.get(CommandProcessExecutionFactory),
    );
  })
  .inSingletonScope();

container
  .bind(DBTCoreCommandProjectDetection)
  .toDynamicValue((context) => {
    return new DBTCoreCommandProjectDetection(
      context.container.get(DBTCommandExecutionInfrastructure),
      context.container.get("DBTTerminal"),
    );
  })
  .inSingletonScope();

// Note: DBTCoreCommandProjectIntegration requires projectRoot at construction time
// It will be created via Factory<DBTCoreCommandProjectIntegration>
container
  .bind(DBTCoreCommandProjectIntegration)
  .toDynamicValue(() => {
    throw new Error(
      "DBTCoreCommandProjectIntegration should be created via Factory<DBTCoreCommandProjectIntegration>",
    );
  })
  .inSingletonScope();

// Bind DBTConfiguration
container
  .bind<DBTConfiguration>("DBTConfiguration")
  .to(VSCodeDBTConfiguration)
  .inSingletonScope();

// Bind DBTTerminal
container
  .bind<DBTTerminal>("DBTTerminal")
  .to(VSCodeDBTTerminal)
  .inSingletonScope();

container
  .bind<interfaces.Factory<DBTDetection>>("Factory<DBTDetection>")
  .toFactory<DBTDetection, []>((context: interfaces.Context) => {
    return () => {
      const { container } = context;
      const dbtIntegrationMode = workspace
        .getConfiguration("dbt")
        .get<string>("dbtIntegration", "core");

      switch (dbtIntegrationMode) {
        case "cloud":
          return container.get(DBTCloudDetection);
        case "fusion":
          return container.get(DBTFusionCommandDetection);
        default:
          return container.get(DBTCoreDetection);
      }
    };
  });

container
  .bind<interfaces.Factory<DBTProjectDetection>>("Factory<DBTProjectDetection>")
  .toFactory<DBTProjectDetection, []>((context: interfaces.Context) => {
    return () => {
      const { container } = context;
      const dbtIntegrationMode = workspace
        .getConfiguration("dbt")
        .get<string>("dbtIntegration", "core");

      switch (dbtIntegrationMode) {
        case "cloud":
          return container.get(DBTCloudProjectDetection);
        case "fusion":
          return container.get(DBTFusionCommandProjectDetection);
        default:
          return container.get(DBTCoreProjectDetection);
      }
    };
  });

container
  .bind<interfaces.Factory<DBTWorkspaceFolder>>("Factory<DBTWorkspaceFolder>")
  .toFactory<
    DBTWorkspaceFolder,
    [
      WorkspaceFolder,
      EventEmitter<ManifestCacheChangedEvent>,
      EventEmitter<ProjectRegisteredUnregisteredEvent>,
    ]
  >((context: interfaces.Context) => {
    return (
      workspaceFolder: WorkspaceFolder,
      _onManifestChanged: EventEmitter<ManifestCacheChangedEvent>,
      _onProjectRegisteredUnregistered: EventEmitter<ProjectRegisteredUnregisteredEvent>,
    ) => {
      const { container } = context;
      return new DBTWorkspaceFolder(
        container.get("Factory<DBTProject>"),
        container.get("Factory<DBTProjectDetection>"),
        container.get(TelemetryService),
        container.get("DBTTerminal"),
        workspaceFolder,
        _onManifestChanged,
        _onProjectRegisteredUnregistered,
      );
    };
  });

container
  .bind<
    interfaces.Factory<DBTCommandExecutionStrategy>
  >("Factory<CLIDBTCommandExecutionStrategy>")
  .toFactory<
    CLIDBTCommandExecutionStrategy,
    [string, string]
  >((context: interfaces.Context) => {
    return (projectRoot: string, dbtPath: string) => {
      const { container } = context;
      return new CLIDBTCommandExecutionStrategy(
        container.get(CommandProcessExecutionFactory),
        container.get(PythonEnvironment),
        container.get("DBTTerminal"),
        container.get(TelemetryService),
        projectRoot,
        dbtPath,
      );
    };
  });

container
  .bind<
    interfaces.Factory<DBTCoreProjectIntegration>
  >("Factory<DBTCoreProjectIntegration>")
  .toFactory<
    DBTCoreProjectIntegration,
    [string, DBTDiagnosticData[], DeferConfig | undefined]
  >((context: interfaces.Context) => {
    return (
      projectRoot: string,
      projectConfigDiagnostics: DBTDiagnosticData[],
      deferConfig: DeferConfig | undefined,
    ) => {
      const { container } = context;
      return new DBTCoreProjectIntegration(
        container.get(DBTCommandExecutionInfrastructure),
        container.get(PythonEnvironment),
        container.get(TelemetryService),
        container.get(PythonDBTCommandExecutionStrategy),
        container.get("Factory<CLIDBTCommandExecutionStrategy>"),
        container.get(DBTProjectContainer),
        container.get(AltimateRequest),
        container.get("DBTTerminal"),
        container.get(ValidationProvider),
        container.get(DeferToProdService),
        projectRoot,
        projectConfigDiagnostics,
        deferConfig,
      );
    };
  });

container
  .bind<
    interfaces.Factory<DBTCoreProjectIntegration>
  >("Factory<DBTCoreCommandProjectIntegration>")
  .toFactory<
    DBTCoreCommandProjectIntegration,
    [string, DBTDiagnosticData[], DeferConfig]
  >((context: interfaces.Context) => {
    return (
      projectRoot: string,
      projectConfigDiagnostics: DBTDiagnosticData[],
      deferConfig: DeferConfig,
    ) => {
      const { container } = context;
      return new DBTCoreCommandProjectIntegration(
        container.get(DBTCommandExecutionInfrastructure),
        container.get(PythonEnvironment),
        container.get(TelemetryService),
        container.get(PythonDBTCommandExecutionStrategy),
        container.get("Factory<CLIDBTCommandExecutionStrategy>"),
        container.get(DBTProjectContainer),
        container.get(AltimateRequest),
        container.get("DBTTerminal"),
        container.get(ValidationProvider),
        container.get(DeferToProdService),
        projectRoot,
        projectConfigDiagnostics,
        deferConfig,
      );
    };
  });

container
  .bind<
    interfaces.Factory<DBTCoreProjectIntegration>
  >("Factory<DBTFusionCommandProjectIntegration>")
  .toFactory<
    DBTFusionCommandProjectIntegration,
    [string, DeferConfig]
  >((context: interfaces.Context) => {
    return (projectRoot: string, deferConfig: DeferConfig) => {
      const { container } = context;
      return new DBTFusionCommandProjectIntegration(
        container.get(DBTCommandExecutionInfrastructure),
        container.get(DBTCommandFactory),
        container.get("Factory<CLIDBTCommandExecutionStrategy>"),
        container.get(TelemetryService),
        container.get(PythonEnvironment),
        container.get("DBTTerminal"),
        container.get(ValidationProvider),
        container.get(DeferToProdService),
        projectRoot,
        deferConfig,
      );
    };
  });

container
  .bind<
    interfaces.Factory<DBTCloudProjectIntegration>
  >("Factory<DBTCloudProjectIntegration>")
  .toFactory<
    DBTCloudProjectIntegration,
    [Uri, DeferConfig]
  >((context: interfaces.Context) => {
    return (projectRoot: Uri, deferConfig: DeferConfig) => {
      const { container } = context;
      return new DBTCloudProjectIntegration(
        container.get(DBTCommandExecutionInfrastructure),
        container.get(DBTCommandFactory),
        container.get("Factory<CLIDBTCommandExecutionStrategy>"),
        container.get(TelemetryService),
        container.get(PythonEnvironment),
        container.get("DBTTerminal"),
        container.get(ValidationProvider),
        container.get(DeferToProdService),
        projectRoot.fsPath,
        deferConfig,
      );
    };
  });

container
  .bind<interfaces.Factory<DBTProject>>("Factory<DBTProject>")
  .toFactory<
    DBTProject,
    [Uri, any, EventEmitter<ManifestCacheChangedEvent>]
  >((context: interfaces.Context) => {
    return (
      path: Uri,
      projectConfig: any,
      _onManifestChanged: EventEmitter<ManifestCacheChangedEvent>,
    ) => {
      const { container } = context;
      return new DBTProject(
        container.get(PythonEnvironment),
        container.get(SourceFileWatchersFactory),
        container.get(DBTProjectLogFactory),
        container.get(TargetWatchersFactory),
        container.get(DBTCommandFactory),
        container.get("DBTTerminal"),
        container.get(SharedStateService),
        container.get(TelemetryService),
        container.get(DBTCommandExecutionInfrastructure),
        container.get("Factory<DBTCoreProjectIntegration>"),
        container.get("Factory<DBTCoreCommandProjectIntegration>"),
        container.get("Factory<DBTCloudProjectIntegration>"),
        container.get("Factory<DBTFusionCommandProjectIntegration>"),
        container.get(AltimateRequest),
        container.get(ValidationProvider),
        container.get(DeferToProdService),
        path,
        projectConfig,
        _onManifestChanged,
      );
    };
  });

container
  .bind<interfaces.Factory<NotebookKernelClient>>("Factory<NotebookClient>")
  .toFactory<NotebookKernelClient, [string]>((context: interfaces.Context) => {
    return (path: string) => {
      const { container } = context;
      return new NotebookKernelClient(
        path,
        container.get(DBTCommandExecutionInfrastructure),
        container.get(NotebookDependencies),
        container.get("DBTTerminal"),
      );
    };
  });
