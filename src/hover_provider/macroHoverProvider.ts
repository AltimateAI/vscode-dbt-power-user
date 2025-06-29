import {
  DBTTerminal,
  MacroMetaData,
  MacroMetaMap,
  NodeMetaData,
  NodeMetaMap,
} from "@altimateai/dbt-integration";
import { inject } from "inversify";
import {
  CancellationToken,
  Disposable,
  Hover,
  HoverProvider,
  Position,
  ProviderResult,
  TextDocument,
} from "vscode";
import { QueryManifestService } from "../services/queryManifestService";
import { TelemetryService } from "../telemetry";
import { generateMacroHoverMarkdown } from "./utils";

export class MacroHoverProvider implements HoverProvider, Disposable {
  private disposables: Disposable[] = [];

  constructor(
    private telemetry: TelemetryService,
    @inject("DBTTerminal")
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
    const allNodes = [...macroMetaMap.values(), ...nodeMetaMap.nodes()];

    allNodes.forEach((node) => {
      if (node.depends_on.macros.includes(macroMetaName)) {
        referencedBy.push(node);
      }
    });

    return referencedBy;
  }
}
