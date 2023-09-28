import { readFileSync } from "fs";
import {
  CancellationToken,
  Definition,
  DefinitionLink,
  HoverProvider,
  Disposable,
  Location,
  Position,
  ProviderResult,
  TextDocument,
  Uri,
  Hover,
  MarkdownString,
} from "vscode";
import { SourceMetaMap } from "../domain";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { ManifestCacheChangedEvent } from "../manifest/event/manifestCacheChangedEvent";
import { isEnclosedWithinCodeBlock, provideSingleton } from "../utils";
import { TelemetryService } from "../telemetry";
import { GenerateHoverMarkdownString } from "./utils";

@provideSingleton(SourceHoverProvider)
export class SourceHoverProvider implements HoverProvider, Disposable {
  private sourceMetaMap: Map<string, SourceMetaMap> = new Map();
  private static readonly IS_SOURCE = /(source)\([^)]*\)/;
  private static readonly GET_SOURCE_INFO = /(?!['"])(\w+)(?=['"])/g;
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
    token: CancellationToken,
  ): ProviderResult<Hover> {
    return new Promise((resolve) => {
      const hover = document.getText(document.getWordRangeAtPosition(position));
      const range = document.getWordRangeAtPosition(
        position,
        SourceHoverProvider.IS_SOURCE,
      );
      const word = document.getText(range);

      const linePrefix = document
        .lineAt(position)
        .text.substr(0, position.character);

      if (
        !isEnclosedWithinCodeBlock(document, position) ||
        !linePrefix.includes("source") ||
        hover === "source"
      ) {
        resolve(undefined);
        return;
      }

      const source = word.match(SourceHoverProvider.GET_SOURCE_INFO);
      if (source === null || source === undefined) {
        resolve(undefined);
        return;
      }
      if (source.length < 2) {
        resolve(undefined);
        return;
      }
      const mdString = this.getSourceHover(source[0], document.uri, source[1]);
      if (mdString !== undefined) {
        const hover = new Hover(mdString);
        resolve(hover);
      }
      this.telemetry.sendTelemetryEvent("provideSourceHover");
    });
  }

  private onManifestCacheChanged(event: ManifestCacheChangedEvent): void {
    event.added?.forEach((added) => {
      this.sourceMetaMap.set(added.projectRoot.fsPath, added.sourceMetaMap);
    });
    event.removed?.forEach((removed) => {
      this.sourceMetaMap.delete(removed.projectRoot.fsPath);
    });
  }

  private getSourceHover(
    sourceName: string,
    currentFilePath: Uri,
    tableName: string,
  ): MarkdownString | undefined {
    const projectRootpath =
      this.dbtProjectContainer.getProjectRootpath(currentFilePath);
    if (projectRootpath === undefined) {
      return;
    }
    const sourceMap = this.sourceMetaMap.get(projectRootpath.fsPath);
    if (sourceMap === undefined) {
      return;
    }
    const node = sourceMap
      .get(sourceName)
      ?.tables.find((table) => table.name === tableName);
    if (node) {
      return GenerateHoverMarkdownString(node, "source");
    }
    return undefined;
  }
}
