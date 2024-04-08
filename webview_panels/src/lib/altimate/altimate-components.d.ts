import { JSX as JSX_2 } from 'react/jsx-runtime';

export declare const ApiHelper: {
    get: (_url: string, _data?: Record<string, unknown>, _request?: RequestInit) => Promise<any>;
    post: (_url: string, _data: Record<string, unknown>, _request?: RequestInit) => Promise<any>;
};

declare enum ConversationSources {
    EXTENSION = "extension",
    SOURCES = "sources"
}

export declare const DbtDocs: ({ shareId, userId, conversationGroupId, source }: Props) => JSX_2.Element;

declare interface Props {
    shareId: string;
    userId: string;
    conversationGroupId?: string;
    source: ConversationSources;
}

export { }

declare global {
    interface HTMLElementEventMap {
        selectionend: CustomEvent;
    }
}

