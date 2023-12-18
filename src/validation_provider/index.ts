import { Disposable, workspace } from "vscode";
import { provideSingleton } from "../utils";
import { AltimateRequest } from "../altimate";

@provideSingleton(ValidationProvider)
export class ValidationProvider implements Disposable {
  private disposables: Disposable[] = [];

  constructor(private altimate: AltimateRequest) {
    this.disposables.push(
      workspace.onDidChangeConfiguration(
        (e) => {
          if (e.affectsConfiguration("dbt")) {
            this.altimate.validateCredentials();
          }
        },
        this,
        this.disposables,
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
