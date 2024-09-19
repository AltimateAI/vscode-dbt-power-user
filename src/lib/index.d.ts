import { AltimateRequest } from "../dependencies.d.ts";
import { CancellationToken } from "vscode";
import { CommandProcessExecutionFactory } from "../../dependencies.d.ts";
import { DBTCommandExecutionInfrastructure } from "../dependencies.d.ts";
import { DBTCommandExecutionInfrastructure as DBTCommandExecutionInfrastructure_2 } from "../../dependencies.d.ts";
import { DBTProject } from "../../dependencies.d.ts";
import { DBTTerminal } from "../../dependencies.d.ts";
import { DBTTerminal as DBTTerminal_2 } from "../dependencies.d.ts";
import { Disposable as Disposable_2 } from "vscode";
import { Event as Event_2 } from "vscode";
import { FileChangeEvent } from "vscode";
import { FileStat } from "vscode";
import { FileSystemProvider } from "vscode";
import { FileType } from "vscode";
import { KernelConnection } from "@jupyterlab/services";
import { NotebookCell } from "vscode";
import { NotebookCellKind } from "vscode";
import { NotebookCellOutput } from "vscode";
import { NotebookData } from "vscode";
import { NotebookSerializer } from "vscode";
import { PythonEnvironment } from "../../dependencies.d.ts";
import { QueryManifestService } from "../dependencies.d.ts";
import { TelemetryService } from "../../dependencies.d.ts";
import { TelemetryService as TelemetryService_2 } from "../dependencies.d.ts";
import { Uri } from "vscode";

declare class ClientMapper {
  private executionInfrastructure;
  private notebookDependencies;
  private dbtTerminal;
  private clientMap;
  constructor(
    executionInfrastructure: DBTCommandExecutionInfrastructure,
    notebookDependencies: NotebookDependencies,
    dbtTerminal: DBTTerminal_2,
  );
  initializeNotebookClient(notebookUri: Uri): Promise<NotebookKernelClient>;
  getNotebookClient(notebookUri: Uri): Promise<NotebookKernelClient>;
}

declare interface ConnectionSettings {
  control_port: number;
  hb_port: number;
  iopub_port: number;
  ip: string;
  key: string;
  kernel_name: string;
  shell_port: number;
  signature_scheme: string;
  stdin_port: number;
  transport: string;
}

export declare const CustomNotebooks: {
  notebooks: PreconfiguredNotebookItem[];
};

export declare class DatapilotNotebookController implements Disposable_2 {
  private clientMapper;
  private queryManifestService;
  private telemetry;
  private dbtTerminal;
  private notebookDependencies;
  private altimate;
  private readonly id;
  private readonly label;
  private _onNotebookCellEvent;
  readonly onNotebookCellChangeEvent: Event_2<NotebookCellEvent>;
  private readonly disposables;
  private executionOrder;
  private untitledCounter;
  private readonly controller;
  constructor(
    clientMapper: ClientMapper,
    queryManifestService: QueryManifestService,
    telemetry: TelemetryService_2,
    dbtTerminal: DBTTerminal_2,
    notebookDependencies: NotebookDependencies,
    altimate: AltimateRequest,
  );
  private getNotebookByTemplate;
  modelTestSuggestions(args: any): Promise<void>;
  generateDbtSourceYaml(args: any): Promise<void>;
  generateDbtDbtModelSql(args: any): Promise<void>;
  generateDbtDbtModelYaml(args: any): Promise<void>;
  generateDbtDbtModelCTE(args: any): Promise<void>;
  extractExposuresFromMetabase(args: any): Promise<void>;
  extractExposuresFromTableau(args: any): Promise<void>;
  private getUntitledFileName;
  createNotebook(args: OpenNotebookRequest | undefined): Promise<void>;
  private sendMessageToPreloadScript;
  private getRandomString;
  private genUniqueId;
  private updateCellId;
  private onNotebookClose;
  private onNotebookOpen;
  dispose(): void;
  private _executeAll;
  private filterIPyWidgets;
  private updateContextVariablesInKernel;
  private _doExecution;
}

