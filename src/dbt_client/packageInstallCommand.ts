import * as path from "path";

// The subcommands that change what's installed, per installer. `uv pip …` and
// `python -m pip …` reach pip's.
const PIP = ["install", "uninstall"];
// A Map: an installer name such as `constructor` must not reach Object's own.
const SUBCOMMANDS = new Map<string, string[]>(
  Object.entries({
    pip: PIP,
    uv: ["add", "remove", "sync"],
    poetry: ["add", "remove", "install", "update", "sync"],
    pdm: ["add", "remove", "install", "update", "sync"],
    pipenv: ["install", "uninstall", "update", "sync"],
    conda: ["install", "remove", "uninstall", "update", "upgrade"],
    mamba: ["install", "remove", "uninstall", "update", "upgrade"],
    micromamba: ["install", "remove", "uninstall", "update", "upgrade"],
    pipx: ["install", "uninstall", "upgrade", "reinstall", "inject"],
  }),
);

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
  // `python -m pip …`, `py -3 -m pip …`: `-m` among the interpreter's own
  // options, before a script it runs.
  if (
    /^(python[\d.]*|py)(\.exe)?$/i.test(
      path.basename(rest[0]?.replace(/\\/g, "/") ?? ""),
    )
  ) {
    const options = rest.slice(1);
    const end = options.findIndex((word) => !word.startsWith("-"));
    const module = options.slice(0, end < 0 ? undefined : end).indexOf("-m");
    if (module >= 0) {
      rest = options.slice(module + 1);
    }
  }
  const tool = installer(rest[0] ?? "");
  // The words after the installer that aren't options (`-q`, `--upgrade`).
  const args = rest.slice(1).filter((word) => !word.startsWith("-"));
  if (tool === "uv" && args[0] === "pip") {
    return [...PIP, "sync"].includes(args[1]);
  }
  return (
    args[0] !== undefined && (SUBCOMMANDS.get(tool) ?? []).includes(args[0])
  );
}

/**
 * A command line's commands, each as its words: split at `;`, `&`, `|` (so
 * `&&` and `||` too) and line breaks, and at spaces, outside quotes. Quotes
 * are removed; a backslash escapes only a double quote inside double quotes
 * (it's a path separator on Windows).
 */
function commands(line: string): string[][] {
  const result: string[][] = [];
  let words: string[] = [];
  let word: string | undefined;
  let quote: string | undefined;
  const endWord = () => {
    if (word !== undefined) {
      words.push(word);
      word = undefined;
    }
  };
  const endCommand = () => {
    endWord();
    if (words.length) {
      result.push(words);
    }
    words = [];
  };
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (quote !== undefined) {
      if (char === "\\" && quote === '"' && line[i + 1] === '"') {
        word = (word ?? "") + '"';
        i++;
      } else if (char === quote) {
        quote = undefined;
      } else {
        word = (word ?? "") + char;
      }
    } else if (char === "'" || char === '"') {
      quote = char;
      word = word ?? "";
    } else if (";&|\n".includes(char)) {
      endCommand();
    } else if (/\s/.test(char)) {
      endWord();
    } else {
      word = (word ?? "") + char;
    }
  }
  endCommand();
  return result;
}

/**
 * Whether a shell command line installs, upgrades or removes Python packages:
 * pip, uv, poetry, pdm, pipenv, conda (and mamba, micromamba) or pipx, in any
 * of the commands the line chains.
 */
export function isPackageInstall(commandLine: string): boolean {
  return commands(commandLine).some(changesPackages);
}
