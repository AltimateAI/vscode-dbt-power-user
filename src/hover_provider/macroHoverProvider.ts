import {
  CancellationToken,
  HoverProvider,
  Hover,
  Position,
  ProviderResult,
  TextDocument,
  MarkdownString
} from "vscode";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { TelemetryService } from "../telemetry";
import { MacroMetaType } from "../domain";
import { generateMacroHoverMarkdown } from "./utils";

export class MacroHoverProvider implements HoverProvider {
  constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private telemetry: TelemetryService
  ) {}

  provideHover(
    document: TextDocument,
    position: Position,
    token: CancellationToken
  ): ProviderResult<Hover> {
    const hoverText = document.getText(document.getWordRangeAtPosition(position));
    
    const macroNameMatch = hoverText.match(/(\w+)\(/);
    if (!macroNameMatch) {
      return null;
    }

    const macroName = macroNameMatch[1];
    const project = this.dbtProjectContainer.findDBTProject(document.uri);
    if (!project) {
      return null;  
    }

    const macroMeta = project.macroMetaMap.get(macroName);
    if (!macroMeta) {
      return null;
    }

    const hoverContent = this.generateMacroHoverContent(macroMeta);
    return new Hover(hoverContent);
  }

  private generateMacroHoverContent(macroMeta: MacroMetaType): MarkdownString {
    return generateMacroHoverMarkdown(macroMeta);
  }
}