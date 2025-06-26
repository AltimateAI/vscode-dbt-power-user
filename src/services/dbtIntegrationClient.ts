import { AltimateHttpClient } from "./altimateHttpClient";
import { join } from "path";
import { createWriteStream, mkdirSync } from "fs";
import * as os from "os";
import { hashProjectRoot } from "../dbt_client/dbtIntegration";
import { DBTTerminal } from "../dbt_client/terminal";

interface DownloadArtifactResponse {
  url: string;
  dbt_core_integration_file_id: number;
}

/**
 * Client for dbt integration-specific API operations.
 * Handles defer-to-production events, artifact downloads, and manifest management.
 */
export class DbtIntegrationClient {
  constructor(
    private altimateHttpClient: AltimateHttpClient,
    private dbtTerminal: DBTTerminal,
  ) {}

  /**
   * Send defer-to-production event for analytics tracking
   */
  async sendDeferToProdEvent(deferType: string): Promise<any> {
    return this.altimateHttpClient.fetch("dbt/v1/defer_to_prod_event", {
      method: "POST",
      body: JSON.stringify({ defer_type: deferType }),
    });
  }

  /**
   * Fetch artifact URL for downloading remote manifest files
   */
  async fetchArtifactUrl(
    artifactType: string,
    dbtCoreIntegrationId: number,
  ): Promise<DownloadArtifactResponse> {
    const queryString = this.getQueryString({
      artifact_type: artifactType,
      dbt_core_integration_id: dbtCoreIntegrationId,
    });
    return this.altimateHttpClient.fetch<DownloadArtifactResponse>(
      `dbt/v1/fetch_artifact_url${queryString}`,
    );
  }

  /**
   * Download a file locally from a remote URL
   */
  async downloadFileLocally(
    artifactUrl: string,
    projectRoot: string,
    fileName = "manifest.json",
  ): Promise<string> {
    const hashedProjectRoot = hashProjectRoot(projectRoot);
    const tempFolder = join(os.tmpdir(), hashedProjectRoot);

    this.dbtTerminal.debug(
      "DbtIntegrationClient",
      `creating temporary folder: ${tempFolder} for file: ${fileName}`,
    );
    mkdirSync(tempFolder, { recursive: true });

    const destinationPath = join(tempFolder, fileName);

    this.dbtTerminal.debug(
      "DbtIntegrationClient",
      `fetching artifactUrl: ${artifactUrl}`,
    );
    const response = await this.altimateHttpClient.internalFetch(artifactUrl, {
      agent: undefined,
    });

    if (!response.ok) {
      throw new Error(`Failed to download file: ${response.statusText}`);
    }
    const fileStream = createWriteStream(destinationPath);
    await new Promise((resolve, reject) => {
      response.body?.pipe(fileStream);
      response.body?.on("error", reject);
      fileStream.on("finish", resolve);
    });

    this.dbtTerminal.debug("File downloaded successfully!", fileName);
    return tempFolder;
  }

  /**
   * Generate query string from parameters
   */
  private getQueryString(params: Record<string, string | number>): string {
    const queryString = Object.keys(params)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`,
      )
      .join("&");

    return queryString ? `?${queryString}` : "";
  }
}
