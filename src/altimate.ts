import type { RequestInit } from "node-fetch";
import { ColumnMetaData, NodeMetaData, SourceMetaData } from "./domain";
import { DBTTerminal } from "./dbt_client/terminal";
import { PreconfiguredNotebookItem, NotebookItem, NotebookSchema } from "@lib";
import * as vscode from "vscode";
import { inject } from "inversify";
import { DBTConfiguration } from "./dbt_client/configuration";
import { AltimateHttpClient } from "./services/altimateHttpClient";

export class UserInputError extends Error {}

export interface ColumnLineage {
  source: { uniqueId: string; column_name: string };
  target: { uniqueId: string; column_name: string };
  type: string;
  views_type?: string;
  views_code?: string[];
}

interface Schemas {
  [key: string]: { [key: string]: unknown };
}

export type ModelNode = {
  database: string;
  schema: string;
  name: string;
  alias: string;
  uniqueId: string;
  columns: { [columnName: string]: ColumnMetaData };
  path: string | undefined;
};

export type ModelInfo = {
  model_node: ModelNode;
  compiled_sql?: string;
  raw_sql?: string;
};

export interface DBTColumnLineageRequest {
  model_dialect: string;
  targets: { uniqueId: string; column_name: string }[];
  model_info: ModelInfo[];
  upstream_expansion: boolean;
  upstream_models: string[];
  selected_column: { model_node?: ModelNode; column: string };
  session_id: string;
  show_indirect_edges: boolean;
  event_type: string;
}

export interface DBTColumnLineageResponse {
  column_lineage: ColumnLineage[];
  confidence?: { confidence: string; message?: string };
  errors?: string[];
  errors_dict?: Record<string, string[]>;
}

interface SQLLineageRequest {
  model_dialect: string;
  model_info: { model_node: ModelNode }[];
  compiled_sql: string;
  session_id: string;
}

export type SqlLineageDetails = Record<
  string,
  {
    name: string;
    type: string;
    nodeType?: string;
    nodeId?: string;
    sql: string;
    columns: { name: string; datatype?: string; expression?: string }[];
  }
>;
type SqlLineageResponse = {
  tableEdges: [string, string][];
  details: SqlLineageDetails;
  nodePositions?: Record<string, [number, number]>;
};

interface SQLToModelRequest {
  sql: string;
  adapter: string;
  models: NodeMetaData[];
  sources: SourceMetaData[];
}

interface DBTProjectHealthConfig {
  id: number;
  name: string;
  description: string;
  created_on: string;
  config: Record<string, unknown>;
  config_schema: unknown[];
}

interface DBTProjectHealthConfigResponse {
  items: DBTProjectHealthConfig[];
}

export interface SQLToModelResponse {
  sql: string;
}

interface NotebooksResponse {
  notebooks: PreconfiguredNotebookItem[];
}

interface AddNotebookRequest {
  name: string;
  description: string;
  tags_list: string[];
  data?: NotebookSchema;
}

interface UpdateNotebookRequest {
  name: string;
  description?: string;
  tags_list?: string[];
  data?: NotebookSchema;
}

interface OnewayFeedback {
  feedback_value: "good" | "bad";
  feedback_text: string;
  feedback_src: "dbtpu-extension";
  data: any;
}

export enum QueryAnalysisType {
  EXPLAIN = "explain",
  FIX = "fix",
  MODIFY = "modify",
  TRANSLATE = "translate",
}

export enum QueryAnalysisChatType {
  SYSTEM = "SystemMessage",
  HUMAN = "HumanMessage",
}

interface QueryAnalysisChat {
  type: QueryAnalysisChatType;
  content: string;
  additional_kwargs?: Record<string, unknown>;
}

export interface QueryTranslateRequest {
  sql: string;
  target_dialect: string;
  source_dialect: string;
}

export interface QueryTranslateExplanationRequest {
  user_sql: string;
  translated_sql: string;
  target_dialect: string;
  source_dialect: string;
}

interface DbtModel {
  model_name: string;
  model_description?: string;
  compiled_sql?: string;
  columns: {
    column_name: string;
    description?: string;
    data_type?: string;
  }[];
  adapter?: string;
}

export interface QueryBookmark {
  id: number;
  compiled_sql: string;
  raw_sql: string;
  name: string;
  adapter_type: string;
  created_on: string;
  updated_on: string;
  tags: { id: number; tag: string }[];
}

