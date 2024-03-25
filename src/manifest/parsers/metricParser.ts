import { provide } from "inversify-binding-decorators";
import { DBTTerminal } from "../../dbt_client/dbtTerminal";
import { DBTProject } from "../dbtProject";
import { MetricMetaMap } from "../../domain";

@provide(MetricParser)
export class MetricParser {
  constructor(private terminal: DBTTerminal) {}

  createMetricMetaMap(
    metrics: any[],
    project: DBTProject,
  ): Promise<MetricMetaMap> {
    return new Promise(async (resolve) => {
      this.terminal.debug(
        "MetricParser",
        `Parsing metrics for "${project.getProjectName()}" at ${
          project.projectRoot
        }`,
      );
      const metricMetaMap: MetricMetaMap = new Map();
      if (metrics === null || metrics === undefined) {
        resolve(metricMetaMap);
      }
      for (const key in metrics) {
        const metric = metrics[key];
        metricMetaMap.set(metric.name, { name: metric.name });
      }
      this.terminal.debug(
        "MetricParser",
        `Returning metrics for "${project.getProjectName()}" at ${
          project.projectRoot
        }`,
        metricMetaMap,
      );
      resolve(metricMetaMap);
    });
  }
}
