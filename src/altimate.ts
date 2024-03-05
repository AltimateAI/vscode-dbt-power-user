import { env, Uri, window, workspace } from "vscode";
import { provideSingleton, processStreamResponse } from "./utils";
import fetch from "node-fetch";
import { ColumnMetaData, NodeMetaData, SourceMetaData } from "./domain";
import { TelemetryService } from "./telemetry";
import { RateLimitException } from "./exceptions";
import { DBTTerminal } from "./dbt_client/dbtTerminal";

export class NoCredentialsError extends Error {}

export class NotFoundError extends Error {}

export class ForbiddenError extends Error {}

export class APIError extends Error {}

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

export interface CreateDbtTestRequest {
  session_id: string;
  model: DocsGenerateModelRequestV2["dbt_model"];
  user_request?: string;
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
    private telemetry: TelemetryService,
    private dbtTerminal: DBTTerminal,
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

  getCredentialsMessage(): string | undefined {
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

      if (!response?.body) {
        this.dbtTerminal.debug("fetchAsStream", "empty response");
        return null;
      }
      const responseText = await processStreamResponse(
        response.body,
        onProgress,
      );

      return responseText;
    } catch (error) {
      this.dbtTerminal.debug(
        "fetchAsStream",
        "error while fetching as stream",
        error,
      );
    } finally {
      clearTimeout(timeoutHandler);
    }
    return null;
  }

  async fetch<T>(
    endpoint: string,
    fetchArgs = {},
    timeout: number = 120000,
  ): Promise<T> {
    this.dbtTerminal.debug("network:request", endpoint, fetchArgs);
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
        throw new ForbiddenError(
          "To use this feature, please add a valid API Key and an instance name in the settings.",
        );
      }
      if (response.status === 404) {
        this.telemetry.sendTelemetryEvent("resourceNotFound", { url });
        throw new NotFoundError("Resource Not found");
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
}