export interface QueryAnalysisRequest {
  session_id: string;
  job_type: QueryAnalysisType;
  model: DbtModel;
  user_request?: string; // required for modify query
  history?: QueryAnalysisChat[];
}

export interface CreateDbtTestRequest {
  session_id: string;
  model: DbtModel;
  column_name?: string;
  user_request?: string;
}

interface DocsGenerateModelRequestV2 {
  columns: string[];
  dbt_model: DbtModel;
  user_instructions?: {
    prompt_hint: string;
    language: string;
    persona: string;
  };
  follow_up_instructions?: {
    instruction: string;
  };
  prompt_hint?: string;
  gen_model_description: boolean;
  column_index_count: number | undefined;
  session_id: string | undefined;
  is_bulk_gen: boolean;
}

export interface DocsGenerateResponse {
  column_descriptions?: {
    column_name: string;
    column_description: string;
    column_citations?: { id: string; content: string }[];
  }[];
  model_description?: string;
  model_citations?: { id: string; content: string }[];
}

export interface DBTCoreIntegration {
  id: number;
  name: string;
  created_at: string;
  last_modified_at: string;
  last_file_upload_time: string;
}

export interface TenantUser {
  id: number;
  uuid: string;
  display_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  is_active: boolean;
  is_verified: boolean;
  is_invited: boolean;
  is_onboarded: boolean;
  created_at: string;
  role_title: string;
}

interface FeedbackResponse {
  ok: boolean;
}

interface BulkDocsPropRequest {
  num_columns: number;
  session_id: string;
}

export interface SharedDoc {
  share_id: number;
  name: string;
  description: string;
  project_name: string;
  conversation_group: [ConversationGroup];
}

export interface Conversation {
  conversation_id: number;
  message: string;
  timestamp: string;
  user_id: number;
}

export interface ConversationGroup {
  conversation_group_id: number;
  owner: number;
  status: "Pending" | "Resolved";
  meta: {
    field?: "description";
    column?: string;
    highlight: string;
    uniqueId?: string;
    filePath: string;
    resource_type?: string;
    range:
      | {
          end: vscode.Range["end"];
          start: vscode.Range["start"];
        }
      | undefined;
  };
  conversations: Conversation[];
}

export class AltimateRequest {
  constructor(
    private dbtTerminal: DBTTerminal,
    @inject("DBTConfiguration")
    private dbtConfiguration: DBTConfiguration,
    private altimateHttpClient: AltimateHttpClient,
  ) {}

  public getAltimateUrl(): string {
    return this.altimateHttpClient.getAltimateUrl();
  }

  private async internalFetch(url: string, init?: RequestInit) {
    return this.altimateHttpClient.internalFetch(url, init);
  }

  getInstanceName() {
    return this.dbtConfiguration.getAltimateInstanceName();
  }

  getAIKey() {
    return this.dbtConfiguration.getAltimateAiKey();
  }

  public enabled(): boolean {
    return !!this.altimateHttpClient.getConfig();
  }

  async fetchAsStream<R>(
    endpoint: string,
    request: R,
    onProgress: (response: string) => void,
    timeout: number = 120000,
  ) {
    return this.altimateHttpClient.fetchAsStream(
      endpoint,
      request,
      onProgress,
      timeout,
    );
  }

  async uploadToS3(
    endpoint: string,
    fetchArgs: Record<string, unknown>,
    filePath: string,
  ) {
    return this.altimateHttpClient.uploadToS3(endpoint, fetchArgs, filePath);
  }

  private throwIfLocalMode(endpoint: string) {
    try {
      this.altimateHttpClient.throwIfLocalMode(endpoint);
    } catch (error) {
      // Apply additional local mode exceptions specific to AltimateRequest
      endpoint = endpoint.split("?")[0];
      if (
        [
          /^dbtconfig\/datapilot_version\/.*$/,
          /^dbtconfig\/.*\/download$/,
        ].some((regex) => regex.test(endpoint))
      ) {
        return;
      }
      if (
        [
          "auth_health",
          "dbtconfig",
          "dbt/v1/fetch_artifact_url",
          "dbtconfig/extension/start_scan",
          "dbt/v1/project_integrations",
          "dbt/v1/defer_to_prod_event",
          "dbt/v3/validate-credentials",
        ].includes(endpoint)
      ) {
        return;
      }
      throw error;
    }
  }

