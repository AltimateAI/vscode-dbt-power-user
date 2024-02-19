import { GenerationDBDataProps } from "../types";

export enum Source {
  DATABASE = "DATABASE",
  YAML = "YAML",
}

export enum Pages {
  DOCUMENTATION,
  TESTS,
}
export interface MetadataColumn {
  name: string;
  type?: string;
}

export interface DBTDocumentationColumn extends MetadataColumn {
  description?: string;
  generated: boolean;
  source: Source;
}

export interface DBTDocumentation {
  name: string;
  description: string;
  columns: DBTDocumentationColumn[];
  generated: boolean;
  aiEnabled: boolean;
  patchPath?: string;
}

export interface TestMetadataKwArgs {
  column_name: string;
  model: string;
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

export interface DocumentationStateProps {
  currentDocsData?: DBTDocumentation;
  currentDocsTests?: DBTModelTest[];
  project?: string;
  generationHistory: GenerationDBDataProps[];
  userInstructions: DocsGenerateUserInstructions;
  isDocGeneratedForAnyColumn: boolean;
  insertedEntityName?: string;
  activePage: Pages;
}

export interface DBTModelTest {
  alias: string;
  column_name?: string;
  database: string;
  key: string;
  path: string;
  schema: string;
  test_metadata?: {
    kwargs: TestMetadataKwArgs;
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
