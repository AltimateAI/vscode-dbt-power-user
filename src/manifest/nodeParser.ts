import path = require("path");
import { NodeMetaMap } from "../domain";
import { ManifestChangedHandler } from "./manifestChangedHandler";

export class NodeParser {
    static createModelMetaMap(nodesMap: any[]): NodeMetaMap {
        const modelMetaMap: NodeMetaMap = new Map();
        if (nodesMap === null || nodesMap === undefined) {
            console.log("No nodes found in manifest!");
            return modelMetaMap;
        }
        Object.values(nodesMap)
            .filter((model) => model.resource_type === ManifestChangedHandler.RESOURCE_TYPE_MODEL)
            .forEach(({ name, root_path, original_file_path }) => {
                const fullPath = path.join(root_path, original_file_path);
                modelMetaMap.set(name, { path: fullPath });
            });
        return modelMetaMap;
    }
}