  async fetch<T>(
    endpoint: string,
    fetchArgs = {},
    timeout: number = 120000,
  ): Promise<T> {
    this.dbtTerminal.debug("network:request", endpoint, fetchArgs);
    this.throwIfLocalMode(endpoint);
    return this.altimateHttpClient.fetch<T>(
      endpoint,
      fetchArgs as RequestInit,
      timeout,
    );
  }

  private getQueryString = (
    params: Record<string, string | number>,
  ): string => {
    const queryString = Object.keys(params)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`,
      )
      .join("&");

    return queryString ? `?${queryString}` : "";
  };

  async isAuthenticated() {
    try {
      await this.fetch<void>("auth_health", {
        method: "POST",
      });
    } catch (error) {
      return false;
    }
    return true;
  }

  async generateModelDocsV2(docsGenerate: DocsGenerateModelRequestV2) {
    return this.fetch<DocsGenerateResponse>("dbt/v2", {
      method: "POST",
      body: JSON.stringify(docsGenerate),
    });
  }

  async sendFeedback(feedback: OnewayFeedback) {
    return await this.fetch<FeedbackResponse>("feedbacks/ai/fb", {
      method: "POST",
      body: JSON.stringify(feedback),
    });
  }

  async getColumnLevelLineage(req: DBTColumnLineageRequest) {
    return this.fetch<DBTColumnLineageResponse>("dbt/v4/lineage", {
      method: "POST",
      body: JSON.stringify(req),
    });
  }

  async runModeller(req: SQLToModelRequest) {
    return this.fetch<SQLToModelResponse>("dbt/v1/sqltomodel", {
      method: "POST",
      body: JSON.stringify(req),
    });
  }

  async validateCredentials(instance: string, key: string) {
    const url = `${this.getAltimateUrl()}/dbt/v3/validate-credentials`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-tenant": instance,
        Authorization: "Bearer " + key,
        "Content-Type": "application/json",
      },
    });
    return (await response.json()) as Record<string, any> | undefined;
  }

  async checkApiConnectivity() {
    const url = `${this.getAltimateUrl()}/health`;
    try {
      const response = await this.internalFetch(url, { method: "GET" });
      const { status } = (await response.json()) as { status: string };
      return { status };
    } catch (e) {
      this.dbtTerminal.error(
        "checkApiConnectivity",
        "Unable to connect to backend",
        e,
        true,
        { url },
      );
      const errorMsg = e instanceof Error ? e.message : JSON.stringify(e);
      return { status: "not-ok", errorMsg };
    }
  }

  async fetchProjectIntegrations() {
    return this.fetch<DBTCoreIntegration[]>("dbt/v1/project_integrations");
  }

  async getHealthcheckConfigs() {
    return this.fetch<DBTProjectHealthConfigResponse>(
      `dbtconfig${this.getQueryString({ size: "100" })}`,
    );
  }

  async logDBTHealthcheckConfig(configId: string) {
    return this.fetch(`dbtconfig/${configId}/download`);
  }

  async logDBTHealthcheckStartScan() {
    return this.fetch(`dbtconfig/extension/start_scan`);
  }

  async getDatapilotVersion(extension_version: string) {
    return this.fetch<{ altimate_datapilot_version: string }>(
      `dbtconfig/datapilot_version/${extension_version}`,
    );
  }

  async getUsersInTenant() {
    return await this.fetch<TenantUser[]>("users/chat");
  }

  async getCurrentUser() {
    return await this.fetch<TenantUser>("dbt/dbt_docs_share/user/details");
  }

  async getAllSharedDbtDocs(projectNames: string[]) {
    const params = new URLSearchParams();
    projectNames.forEach((p) => params.append("projects", p));
    return await this.fetch<SharedDoc[]>(
      `dbt/dbt_docs_share/all?${params.toString()}`,
    );
  }

  async getAppUrlByShareId(shareId: SharedDoc["share_id"]) {
    return await this.fetch<{
      name: string;
      app_url: string;
    }>(`dbt/dbt_docs_share/${shareId}`, {
      method: "GET",
    });
  }

  async addConversationToGroup(
    shareId: SharedDoc["share_id"],
    conversationGroupId: ConversationGroup["conversation_group_id"],
    message: string,
  ) {
    return await this.fetch<{ ok: boolean }>(
      `dbt/dbt_docs_share/${shareId}/conversation_group/${conversationGroupId}/conversation`,
      {
        method: "POST",
        body: JSON.stringify({
          message,
        }),
      },
    );
  }

  async createConversationGroup(
    shareId: SharedDoc["share_id"],
    data: Partial<ConversationGroup> & { message: string },
  ) {
    return await this.fetch<{
      conversation_group_id: ConversationGroup["conversation_group_id"];
      conversation_id: Conversation["conversation_id"];
    }>(`dbt/dbt_docs_share/${shareId}/conversation_group`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async resolveConversation(
    shareId: SharedDoc["share_id"],
    conversationGroupId: ConversationGroup["conversation_group_id"],
  ) {
    return await this.fetch<{ ok: boolean }>(
      `dbt/dbt_docs_share/${shareId}/conversation_group/${conversationGroupId}/resolve`,
      { method: "POST", body: JSON.stringify({ resolved: true }) },
    );
  }

  async loadConversationsByShareId(shareId: SharedDoc["share_id"]) {
    return await this.fetch<{
      dbt_docs_share_conversations: ConversationGroup[];
    }>(`dbt/dbt_docs_share/${shareId}/conversations`);
  }

  async createDbtDocsShare(
    data: {
      name: string;
      description?: string;
    },
    projectName: string,
  ) {
    return await this.fetch<{
      share_id: number;
      manifest_presigned_url: string;
      catalog_presigned_url: string;
    }>("dbt/dbt_docs_share", {
      method: "POST",
      body: JSON.stringify({
        description: data.description,
        name: data.name,
        project_name: projectName,
      }),
    });
  }

  async verifyDbtDocsUpload(share_id: number) {
    return this.fetch<{
      dbt_docs_share_url: string;
    }>("dbt/dbt_docs_share/verify_upload/", {
      method: "POST",
      body: JSON.stringify({ share_id }),
    });
  }

  async getQueryBookmarks() {
    return await this.fetch<QueryBookmark[]>(`query/bookmark`);
  }

  async sqlLineage(req: SQLLineageRequest) {
    return this.fetch<SqlLineageResponse>("dbt/v3/sql_lineage", {
      method: "POST",
      body: JSON.stringify(req),
    });
  }

  async bulkDocsPropCredit(req: BulkDocsPropRequest) {
    return this.fetch<FeedbackResponse>("dbt/v4/bulk-docs-prop-credits", {
      method: "POST",
      body: JSON.stringify(req),
    });
  }

  async getPreConfiguredNotebooks() {
    return this.fetch<PreconfiguredNotebookItem[]>(
      "notebook/preconfigured/list",
      {
        method: "GET",
      },
    );
  }

  async getNotebooks(
    name: string = "",
    tags_list: string[] = [],
    privacy: string = "private",
  ) {
    const params = new URLSearchParams({
      name,
      privacy,
      ...(tags_list.length > 0 && { tags_list: tags_list.join(",") }),
    });
    return this.fetch<NotebookItem[]>(`notebook/list?${params.toString()}`, {
      method: "GET",
    });
  }

  async addNotebook(req: AddNotebookRequest) {
    return this.fetch<FeedbackResponse>("notebook", {
      method: "POST",
      body: JSON.stringify(req),
    });
  }

  async deleteNotebook(id: number) {
    return this.fetch<FeedbackResponse>(`notebook/${id}`, {
      method: "DELETE",
    });
  }

  async updateNotebook(id: number, req: UpdateNotebookRequest) {
    return this.fetch<FeedbackResponse>(`notebook/${id}`, {
      method: "PUT",
      body: JSON.stringify(req),
    });
  }

  async updateNotebookPrivacy(id: number, privacy: string) {
    const params = new URLSearchParams({ privacy: privacy });
    return this.fetch<FeedbackResponse>(
      `notebook/privacy/${id}?${params.toString()}`,
      {
        method: "PUT",
      },
    );
  }

  async trackBulkTestGen(sessionId: string) {
    return this.fetch<{ ok: boolean }>(`dbt/v2/bulk_test_gen`, {
      method: "POST",
      body: JSON.stringify({ session_id: sessionId }),
    });
  }
}
