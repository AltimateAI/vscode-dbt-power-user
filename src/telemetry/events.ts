export enum TelemetryEventPriority {
  "Critical" = "Critical",
  "High" = "High",
  "Medium" = "Medium",
  "Low" = "Low",
}

// List of event names
export enum TelemetryEvents {
  "Datapilot/Feedback" = "Datapilot/Feedback",
  "DocumentationEditor/Load" = "DocumentationEditor/Load",
  "DocumentationEditor/SyncWithDBClick" = "DocumentationEditor/SyncWithDBClick",
  "DocumentationEditor/TestsTabClick" = "DocumentationEditor/TestsTabClick",
  "DocumentationEditor/SettingsOpen" = "DocumentationEditor/SettingsOpen",
  "DocumentationEditor/SettingsUpdate" = "DocumentationEditor/SettingsUpdate",
  "DocumentationEditor/HelpOpen" = "DocumentationEditor/HelpOpen",
  "DocumentationEditor/HelpTestsOpen" = "DocumentationEditor/HelpTestsOpen",
  "DocumentationEditor/HelpDocumentationLinkInDocumentationClick" = "DocumentationEditor/HelpDocumentationLinkInDocumentationClick",
  "DocumentationEditor/HelpContactusLinkInDocumentationClick" = "DocumentationEditor/HelpContactusLinkInDocumentationClick",
  "DocumentationEditor/HelpDocumentationLinkInTestsClick" = "DocumentationEditor/HelpDocumentationLinkInTestsClick",
  "DocumentationEditor/HelpContactusLinkInTestsClick" = "DocumentationEditor/HelpContactusLinkInTestsClick",
  "DocumentationEditor/FeedbackClick" = "DocumentationEditor/FeedbackClick",
  "DocumentationEditor/BulkGenerateTests" = "DocumentationEditor/BulkGenerateTests",
  "DocumentationEditor/SaveClick" = "DocumentationEditor/SaveClick",
  "DocumentationEditor/SaveBulk" = "DocumentationEditor/SaveBulk",
  "DocumentationEditor/SaveError" = "DocumentationEditor/SaveError",
  "DocumentationEditor/SaveNewFilePathSelect" = "DocumentationEditor/SaveNewFilePathSelect",
  "DocumentationEditor/BulkGenerateAllClick" = "DocumentationEditor/BulkGenerateAllClick",
  "DocumentationEditor/BulkGenerateAllError" = "DocumentationEditor/BulkGenerateAllError",
  "DocumentationEditor/BulkGenerateMissingColumnsClick" = "DocumentationEditor/BulkGenerateMissingColumnsClick",
  "DocumentationEditor/BulkGenerateMissingColumnsError" = "DocumentationEditor/BulkGenerateMissingColumnsError",
  "DocumentationEditor/GenerateDescForModelClick" = "DocumentationEditor/GenerateDescForModelClick",
  "DocumentationEditor/GenerateDescForColumnClick" = "DocumentationEditor/GenerateDescForColumnClick",
  "DocumentationEditor/GenerateDescByDatapilotForModelClick" = "DocumentationEditor/GenerateDescByDatapilotForModelClick",
  "DocumentationEditor/GenerateDescByDatapilotForColumnClick" = "DocumentationEditor/GenerateDescByDatapilotForColumnClick",
  "DocumentationEditor/ColumnTestClick" = "DocumentationEditor/ColumnTestClick",
  "DocumentationEditor/ModelTestClick" = "DocumentationEditor/ModelTestClick",
  "DocumentationEditor/AddTestClick" = "DocumentationEditor/AddTestClick",
  "DocumentationEditor/AddCustomTestClick" = "DocumentationEditor/AddCustomTestClick",
  "DocumentationEditor/GetDistinctColumnValues" = "DocumentationEditor/GetDistinctColumnValues",
  "DocumentationEditor/AcceptedValuesSaveClick" = "DocumentationEditor/AcceptedValuesSaveClick",
  "DocumentationEditor/RelationshipsToSelect" = "DocumentationEditor/RelationshipsToSelect",
  "DocumentationEditor/RelationshipsFieldSelect" = "DocumentationEditor/RelationshipsFieldSelect",
  "DocumentationEditor/RelationshipsSaveClick" = "DocumentationEditor/RelationshipsSaveClick",
  "DocumentationEditor/TestEditClick" = "DocumentationEditor/TestEditClick",
  "DocumentationEditor/TestEditCancel" = "DocumentationEditor/TestEditCancel",
  "DocumentationEditor/TestEditUpdateClick" = "DocumentationEditor/TestEditUpdateClick",
  "DocumentationEditor/TestDeleteClick" = "DocumentationEditor/TestDeleteClick",
  "DocumentationEditor/AddTestSelect" = "DocumentationEditor/AddTestSelect",
  "Notebook/DependenciesInstallCancelled" = "Notebook/DependenciesInstallCancelled",
  "Notebook/DependenciesInstalled" = "Notebook/DependenciesInstalled",
  "Notebook/DependenciesInstallError" = "Notebook/DependenciesInstallError",
  "Notebook/KernelInitializationError" = "Notebook/KernelInitializationError",
  "Notebook/KernelCloseError" = "Notebook/KernelCloseError",
  "Notebook/Execute" = "Notebook/Execute",
  "Notebook/WidgetVersionError" = "Notebook/WidgetVersionError",
  "Notebook/SaveError" = "Notebook/SaveError",
  "Notebook/Launch" = "Notebook/Launch",
  "Notebook/LaunchError" = "Notebook/LaunchError",
  "Notebook/StoreDataInKernelError" = "Notebook/StoreDataInKernelError",
  "QueryHistory/Disabled" = "QueryHistory/Disabled",
  "QueryHistory/ClearError" = "QueryHistory/ClearError",
  "CteProfiler/Profile" = "CteProfiler/Profile",
  "CteProfiler/Cancel" = "CteProfiler/Cancel",
  "MCP/ToolCall" = "MCP/ToolCall",
  "MCP/Onboarding" = "MCP/Onboarding",
  "MCP/Onboarding/SetUpNow" = "MCP/Onboarding/SetUpNow",
  "MCP/Onboarding/Later" = "MCP/Onboarding/Later",
  "MCP/Onboarding/Success" = "MCP/Onboarding/Success",
  "MCP/Onboarding/Failed" = "MCP/Onboarding/Failed",
  "AltimateCode/RunFailureClick" = "AltimateCode/RunFailureClick",
  "AltimateCode/CommandFailureClick" = "AltimateCode/CommandFailureClick",
  "AltimateCode/SqlValidationFixClick" = "AltimateCode/SqlValidationFixClick",
  "AltimateCode/ValidateSqlManifestErrorClick" = "AltimateCode/ValidateSqlManifestErrorClick",
  "AltimateCode/ValidateSqlCompileErrorClick" = "AltimateCode/ValidateSqlCompileErrorClick",
  "AltimateCode/ExplainTestFailureClick" = "AltimateCode/ExplainTestFailureClick",
  "AltimateCode/RunHistoryFixClick" = "AltimateCode/RunHistoryFixClick",
  "AltimateCode/TroubleshootCodeActionClick" = "AltimateCode/TroubleshootCodeActionClick",
  "DocumentationEditor/UnitTestGenerateClick" = "DocumentationEditor/UnitTestGenerateClick",
  "WhatsNew/PageOpened" = "whats_new_page_opened",
  // The changelog feed could not be fetched: `reason` is a class (http_403,
  // timeout, dns, proxy, network, tls, other), `fallback` says whether a cached
  // manifest stood in. `trigger` is who started the fetch: a page the user
  // opens while the automatic fetch is in flight shares that fetch, so its
  // failure reports `auto`. Not an error event: it is the user's network, and
  // an automatic open is skipped rather than shown broken.
  "WhatsNew/FeedUnavailable" = "whats_new_feed_unavailable",
  // Carries a `source` so the three changelog links (topbar, hero CTA, footer,
  // plus the error state) can be told apart.
  "WhatsNew/FullChangelogClicked" = "full_changelog_clicked",
  // Which change types readers actually care about. This is the per-item
  // interest signal now that entries aren't links — the linked changelog entry
  // only repeats what the panel already shows, so there was nothing to click
  // through to.
  "WhatsNew/FilterToggled" = "whats_new_filter_toggled",
  // Whether the timeline rail earns the space it takes.
  "WhatsNew/TimelineNavigated" = "whats_new_timeline_navigated",
  // Cross-promo: the "Also from Altimate AI" aside exists to drive discovery.
  "WhatsNew/ProductLinkClicked" = "whats_new_product_link_clicked",
  "WhatsNew/SiteLinkClicked" = "whats_new_site_link_clicked",
  "QueryPanel/OptimizeWarehouseClick" = "QueryPanel/OptimizeWarehouseClick",
}

