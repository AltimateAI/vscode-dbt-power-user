import { GenerationDBDataProps } from "../types";

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
}

export interface DBTDocumentation {
  name: string;
  description: string;
  columns: DBTDocumentationColumn[];
  generated: boolean;
  aiEnabled: boolean;
  patchPath?: string;
}

export interface DocumentationStateProps {
  currentDocsData?: DBTDocumentation;
  project?: string;
  generationHistory: GenerationDBDataProps[];
  userInstructions: DocsGenerateUserInstructions;
  isDocGeneratedForAnyColumn: boolean;
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
