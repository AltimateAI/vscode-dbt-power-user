import { readFileSync } from "fs";
import { provide } from "inversify-binding-decorators";
import * as path from "path";
import { Uri } from "vscode";
import { DBTTerminal } from "../../dbt_client/terminal";
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
import { ChildrenParentParser } from "./childrenParentParser";
import { ModelDepthParser } from "./modelDepthParser";
import { inject } from "inversify";
import {
  hashProjectRoot,
  MANIFEST_FILE,
} from "../../dbt_client/dbtIntegration";

@provide(ManifestParser)
export class ManifestParser {
  private lastSentParseManifestProps: any;
  private consecutiveReadFailures = 0;

  constructor(
    @inject("DBTTerminal")
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
    const parsedManifest = await project.parseManifest();

    const nodes = parsedManifest?.nodeMetaMap.nodes();

    if (!parsedManifest || !nodes) {
      return;
    }

    const nodeCounts = Array.from(nodes).reduce((map, node) => {
      const key = node.resource_type + "_count";
      if (!map.has(key)) {
        map.set(key, 0);
      }
      map.set(key, map.get(key) + 1);
      return map;
    }, new Map());
    const parseManifestProps = {
      ...Object.fromEntries(nodeCounts.entries()),
      sources_count: parsedManifest.sourceMetaMap.size,
      macros_count: parsedManifest.macroMetaMap.size,
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
          project: hashProjectRoot(project.getProjectRoot()),
        },
        parseManifestProps,
      );
      this.lastSentParseManifestProps = parseManifestProps;
    }

    const event: ManifestCacheChangedEvent = {
      added: [
        {
          project,
          ...parsedManifest,
        },
      ],
    };
    return event;
  }

  private readAndParseManifest(projectRoot: Uri, targetPath: string) {
    const pathParts = [targetPath];
    if (!path.isAbsolute(targetPath)) {
      pathParts.unshift(projectRoot.fsPath);
    }
    const manifestLocation = path.join(...pathParts, MANIFEST_FILE);
    this.terminal.debug(
      "ManifestParser",
      `Reading manifest at ${manifestLocation} for project at ${projectRoot}`,
    );

    try {
      const manifestFile = readFileSync(manifestLocation, "utf8");
      const parsedManifest = JSON.parse(manifestFile);
      this.consecutiveReadFailures = 0; // Reset counter on success
      return parsedManifest;
    } catch (error) {
      this.consecutiveReadFailures++;
      if (this.consecutiveReadFailures > 3) {
        this.terminal.error(
          "ManifestParser",
          `Could not read/parse manifest file at ${manifestLocation} after ${this.consecutiveReadFailures} attempts`,
          error,
        );
      }
    }
  }
}

export { createFullPathForNode } from "./utils";
