import { JSX as JSX_2 } from 'react/jsx-runtime';

export declare const ApiHelper: {
    get: (_url: string, _data?: Record<string, unknown>, _request?: RequestInit) => Promise<any>;
    post: (_url: string, _data: Record<string, unknown>, _request?: RequestInit) => Promise<any>;
};

export declare const DbtDocs: ({ shareId, userId, conversationGroupId }: Props) => JSX_2.Element;

declare interface Props {
    shareId: string;
    userId: string;
    conversationGroupId?: string;
}

export { }

declare global {
    interface HTMLElementEventMap {
        selectionend: CustomEvent;
    }
}
