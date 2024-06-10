import {
  CancellationToken,
  HoverProvider,
  Hover,
  Position,
  ProviderResult,
  TextDocument,
  Disposable,
} from "vscode";
import { TelemetryService } from "../telemetry";
import { generateMacroHoverMarkdown } from "./utils";
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import { QueryManifestService } from "../services/queryManifestService";
import { provideSingleton } from "../utils";
import {
  MacroMetaData,
  MacroMetaMap,
  NodeMetaData,
  NodeMetaMap,
  SourceMetaMap,
} from "../domain";

@provideSingleton(MacroHoverProvider)
export class MacroHoverProvider implements HoverProvider, Disposable {
  private disposables: Disposable[] = [];

  constructor(
    private telemetry: TelemetryService,
    private dbtTerminal: DBTTerminal,
    private queryManifestService: QueryManifestService,
  ) {}

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
    const hoverText = document.getText(
      document.getWordRangeAtPosition(position),
    );

    this.dbtTerminal.debug("MacroHoverProvider", `checking: ${hoverText}`);
    const eventResult = this.queryManifestService.getEventByDocument(
      document.uri,
    );
    if (!eventResult) {
      return;
    }
    const { macroMetaMap, nodeMetaMap } = eventResult;
    const macroMeta = macroMetaMap.get(hoverText);
    if (!macroMeta) {
      return null;
    }

    const referencedBy = this.getNodesReferencingMacro(
      macroMeta.uniqueId,
      macroMetaMap,
      nodeMetaMap,
    );
    const hoverContent = generateMacroHoverMarkdown(
      macroMeta,
      referencedBy,
      eventResult,
    );
    this.telemetry.sendTelemetryEvent("provideMacroHover");
    return new Hover(hoverContent);
  }

  private getNodesReferencingMacro(
    macroMetaName: string,
    macroMetaMap: MacroMetaMap,
    nodeMetaMap: NodeMetaMap,
  ) {
    const referencedBy: (MacroMetaData | NodeMetaData)[] = [];
    const allNodes = [...macroMetaMap.values(), ...nodeMetaMap.values()];

    allNodes.forEach((node) => {
      if (node.depends_on.macros.includes(macroMetaName)) {
        referencedBy.push(node);
      }
    });

    return referencedBy;
  }
}
