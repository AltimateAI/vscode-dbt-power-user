import { Disposable, languages } from "vscode";
import { provideSingleton } from "../utils";

@provideSingleton(DbtPowerUserDiagnostics)
export class DbtPowerUserDiagnostics implements Disposable {
  public readonly rebuildManifestDiagnostics =
    languages.createDiagnosticCollection("dbt");

  dispose() {
    this.rebuildManifestDiagnostics.dispose();
  }
}
