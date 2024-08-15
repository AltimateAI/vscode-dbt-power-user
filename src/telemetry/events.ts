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
  "DocumentationEditor/SaveClick" = "DocumentationEditor/SaveClick",
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
  "Notebook/StoreDataInKernelError" = "Notebook/StoreDataInKernelError",
}
