import { env, Uri, window, workspace } from "vscode";
import { provideSingleton, processStreamResponse } from "./utils";
import fetch from "node-fetch";
import { ColumnMetaData, NodeMetaData, SourceMetaData } from "./domain";
import { TelemetryService } from "./telemetry";
import { DBTProjectContainer } from "./manifest/dbtProjectContainer";
import { RateLimitException } from "./exceptions";
import { Readable } from "stream";

interface AltimateConfig {
  key: string;
  instance: string;
}

export interface ColumnLineage {
  source: { uniqueId: string; column_name: string };
  target: { uniqueId: string; column_name: string };
  type: string;
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
};

export interface DBTColumnLineageRequest {
  targets: { uniqueId: string; column_name: string }[];
  model_dialect: string;
  model_info: {
    model_node: ModelNode;
    compiled_sql?: string;
  }[];
  schemas?: Schemas | null;
  upstream_expansion: boolean;
  selected_column: {
    model_node?: ModelNode;
    column: string;
  };
  parent_models: {
    model_node: ModelNode;
  }[];
  session_id: string;
}

export interface DBTColumnLineageResponse {
  column_lineage: ColumnLineage[];
  confidence?: { confidence: string; message?: string };
}

interface SQLToModelRequest {
  sql: string;
  adapter: string;
  models: NodeMetaData[];
  sources: SourceMetaData[];
}

interface SQLToModelResponse {
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

export interface QueryAnalysisRequest {
  session_id: string;
  job_type: QueryAnalysisType;
  model: DocsGenerateModelRequestV2["dbt_model"];
  user_request?: string; // required for modify query
  history?: QueryAnalysisChat[];
}

interface DocsGenerateModelRequestV2 {
  columns: string[];
  dbt_model: {
    model_name: string;
    model_description?: string;
    compiled_sql?: string;
    columns: {
      column_name: string;
      description?: string;
      data_type?: string;
    }[];
    adapter?: string;
  };
  user_instructions?: {
    prompt_hint: string;
    language: string;
    persona: string;
  };
  follow_up_instructions?: {
    instruction: string;
  };

  gen_model_description: boolean;
}

export interface DocsGenerateModelRequest {
  columns: string[];
  dbt_model: {
    model_name: string;
    model_description?: string;
    compiled_sql?: string;
    columns: {
      column_name: string;
      description?: string;
      data_type?: string;
    }[];
    adapter?: string;
  };
  prompt_hint: string;
  gen_model_description: boolean;
}

export interface DocsGenerateResponse {
  column_descriptions?: {
    column_name: string;
    column_description: string;
  }[];
  model_description?: string;
}

interface DocPromptOptionsResponse {
  prompt_options: {
    options: {
      key: string;
      value: string;
    }[];
  }[];
}

interface QuerySummaryResponse {
  explanation: string;
  ok: string;
}

interface ValidateSqlRequest {
  sql: string;
  adapter: string;
  models: ModelNode[];
}

interface ShareQuerySignedUrlRequest {
  name: string;
  compile_sql: string;
}

interface UploadQueryResultDataRequest {
  csv_result: string;
}

interface VerifyShareQueryUploadRequest {
  sharing_table_id: number;
}

interface InviteUserRequest {
  company: string;
  email: string;
  role: string;
}

interface InviteUserResponse {
  id: number;
  email: string;
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

interface FeedbackResponse {
  ok: boolean;
}

enum PromptAnswer {
  YES = "Get your free API Key",
}

@provideSingleton(AltimateRequest)
export class AltimateRequest {
  private static ALTIMATE_URL = workspace
    .getConfiguration("dbt")
    .get<string>("altimateUrl", "https://api.myaltimate.com");

  constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private telemetry: TelemetryService,
  ) {}

  getConfig(): AltimateConfig | undefined {
    const key = workspace.getConfiguration("dbt").get<string>("altimateAiKey");
    const instance = workspace
      .getConfiguration("dbt")
      .get<string>("altimateInstanceName");

    if (key && instance) {
      return { key, instance };
    }
    return undefined;
  }

  public enabled() {
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

  private getCredentialsMessage(): string | undefined {
    const key = workspace.getConfiguration("dbt").get<string>("altimateAiKey");
    const instance = workspace
      .getConfiguration("dbt")
      .get<string>("altimateInstanceName");

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
    const url = `${AltimateRequest.ALTIMATE_URL}/${endpoint}`;
    console.log("fetchAsStream:request:", url, request);
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

      if (!response?.body) {
        console.error("fetchAsStream: empty response");
        return null;
      }
      clearTimeout(timeoutHandler);
      const responseText = await processStreamResponse(
        response.body,
        onProgress,
      );

      return responseText;
    } catch (error) {
      clearTimeout(timeoutHandler);
      console.error("error while fetching as stream", error);
    }
    return null;
  }

