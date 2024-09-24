import { Alert } from 'reactstrap';
import { Badge } from 'reactstrap';
import { Button } from 'reactstrap';
import { ButtonGroup } from 'reactstrap';
import { ButtonHTMLAttributes } from 'react';
import { Card } from 'reactstrap';
import { CardBody } from 'reactstrap';
import { CardFooter } from 'reactstrap';
import { CardText } from 'reactstrap';
import { CardTitle } from 'reactstrap';
import { CaseReducerActions } from '@reduxjs/toolkit';
import { ChatMessage } from '@ant-design/pro-chat';
import { Col } from 'reactstrap';
import { Container } from 'reactstrap';
import { Dispatch } from 'react';
import { Fade } from 'reactstrap';
import { Form } from 'reactstrap';
import { FormFeedback } from 'reactstrap';
import { FormGroup } from 'reactstrap';
import { ForwardRefExoticComponent } from 'react';
import { HTMLAttributes } from 'react';
import { Input } from 'reactstrap';
import { InputGroup } from 'reactstrap';
import { JSX as JSX_2 } from 'react/jsx-runtime';
import { Label } from 'reactstrap';
import { List } from 'reactstrap';
import { ListGroup } from 'reactstrap';
import { ListGroupItem } from 'reactstrap';
import { Modal } from 'reactstrap';
import { ModalBody } from 'reactstrap';
import { Nav } from 'reactstrap';
import { NavItem } from 'reactstrap';
import { NavLink } from 'reactstrap';
import { Offcanvas } from 'reactstrap';
import { OffcanvasBody } from 'reactstrap';
import { OffcanvasHeader } from 'reactstrap';
import { PayloadAction } from '@reduxjs/toolkit';
import { Popover } from 'reactstrap';
import { PopoverBody } from 'reactstrap';
import { PopoverHeader } from 'reactstrap';
import { ProChatProps } from '@ant-design/pro-chat/es/ProChat/container';
import { ReactNode } from 'react';
import { RefAttributes } from 'react';
import { Row } from 'reactstrap';
import { Spinner } from 'reactstrap';
import { UnknownAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer';

export { Alert }

export declare const ApiHelper: {
    get: <T>(_url: string, _data?: Record<string, unknown>, _request?: RequestInit) => Promise<T>;
    post: <T>(_url: string, _data: Record<string, unknown>, _request?: RequestInit) => Promise<T>;
};

export { Badge }

export { Button }

export { ButtonGroup }

export { Card }

export { CardBody }

export { CardFooter }

export { CardText }

export { CardTitle }

export declare const Chatbot: ({ loading, onRequest, sessionId: sessionIdProp, ...props }: Props_5) => JSX_2.Element;

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

export declare const CoachForm: ({ taskLabel }: Props_9) => JSX_2.Element;

export declare const CoachFormButton: ({}: Props_10) => JSX_2.Element;

export declare const CodeBlock: ({ code, language, fileName, editorTheme, theme, showLineNumbers, className, titleActions, }: Props) => JSX.Element;

export { Col }

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

export { Container }

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

export declare const ConversationGroupProvider: ({ currentUser, conversationGroup, shareId, onSelect, isSelected, users, onResolve, onReplyAdd, source, }: Props_4) => JSX.Element | null;

export declare const ConversationInputForm: ({ comment, setComment, loading, users, currentUser, placeholder, onEnterKeypress, }: Props_3) => JSX_2.Element;

export declare enum ConversationSources {
    DBT_DOCS = "dbt-docs",
    DOCUMENTATION_EDITOR = "documentation-editor",
    SAAS = "saas"
}

export declare const DbtDocs: ({ shareId, userId, conversationGroupId, source }: Props_2) => JSX_2.Element;

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

export { Fade }

export { Form }

export { FormFeedback }

export { FormGroup }

export declare const IconButton: (props: Props_6) => JSX.Element;

export { Input }

export { InputGroup }

export { Label }

export declare const Learnings: () => JSX_2.Element;

export declare const Lineage: (props: Omit<Parameters<typeof LineageProvider>["0"], "children">) => JSX_2.Element;

declare const LineageProvider: ({ theme, lineageType, sqlLineage, dynamicLineage, staticLineage, allowSyncColumnsWithDB, }: LineageProviderProps) => JSX_2.Element;

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
}

export { List }

export { ListGroup }

export { ListGroupItem }

export declare const LoadingButton: ({ loading, ...rest }: Props_8) => JSX.Element;

export { Modal }

export declare interface ModalArgs {
    type: "none" | "views_code" | "op_node";
    args?: ViewsCodeModalArgs | OpNodeArgs;
}

export { ModalBody }

export { Nav }

export { NavItem }

export { NavLink }

export { Offcanvas }

export { OffcanvasBody }

export { OffcanvasHeader }

export declare interface OpNodeArgs {
    op_type: string;
    op_code: string;
}

export { Popover }

export { PopoverBody }

export { PopoverHeader }

declare interface Props {
    code: string;
    language: "sql" | "yaml" | "markdown" | "json" | "javascript";
    fileName?: string;
    showLineNumbers?: boolean;
    editorTheme?: "vs" | "vsc-dark-plus" | "solarizedLight" | "tomorrow";
    theme: "light" | "dark";
    className?: string;
    titleActions?: ReactNode;
}

declare interface Props_10 {
}

declare interface Props_2 {
    shareId: number;
    userId?: number;
    conversationGroupId?: number;
    source: ConversationSources;
}

declare interface Props_3 {
    comment: string;
    setComment: (comment: string) => void;
    loading: boolean;
    users: User[];
    currentUser: User | null;
    placeholder?: string;
    onEnterKeypress?: () => void;
}

declare interface Props_4 {
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

declare interface Props_5 extends ProChatProps<any> {
    loading?: boolean;
    onRequest: (messages: ChatMessage[], sessionId: string) => any;
    sessionId?: string;
}

declare interface Props_6 extends ButtonHTMLAttributes<HTMLButtonElement> {
    color?: string;
}

declare interface Props_7 {
    children: ReactNode;
    title?: string | ReactNode;
    id?: string;
    className?: string;
}

declare interface Props_8 extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading: boolean;
}

declare interface Props_9 {
    taskLabel: "DocGen" | "ChartBot";
}

export { Row }

export declare interface SelectedColumn {
    name: string;
    table: string;
}

export { Spinner }

declare interface SqlLineage {
    tableEdges: [string, string][];
    details: StaticLineageDetails;
    errorMessage?: undefined;
    nodePositions?: Record<string, [number, number]>;
}

export declare const Stack: ForwardRefExoticComponent<    {
children: ReactNode;
direction?: "row" | "column";
} & HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>;

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

export declare const TeammateActions: CaseReducerActions<    {
setShowCoachingForm: (state: WritableDraft<TeamMateState>, action: PayloadAction<TeamMateState["showCoachingForm"]>) => void;
}, "teamMate">;

declare interface TeamMateContextProps {
    state: TeamMateState;
    dispatch: Dispatch<UnknownAction>;
}

export declare const TeamMateProvider: ({ children, }: {
    children: ReactNode;
}) => JSX.Element;

declare interface TeamMateState {
    showCoachingForm: boolean;
}

export declare const Tooltip: (props: Props_7) => JSX.Element;

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

