import {
  Definition,
  DefinitionLink,
  DefinitionProvider,
  Disposable,
  Location,
  Position,
  ProviderResult,
  TextDocument,
  Uri,
} from "vscode";
import { DocMetaMap } from "../domain";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { ManifestCacheChangedEvent } from "../manifest/event/manifestCacheChangedEvent";
import { provideSingleton } from "../utils";
import { TelemetryService } from "../telemetry";

@provideSingleton(DocDefinitionProvider)
export class DocDefinitionProvider implements DefinitionProvider, Disposable {
  private docToLocationMap: Map<string, DocMetaMap> = new Map();
  private static readonly IS_DOC = /(doc)\([^)]*\)/;
  private static readonly GET_DOC_INFO = /(?!['"])(\w+)(?=['"])/g;
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

  provideDefinition(
    document: TextDocument,
    position: Position,
  ): ProviderResult<Definition | DefinitionLink[]> {
    return new Promise((resolve, reject) => {
      const range = document.getWordRangeAtPosition(
        position,
        DocDefinitionProvider.IS_DOC,
      );
      const word = document.getText(range);
      if (word) {
        const packageName = this.dbtProjectContainer.getPackageName(
          document.uri,
        );

        const docName = word.match(DocDefinitionProvider.GET_DOC_INFO);
        if (docName === null || docName === undefined) {
          reject();
          return;
        }

        // const docName =
        //   packageName !== undefined && !word.includes(".")
        //     ? `${packageName}.${word}`
        //     : word;

        const definition = this.getDocDefinition(docName[0], document.uri);
        if (definition !== undefined) {
          resolve(definition);
          this.telemetry.sendTelemetryEvent("provideDocDefinition");
          return;
        }
      }
      reject();
    });
  }

  private onManifestCacheChanged(event: ManifestCacheChangedEvent): void {
    event.added?.forEach((added) => {
      this.docToLocationMap.set(added.projectRoot.fsPath, added.docMetaMap);
    });
    event.removed?.forEach((removed) => {
      this.docToLocationMap.delete(removed.projectRoot.fsPath);
    });
  }

  private getDocDefinition(
    docName: string,
    currentFilePath: Uri,
  ): Definition | undefined {
    const projectRootpath =
      this.dbtProjectContainer.getProjectRootpath(currentFilePath);
    if (projectRootpath === undefined) {
      return;
    }
    const docMap = this.docToLocationMap.get(projectRootpath.fsPath);
    if (docMap === undefined) {
      return;
    }
    const location = docMap.get(docName);
    if (location) {
      return new Location(
        Uri.file(location.path),
        new Position(location.line, location.character),
      );
    }
    return undefined;
  }
}
