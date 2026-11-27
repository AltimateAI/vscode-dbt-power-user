import * as path from "path";

// The subcommands that change what's installed, per installer. `uv pip …` and
// `python -m pip …` reach pip's.
const PIP = ["install", "uninstall"];
const SUBCOMMANDS: Record<string, string[]> = {
  pip: PIP,
  uv: ["add", "remove", "sync"],
  poetry: ["add", "remove", "install", "update", "sync"],
  pdm: ["add", "remove", "install", "update", "sync"],
  pipenv: ["install", "uninstall", "update", "sync"],
  conda: ["install", "remove", "uninstall", "update", "upgrade"],
  mamba: ["install", "remove", "uninstall", "update", "upgrade"],
  micromamba: ["install", "remove", "uninstall", "update", "upgrade"],
  pipx: ["install", "uninstall", "upgrade", "reinstall", "inject"],
};

// `pip3`, `pip3.12`, a path to a venv's `pip`, a Windows `pip.exe`.
function installer(word: string): string {
  const name = path.basename(word.replace(/\\/g, "/")).replace(/\.exe$/i, "");
  return /^pip\d*(\.\d+)?$/.test(name) ? "pip" : name;
}

function changesPackages(words: string[]): boolean {
  let rest = words;
  // `FOO=bar pip …`, `sudo pip …`.
  while (rest.length && (/^\w+=/.test(rest[0]) || rest[0] === "sudo")) {
    rest = rest.slice(1);
  }
  // `python -m pip …`, `py -3 -m pip …`.
  const module = rest.indexOf("-m");
  if (
    module > 0 &&
    /^(python[\d.]*|py)(\.exe)?$/i.test(path.basename(rest[0]))
  ) {
    rest = rest.slice(module + 1);
  }
  const tool = installer(rest[0] ?? "");
  if (tool === "uv" && rest[1] === "pip") {
    return PIP.includes(rest[2]) || rest[2] === "sync";
  }
  // The first word after the installer that isn't an option.
  const subcommand = rest.slice(1).find((word) => !word.startsWith("-"));
  return (
    subcommand !== undefined && (SUBCOMMANDS[tool] ?? []).includes(subcommand)
  );
}

/**
 * Whether a shell command line installs, upgrades or removes Python packages:
 * pip, uv, poetry, pdm, pipenv, conda (and mamba, micromamba) or pipx, in any
 * of the commands the line chains.
 */
export function isPackageInstall(commandLine: string): boolean {
  return commandLine
    .split(/&&|\|\||[;|\n]/)
    .some((command) => changesPackages(command.trim().split(/\s+/)));
}