declare class DatapilotNotebookSerializer
  implements NotebookSerializer, Disposable_2
{
  dispose(): void;
  deserializeNotebook(
    content: Uint8Array,
    _token: CancellationToken,
  ): Promise<NotebookData>;
  serializeNotebook(
    data: NotebookData,
    _token: CancellationToken,
  ): Promise<Uint8Array>;
}

export declare interface IPyWidgetMessage {
  type: string;
  payload: any;
}

export declare interface NotebookCellEvent {
  cellId: string;
  notebook: string;
  result?: any;
  event: "add" | "update" | "delete";
  fragment?: string;
  languageId: string;
}

export declare interface NotebookCellSchema {
  source: string[];
  cell_type: NotebookCellKind;
  languageId: string;
  metadata?: Record<string, unknown>;
}

export declare class NotebookDependencies {
  private readonly dbtTerminal;
  private readonly telemetry;
  private commandProcessExecutionFactory;
  private pythonEnvironment;
  constructor(
    dbtTerminal: DBTTerminal,
    telemetry: TelemetryService,
    commandProcessExecutionFactory: CommandProcessExecutionFactory,
    pythonEnvironment: PythonEnvironment,
  );
  private checkPythonDependencies;
  private checkDbtDependencies;
  private installMissingPythonPackages;
  private installMissingDbtPackages;
  verifyAndInstallDependenciesIfNeeded(
    dependencies: NotebookDependency[],
    project: DBTProject,
  ): Promise<void>;
  getDependenciesVersion(): Promise<Record<string, string>>;
  validateAndInstallNotebookDependencies(): Promise<boolean | undefined>;
  private notebookDependenciesAreInstalled;
}

export declare interface NotebookDependency {
  type: "dbt" | "python";
  package: string;
  name?: string;
  version?: string;
}

declare class NotebookFileSystemProvider implements FileSystemProvider {
  private dbtTerminal;
  private altimate;
  private _emitter;
  readonly onDidChangeFile: Event_2<FileChangeEvent[]>;
  constructor(dbtTerminal: DBTTerminal_2, altimate: AltimateRequest);
  watch(
    _uri: Uri,
    _options: {
      recursive: boolean;
      excludes: string[];
    },
  ): Disposable_2;
  stat(_uri: Uri): FileStat;
  readDirectory(_uri: Uri): [string, FileType][];
  createDirectory(_uri: Uri): void;
  readFile(uri: Uri): Promise<Uint8Array>;
  writeFile(
    uri: Uri,
    content: Uint8Array,
    _options: {
      create: boolean;
      overwrite: boolean;
    },
  ): Promise<void>;
  delete(
    uri: Uri,
    _options: {
      recursive: boolean;
    },
  ): void;
  rename(
    oldUri: Uri,
    newUri: Uri,
    _options: {
      overwrite: boolean;
    },
  ): void;
  private getFileNameFromUri;
  private customSave;
  private saveNotebook;
}

export declare interface NotebookItem {
  id: number;
  name: string;
  data: NotebookSchema;
  description: string;
  created_on: string;
  updated_on: string;
  tags: {
    id: number;
    tag: string;
  }[];
  privacy: boolean;
}

