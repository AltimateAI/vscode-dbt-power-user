import { existsSync, readFileSync, statSync } from "fs";
import { provide } from "inversify-binding-decorators";
import * as path from "path";
import { Uri } from "vscode";
import { DBTTerminal } from "../../dbt_client/dbtTerminal";
import { DBTProject } from "../dbtProject";
import { ManifestCacheChangedEvent } from "../event/manifestCacheChangedEvent";
import { DocParser } from "./docParser";
import { GraphParser } from "./graphParser";
import { MacroParser } from "./macroParser";
import { NodeMetaMapImpl, NodeParser } from "./nodeParser";
import { SourceParser } from "./sourceParser";
import { TestParser } from "./testParser";
import { TelemetryService } from "../../telemetry";
import { ExposureParser } from "./exposureParser";
import { MetricParser } from "./metricParser";

@provide(ManifestParser)
export class ManifestParser {
  private lastSentParseManifestProps: any;

  constructor(
    private nodeParser: NodeParser,
    private macroParser: MacroParser,
    private metricParser: MetricParser,
    private graphParser: GraphParser,
    private sourceParser: SourceParser,
    private testParser: TestParser,
    private exposureParser: ExposureParser,
    private docParser: DocParser,
    private terminal: DBTTerminal,
    private telemetry: TelemetryService,
  ) {}

  public async parseManifest(project: DBTProject) {
    this.terminal.debug(
      "ManifestParser",
      `Going to parse manifest for "${project.getProjectName()}" at ${
        project.projectRoot
      }`,
    );
    const targetPath = project.getTargetPath();
    if (!targetPath) {
      this.terminal.debug(
        "ManifestParser",
        "targetPath should be defined at this stage for project " +
          project.projectRoot.fsPath,
      );
      return;
    }
    const projectRoot = project.projectRoot;
    const manifest = await this.readAndParseManifest(projectRoot, targetPath);
    if (manifest === undefined) {
      const event: ManifestCacheChangedEvent = {
        added: [
          {
            project,
            nodeMetaMap: new NodeMetaMapImpl(),
            macroMetaMap: new Map(),
            metricMetaMap: new Map(),
            sourceMetaMap: new Map(),
            testMetaMap: new Map(),
            graphMetaMap: {
              parents: new Map(),
              children: new Map(),
              tests: new Map(),
              metrics: new Map(),
            },
            docMetaMap: new Map(),
            exposureMetaMap: new Map(),
          },
        ],
      };
      return event;
    }

    const {
      nodes,
      sources,
      macros,
      semantic_models,
      parent_map,
      child_map,
      docs,
      exposures,
    } = manifest;

    const nodeMetaMapPromise = this.nodeParser.createNodeMetaMap(
      nodes,
      project,
    );
    const macroMetaMapPromise = this.macroParser.createMacroMetaMap(
      macros,
      project,
    );
    const metricMetaMapPromise = this.metricParser.createMetricMetaMap(
      semantic_models,
      project,
    );
    const sourceMetaMapPromise = this.sourceParser.createSourceMetaMap(
      sources,
      project,
    );
    const testMetaMapPromise = this.testParser.createTestMetaMap(
      nodes,
      project,
    );
    const exposuresMetaMapPromise = this.exposureParser.createExposureMetaMap(
      exposures,
      project,
    );

    const docMetaMapPromise = this.docParser.createDocMetaMap(docs, project);

    const [
      nodeMetaMap,
      macroMetaMap,
      metricMetaMap,
      sourceMetaMap,
      testMetaMap,
      docMetaMap,
      exposureMetaMap,
    ] = await Promise.all([
      nodeMetaMapPromise,
      macroMetaMapPromise,
      metricMetaMapPromise,
      sourceMetaMapPromise,
      testMetaMapPromise,
      docMetaMapPromise,
      exposuresMetaMapPromise,
    ]);

    const graphMetaMap = this.graphParser.createGraphMetaMap(
      project,
      parent_map,
      child_map,
      nodeMetaMap,
      sourceMetaMap,
      testMetaMap,
      metricMetaMap,
    );

    const nodeCounts = Object.values(nodes as any[]).reduce((map, node) => {
      const key = node.resource_type + "_count";
      if (!map.has(key)) {
        map.set(key, 0);
      }
      map.set(key, map.get(key) + 1);
      return map;
    }, new Map());
    const parseManifestProps = {
      ...Object.fromEntries(nodeCounts.entries()),
      sources_count: sourceMetaMap.size,
      macros_count: macroMetaMap.size,
    };
    if (
      this.lastSentParseManifestProps === undefined ||
      Object.entries(this.lastSentParseManifestProps).toString() !==
        Object.entries(parseManifestProps).toString()
    ) {
      // we only sent this event if there is a change in the monitored values
      this.telemetry.sendTelemetryEvent(
        "parseManifest",
        {
          project: DBTProject.hashProjectRoot(projectRoot.fsPath),
        },
        parseManifestProps,
      );
      this.lastSentParseManifestProps = parseManifestProps;
    }

    const event: ManifestCacheChangedEvent = {
      added: [
        {
          project,
          nodeMetaMap: nodeMetaMap,
          macroMetaMap: macroMetaMap,
          metricMetaMap: metricMetaMap,
          sourceMetaMap: sourceMetaMap,
          graphMetaMap: graphMetaMap,
          testMetaMap: testMetaMap,
          docMetaMap: docMetaMap,
          exposureMetaMap: exposureMetaMap,
        },
      ],
    };
    return event;
  }

