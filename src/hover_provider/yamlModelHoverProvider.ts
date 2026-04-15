import { NodeMetaMap, SourceMetaMap } from "@altimateai/dbt-integration";
import {
  CancellationToken,
  Disposable,
  Hover,
  HoverProvider,
  Position,
  ProviderResult,
  Range,
  TextDocument,
} from "vscode";
import { parseDocument } from "yaml";
import { DBTProjectContainer } from "../dbt_client/dbtProjectContainer";
import { ManifestCacheChangedEvent } from "../dbt_client/event/manifestCacheChangedEvent";
import { TelemetryService } from "../telemetry";
import { generateHoverMarkdownString } from "./utils";

interface YamlMapItem {
  key?: { value?: string };
  value?: { value?: string; items?: YamlMapItem[] };
  items?: YamlMapItem[];
  range?: [number, number, number];
}

export class YamlModelHoverProvider implements HoverProvider, Disposable {
  private nodeMetaMap: Map<string, NodeMetaMap> = new Map();
  private sourceMetaMap: Map<string, SourceMetaMap> = new Map();
  private disposables: Disposable[] = [];

  constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private telemetry: TelemetryService,
  ) {
    this.disposables.push(
      dbtProjectContainer.onManifestChanged((event) =>
        this.onManifestCacheChanged(event),
      ),
    );
  }

  dispose() {
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  provideHover(
    document: TextDocument,
    position: Position,
    _token: CancellationToken,
  ): ProviderResult<Hover> {
    const projectRootpath = this.dbtProjectContainer.getProjectRootpath(
      document.uri,
    );
    if (!projectRootpath) {
      return;
    }

    const modelName = this.getModelNameAtPosition(document, position);
    if (modelName) {
      const nodeMap = this.nodeMetaMap.get(projectRootpath.fsPath);
      if (nodeMap) {
        const node = nodeMap.lookupByBaseName(modelName);
        if (node) {
          this.telemetry.sendTelemetryEvent("provideYamlModelHover");
          return new Hover(
            generateHoverMarkdownString(node, "model"),
            new Range(position, position),
          );
        }
      }
    }

    const sourceInfo = this.getSourceNameAtPosition(document, position);
    if (sourceInfo) {
      const sourceMap = this.sourceMetaMap.get(projectRootpath.fsPath);
      if (sourceMap) {
        const source = sourceMap.get(sourceInfo.sourceName);
        if (source && sourceInfo.tableName) {
          const table = source.tables.find(
            (t) => t.name === sourceInfo.tableName,
          );
          if (table) {
            this.telemetry.sendTelemetryEvent("provideYamlSourceHover");
            return new Hover(
              generateHoverMarkdownString(table, "source"),
              new Range(position, position),
            );
          }
        }
      }
    }

    return undefined;
  }

  private getModelNameAtPosition(
    document: TextDocument,
    position: Position,
  ): string | undefined {
    try {
      const parsedYaml = parseDocument(document.getText());
      if (!parsedYaml.contents) {
        return;
      }
      const offset = document.offsetAt(position);
      const contents = parsedYaml.contents as { items?: YamlMapItem[] };
      if (!contents.items) {
        return;
      }

      const modelsNode = contents.items.find(
        (item) => item?.key?.value === "models",
      );
      if (!modelsNode?.value?.items) {
        return;
      }

      for (const model of modelsNode.value.items) {
        if (!model?.items) {
          continue;
        }
        const nameNode = model.items.find(
          (item) => item?.key?.value === "name",
        );
        if (!nameNode?.value) {
          continue;
        }
        const nameValue = (nameNode.value as { value?: string }).value;
        if (!nameValue) {
          continue;
        }

        // Check if cursor is on or near the name value
        const nameRange = (nameNode.value as { range?: [number, number] })
          .range;
        if (nameRange && offset >= nameRange[0] && offset <= nameRange[1]) {
          return nameValue;
        }

        // Fallback: check if cursor word matches the model name
        const wordRange = document.getWordRangeAtPosition(position);
        if (wordRange) {
          const word = document.getText(wordRange);
          if (word === nameValue) {
            // Verify cursor is within this model's block
            if (
              model.range &&
              offset >= model.range[0] &&
              offset <= model.range[1]
            ) {
              return nameValue;
            }
          }
        }
      }
    } catch {
      // YAML parse errors are expected during editing
    }
    return undefined;
  }

  private getSourceNameAtPosition(
    document: TextDocument,
    position: Position,
  ): { sourceName: string; tableName?: string } | undefined {
    try {
      const parsedYaml = parseDocument(document.getText());
      if (!parsedYaml.contents) {
        return;
      }
      const offset = document.offsetAt(position);
      const contents = parsedYaml.contents as { items?: YamlMapItem[] };
      if (!contents.items) {
        return;
      }

      const sourcesNode = contents.items.find(
        (item) => item?.key?.value === "sources",
      );
      if (!sourcesNode?.value?.items) {
        return;
      }

      for (const source of sourcesNode.value.items) {
        if (!source?.items) {
          continue;
        }
        const nameNode = source.items.find(
          (item) => item?.key?.value === "name",
        );
        if (!nameNode?.value) {
          continue;
        }
        const sourceName = (nameNode.value as { value?: string }).value;
        if (!sourceName) {
          continue;
        }

        // Check if cursor is within this source block
        if (
          !(
            source.range &&
            offset >= source.range[0] &&
            offset <= source.range[1]
          )
        ) {
          continue;
        }

        // Check tables within this source
        const tablesNode = source.items.find(
          (item) => item?.key?.value === "tables",
        );
        if (!tablesNode?.value?.items) {
          // Cursor is on the source name itself
          const nameRange = (nameNode.value as { range?: [number, number] })
            .range;
          if (nameRange && offset >= nameRange[0] && offset <= nameRange[1]) {
            return { sourceName };
          }
          continue;
        }

        for (const table of tablesNode.value.items) {
          if (!table?.items) {
            continue;
          }
          const tableNameNode = table.items.find(
            (item) => item?.key?.value === "name",
          );
          if (!tableNameNode?.value) {
            continue;
          }
          const tableName = (tableNameNode.value as { value?: string }).value;
          if (!tableName) {
            continue;
          }
          const tableNameRange = (
            tableNameNode.value as { range?: [number, number] }
          ).range;
          if (
            tableNameRange &&
            offset >= tableNameRange[0] &&
            offset <= tableNameRange[1]
          ) {
            return { sourceName, tableName };
          }
        }
      }
    } catch {
      // YAML parse errors are expected during editing
    }
    return undefined;
  }

  private onManifestCacheChanged(event: ManifestCacheChangedEvent): void {
    event.added?.forEach((added) => {
      this.nodeMetaMap.set(added.project.projectRoot.fsPath, added.nodeMetaMap);
      this.sourceMetaMap.set(
        added.project.projectRoot.fsPath,
        added.sourceMetaMap,
      );
    });
    event.removed?.forEach((removed) => {
      this.nodeMetaMap.delete(removed.projectRoot.fsPath);
      this.sourceMetaMap.delete(removed.projectRoot.fsPath);
    });
  }
}