export declare class NotebookKernelClient implements Disposable_2 {
  private executionInfrastructure;
  private notebookDependencies;
  private dbtTerminal;
  get postMessage(): Event_2<IPyWidgetMessage>;
  private _postMessageEmitter;
  private disposables;
  private lastUsedStreamOutput?;
  private static modelIdsOwnedByCells;
  private python;
  private kernel;
  private isInitializing;
  private readonly ownedCommIds;
  private readonly commIdsMappedToWidgetOutputModels;
  private readonly ownedRequestMsgIds;
  private commIdsMappedToParentWidgetModel;
  private streamsReAttachedToExecutingCell;
  private registerdCommTargets;
  private outputsAreSpecificToAWidget;
  private versions?;
  constructor(
    notebookPath: string,
    executionInfrastructure: DBTCommandExecutionInfrastructure_2,
    notebookDependencies: NotebookDependencies,
    dbtTerminal: DBTTerminal,
  );
  isInitialized(): Promise<unknown>;
  dispose(): Promise<void>;
  get jupyterPackagesVersions(): Record<string, string> | undefined;
  private getDependenciesVersion;
  getKernel(): Promise<RawKernelType | undefined>;
  private initializeNotebookKernel;
  onKernelSocketResponse(payload: { id: string }): void;
  storeContext(context: any): Promise<void>;
  storeDataInKernel(cellId: string, data: any): Promise<unknown>;
  registerCommTarget(payload: string): Promise<void>;
  getPythonCodeByType(type: string, cellId: string): Promise<string>;
  executePython(
    code: string,
    cell: NotebookCell,
    onOutput: (output: NotebookCellOutput) => void,
  ): Promise<NotebookCellOutput[] | undefined>;
  private handleUpdateDisplayDataMessage;
  private handleCommOpen;
  private handleCommMsg;
  private handleExecuteResult;
  private addToCellData;
  private canMimeTypeBeRenderedByWidgetManager;
  private handleExecuteInput;
  private handleStatusMessage;
  private handleStreamMessage;
  private handleDisplayData;
  private handleClearOutput;
  private handleError;
}

export declare class NotebookProviders implements Disposable_2 {
  private notebookProvider;
  private notebookController;
  private notebookFileSystemProvider;
  private dbtTerminal;
  private disposables;
  constructor(
    notebookProvider: DatapilotNotebookSerializer,
    notebookController: DatapilotNotebookController,
    notebookFileSystemProvider: NotebookFileSystemProvider,
    dbtTerminal: DBTTerminal_2,
  );
  private bindNotebookActions;
  dispose(): void;
}

export declare interface NotebookSchema {
  cells: NotebookCellSchema[];
  metadata?: Record<string, unknown>;
}

export declare class NotebookService implements Disposable_2 {
  private notebookKernel;
  private disposables;
  private cellByNotebookAutocompleteMap;
  constructor(notebookKernel: DatapilotNotebookController);
  dispose(): void;
  getCellByNotebookAutocompleteMap(): Map<
    string,
    {
      cellId: string;
      fragment: string;
      languageId: string;
    }[]
  >;
  private onNotebookCellChanged;
}

export declare interface OpenNotebookRequest {
  notebookId?: string;
  template?: string;
  context?: Record<string, unknown>;
  notebookSchema?: NotebookSchema;
}

export declare interface PreconfiguredNotebookItem {
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  id: string;
  tags: string[];
  data: NotebookSchema;
}

declare interface RawKernelType {
  realKernel: KernelConnection;
  socket: any;
  kernelProcess: {
    connection: ConnectionSettings;
    pid: number;
  };
}

export {};

export declare namespace Identifiers {
  const GeneratedThemeName = "ipython-theme";
  const MatplotLibDefaultParams = "_VSCode_defaultMatplotlib_Params";
  const MatplotLibFigureFormats = "_VSCode_matplotLib_FigureFormats";
  const DefaultCodeCellMarker = "# %%";
  const DefaultCommTarget = "jupyter.widget";
  const ALL_VARIABLES = "ALL_VARIABLES";
  const KERNEL_VARIABLES = "KERNEL_VARIABLES";
  const DEBUGGER_VARIABLES = "DEBUGGER_VARIABLES";
  const PYTHON_VARIABLES_REQUESTER = "PYTHON_VARIABLES_REQUESTER";
  const MULTIPLEXING_DEBUGSERVICE = "MULTIPLEXING_DEBUGSERVICE";
  const RUN_BY_LINE_DEBUGSERVICE = "RUN_BY_LINE_DEBUGSERVICE";
  const REMOTE_URI = "https://remote/";
  const REMOTE_URI_ID_PARAM = "id";
  const REMOTE_URI_HANDLE_PARAM = "uriHandle";
  const REMOTE_URI_EXTENSION_ID_PARAM = "extensionId";
}