  private async readAndParseManifest(projectRoot: Uri, targetPath: string) {
    const pathParts = [targetPath];
    if (!path.isAbsolute(targetPath)) {
      pathParts.unshift(projectRoot.fsPath);
    }
    const manifestLocation = path.join(...pathParts, DBTProject.MANIFEST_FILE);
    this.terminal.debug(
      "ManifestParser",
      `Reading manifest at ${manifestLocation} for project at ${projectRoot}`,
    );

    // MANIFEST CORRUPTION PREVENTION
    // The manifest file can become corrupted when it's read while dbt is still writing to it.
    // This happens because dbt writes the manifest file in a single operation, but the file
    // can be quite large (often >1MB). During this write operation, if we try to read the file,
    // we may get a partially written manifest that is invalid JSON or missing critical data.

    // To prevent this, we implement three safety mechanisms:
    // 1. File Size Stability Check: We check if the file size remains stable for a period,
    //    indicating dbt has finished writing
    // 2. Retry Logic: If reading fails, we retry multiple times with delays
    // 3. Basic Validation: We verify the manifest has required fields before accepting it

    const maxRetries = 3;
    const stabilityDelay = 1000; // 1 second between file size checks
    const maxStabilityChecks = 3; // Number of times file size must remain stable

    let lastAttemptError: any;
    let lastFileSize: number = 0;
    let stabilityCheckAttempts = 0;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        // FILE SIZE STABILITY CHECK
        // We check the file size multiple times to ensure it's not actively being written to.
        // If the size changes between checks, we reset our counter and wait longer.
        let lastSize = -1;
        let stableChecks = 0;
        stabilityCheckAttempts = 0;

        while (stableChecks < maxStabilityChecks) {
          if (!existsSync(manifestLocation)) {
            throw new Error("Manifest file does not exist");
          }
          const stats = statSync(manifestLocation);
          const currentSize = stats.size;
          lastFileSize = currentSize;

          if (currentSize === lastSize) {
            stableChecks++;
          } else {
            stableChecks = 0;
            lastSize = currentSize;
          }

          stabilityCheckAttempts++;

          if (stableChecks === maxStabilityChecks) {
            break;
          }
          await new Promise((resolve) => setTimeout(resolve, stabilityDelay));
        }

        const manifestFile = readFileSync(manifestLocation, "utf8");
        const parsed = JSON.parse(manifestFile);

        // MANIFEST VALIDATION
        // The manifest must have these core sections to be considered valid.
        // If any are missing, the manifest is likely corrupted or incomplete.
        if (!parsed.nodes || !parsed.sources || !parsed.macros) {
          throw new Error("Manifest file appears to be incomplete");
        }

        // If we successfully read and parsed the manifest after retries, log it
        if (attempt > 0) {
          this.telemetry.sendTelemetryEvent("manifestReadRetrySuccess", {
            retryAttempt: attempt.toString(),
            fileSize: lastFileSize.toString(),
            stabilityChecks: stabilityCheckAttempts.toString(),
          });
        }

        return parsed;
      } catch (error) {
        lastAttemptError = error;
        this.terminal.error(
          "ManifestParser",
          `Attempt ${attempt + 1}/${maxRetries} failed to read manifest file at ${manifestLocation}`,
          error,
        );

        // Send telemetry for each failed attempt
        this.telemetry.sendTelemetryEvent("manifestReadError", {
          attempt: attempt.toString(),
          fileSize: lastFileSize.toString(),
          errorType: error instanceof Error ? error.name : "unknown",
          errorMessage: error instanceof Error ? error.message : "unknown",
          stabilityChecks: stabilityCheckAttempts.toString(),
        });

        if (attempt === maxRetries - 1) {
          // After all retries fail, send a final telemetry event
          this.telemetry.sendTelemetryEvent("manifestReadFinalFailure", {
            totalAttempts: maxRetries.toString(),
            finalFileSize: lastFileSize.toString(),
            finalErrorType:
              lastAttemptError instanceof Error
                ? lastAttemptError.name
                : "unknown",
            finalErrorMessage:
              lastAttemptError instanceof Error
                ? lastAttemptError.message
                : "unknown",
            totalStabilityChecks: stabilityCheckAttempts.toString(),
          });

          // Return undefined to trigger empty cache event
          // This allows the extension to continue functioning with reduced capabilities
          // rather than breaking completely
          return undefined;
        }
        // Wait before retry to allow potential write operations to complete
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }
  }
}

export const createFullPathForNode: (
  projectName: string,
  rootPath: string,
  packageName: string,
  packagePath: string,
  relativeFilePath: string,
) => string | undefined = (
  projectName,
  rootPath,
  packageName,
  packagePath,
  relativeFilePath,
) => {
  if (packageName !== projectName) {
    const rootPathWithPackage = path.join(
      packagePath,
      packageName,
      relativeFilePath,
    );
    if (existsSync(rootPathWithPackage)) {
      return rootPathWithPackage;
    }
    return undefined;
  }
  return path.join(rootPath, relativeFilePath);
};
