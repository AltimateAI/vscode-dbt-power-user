"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assert = require("assert");
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const dbtProjectContainer_1 = require("../../src/manifest/dbtProjectContainer");
const inversify_config_1 = require("../../src/inversify.config");
suite("Extension setup healthcheck Suite", () => {
  test("Can verify extension init", () =>
    tslib_1.__awaiter(void 0, void 0, void 0, function* () {
      // turning extension on does not seem to work.
      // have to individually run the steps from activate function.
      // const ext = vscode.extensions.getExtension(
      //   "innoverio.vscode-dbt-power-user",
      // );
      // const dbtPowerUserExtension = await ext?.activate();
      // const dbtPowerUserExtension = container.get(DBTPowerUserExtension);
      // const dbtPowerUserExtension = dbtpu.activate(vs);
      //dbtPowerUserExtension.activate(vscode.ExtensionContext);
      const dbtProjectContainer = inversify_config_1.container.get(
        dbtProjectContainer_1.DBTProjectContainer,
      );
      yield dbtProjectContainer.detectDBT();
      assert.equal(dbtProjectContainer.dbtDetected, true);
      yield dbtProjectContainer.initializeDBTProjects().catch((err) => {
        assert.fail(err);
      });
      const projCount = dbtProjectContainer.getProjects().length;
      assert(projCount !== undefined);
      assert.equal(projCount, 3);
    }));
});
//# sourceMappingURL=01dbtpu_healthcheck.test.js.map
