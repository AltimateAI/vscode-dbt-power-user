import { CommentThread, env, Uri, window, workspace } from "vscode";
import { provideSingleton, processStreamResponse } from "./utils";
import fetch from "node-fetch";
import { ColumnMetaData, NodeMetaData, SourceMetaData } from "./domain";
import { TelemetryService } from "./telemetry";
import { join } from "path";
import { createReadStream, createWriteStream, mkdirSync, ReadStream } from "fs";
import * as os from "os";
import { RateLimitException, ExecutionsExhaustedException } from "./exceptions";
import { DBTProject } from "./manifest/dbtProject";
import { DBTTerminal } from "./dbt_client/dbtTerminal";
import { PythonEnvironment } from "./manifest/pythonEnvironment";

export class NoCredentialsError extends Error {}

export class NotFoundError extends Error {}

export class UserInputError extends Error {}

export class ForbiddenError extends Error {
  constructor() {
    super("Invalid credentials. Please check instance name and API Key.");
  }
}

export class APIError extends Error {}

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
  }[];
  model_description?: string;
}

export interface DBTCoreIntegration {
  id: number;
  name: string;
  created_at: string;
  last_modified_at: string;
  last_file_upload_time: string;
}

interface DownloadArtifactResponse {
  url: string;
  dbt_core_integration_file_id: number;
}

export type ValidateSqlParseErrorType =
  | "sql_parse_error"
  | "sql_invalid_error"
  | "sql_unknown_error";

export interface ValidateSqlParseErrorResponse {
  error_type?: ValidateSqlParseErrorType;
  errors: {
    description: string;
    start_position?: [number, number];
    end_position?: [number, number];
  }[];
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

interface AltimateConfig {
  key: string;
  instance: string;
}

enum PromptAnswer {
  YES = "Get your free API Key",
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
    range: {
      end: CommentThread["range"]["end"];
      start: CommentThread["range"]["start"];
    };
  };
  conversations: Conversation[];
}

@provideSingleton(AltimateRequest)
export class AltimateRequest {
  private static ALTIMATE_URL = workspace
    .getConfiguration("dbt")
    .get<string>("altimateUrl", "https://api.myaltimate.com");

  constructor(
    private telemetry: TelemetryService,
    private dbtTerminal: DBTTerminal,
    private pythonEnvironment: PythonEnvironment,
  ) {}

  getInstanceName() {
    return this.pythonEnvironment.getResolvedConfigValue(
      "altimateInstanceName",
    );
  }

  getAIKey() {
    return this.pythonEnvironment.getResolvedConfigValue("altimateAiKey");
  }

  public enabled(): boolean {
    return !!this.getConfig();
  }

  private async showAPIKeyMessage(message: string) {
    const answer = await window.showInformationMessage(
      message,
      PromptAnswer.YES,
    );
    if (answer === PromptAnswer.YES) {
      env.openExternal(
        Uri.parse("https://app.myaltimate.com/register?source=extension"),
      );
    }
  }

  private getConfig(): AltimateConfig | undefined {
    const key = this.getAIKey();
    const instance = this.getInstanceName();
    if (!key || !instance) {
      return undefined;
    }
    return { key, instance };
  }

  getCredentialsMessage(): string | undefined {
    const key = this.getAIKey();
    const instance = this.getInstanceName();

    if (!key && !instance) {
      return `To use this feature, please add an API Key and an instance name in the settings.`;
    }
    if (!key) {
      return `To use this feature, please add an API key in the settings.`;
    }
    if (!instance) {
      return `To use this feature, please add an instance name in the settings.`;
    }
    return;
  }

  handlePreviewFeatures(): boolean {
    const message = this.getCredentialsMessage();
    if (!message) {
      return true;
    }
    this.showAPIKeyMessage(message);
    return false;
  }

