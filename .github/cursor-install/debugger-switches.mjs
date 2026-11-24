// Whether a Linux Cursor build accepts the debugger switches Playwright's Electron launch passes.
//
//   node debugger-switches.mjs --cursor <dir>/cursor.json --pinned <version>
//
// Informational and always exits 0: a notice while the build still refuses them, a warning once it
// accepts them, so the Linux ui rows can move from the pinned Cursor back to the latest.
import {
  annotate,
  parseArgs,
  probeDebuggerSwitches,
  readJson,
} from "./lib.mjs";

const args = parseArgs(process.argv.slice(2));
const cursor = readJson(args.cursor);
const title = `Cursor ${cursor.version} debugger switches`;
const { refusal, error } = probeDebuggerSwitches(cursor.exe);
if (error) annotate("notice", title, `could not run it to check: ${error}`);
else if (refusal) annotate("notice", title, `still refused: ${refusal}`);
else
  annotate(
    "warning",
    title,
    `accepted: the Linux ui rows can move from Cursor ${args.pinned} to the latest ` +
      "(drop LINUX_UI_CURSOR_VERSION in .github/workflows/cursor-install.yml).",
  );
