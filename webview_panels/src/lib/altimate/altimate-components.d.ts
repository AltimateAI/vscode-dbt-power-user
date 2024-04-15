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
}: Props_3) => JSX.Element;

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
  EXTENSION = "extension",
  SOURCES = "sources",
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

export declare enum LoadingState {
  LOADING = 0,
  UNINITIALIZED = 1,
  INITIALIZED = 2,
}

export declare interface NewConversation {
  meta?: ConversationGroup["meta"];
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
