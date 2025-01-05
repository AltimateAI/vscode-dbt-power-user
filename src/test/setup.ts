import "reflect-metadata";
import { createSandbox } from "sinon";
import vscode from "./mock/vscode";

const sandbox = createSandbox();

// Register the mock before any test files are loaded
const Module = require("module");
const originalRequire = Module.prototype.require;

Module.prototype.require = function (path: string) {
  if (path === "vscode") {
    return vscode;
  }
  return originalRequire.call(this, path);
};

export { sandbox };
