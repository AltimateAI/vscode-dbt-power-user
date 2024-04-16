/// <reference types="react" />

import { JSX as JSX_2 } from "react/jsx-runtime";

export declare const ApiHelper: {
  get: <T>(
    _url: string,
    _data?: Record<string, unknown>,
    _request?: RequestInit,
  ) => Promise<T>;
  post: <T_1>(
    _url: string,
    _data: Record<string, unknown>,
    _request?: RequestInit,
  ) => Promise<T_1>;
};

export declare const CodeBlock: ({
  code,
  language,
  fileName,
  theme,
  showLineNumbers,
}: Props_4) => JSX.Element;

export declare interface Conversation {
  timestamp: string;
  user_id: number;
  message: string;
  conversation_id: number;
}

export declare interface ConversationGroup {
  owner: number;
  conversation_group_id: number;
  conversations: Conversation[];
  status: "Pending" | "Expired";
  meta: {
    field?: "description";
    column?: string;
    filePath: string;
    highlight: string;
    uniqueId?: string;
    resource_type?: string;
    range: {
      end: {
        line: number;
        character: number;
      };
      start: {
        line: number;
        character: number;
      };
    };
  };
}

export declare const ConversationGroupProvider: ({
  currentUser,
  conversationGroup,
  shareId,
  onSelect,
  isSelected,
  users,
  onResolve,
  onReplyAdd,
  source,
}: Props_3) => JSX.Element | null;

export declare const ConversationInputForm: ({
  comment,
  setComment,
  loading,
  users,
  currentUser,
  placeholder,
  onEnterKeypress,
}: Props_2) => JSX_2.Element;

export declare enum ConversationSources {
  DBT_DOCS = "dbt-docs",
  DOCUMENTATION_EDITOR = "documentation-editor",
  SAAS = "saas",
}

export declare const DbtDocs: ({
  shareId,
  userId,
  conversationGroupId,
  source,
}: Props) => JSX_2.Element;

export declare interface DbtDocsShareDetails {
  catalog_presigned_url?: string;
  manifest_presigned_url?: string;
  share_id: number;
}

declare interface Props {
  shareId: number;
  userId?: number;
  conversationGroupId?: number;
  source: ConversationSources;
}

declare interface Props_2 {
  comment: string;
  setComment: (comment: string) => void;
  loading: boolean;
  users: User[];
  currentUser: User | null;
  placeholder?: string;
  onEnterKeypress?: () => void;
}

declare interface Props_3 {
  currentUser?: User;
  conversationGroup?: ConversationGroup;
  shareId?: DbtDocsShareDetails["share_id"];
  isSelected: boolean;
  users: Record<User["id"], User>;
  onSelect: () => void;
  onResolve: () => void;
  onReplyAdd: () => void;
  source: ConversationSources;
}

declare interface Props_4 {
  code: string;
  language: "sql" | "yaml" | "markdown";
  fileName?: string;
  showLineNumbers?: boolean;
  theme?: "vs" | "solarizedDark" | "solarizedLight";
}

declare interface User {
  display_name: string;
  first_name: string;
  last_name: string;
  id: number;
}

export {};

declare global {
  interface HTMLElementEventMap {
    selectionend: CustomEvent;
  }
}
