import {
  AltimateRequest,
  CommandProcessExecutionFactory,
  DBTCommandExecutionInfrastructure,
  DBTProject,
  DBTTerminal,
  PythonEnvironment,
  QueryExecutionResult,
  QueryManifestService,
  TelemetryService,
} from "@extension";
import { KernelConnection } from "@jupyterlab/services";
import * as vscode from "vscode";
import {
  CancellationToken,
  Disposable,
  Event,
  FileChangeEvent,
  FileStat,
  FileSystemProvider,
  FileType,
  NotebookCell,
  NotebookCellKind,
  NotebookCellOutput,
  NotebookData,
  NotebookSerializer,
  Uri,
} from "vscode";

declare class DatapilotNotebookSerializer
  implements NotebookSerializer, Disposable
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

interface NotebookItem {
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
interface NotebookSchema {
  cells: NotebookCellSchema[];
  metadata?: Record<string, unknown>;
}
interface NotebookCellSchema {
  source: string[];
  cell_type: NotebookCellKind;
  languageId: string;
  metadata?: Record<string, unknown>;
  outputs?: NotebookCellOutput[];
}
interface PreconfiguredNotebookItem {
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  id: string;
  tags: string[];
  data: NotebookSchema;
}
interface NotebookCellEvent {
  cellId: string;
  notebook: string;
  result?: Record<string, unknown>;
  event: "add" | "update" | "delete";
  fragment?: string;
  languageId: string;
}
interface OpenNotebookRequest {
  notebookId?: string;
  template?: string;
  context?: Record<string, unknown>;
  notebookSchema?: NotebookSchema;
}
interface NotebookDependency {
  type: "dbt" | "python";
  package: string;
  name?: string;
  version?: string;
}

declare class NotebookDependencies {
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

interface ConnectionSettings {
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
interface RawKernelType {
  realKernel: KernelConnection;
  socket: WebSocket;
  kernelProcess: {
    connection: ConnectionSettings;
    pid: number;
  };
}

interface WidgetPayload {
  [key: string]: unknown;
}
interface IPyWidgetMessage {
  type: string;
  payload: WidgetPayload;
}
interface NotebookContext {
  [key: string]: unknown;
}
declare class NotebookKernelClient implements Disposable {
  private executionInfrastructure;
  private notebookDependencies;
  private dbtTerminal;
  get postMessage(): Event<IPyWidgetMessage>;
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
    executionInfrastructure: DBTCommandExecutionInfrastructure,
    notebookDependencies: NotebookDependencies,
    dbtTerminal: DBTTerminal,
  );
  isInitialized(): Promise<boolean>;
  dispose(): Promise<void>;
  get jupyterPackagesVersions(): Record<string, string> | undefined;
  private getDependenciesVersion;
  getKernel(): Promise<RawKernelType | undefined>;
  private initializeNotebookKernel;
  onKernelSocketResponse(payload: { id: string }): void;
  storeContext(context: NotebookContext): Promise<void>;
  storeDataInKernel(cellId: string, data: unknown): Promise<boolean>;
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

declare class ClientMapper {
  private executionInfrastructure;
  private notebookDependencies;
  private dbtTerminal;
  private clientMap;
  constructor(
    executionInfrastructure: DBTCommandExecutionInfrastructure,
    notebookDependencies: NotebookDependencies,
    dbtTerminal: DBTTerminal,
  );
  initializeNotebookClient(notebookUri: Uri): Promise<NotebookKernelClient>;
  getNotebookClient(notebookUri: Uri): Promise<NotebookKernelClient>;
}

interface ModelTestArgs {
  model: string;
  tests?: string[];
}
interface DbtSourceYamlArgs {
  source: string;
  schema?: string;
  database?: string;
}
interface DbtModelArgs {
  model: string;
  schema?: string;
  database?: string;
  description?: string;
}
interface ExposureArgs {
  connection: string;
  project?: string;
}
declare class DatapilotNotebookController implements Disposable {
  private clientMapper;
  private queryManifestService;
  private telemetry;
  private dbtTerminal;
  private notebookDependencies;
  private altimate;
  private readonly id;
  private readonly label;
  private _onNotebookCellEvent;
  readonly onNotebookCellChangeEvent: vscode.Event<NotebookCellEvent>;
  private readonly disposables;
  private associatedNotebooks;
  private executionOrder;
  private readonly controller;
  constructor(
    clientMapper: ClientMapper,
    queryManifestService: QueryManifestService,
    telemetry: TelemetryService,
    dbtTerminal: DBTTerminal,
    notebookDependencies: NotebookDependencies,
    altimate: AltimateRequest,
  );
  private getNotebookByTemplate;
  modelTestSuggestions(args: ModelTestArgs): Promise<void>;
  generateDbtSourceYaml(args: DbtSourceYamlArgs): Promise<void>;
  generateDbtDbtModelSql(args: DbtModelArgs): Promise<void>;
  generateDbtDbtModelYaml(args: DbtModelArgs): Promise<void>;
  generateDbtDbtModelCTE(args: DbtModelArgs): Promise<void>;
  extractExposuresFromMetabase(args: ExposureArgs): Promise<void>;
  extractExposuresFromTableau(args: ExposureArgs): Promise<void>;
  private getFileName;
  createNotebook(args: OpenNotebookRequest | undefined): Promise<void>;
  private sendMessageToPreloadScript;
  private getRandomString;
  private genUniqueId;
  private updateCellId;
  private onNotebookClose;
  private onDidChangeSelectedNotebooks;
  private onNotebookOpen;
  private waitForControllerAssociation;
  private isControllerAssociatedWithNotebook;
  dispose(): void;
  private _executeAll;
  private filterIPyWidgets;
  private updateContextVariablesInKernel;
  private _doExecution;
}

declare class NotebookFileSystemProvider implements FileSystemProvider {
  private dbtTerminal;
  private altimate;
  private _emitter;
  readonly onDidChangeFile: Event<FileChangeEvent[]>;
  private notebookDataMap;
  constructor(dbtTerminal: DBTTerminal, altimate: AltimateRequest);
  watch(
    _uri: Uri,
    _options: {
      recursive: boolean;
      excludes: string[];
    },
  ): Disposable;
  stat(_uri: Uri): FileStat;
  readDirectory(_uri: Uri): [string, FileType][];
  createDirectory(_uri: Uri): void;
  private getNotebookData;
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

declare class NotebookService implements Disposable {
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

declare const CustomNotebooks: {
  notebooks: PreconfiguredNotebookItem[];
};

declare class NotebookProviders implements Disposable {
  private notebookProvider;
  private notebookController;
  private notebookFileSystemProvider;
  private dbtTerminal;
  private disposables;
  constructor(
    notebookProvider: DatapilotNotebookSerializer,
    notebookController: DatapilotNotebookController,
    notebookFileSystemProvider: NotebookFileSystemProvider,
    dbtTerminal: DBTTerminal,
  );
  private bindNotebookActions;
  dispose(): void;
}

interface DBColumn {
  column: string;
  dtype: string;
}
interface ColumnConfig$1 {
  name: string;
  tests: string[];
  description?: string;
  [key: string]: string | string[] | undefined;
}
interface Model {
  name: string;
  columns: ColumnConfig$1[];
  tests?: Array<{
    [key: string]: unknown;
  }>;
}
interface DbtConfig {
  [key: string]: Model[];
}
type QueryFn = (query: string) => Promise<QueryExecutionResult | undefined>;

interface ColumnConfig {
  tests?: string[];
  description?: string;
  [key: string]: unknown;
}
interface Props {
  tableRelation: string;
  sample?: boolean;
  limit?: number;
  resourceType?: string;
  columnConfig?: Record<string, ColumnConfig>;
  excludeTypes?: string[];
  excludeCols?: string[];
  tests?: (
    | "uniqueness"
    | "accepted_values"
    | "range"
    | "string_length"
    | "recency"
  )[];
  uniquenessCompositeKeyLength?: number;
  acceptedValuesMaxCardinality?: number;
  rangeStddevs?: number;
  stringLengthStddevs?: number;
  recencyStddevs?: number;
  dbtConfig?: DbtConfig;
  returnObject?: boolean;
  columnsInRelation: DBColumn[];
  adapter: string;
  queryFn: QueryFn;
}
declare const getTestSuggestions: ({
  tableRelation,
  sample,
  limit,
  resourceType,
  columnConfig,
  excludeTypes,
  excludeCols,
  tests,
  uniquenessCompositeKeyLength,
  acceptedValuesMaxCardinality,
  rangeStddevs,
  stringLengthStddevs,
  recencyStddevs,
  dbtConfig,
  returnObject,
  columnsInRelation,
  adapter,
  queryFn,
}: Props) => Promise<DbtConfig | undefined>;

export {
  CustomNotebooks,
  DatapilotNotebookController,
  type DbtConfig,
  type IPyWidgetMessage,
  type Model,
  type NotebookCellEvent,
  type NotebookCellSchema,
  NotebookDependencies,
  type NotebookDependency,
  NotebookFileSystemProvider,
  type NotebookItem,
  NotebookKernelClient,
  NotebookProviders,
  type NotebookSchema,
  NotebookService,
  type OpenNotebookRequest,
  type PreconfiguredNotebookItem,
  getTestSuggestions,
};
