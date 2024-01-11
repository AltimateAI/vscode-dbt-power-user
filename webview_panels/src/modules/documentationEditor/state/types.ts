import { GenerationDBDataProps } from "../types";

enum Source {
  DATABASE = "DATABASE",
  YAML = "YAML",
}

interface MetadataColumn {
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
  currentDocsData: DBTDocumentation | null;
  project: string | null;
  generationHistory: GenerationDBDataProps[];
}

export interface DocsGenerateUserInstructions {
  prompt_hint?: string;
  language?: string;
  persona?: string;
}

export interface DocsGenerateModelRequestV2 {
  user_instructions: DocsGenerateUserInstructions;
  description?: string;
  columns?: string[];
}

export interface DocsGenerateColumnRequestV2 {
  user_instructions: DocsGenerateUserInstructions;
  description?: string;
  columnName: string;
}
