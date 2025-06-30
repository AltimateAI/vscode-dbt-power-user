import * as fs from "fs";
import { createCoverageMap } from "istanbul-lib-coverage";
import { createInstrumenter } from "istanbul-lib-instrument";
import * as path from "path";

const coverageMap = createCoverageMap({});
const instrumenter = createInstrumenter({
  compact: false,
  preserveComments: true,
  produceSourceMap: true,
  autoWrap: true,
  esModules: true,
});

export function setupCoverage() {
  const coverageDir = path.join(__dirname, "../../../coverage");
  if (!fs.existsSync(coverageDir)) {
    fs.mkdirSync(coverageDir, { recursive: true });
  }

  // Hook into require to instrument files
  const originalRequire = require.extensions[".js"];
  require.extensions[".js"] = function (module: any, filename: string) {
    if (filename.includes("/src/") && !filename.includes("/test/")) {
      const content = fs.readFileSync(filename, "utf8");
      const instrumentedCode = instrumenter.instrumentSync(content, filename);
      module._compile(instrumentedCode, filename);
    } else {
      originalRequire(module, filename);
    }
  };

  // Save coverage data on process exit
  process.on("exit", () => {
    const coverage = JSON.stringify(coverageMap);
    fs.writeFileSync(path.join(coverageDir, "coverage.json"), coverage);
    fs.writeFileSync(
      path.join(coverageDir, "coverage-final.json"),
      JSON.stringify(instrumenter.fileCoverage),
    );
  });
}
