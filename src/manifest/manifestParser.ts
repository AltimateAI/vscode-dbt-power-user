import { provide } from "inversify-binding-decorators";
import { DBTTerminal } from "../dbt_integration/terminal";
import { ManifestCacheChangedEvent } from "./event/manifestCacheChangedEvent";
import { TelemetryService } from "../telemetry";
import { inject } from "inversify";
import { hashProjectRoot } from "../dbt_integration/dbtIntegration";
import { DBTProject } from "./dbtProject";

@provide(ManifestParser)
export class ManifestParser {
  private lastSentParseManifestProps: any;

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
      const projectName = project.getProjectName();
      const projectRoot = project.projectRoot;

      if (!parsedManifest) {
        this.terminal.warn(
          "ManifestParser",
          `Failed to parse manifest for project "${projectName}" at ${projectRoot}: parsedManifest is undefined`,
        );
      } else if (!nodes) {
        this.terminal.warn(
          "ManifestParser",
          `Failed to parse manifest for project "${projectName}" at ${projectRoot}: nodes collection is undefined`,
        );
      }

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
}

export { createFullPathForNode } from "../dbt_integration/parsers/utils";
