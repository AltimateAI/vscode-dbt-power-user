import { Disposable, tests } from "vscode";
import { provideSingleton } from "../utils";
import { DbtTestController } from "./dbtTestController";

@provideSingleton(TestProvider)
export class TestProvider implements Disposable {
  private disposables: Disposable[] = [];
  constructor(private dbtTestController: DbtTestController) {
    this.disposables.push(
      tests.createTestController("dbtTestController", "dbt Tests")
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
