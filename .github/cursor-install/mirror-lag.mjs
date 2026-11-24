// Compare what Cursor's gallery serves with Open VSX, per target, for Power User and the MCP server.
// Warns (never fails) when Cursor is behind Open VSX, or when a target falls back to an old
// universal build because Cursor's mirror has no build for that target.
import {
  annotate,
  compareVersions,
  cursorGalleryVersions,
  fetchRetry,
  MCP_ID,
  OPEN_VSX,
  PU_ID,
  resolveForTarget,
  summary,
} from "./lib.mjs";

// Targets users run Cursor on. Power User and the MCP server publish platform builds for most of them.
const TARGETS = [
  "darwin-arm64",
  "darwin-x64",
  "linux-x64",
  "linux-arm64",
  "win32-x64",
  "win32-arm64",
];

// Open VSX's latest for a target; "universal" when the target has no build of its own.
async function openVsxLatest(extensionId, target) {
  const [ns, name] = extensionId.split(".");
  let res = await fetchRetry(`${OPEN_VSX}/${ns}/${name}/${target}`);
  if (res.status === 404)
    res = await fetchRetry(`${OPEN_VSX}/${ns}/${name}/universal`);
  if (res.status === 404) return undefined;
  if (!res.ok)
    throw new Error(`Open VSX ${extensionId} ${target}: HTTP ${res.status}`);
  const json = await res.json();
  return { version: json.version, target: json.targetPlatform || "universal" };
}

const rows = [];
let warnings = 0;
for (const id of [PU_ID, MCP_ID]) {
  const cursorVersions = await cursorGalleryVersions(id);
  if (!cursorVersions.length) {
    annotate(
      "warning",
      "Cursor mirror",
      `${id} is not listed in Cursor's gallery`,
    );
    warnings++;
    continue;
  }
  const newest = cursorVersions
    .map((v) => v.version)
    .sort(compareVersions)
    .pop();
  for (const target of TARGETS) {
    const cursor = resolveForTarget(cursorVersions, target);
    const open = await openVsxLatest(id, target);
    const notes = [];
    if (open && cursor && compareVersions(cursor.version, open.version) < 0) {
      notes.push(
        `Cursor serves ${cursor.version}, Open VSX has ${open.version}`,
      );
    }
    if (
      cursor &&
      cursor.target === "universal" &&
      compareVersions(cursor.version, newest) < 0
    ) {
      notes.push(
        `no ${newest} build for this target: falls back to the old universal build ${cursor.version}`,
      );
    }
    if (!cursor) notes.push("Cursor has no build for this target");
    for (const n of notes) {
      annotate("warning", `Cursor mirror: ${id} ${target}`, n);
      warnings++;
    }
    rows.push(
      `| ${id} | ${target} | ${cursor ? `${cursor.version} (${cursor.target})` : "none"} | ${
        open ? `${open.version} (${open.target})` : "none"
      } | ${notes.length ? `⚠️ ${notes.join("; ")}` : "ok"} |`,
    );
  }
}

summary(
  [
    `### ${warnings ? "⚠️" : "✅"} Cursor mirror vs Open VSX`,
    "",
    "What a fresh Cursor install gets for each target, against the latest on Open VSX.",
    "",
    "| Extension | Target | Cursor serves | Open VSX latest | Note |",
    "|---|---|---|---|---|",
    ...rows,
    "",
  ].join("\n"),
);