  async fetchAsStream<R>(
    endpoint: string,
    request: R,
    onProgress: (response: string) => void,
    timeout: number = 120000,
  ) {
    this.throwIfLocalMode(endpoint);
    const url = `${AltimateRequest.ALTIMATE_URL}/${endpoint}`;
    this.dbtTerminal.debug("fetchAsStream:request", url, request);
    const config = this.getConfig()!;
    const abortController = new AbortController();
    const timeoutHandler = setTimeout(() => {
      abortController.abort();
    }, timeout);
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(request),
        signal: abortController.signal,
        headers: {
          "x-tenant": config.instance,
          Authorization: "Bearer " + config.key,
          "Content-Type": "application/json",
        },
      });

      if (response.ok && response.status === 200) {
        if (!response?.body) {
          this.dbtTerminal.debug("fetchAsStream", "empty response");
          return null;
        }
        const responseText = await processStreamResponse(
          response.body,
          onProgress,
        );

        return responseText;
      }
      if (
        // response codes when backend authorization fails
        response.status === 401 ||
        response.status === 403
      ) {
        this.telemetry.sendTelemetryEvent("invalidCredentials", { url });
        throw new ForbiddenError();
      }
      if (response.status === 404) {
        this.telemetry.sendTelemetryEvent("resourceNotFound", { url });
        throw new NotFoundError("Resource Not found");
      }
      if (response.status === 402) {
        const jsonResponse = (await response.json()) as { detail: string };
        throw new ExecutionsExhaustedException(jsonResponse.detail);
      }
      const textResponse = await response.text();
      this.dbtTerminal.debug(
        "network:response",
        "error from backend",
        textResponse,
      );
      if (response.status === 429) {
        throw new RateLimitException(
          textResponse,
          response.headers.get("Retry-After")
            ? parseInt(response.headers.get("Retry-After") || "")
            : 1 * 60 * 1000, // default to 1 min
        );
      }
      this.telemetry.sendTelemetryError("apiError", {
        endpoint,
        status: response.status,
        textResponse,
      });
      throw new APIError(
        `Could not process request, server responded with ${response.status}: ${textResponse}`,
      );
    } catch (error) {
      this.dbtTerminal.error(
        "apiCatchAllError",
        "fetchAsStream catchAllError",
        error,
        true,
        {
          endpoint,
        },
      );
      throw error;
    } finally {
      clearTimeout(timeoutHandler);
    }
    return null;
  }

  private async readStreamToBlob(stream: ReadStream) {
    return new Promise((resolve, reject) => {
      const chunks: any[] = [];
      stream.on("data", (chunk) => chunks.push(chunk));
      stream.on("end", () => {
        const blob = new Blob(chunks);
        resolve(blob);
      });
      stream.on("error", reject);
    });
  }

  async uploadToS3(
    endpoint: string,
    fetchArgs: Record<string, unknown>,
    filePath: string,
  ) {
    this.dbtTerminal.debug("uploadToS3:", endpoint, fetchArgs, filePath);
    this.throwIfLocalMode(endpoint);

    const blob = (await this.readStreamToBlob(
      createReadStream(filePath),
    )) as Blob;
    const response = await fetch(endpoint, {
      ...fetchArgs,
      method: "PUT",
      body: blob,
    });

    this.dbtTerminal.debug(
      "uploadToS3:response:",
      `${response.status}`,
      response.statusText,
    );
    if (!response.ok || response.status !== 200) {
      const textResponse = await response.text();
      this.telemetry.sendTelemetryError("uploadToS3", {
        endpoint,
        status: response.status,
        textResponse,
      });
      throw new Error("Failed to upload data to signed url");
    }

    return response;
  }

  private throwIfLocalMode(endpoint: string) {
    const isLocalMode = workspace
      .getConfiguration("dbt")
      .get<boolean>("isLocalMode", false);
    if (!isLocalMode) {
      return;
    }
    endpoint = endpoint.split("?")[0];
    if (
      [/^dbtconfig\/datapilot_version\/.*$/, /^dbtconfig\/.*\/download$/].some(
        (regex) => regex.test(endpoint),
      )
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
    throw new Error("This feature is not supported in local mode.");
  }

  async fetch<T>(
    endpoint: string,
    fetchArgs = {},
    timeout: number = 120000,
  ): Promise<T> {
    this.dbtTerminal.debug("network:request", endpoint, fetchArgs);
    this.throwIfLocalMode(endpoint);

    const abortController = new AbortController();
    const timeoutHandler = setTimeout(() => {
      abortController.abort();
    }, timeout);

    const message = this.getCredentialsMessage();
    if (message) {
      throw new NoCredentialsError(message);
    }
    const config = this.getConfig()!;

    try {
      const url = `${AltimateRequest.ALTIMATE_URL}/${endpoint}`;
      const response = await fetch(url, {
        method: "GET",
        ...fetchArgs,
        signal: abortController.signal,
        headers: {
          "x-tenant": config.instance,
          Authorization: "Bearer " + config.key,
          "Content-Type": "application/json",
        },
      });
      this.dbtTerminal.debug("network:response", endpoint, response.status);
      if (response.ok && response.status === 200) {
        const jsonResponse = await response.json();
        return jsonResponse as T;
      }
      if (
        // response codes when backend authorization fails
        response.status === 401 ||
        response.status === 403
      ) {
        this.telemetry.sendTelemetryEvent("invalidCredentials", { url });
        throw new ForbiddenError();
      }
      if (response.status === 404) {
        this.telemetry.sendTelemetryEvent("resourceNotFound", { url });
        throw new NotFoundError("Resource Not found");
      }
      if (response.status === 402) {
        const jsonResponse = (await response.json()) as { detail: string };
        throw new ExecutionsExhaustedException(jsonResponse.detail);
      }
      const textResponse = await response.text();
      this.dbtTerminal.debug(
        "network:response",
        "error from backend",
        textResponse,
      );
      if (response.status === 429) {
        throw new RateLimitException(
          textResponse,
          response.headers.get("Retry-After")
            ? parseInt(response.headers.get("Retry-After") || "")
            : 1 * 60 * 1000, // default to 1 min
        );
      }
      this.telemetry.sendTelemetryError("apiError", {
        endpoint,
        status: response.status,
        textResponse,
      });
      throw new APIError(
        `Could not process request, server responded with ${response.status}: ${textResponse}`,
      );
    } catch (e) {
      this.dbtTerminal.error("apiCatchAllError", "catchAllError", e, true, {
        endpoint,
      });
      throw e;
    } finally {
      clearTimeout(timeoutHandler);
    }
  }

  async downloadFileLocally(
    artifactUrl: string,
    projectRoot: Uri,
    fileName = "manifest.json",
  ): Promise<string> {
    const hashedProjectRoot = DBTProject.hashProjectRoot(projectRoot.fsPath);
    const tempFolder = join(os.tmpdir(), hashedProjectRoot);

    try {
      this.dbtTerminal.debug(
        "AltimateRequest",
        `creating temporary folder: ${tempFolder} for file: ${fileName}`,
      );
      mkdirSync(tempFolder, { recursive: true });

      const destinationPath = join(tempFolder, fileName);

      this.dbtTerminal.debug(
        "AltimateRequest",
        `fetching artifactUrl: ${artifactUrl}`,
      );
      const response = await fetch(artifactUrl, { agent: undefined });

      const fileStream = createWriteStream(destinationPath);
      await new Promise((resolve, reject) => {
        response.body?.pipe(fileStream);
        response.body?.on("error", reject);
        fileStream.on("finish", resolve);
      });

      this.dbtTerminal.debug("File downloaded successfully!", fileName);
      return tempFolder;
    } catch (err) {
      this.dbtTerminal.error(
        "downloadFileLocally",
        `Could not save ${fileName} locally`,
        err,
      );
      window.showErrorMessage(`Could not save ${fileName} locally: ${err}`);
      throw err;
    }
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
    const url = `${AltimateRequest.ALTIMATE_URL}/dbt/v3/validate-credentials`;
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
    const url = `${AltimateRequest.ALTIMATE_URL}/health`;
    try {
      const response = await fetch(url, { method: "GET" });
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

  async sendDeferToProdEvent(defer_type: string) {
    return this.fetch("dbt/v1/defer_to_prod_event", {
      method: "POST",
      body: JSON.stringify({ defer_type }),
    });
  }

  async fetchArtifactUrl(artifact_type: string, dbtCoreIntegrationId: number) {
    return this.fetch<DownloadArtifactResponse>(
      `dbt/v1/fetch_artifact_url${this.getQueryString({
        artifact_type: artifact_type,
        dbt_core_integration_id: dbtCoreIntegrationId,
      })}`,
    );
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
      uri?: Uri;
      model?: string;
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
}
