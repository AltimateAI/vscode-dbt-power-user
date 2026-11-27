// Whether a Linux Cursor build accepts the debugger switches Playwright's Electron launch passes.
//
//   node debugger-switches.mjs --cursor <dir>/cursor.json --pinned <version>
//
// Informational and always exits 0: a notice while the build still refuses them (or when the
// check can't tell), a warning once it accepts both, so the ui rows can move from the pinned
// Cursor back to the latest.
import {
  annotate,
  parseArgs,
  probeDebuggerSwitches,
  readJson,
} from "./lib.mjs";

const args = parseArgs(process.argv.slice(2));
const cursor = readJson(args.cursor);
const title = `Cursor ${cursor.version} debugger switches`;
const { refusal, accepted, unknown } = probeDebuggerSwitches(cursor.exe);
if (accepted)
  annotate(
    "warning",
    title,
    `accepted: the ui rows can move from Cursor ${args.pinned} to the latest. In ` +
      '.github/workflows/cursor-install.yml, set the plan step\'s "pinned" ui rows back to ' +
      '"latest", and drop UI_CURSOR_VERSION, UI_CURSOR_COMMIT and the "pinned" download branch.',
  );
else if (refusal) annotate("notice", title, `still refused: ${refusal}`);
else annotate("notice", title, `couldn't tell: ${unknown}`);