  async fetch<T>(endpoint: string, fetchArgs = {}, timeout: number = 120000) {
    console.log("network:request:", endpoint, ":", fetchArgs);
    const abortController = new AbortController();
    const timeoutHandler = setTimeout(() => {
      abortController.abort();
    }, timeout);

    const message = this.getCredentialsMessage();
    if (message) {
      window.showErrorMessage(message);
      return;
    }
    const config = this.getConfig()!;

    try {
      const url = `${AltimateRequest.ALTIMATE_URL}/${endpoint}`;
      console.log("network:url:", url);
      const response = await fetch(url, {
        method: "GET",
        ...fetchArgs,
        signal: abortController.signal,
        headers: {
          "x-tenant": config.instance,
          Authorization: "Bearer " + config.key,
          "Content-Type": "application/json",
          "extension-version": this.dbtProjectContainer.extensionVersion,
        },
      });
      console.log("network:response:", endpoint, ":", response.status);
      if (response.ok && response.status === 200) {
        const jsonResponse = await response.json();
        clearTimeout(timeoutHandler);
        return jsonResponse as T;
      }
      if (
        // response codes when backend authorization fails
        response.status === 401 ||
        response.status === 403 ||
        response.status === 404
      ) {
        window.showErrorMessage("Invalid credentials");
        this.telemetry.sendTelemetryEvent("invalidCredentials");
      }
      const textResponse = await response.text();
      console.log("network:response:error:", textResponse);
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
      clearTimeout(timeoutHandler);
      let errorMessage = textResponse;
      try {
        const jsonResponse = JSON.parse(textResponse);
        errorMessage = jsonResponse.detail || jsonResponse;
      } catch {
        /* empty */
      }
      throw new Error(errorMessage);
    } catch (e) {
      console.log("network:response:catchAllError:", e);
      this.telemetry.sendTelemetryError("apiCatchAllError", e, {
        endpoint,
      });
      clearTimeout(timeoutHandler);
      throw e;
    }
  }

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

  async generateModelDocs(docsGenerate: DocsGenerateModelRequest) {
    return this.fetch<DocsGenerateResponse>("dbt/v1", {
      method: "POST",
      body: JSON.stringify(docsGenerate),
    });
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

  async getDocPromptOptions() {
    await this.fetch<DocPromptOptionsResponse>("dbt/v1/doc_prompt_options", {
      method: "POST",
    });
  }

  async getColumnLevelLineage(req: DBTColumnLineageRequest) {
    return this.fetch<DBTColumnLineageResponse>("dbt/v3/lineage", {
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

  async getQuerySummary(compiled_sql: string, adapter: string) {
    return this.fetch<QuerySummaryResponse>("dbt/v1/query-explain", {
      method: "POST",
      body: JSON.stringify({ compiled_sql, adapter }),
    });
  }

  async validateSql(req: ValidateSqlRequest) {
    return this.fetch<ValidateSqlParseErrorResponse>("dbt/v1/modelvalidation", {
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

  async shareQueryResult(req: ShareQuerySignedUrlRequest) {
    return this.fetch<{ sharing_table_id: number; signed_url: string }>(
      "dbt/v3/query-result/share",
      {
        method: "POST",
        body: JSON.stringify(req),
      },
    );
  }

  async uploadDataToSignedUrl(url: string, req: UploadQueryResultDataRequest) {
    console.log("network:request:", url, ":", req);

    const jsonStream = new Readable({
      read() {
        this.push(JSON.stringify(req.csv_result));
        this.push(null);
      },
    });

    const blob = new Blob([jsonStream.read()]);

    const response = await fetch(url, {
      method: "PUT",
      body: blob,
    });
    console.log("network:response:", response.status, response.statusText);
    return response;
  }

  async verifyShareQueryUpload(req: VerifyShareQueryUploadRequest) {
    return this.fetch<{ ok: boolean; share_url: string }>(
      "dbt/v3/query-result/verify",
      {
        method: "POST",
        body: JSON.stringify(req),
      },
    );
  }

  async inviteUser(req: InviteUserRequest) {
    return this.fetch<InviteUserResponse>("users/invite", {
      method: "POST",
      body: JSON.stringify(req),
    });
  }
}
