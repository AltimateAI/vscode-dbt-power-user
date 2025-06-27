import { NodeMetaData, NodeMetaMap } from "../domain";
import { createFullPathForNode } from "./utils";
import { DBTTerminal } from "../terminal";
import { getExternalProjectNamesFromDbtLoomConfig } from "./utils";
import * as path from "path";
import { DBTProjectIntegrationAdapter } from "../dbtIntegrationAdapter";
import { isResourceNode } from "../dbtIntegration";

export class NodeMetaMapImpl implements NodeMetaMap {
  constructor(
    private latestVersionLookupMap: Map<string, string> = new Map(),
    private modelNameLookupMap: Map<string, string> = new Map(),
    private modelMetadataLookupMap: Map<string, NodeMetaData> = new Map(),
  ) {}

  lookupByBaseName(modelBaseName: string): NodeMetaData | undefined {
    const uniqueId = this.modelNameLookupMap.get(modelBaseName);
    if (!uniqueId) {
      return;
    }
    return this.lookupByUniqueId(uniqueId);
  }

  lookupByUniqueId(uniqueId: string): NodeMetaData | undefined {
    const latestVersionUniqueID = this.latestVersionLookupMap.get(uniqueId);
    if (latestVersionUniqueID) {
      return this.modelMetadataLookupMap.get(latestVersionUniqueID);
    }
    return this.modelMetadataLookupMap.get(uniqueId);
  }

  nodes(): Iterable<NodeMetaData> {
    return this.modelMetadataLookupMap.values();
  }
}

export class NodeParser {
  constructor(private terminal: DBTTerminal) {}

  createNodeMetaMap(
    nodesMap: any[],
    project: DBTProjectIntegrationAdapter,
  ): Promise<NodeMetaMap> {
    return new Promise(async (resolve) => {
      const projectRoot = project.getProjectRoot();
      const projectName = project.getProjectName();
      this.terminal.debug(
        "NodeParser",
        `Parsing nodes for "${projectName}" at ${projectRoot}`,
      );
      const latestVersionLookupMap: Map<string, string> = new Map();
      const modelMetadataLookupMap: Map<string, NodeMetaData> = new Map();
      const modelNameLookupMap: Map<string, string> = new Map();
      if (nodesMap === null || nodesMap === undefined) {
        resolve(new NodeMetaMapImpl(new Map(), new Map()));
      }
      const nodesMaps = Object.values(nodesMap).filter((model) =>
        isResourceNode(model.resource_type),
      );
      const packagePath = project.getPackageInstallPath();
      if (packagePath === undefined) {
        throw new Error("packagePath is not defined " + projectRoot);
      }
      const externalProjectNames =
        getExternalProjectNamesFromDbtLoomConfig(projectRoot);
      for (const nodesMap of nodesMaps) {
        const {
          name,
          original_file_path,
          database,
          schema,
          alias,
          package_name,
          latest_version,
          version,
          unique_id,
          columns,
          description,
          patch_path,
          config,
          resource_type,
          depends_on,
          meta,
        } = nodesMap;
        const fullPath = createFullPathForNode(
          projectName,
          projectRoot,
          package_name,
          packagePath,
          original_file_path,
        );
        const targetPath = project.getTargetPath();
        if (fullPath) {
          modelNameLookupMap.set(path.parse(fullPath).name, unique_id);
        }
        if (version && latest_version && version === latest_version) {
          const parts = unique_id.split(".");
          parts.pop();
          latestVersionLookupMap.set(parts.join("."), unique_id);
        }
        modelMetadataLookupMap.set(unique_id, {
          path: fullPath,
          database,
          schema,
          alias,
          name,
          package_name,
          uniqueId: unique_id,
          columns,
          description,
          patch_path,
          config,
          resource_type,
          depends_on,
          is_external_project: Boolean(
            externalProjectNames?.includes(package_name),
          ),
          compiled_path: targetPath
            ? path.join(
                targetPath,
                "compiled",
                package_name,
                original_file_path,
              )
            : "",
          meta: meta,
        });
      }
      this.terminal.debug(
        "NodeParser",
        `Returning nodes for "${projectName}" at ${projectRoot}`,
        modelNameLookupMap,
        modelMetadataLookupMap,
      );
      const nodeMetaMap: NodeMetaMap = new NodeMetaMapImpl(
        latestVersionLookupMap,
        modelNameLookupMap,
        modelMetadataLookupMap,
      );
      resolve(nodeMetaMap);
    });
  }
}
