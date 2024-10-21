import { BadgeProps } from 'reactstrap';
import { ButtonHTMLAttributes } from 'react';
import { ButtonProps } from 'reactstrap';
import { CaseReducerActions } from '@reduxjs/toolkit';
import { ChatMessage } from '@ant-design/pro-chat';
import { Dispatch } from 'react';
import { JSX as JSX_2 } from 'react/jsx-runtime';
import { PayloadAction } from '@reduxjs/toolkit';
import { ProChatProps } from '@ant-design/pro-chat/es/ProChat/container';
import { ReactNode } from 'react';
import { UnknownAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer';
import { z } from 'zod';

export declare const ApiHelper: {
    get: <T>(_url: string, _data?: Record<string, unknown>, _request?: RequestInit) => Promise<T>;
    post: <T>(_url: string, _data: Record<string, unknown>, _request?: RequestInit) => Promise<T>;
};

export declare const Badge: ({ tooltip, ...props }: Props_5) => JSX_2.Element;

export declare const Chatbot: ({ loading, onRequest, sessionId: sessionIdProp, ...props }: Props_9) => JSX_2.Element;

export declare class CLL {
    static isCancelled: boolean;
    static inProgress: boolean;
    static linkCount: number;
    static onCancel(): void;
    static cancel(): void;
    static start(): void;
    static end(): void;
    static addLinks(n: number): void;
    static showCllInProgressMsg(): void;
}

export declare enum CllEvents {
    CANCEL = "cancel",
    END = "end",
    START = "start"
}

export declare interface CoachAiConfirmationResponse {
    ok: boolean;
    train_doc_uid: string;
    frontend_url: string;
}

export declare interface CoachAiResponse {
    ai_response: string;
    category: string;
    personalizationScope: string;
}

export declare const CoachForm: ({ taskLabel, context, onClose }: Props_10) => JSX_2.Element;

export declare const CoachFormButton: ({}: Props_11) => JSX_2.Element;

export declare const CodeBlock: ({ code, language, fileName, editorTheme, theme, showLineNumbers, className, titleActions, }: Props_4) => JSX.Element;

export declare interface CollectColumn {
    column: string;
    viewsType?: ViewsTypes;
}

export declare interface Column {
    name: string;
    table: string;
    datatype?: string;
    can_lineage_expand: boolean;
    description: string;
}

export declare interface ColumnLineage {
    source: [string, string];
    target: [string, string];
    type: string;
    viewsType?: ViewsTypes;
    viewsCode?: [string, string][];
}

export declare interface Columns {
    id: string;
    purpose: string;
    columns: Column[];
}

export declare interface Confidence {
    confidence: string;
    operator_list?: string[];
}

export declare enum ContentCategory {
    TERM_CLARIFICATION = "TermClarification",
    GENERAL_GUIDELINES = "GeneralGuidelines",
    BUSINESS_EXPLANATION = "BusinessExplanation"
}

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

export declare const ConversationGroupProvider: ({ currentUser, conversationGroup, shareId, onSelect, isSelected, users, onResolve, onReplyAdd, source, }: Props_8) => JSX.Element | null;

export declare const ConversationInputForm: ({ comment, setComment, loading, users, currentUser, placeholder, onEnterKeypress, }: Props_7) => JSX_2.Element;

export declare enum ConversationSources {
    DBT_DOCS = "dbt-docs",
    DOCUMENTATION_EDITOR = "documentation-editor",
    SAAS = "saas"
}

export declare const DbtDocs: ({ shareId, userId, conversationGroupId, source }: Props_6) => JSX_2.Element;

export declare interface DbtDocsShareDetails {
    catalog_presigned_url?: string;
    manifest_presigned_url?: string;
    share_id: number;
}

export declare type Details = Record<string, {
    columns?: {
        name: string;
        datatype?: string;
        expression?: string;
    }[];
    sql?: string;
    nodeType?: string;
    nodeId?: string;
    name?: string;
    type: string;
}>;

export declare interface ExposureMetaData {
    description?: string;
    depends_on: {
        macros: [string];
        nodes: [string];
        sources: [string];
    };
    label?: string;
    maturity?: string;
    name: string;
    owner: {
        email: string;
        name: string;
    };
    tags: [string];
    url?: string;
    type: string;
    config: {
        enabled: boolean;
    };
    path: string;
    unique_id: string;
    sources?: [string];
    metrics?: unknown[];
    meta?: Record<string, unknown>;
}

export declare const IconButton: (props: Props) => JSX.Element;

export declare interface Learning extends z.infer<typeof learningSchema> {
}

export declare const Learnings: ({ filters, learning }: Props_12) => JSX_2.Element;

export declare const learningSchema: z.ZodObject<{
    train_doc_uid: z.ZodString;
    userId: z.ZodString;
    display_name: z.ZodString;
    taskLabel: z.ZodString;
    category: z.ZodEnum<[string, ...string[]]>;
    personalizationScope: z.ZodDefault<z.ZodEnum<[string, ...string[]]>>;
    createdDate: z.ZodString;
    updatedDate: z.ZodString;
    content: z.ZodString;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    isActive: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    content: string;
    display_name: string;
    userId: string;
    train_doc_uid: string;
    taskLabel: string;
    category: string;
    personalizationScope: string;
    createdDate: string;
    updatedDate: string;
    isActive: boolean;
    metadata?: Record<string, unknown> | undefined;
}, {
    content: string;
    display_name: string;
    userId: string;
    train_doc_uid: string;
    taskLabel: string;
    category: string;
    createdDate: string;
    updatedDate: string;
    metadata?: Record<string, unknown> | undefined;
    personalizationScope?: string | undefined;
    isActive?: boolean | undefined;
}>;

export declare const Lineage: (props: Omit<Parameters<typeof LineageProvider>["0"], "children">) => JSX_2.Element;

declare const LineageProvider: ({ theme, lineageType, sqlLineage, dynamicLineage, staticLineage, allowSyncColumnsWithDB, externalSidePanel }: LineageProviderProps) => JSX_2.Element;

declare interface LineageProviderProps {
    dynamicLineage?: {
        node?: Table;
        aiEnabled: boolean;
    };
    sqlLineage?: SqlLineage;
    staticLineage?: StaticLineage;
    theme: "dark" | "light";
    lineageType: "static" | "dynamic" | "sql";
    allowSyncColumnsWithDB?: boolean;
    externalSidePanel?: boolean;
}

export declare const LoadingButton: ({ loading, ...rest }: Props_3) => JSX.Element;

export declare interface ModalArgs {
    type: "none" | "views_code" | "op_node";
    args?: ViewsCodeModalArgs | OpNodeArgs;
}

export declare interface OpNodeArgs {
    op_type: string;
    op_code: string;
}

export declare enum PersonalizationScope {
    USER_SPECIFIC = "UserSpecific",
    ALL_USERS = "AllUsers"
}

declare interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    color?: string;
}

