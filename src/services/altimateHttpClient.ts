import { DBTConfiguration } from "../dbt_client/configuration";
import { DBTTerminal } from "../dbt_client/terminal";
import type { RequestInit, Response as NodeFetchResponse } from "node-fetch";
import { createReadStream, ReadStream } from "fs";
import { RateLimitException } from "../exceptions/rateLimitException";
import { ExecutionsExhaustedException } from "../exceptions/executionsExhaustedException";

export class NoCredentialsError extends Error {}

export class NotFoundError extends Error {}

export class ForbiddenError extends Error {
  constructor() {
    super("Invalid credentials. Please check instance name and API Key.");
  }
}

export class APIError extends Error {}

const processStreamResponse = async (
  stream: NodeJS.ReadableStream | ReadableStream,
  cb: (data: string) => void,
): Promise<string> => {
  if (stream instanceof ReadableStream) {
    const reader = stream.getReader();
    const decoder = new TextDecoder();
    let result = "";
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        const chunk = decoder.decode(value, { stream: true });
        result += chunk;
        cb(chunk);
      }
      return result;
    } finally {
      reader.releaseLock();
    }
  } else {
    return new Promise((resolve, reject) => {
      let result = "";
      stream.on("data", (chunk: Buffer) => {
        const data = chunk.toString();
        result += data;
        cb(data);
      });
      stream.on("end", () => resolve(result));
      stream.on("error", reject);
    });
  }
};

export interface AltimateConfig {
  key: string;
  instance: string;
}

/**
 * HTTP client for Altimate API requests.
 * Provides common functionality like authentication, error handling, and request/response processing.
 * Used as a collaborator by domain-specific API clients.
 */
export class AltimateHttpClient {
  constructor(
    private dbtTerminal: DBTTerminal,
    private dbtConfiguration: DBTConfiguration,
  ) {}

  public getAltimateUrl(): string {
    return this.dbtConfiguration.getAltimateUrl();
  }

  public getConfig(): AltimateConfig | undefined {
    const key = this.dbtConfiguration.getAltimateAiKey();
    const instance = this.dbtConfiguration.getAltimateInstanceName();
    if (!key || !instance) {
      return undefined;
    }
    return { key, instance };
  }

  public throwIfLocalMode(endpoint: string) {
    const isLocalMode = this.dbtConfiguration.getIsLocalMode();
    if (!isLocalMode) {
      return;
    }
    throw new Error(
      `Cannot use ${endpoint} in local mode. Please switch to cloud mode in settings.`,
    );
  }

  public async internalFetch(url: string, init?: RequestInit) {
    const nodeFetch = (await import("node-fetch")).default;
    return nodeFetch(url, init);
  }

  /**
   * Makes a GET request to the Altimate API
   */
  public async fetch<T>(
    endpoint: string,
    fetchArgs: RequestInit = {},
    timeout: number = 120000,
  ): Promise<T> {
    this.throwIfLocalMode(endpoint);
    const abortController = new AbortController();
    const timeoutHandler = setTimeout(() => {
      abortController.abort();
    }, timeout);

    const config = this.getConfig();
    if (!config) {
      throw new NoCredentialsError("Missing API credentials");
    }

    let textResponse;
    let responseStatus;

    try {
      const url = `${this.getAltimateUrl()}/${endpoint}`;
      const response = await this.internalFetch(url, {
        method: "GET",
        ...fetchArgs,
        signal: abortController.signal,
        headers: {
          "x-tenant": config.instance,
          Authorization: "Bearer " + config.key,
          "Content-Type": "application/json",
        },
      });
      responseStatus = response.status;

      this.dbtTerminal.debug("network:response", endpoint, response.status);
      if (response.ok && responseStatus === 200) {
        const jsonResponse = await response.json();
        return jsonResponse as T;
      }

      return this.handleErrorResponse(response, endpoint);
    } catch (error) {
      this.dbtTerminal.error(
        "apiCatchAllError",
        "fetch catchAllError",
        error,
        true,
        {
          errorType: (error as Error).name,
          statusCode: responseStatus,
          textResponse: textResponse,
          endpoint,
        },
      );
      throw error;
    } finally {
      clearTimeout(timeoutHandler);
    }
  }

