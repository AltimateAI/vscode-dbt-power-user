import { DBTProjectIntegrationAdapter } from "../dbtIntegrationAdapter";
import { MetricMetaMap } from "../domain";
import { DBTTerminal } from "../terminal";

export class MetricParser {
  constructor(private terminal: DBTTerminal) {}

  createMetricMetaMap(
    metrics: any[],
    project: DBTProjectIntegrationAdapter,
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
