import {
  CancellationToken,
  Disposable,
  Location,
  Position,
  SymbolInformation,
  SymbolKind,
  Uri,
} from "vscode";
import { DBTProjectContainer } from "../dbt_client/dbtProjectContainer";
import {
  ManifestCacheChangedEvent,
  ManifestCacheProjectAddedEvent,
} from "../dbt_client/event/manifestCacheChangedEvent";

interface SymbolEntry {
  name: string;
  kind: SymbolKind;
  containerName: string;
  filePath: string | undefined;
}

export class DbtWorkspaceSymbolProvider implements Disposable {
  private disposables: Disposable[] = [];
  private symbolsByProject: Map<string, SymbolEntry[]> = new Map();

  constructor(private dbtProjectContainer: DBTProjectContainer) {
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

  provideWorkspaceSymbols(
    query: string,
    _token: CancellationToken,
  ): SymbolInformation[] {
    const lowerQuery = query.toLowerCase();
    const results: SymbolInformation[] = [];

    for (const [projectRoot, symbols] of this.symbolsByProject) {
      for (const sym of symbols) {
        if (lowerQuery && !sym.name.toLowerCase().includes(lowerQuery)) {
          continue;
        }

        if (!sym.filePath) {
          continue;
        }

        const uri = this.resolveUri(projectRoot, sym.filePath);
        if (!uri) {
          continue;
        }

        results.push(
          new SymbolInformation(
            sym.name,
            sym.kind,
            sym.containerName,
            new Location(uri, new Position(0, 0)),
          ),
        );
      }
    }

    return results;
  }

  private onManifestCacheChanged(event: ManifestCacheChangedEvent): void {
    event.added?.forEach((added) => {
      this.rebuildSymbols(added);
    });
    event.removed?.forEach((removed) => {
      this.symbolsByProject.delete(removed.projectRoot.fsPath);
    });
  }

  private rebuildSymbols(event: ManifestCacheProjectAddedEvent): void {
    const projectRoot = event.project.projectRoot.fsPath;
    const symbols: SymbolEntry[] = [];

    // Models/nodes
    for (const node of event.nodeMetaMap.nodes()) {
      symbols.push({
        name: node.name,
        kind: SymbolKind.Class,
        containerName: `model (${node.package_name})`,
        filePath: node.path,
      });
    }

    // Macros
    for (const [name, macro] of event.macroMetaMap) {
      symbols.push({
        name,
        kind: SymbolKind.Function,
        containerName: `macro`,
        filePath: macro.path,
      });
    }

    // Sources
    for (const [name, source] of event.sourceMetaMap) {
      for (const table of source.tables) {
        symbols.push({
          name: `${name}.${table.name}`,
          kind: SymbolKind.Namespace,
          containerName: `source (${source.package_name})`,
          filePath: table.path,
        });
      }
    }

    this.symbolsByProject.set(projectRoot, symbols);
  }

  private resolveUri(
    projectRoot: string,
    filePath: string,
  ): Uri | undefined {
    try {
      return Uri.joinPath(Uri.file(projectRoot), filePath);
    } catch {
      return undefined;
    }
  }
}
