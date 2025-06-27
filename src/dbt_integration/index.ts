// ===== DOMAIN TYPES & INTERFACES =====
// Core domain types, constants, and utility functions
export {
  // Type aliases and maps
  type MacroMetaMap,
  type MetricMetaMap,
  type SourceMetaMap,
  type TestMetaMap,
  type ExposureMetaMap,
  type DocMetaMap,
  type NodeMetaType,
  type SourceMetaType,
  type NodeGraphMap,
  type ModelGraphMetaMap,
  type DBColumn,
  type Node,
  type SourceNode,
  type DBTNode,
  type Catalog,
  type Table,

  // Core interfaces
  ParsedManifest,
  RunResultsData,
  RunResultsEventData,
  type DataPilotHealtCheckParams,
  NodeMetaMap,
  MacroMetaData,
  NodeMetaData,
  ColumnMetaData,
  SourceMetaData,
  SourceTable,
  TestMetaData,
  TestMetadataAcceptedValues,
  TestMetadataRelationships,
  ExposureMetaData,
  NodeData,
  GraphMetaMap,
  DBTCommandExecution,
  EnvironmentVariables,
  DeferConfig,
  RunModelParams,
  HealthcheckArgs,

  // Enums
  RunModelType,
  ManifestPathType,

  // Constants
  DBT_PROJECT_FILE,
  MANIFEST_FILE,
  RUN_RESULTS_FILE,
  CATALOG_FILE,
  RESOURCE_TYPE_MODEL,
  RESOURCE_TYPE_MACRO,
  RESOURCE_TYPE_ANALYSIS,
  RESOURCE_TYPE_SOURCE,
  RESOURCE_TYPE_EXPOSURE,
  RESOURCE_TYPE_SEED,
  RESOURCE_TYPE_SNAPSHOT,
  RESOURCE_TYPE_TEST,
  RESOURCE_TYPE_METRIC,

  // Utility functions
  isResourceNode,
  isResourceHasDbColumns,
} from "./domain";

// ===== CORE INTEGRATION INFRASTRUCTURE =====
// Main dbt integration classes, commands, and execution strategies
export {
  // Integration interfaces
  type DBTProjectConfig,
  DBTDetection,
  DBTProjectDetection,
  DBTProjectIntegration,

  // Command system
  DBTCommand,
  DBTCommandFactory,
  DBTCommandExecutionStrategy,
  DBTCommandExecutionInfrastructure,
  CLIDBTCommandExecutionStrategy,
  PythonDBTCommandExecutionStrategy,

  // Execution results
  ExecuteSQLResult,
  ExecuteSQLError,
  CompilationResult,
  QueryExecution,

  // Error classes
  DBTIntegrationError,
  DBTIntegrationUnknownError,

  // Utility functions
  readAndParseProjectConfig,
  hashProjectRoot,
  validateSQLUsingSqlGlot,
} from "./dbtIntegration";

// ===== INTEGRATION IMPLEMENTATIONS =====
// Specific dbt integration implementations (Core, Cloud, Fusion, Command)
export {
  DBTCoreDetection,
  DBTCoreProjectDetection,
  DBTCoreProjectIntegration,
  ProjectHealthcheck,
} from "./dbtCoreIntegration";

export {
  DBTCloudDetection,
  DBTCloudProjectDetection,
  DBTCloudProjectIntegration,
} from "./dbtCloudIntegration";

export {
  DBTCoreCommandDetection,
  DBTCoreCommandProjectDetection,
  DBTCoreCommandProjectIntegration,
} from "./dbtCoreCommandIntegration";

export {
  DBTFusionCommandDetection,
  DBTFusionCommandProjectDetection,
  DBTFusionCommandProjectIntegration,
} from "./dbtFusionCommandIntegration";

// ===== CONFIGURATION =====
// Configuration interfaces and defaults
export {
  DBTConfiguration,
  DEFAULT_CONFIGURATION_VALUES,
} from "./configuration";

// ===== HTTP CLIENT & ERROR HANDLING =====
// Altimate HTTP client and custom error classes
export {
  AltimateHttpClient,
  NoCredentialsError,
  NotFoundError,
  ForbiddenError,
  RateLimitException,
  ExecutionsExhaustedException,
} from "./altimateHttpClient";

// ===== COMMAND EXECUTION INFRASTRUCTURE =====
// Process execution and result handling
export {
  CommandProcessExecution,
  CommandProcessExecutionFactory,
  CommandProcessResult,
} from "./commandProcessExecution";

// ===== INFRASTRUCTURE SERVICES =====
// Terminal, diagnostics, facades, and adapters
export { DBTTerminal } from "./terminal";

export { DBTDiagnosticData, DBTDiagnosticResult } from "./diagnostics";

export { DbtIntegrationClient } from "./dbtIntegrationClient";

export { DBTProjectIntegrationAdapter } from "./dbtIntegrationAdapter";

export { DBTFacade } from "./dbtFacade";

// ===== PYTHON ENVIRONMENT =====
// Python environment interfaces and providers
export {
  PythonEnvironmentProvider,
  RuntimePythonEnvironment,
} from "./pythonEnvironment";

// ===== PARSER CLASSES =====
// All manifest and project parsing classes
export { ChildrenParentParser } from "./parsers/childrenParentParser";

export { DocParser } from "./parsers/docParser";

export { ExposureParser } from "./parsers/exposureParser";

export { GraphParser } from "./parsers/graphParser";

export { MacroParser } from "./parsers/macroParser";

export { MetricParser } from "./parsers/metricParser";

export { ModelDepthParser } from "./parsers/modelDepthParser";

export { NodeParser } from "./parsers/nodeParser";

export { SourceParser } from "./parsers/sourceParser";

export { TestParser } from "./parsers/testParser";

export * from "./parsers/utils";
