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
    const { macroMetaMap } = eventResult;
    const macroMeta = macroMetaMap.get(hoverText);
    if (!macroMeta) {
      return null;
    }

    const hoverContent = generateMacroHoverMarkdown(macroMeta);
    this.telemetry.sendTelemetryEvent("provideMacroHover");
    return new Hover(hoverContent);
  }
}