declare interface Props_10 {
    taskLabel: keyof typeof TaskLabels;
    context?: Record<string, unknown>;
    onClose: () => void;
}

declare interface Props_11 {
}

declare interface Props_12 {
    filters?: {
        taskLabel?: keyof typeof TaskLabels;
    };
    learning?: string | null;
}

declare interface Props_13 {
    onSelect: (selected: (typeof TeamMatesConfig)[0], action: TeamMateActionType) => Promise<boolean | undefined>;
    client: keyof typeof TeamMateAvailability;
}

declare interface Props_2 {
    children: ReactNode;
    title?: string | ReactNode;
    id?: string;
    className?: string;
}

declare interface Props_3 extends ButtonProps {
    loading: boolean;
}

declare interface Props_4 {
    code: string;
    language: "sql" | "yaml" | "markdown" | "json" | "javascript";
    fileName?: string;
    showLineNumbers?: boolean;
    editorTheme?: "vs" | "vsc-dark-plus" | "solarizedLight" | "tomorrow";
    theme: "light" | "dark";
    className?: string;
    titleActions?: ReactNode;
}

declare interface Props_5 extends BadgeProps {
    tooltip: Parameters<typeof Tooltip>[0]["title"];
}

declare interface Props_6 {
    shareId: number;
    userId?: number;
    conversationGroupId?: number;
    source: ConversationSources;
}

