import { Disposable, languages } from "vscode";
import { DBTPowerUserExtension } from "../dbtPowerUserExtension";
import { provideSingleton } from "../utils";
import { ModelHoverProvider } from "./modelHoverProvider";
import { SourceHoverProvider } from "./sourceHoverProvider";
import { MacroHoverProvider } from "./macroHoverProvider";
import { DepthDecorationProvider } from "./depthDecorationProvider";

@provideSingleton(HoverProviders)
export class HoverProviders implements Disposable {
  private disposables: Disposable[] = [];

  constructor(
    private modelHoverProvider: ModelHoverProvider,
    private sourceHoverProvider: SourceHoverProvider,
    private macroHoverProvider: MacroHoverProvider,
    private depthDecorationProvider: DepthDecorationProvider,
  ) {
    this.disposables.push(
      languages.registerHoverProvider(
        DBTPowerUserExtension.DBT_SQL_SELECTOR,
        this.modelHoverProvider,
      ),
    );
    this.disposables.push(
      languages.registerHoverProvider(
        DBTPowerUserExtension.DBT_SQL_SELECTOR,
        this.sourceHoverProvider,
      ),
    );
    this.disposables.push(
      languages.registerHoverProvider(
        DBTPowerUserExtension.DBT_SQL_SELECTOR,
        this.macroHoverProvider,
      ),
    );
    this.disposables.push(
      languages.registerHoverProvider(
        DBTPowerUserExtension.DBT_SQL_SELECTOR,
        this.depthDecorationProvider,
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
}
