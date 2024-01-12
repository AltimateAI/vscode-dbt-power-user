import { window, workspace } from "vscode";
import { provideSingleton } from "./utils";
import fetch from "node-fetch";
import { NodeMetaData, SourceMetaData } from "./domain";

interface AltimateConfig {
  key: string;
  instance: string;
}

export interface ColumnLineage {
  source: [string, string];
  target: [string, string];
  type: string;
}

interface Schemas {
  [key: string]: { [key: string]: unknown };
}

export interface DBTColumnLineageRequest {
  targets: [string, string][];
  model_dialect: string;
  model_info: {
    model_node: NodeMetaData;
    compiled_sql: string | undefined;
  }[];
  schemas?: Schemas | null;
  upstream_expansion: boolean;
  selected_column: { model_node?: NodeMetaData; column: string };
  parent_models: { model_node: NodeMetaData }[];
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

interface DocsGenerateModelRequest {
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

interface DocsGenerateResponse {
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

@provideSingleton(AltimateRequest)
export class AltimateRequest {
  private static ALTIMATE_URL = workspace
    .getConfiguration("dbt")
    .get<string>("altimateUrl", "https://api.myaltimate.com");

  private getConfig(): AltimateConfig | undefined {
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

  async fetch<T>(endpoint: string, fetchArgs = {}, timeout: number = 120000) {
    const abortController = new AbortController();
    const timeoutHandler = setTimeout(() => {
      abortController.abort();
    }, timeout);

    const config = this.getConfig();
    if (config === undefined) {
      window.showErrorMessage(
        "This is an Altimate freemium feature. Please sign up for a free Altimate account to use this.",
      );
      return;
    }

    let response;
    try {
      const url = `${AltimateRequest.ALTIMATE_URL}/${endpoint}`;
      response = await fetch(url, {
        method: "GET",
        ...fetchArgs,
        signal: abortController.signal,
        headers: {
          "x-tenant": config.instance,
          Authorization: "Bearer " + config.key,
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      clearTimeout(timeoutHandler);
      throw e;
    }
    clearTimeout(timeoutHandler);
    return (await response.json()) as T;
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

  async sendFeedback(feedback: OnewayFeedback) {
    await this.fetch<void>("feedbacks/ai/fb", {
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
    return this.fetch<DBTColumnLineageResponse>("dbt/v2/lineage", {
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
}
