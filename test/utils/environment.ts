export function getPythonExecutable() {
  if (!process.env.VSCODE_PYTHON) {
    return "python";
  }
  return process.env.VSCODE_PYTHON;
}
