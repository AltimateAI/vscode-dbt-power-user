/// <reference types="react" />

import { JSX as JSX_2 } from 'react/jsx-runtime';

export declare const ApiHelper: {
    get: (_url: string, _data?: Record<string, unknown>, _request?: RequestInit) => Promise<any>;
    post: (_url: string, _data: Record<string, unknown>, _request?: RequestInit) => Promise<any>;
};

export declare const CodeBlock: ({ code, language, fileName, theme, showLineNumbers, }: Props_2) => JSX.Element;

declare enum ConversationSources {
    EXTENSION = "extension",
    SOURCES = "sources"
}

export declare const DbtDocs: ({ shareId, userId, conversationGroupId, source }: Props) => JSX_2.Element;

declare interface Props {
    shareId: number;
    userId?: number;
    conversationGroupId?: number;
    source: ConversationSources;
}

declare interface Props_2 {
    code: string;
    language: "sql" | "yaml";
    fileName?: string;
    showLineNumbers?: boolean;
    theme?: "vs" | "solarizedDark" | "solarizedLight";
}

export { }

declare global {
    interface HTMLElementEventMap {
        selectionend: CustomEvent;
    }
}