  /**
   * Makes a POST request with streaming response to the Altimate API
   */
  public async fetchAsStream<R>(
    endpoint: string,
    request: R,
    onProgress: (response: string) => void,
    timeout: number = 120000,
  ): Promise<string | null> {
    this.throwIfLocalMode(endpoint);
    const url = `${this.getAltimateUrl()}/${endpoint}`;
    this.dbtTerminal.debug("fetchAsStream:request", url, request);

    const config = this.getConfig();
    if (!config) {
      throw new NoCredentialsError("Missing API credentials");
    }

    const abortController = new AbortController();
    const timeoutHandler = setTimeout(() => {
      abortController.abort();
    }, timeout);

    let textResponse;
    let responseStatus;

    try {
      const response = await this.internalFetch(url, {
        method: "POST",
        body: JSON.stringify(request),
        signal: abortController.signal,
        headers: {
          "x-tenant": config.instance,
          Authorization: "Bearer " + config.key,
          "Content-Type": "application/json",
        },
      });
      responseStatus = response.status;

      if (response.ok && responseStatus === 200) {
        if (!response?.body) {
          this.dbtTerminal.debug("fetchAsStream", "empty response");
          return null;
        }

        // Use the locally defined processStreamResponse function
        const responseText = await processStreamResponse(
          response.body,
          onProgress,
        );

        return responseText;
      }

      return this.handleErrorResponse(response, endpoint);
    } catch (error) {
      this.dbtTerminal.error(
        "apiCatchAllError",
        "fetchAsStream catchAllError",
        error,
        true,
        {
          errorType: (error as Error).name,
          statusCode: responseStatus,
          textResponse: textResponse,
          endpoint,
        },
      );
      throw error;
    } finally {
      clearTimeout(timeoutHandler);
    }
  }

  private async handleErrorResponse(
    response: NodeFetchResponse,
    _endpoint: string,
  ): Promise<any> {
    const responseStatus = response.status;

    if (responseStatus === 401 || responseStatus === 403) {
      throw new ForbiddenError();
    }
    if (responseStatus === 404) {
      throw new NotFoundError("Resource Not found");
    }
    if (responseStatus === 402) {
      const jsonResponse = (await response.json()) as { detail: string };
      throw new ExecutionsExhaustedException(jsonResponse.detail);
    }

    const textResponse = await response.text();
    this.dbtTerminal.debug(
      "network:response",
      "error from backend",
      textResponse,
    );

    if (responseStatus === 429) {
      throw new RateLimitException(
        textResponse,
        response.headers.get("Retry-After")
          ? parseInt(response.headers.get("Retry-After") || "")
          : 1 * 60 * 1000, // default to 1 min
      );
    }

    let jsonResponse: any;
    try {
      jsonResponse = JSON.parse(textResponse);
    } catch {}

    throw new APIError(
      `Could not process request, server responded with ${response.status}: ${jsonResponse?.detail || textResponse}`,
    );
  }

  private async readStreamToBlob(stream: ReadStream): Promise<Blob> {
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

  /**
   * Upload a file to S3 using a presigned URL
   */
  public async uploadToS3(
    endpoint: string,
    fetchArgs: Record<string, unknown>,
    filePath: string,
  ): Promise<NodeFetchResponse> {
    this.dbtTerminal.debug("uploadToS3:", endpoint, fetchArgs, filePath);
    this.throwIfLocalMode(endpoint);

    const blob = (await this.readStreamToBlob(
      createReadStream(filePath),
    )) as Blob;
    const response = await this.internalFetch(endpoint, {
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
      const error = new Error("Failed to upload data to signed url");
      this.dbtTerminal.error(
        "uploadToS3Error",
        "Could not upload to S3",
        error,
        true,
        {
          endpoint,
          status: response.status,
          textResponse,
        },
      );
      throw error;
    }

    return response;
  }
}
