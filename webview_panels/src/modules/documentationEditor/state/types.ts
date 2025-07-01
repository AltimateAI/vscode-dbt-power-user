import {
  ConversationGroup,
  DbtDocsShareDetails,
} from "@altimateai/ui-components";
import { GenerationDBDataProps } from "../types";
import { Citation } from "@altimateai/ui-components";

export enum Source {
  DATABASE = "DATABASE",
  YAML = "YAML",
}

export interface MetadataColumn {
  name: string;
  type?: string;
}

export interface DBTDocumentationColumn extends MetadataColumn {
  description?: string;
  generated: boolean;
  source: Source;
  citations?: Citation[];
}

export interface DBTDocumentation {
  name: string;
  description: string;
  columns: DBTDocumentationColumn[];
  generated: boolean;
  aiEnabled: boolean;
  patchPath?: string;
  uniqueId: string;
  resource_type?: string;
  citations?: Citation[];
}

export interface TestMetadataKwArgs {
  column_name: string;
  model: string;
}

export enum DbtTestTypes {
  EXTERNAL_PACKAGE = "external",
  GENERIC = "generic",
  MACRO = "macro",
  SINGULAR = "singular", // sql queries in dbt tests directory
  UNKNOWN = "unknown",
}

export enum DbtGenericTests {
  ACCEPTED_VALUES = "accepted_values",
  NOT_NULL = "not_null",
  RELATIONSHIPS = "relationships",
  UNIQUE = "unique",
}

// for accepted_values
export interface TestMetadataAcceptedValuesKwArgs extends TestMetadataKwArgs {
  values?: string[];
}

// for relationship
export interface TestMetadataRelationshipsKwArgs extends TestMetadataKwArgs {
  field?: string;
  to?: string;
}

export interface DocBlock {
  name: string;
  path: string;
}

export interface DocumentationStateProps {
  docUpdatedForModel?: string;
  docUpdatedForColumns: string[];
  incomingDocsData?: { docs?: DBTDocumentation; tests?: DBTModelTest[] };
  currentDocsData?: DBTDocumentation;
  currentDocsTests?: DBTModelTest[];
  project?: string;
  generationHistory: GenerationDBDataProps[];
  userInstructions: DocsGenerateUserInstructions;
  insertedEntityName?: string;
  conversations: Record<DbtDocsShareDetails["share_id"], ConversationGroup[]>;
  showConversationsRightPanel: boolean;
  showSingleDocsPropRightPanel: boolean;
  showBulkDocsPropRightPanel: boolean;
  selectedConversationGroup?: {
    shareId: DbtDocsShareDetails["share_id"];
    conversationGroupId: ConversationGroup["conversation_group_id"];
  };
  collaborationEnabled: boolean;
  missingDocumentationMessage?: { message: string; type: "warning" | "error" };
  searchQuery: string;
  docBlocks: DocBlock[];
}

export interface DBTModelTest {
  column_name?: string;
  key: string;
  path?: string;
  test_metadata?: {
    kwargs: TestMetadataAcceptedValuesKwArgs | TestMetadataRelationshipsKwArgs;
    name: string;
    namespace?: string;
  };
}

export interface DocsGenerateFollowupInstructions {
  instruction?: string;
}

export interface DocsGenerateUserInstructions {
  prompt_hint?: string;
  language?: string;
  persona?: string;
}

export interface DocsGenerateModelRequestV2 {
  user_instructions?: DocsGenerateUserInstructions;
  follow_up_instructions?: DocsGenerateFollowupInstructions;
  description?: string;
  columns?: string[];
}

export interface DocsGenerateColumnRequestV2 {
  user_instructions: DocsGenerateUserInstructions;
  description?: string;
  columnName: string;
}
