import { Disposable, languages } from "vscode";
import { DBTPowerUserExtension } from "../dbtPowerUserExtension";
import { DepthDecorationProvider } from "./depthDecorationProvider";
import { MacroHoverProvider } from "./macroHoverProvider";
import { ModelHoverProvider } from "./modelHoverProvider";
import { SourceHoverProvider } from "./sourceHoverProvider";
import { YamlModelHoverProvider } from "./yamlModelHoverProvider";

export class HoverProviders implements Disposable {
  private disposables: Disposable[] = [];

  constructor(
    private modelHoverProvider: ModelHoverProvider,
    private sourceHoverProvider: SourceHoverProvider,
    private macroHoverProvider: MacroHoverProvider,
    private depthDecorationProvider: DepthDecorationProvider,
    private yamlModelHoverProvider: YamlModelHoverProvider,
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
    this.disposables.push(
      languages.registerHoverProvider(
        DBTPowerUserExtension.DBT_YAML_SELECTOR,
        this.yamlModelHoverProvider,
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
