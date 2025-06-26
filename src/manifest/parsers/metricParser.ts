import { provide } from "inversify-binding-decorators";
import { DBTTerminal } from "../../dbt_client/terminal";
import { MetricMetaMap } from "../../domain";
import { inject } from "inversify";
import { DBTIntegrationAdapter } from "../dbtIntegrationAdapter";

@provide(MetricParser)
export class MetricParser {
  constructor(
    @inject("DBTTerminal")
    private terminal: DBTTerminal,
  ) {}

  createMetricMetaMap(
    metrics: any[],
    project: DBTIntegrationAdapter,
  ): Promise<MetricMetaMap> {
    return new Promise(async (resolve) => {
      const projectRoot = project.getProjectRoot();
      const projectName = project.getProjectName();
      this.terminal.debug(
        "MetricParser",
        `Parsing metrics for "${projectName}" at ${projectRoot}`,
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
        `Returning metrics for "${projectName}" at ${projectRoot}`,
        metricMetaMap,
      );
      resolve(metricMetaMap);
    });
  }
}