// Properties that describe the user's dbt setup. `DBTProject` sets them as
// custom attributes once its integration reports them, so every event sent
// after that carries them, routine and error events alike. Each value is a
// string, and anything not detected is `DBT_ENVIRONMENT_UNKNOWN`. The
// integration mode itself is already on every event as `dbtIntegrationMode`.
export enum DbtEnvironmentTelemetryProperty {
  // The detected dbt version, `major.minor.patch`: dbt-core's in core and
  // corecommand mode, the dbt Cloud CLI's in cloud mode, the Fusion binary's
  // in fusion mode.
  DbtVersion = "dbtVersion",
  // `major.minor` of the same version, so queries can group without parsing.
  DbtVersionMinor = "dbtVersionMinor",
  // The adapter type of the project's target, for example `snowflake`.
  DbtAdapter = "dbtAdapter",
  // The Fusion binary's version, `major.minor.patch`. Set in fusion mode only.
  DbtFusionVersion = "dbtFusionVersion",
}

// The value of a dbt setup property that could not be detected, including a
// version reported as 0.0.0.
export const DBT_ENVIRONMENT_UNKNOWN = "unknown";

// Property on the known dbt Fusion failure events that names the failure, so
// the failures can be counted without matching message text. Events that are
// not a known Fusion failure do not carry it.
export const FUSION_FAILURE_CLASS_PROPERTY = "fusionFailureClass";

export enum FusionFailureClass {
  // The Fusion binary could not be started: "Command not found".
  BinaryMissing = "binary_missing",
  // `dbt parse` failed to run for another reason.
  ParseCommandFailed = "parse_command_failed",
  // `dbt debug` failed, so the target and adapter are unknown.
  InitializeTargetFailed = "initialize_target_failed",
  // Fusion ran and reported errors in the user's project.
  ProjectParseError = "project_parse_error",
  // Fusion's parse output could not be read as JSON.
  ParseOutputUnreadable = "parse_output_unreadable",
  // The project name could not be read from `dbt_project.yml`.
  ProjectNameUnreadable = "project_name_unreadable",
  // The user asked for docs generation, which Fusion does not support.
  DocsUnsupported = "docs_unsupported",
}
