"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPythonExecutable = void 0;
function getPythonExecutable() {
  if (!process.env.VSCODE_PYTHON) {
    return "python";
  }
  return process.env.VSCODE_PYTHON;
}
exports.getPythonExecutable = getPythonExecutable;
//# sourceMappingURL=environment.js.map