declare interface Props_7 {
    comment: string;
    setComment: (comment: string) => void;
    loading: boolean;
    users: User[];
    currentUser: User | null;
    placeholder?: string;
    onEnterKeypress?: () => void;
}

declare interface Props_8 {
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

declare interface Props_9 extends ProChatProps<any> {
    loading?: boolean;
    onRequest: (messages: ChatMessage[], sessionId: string) => any;
    sessionId?: string;
}

export declare interface SelectedColumn {
    name: string;
    table: string;
}

declare interface SqlLineage {
    tableEdges: [string, string][];
    details: StaticLineageDetails;
    errorMessage?: undefined;
    nodePositions?: Record<string, [number, number]>;
}

declare interface StaticLineage {
    selectedColumn: {
        table: string;
        name: string;
    };
    collectColumns: Record<string, CollectColumn[]>;
    columnEdges?: [string, string][];
    tableEdges: [string, string][];
    details: Details;
}

export declare type StaticLineageDetails = Record<string, {
    columns?: {
        name: string;
        expression?: string;
        datatype?: string;
    }[];
    name?: string;
    sql?: string;
    type: string;
    nodeId?: string;
    node_id?: string;
    nodeType?: string;
    expression?: string;
    join_type?: string;
}>;

export declare interface Table {
    table: string;
    label: string;
    url?: string;
    nodeType: string;
    materialization?: string;
    downstreamCount: number;
    upstreamCount: number;
    isExternalProject: boolean;
    tests: {
        key: string;
        path: string;
    }[];
    schema?: string;
}

export declare enum TaskLabels {
    DocGen = "DocGen",
    ChartBot = "ChartBot",
    SqlBot = "SqlExpert",
    OpportunitiesBot = "OpportunitiesBot"
}

export declare const TeammateActions: CaseReducerActions<    {
setShowCoachingForm: (state: WritableDraft<TeamMateState>, action: PayloadAction<TeamMateState["showCoachingForm"]>) => void;
}, "teamMate">;

export declare enum TeamMateActionType {
    SEE_IN_ACTION = "SEE_IN_ACTION",
    REQUEST_ACCESS = "REQUEST_ACCESS",
    VIEW_DETAILS = "VIEW_DETAILS"
}

export declare enum TeamMateAvailability {
    EXTENSION = "VSCode Extension",
    SAAS = "SaaS"
}

export declare interface TeamMateConfig {
    name: string;
    avatar: string;
    description: string;
    availability: TeamMateAvailability[];
    key: TaskLabels;
    seeInAction?: boolean;
    comingSoon?: boolean;
}

export declare interface TeamMateContextProps {
    state: TeamMateState;
    dispatch: Dispatch<UnknownAction>;
}

export declare const TeamMateProvider: ({ children, }: {
    children: ReactNode;
}) => JSX.Element;

export declare const TeamMates: ({ onSelect, client }: Props_13) => JSX_2.Element;

export declare const TeamMatesConfig: TeamMateConfig[];

export declare interface TeamMateState {
    showCoachingForm: boolean;
}

export declare const Tooltip: (props: Props_2) => JSX.Element;

declare interface User {
    display_name: string;
    first_name: string;
    last_name: string;
    id: number;
}

export declare const useTeamMateContext: () => TeamMateContextProps;

declare const VIEWS_TYPE_COLOR: {
    Original: string;
    Alias: string;
    Transformation: string;
    Unchanged: string;
    "Not sure": string;
    "Non select": string;
};

export declare interface ViewsCodeModalArgs {
    table: string;
    column: string;
    viewsType: ViewsTypes;
    viewsCode: Record<string, [string, string][]>;
    nodeType: string;
}

declare type ViewsTypes = keyof typeof VIEWS_TYPE_COLOR;

export { }

declare global {
    interface HTMLElementEventMap {
        selectionend: CustomEvent;
    }
}

