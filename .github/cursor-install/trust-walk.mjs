// Replays the dependency walk older Cursor (before 3.11) runs before its publisher-trust prompt, using
// this checkout's package.json and Cursor's gallery, without Cursor itself.
//
//   node trust-walk.mjs [--package package.json] [--max-queries 50]
//
// Cursor 2.x–3.10 queries the gallery for an extension's dependencies and packs, records each answer
// under the id the gallery returned, and checks the next ones against the id it asked for. The gallery
// answers ms-python.vscode-pylance with anysphere.cursorpyright (which packs anysphere.python) and
// anysphere.python with ms-python.python (which packs Pylance), so a dependency that leads there is
// queried forever and the install never starts. This fails when the walk doesn't end.
import fs from "node:fs";
import {
  annotate,
  CURSOR_GALLERY,
  fetchRetry,
  parseArgs,
  summary,
} from "./lib.mjs";

const args = parseArgs(process.argv.slice(2));
const manifest = JSON.parse(
  fs.readFileSync(args.package || "package.json", "utf8"),
);
const maxQueries = Number(args["max-queries"] || 50);
const publisher = manifest.publisher.toLowerCase();

const property = (version, key) =>
  (
    version.properties?.find(
      (p) => p.key === `Microsoft.VisualStudio.Code.${key}`,
    )?.value || ""
  )
    .split(",")
    .map((d) => d.trim().toLowerCase())
    .filter(Boolean);

async function getExtensions(ids) {
  const body = {
    filters: [
      {
        criteria: ids.map((value) => ({ filterType: 7, value })),
        pageNumber: 1,
        pageSize: ids.length,
      },
    ],
    flags: 950,
  };
  const res = await fetchRetry(`${CURSOR_GALLERY}/extensionquery`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json;api-version=3.0-preview.1",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`gallery query failed: HTTP ${res.status}`);
  const json = await res.json();
  return (json.results?.[0]?.extensions || []).map((e) => ({
    id: `${e.publisher.publisherName}.${e.extensionName}`.toLowerCase(),
    next: [
      ...property(e.versions[0], "ExtensionDependencies"),
      ...property(e.versions[0], "ExtensionPack"),
    ],
  }));
}

// A fresh profile trusts no publisher yet: everything outside Power User's own publisher is walked.
let pending = [
  ...(manifest.extensionDependencies || []),
  ...(manifest.extensionPack || []),
]
  .map((d) => d.toLowerCase())
  .filter((d) => d.split(".")[0] !== publisher);
const seen = new Map();
const requests = [];
while (pending.length && requests.length < maxQueries) {
  requests.push(pending);
  const found = await getExtensions(pending);
  found.forEach((e) => seen.set(e.id, e));
  pending = found.flatMap((e) => e.next).filter((id) => !seen.has(id));
}

const counts = new Map();
requests.flat().forEach((id) => counts.set(id, (counts.get(id) || 0) + 1));
const repeated = [...counts]
  .filter(([, n]) => n > 1)
  .map(([id, n]) => `${id} ×${n}`);
const looped = pending.length > 0;
const deps = (manifest.extensionDependencies || []).join(", ") || "none";
if (looped) {
  annotate(
    "error",
    "Cursor trust walk",
    `extensionDependencies (${deps}) send Cursor before 3.11 into a gallery loop: still querying after ${maxQueries} rounds; repeated: ${repeated.join(", ")}`,
  );
}
summary(
  [
    `### ${looped ? "❌" : "✅"} Cursor trust walk (Cursor before 3.11)`,
    "",
    `extensionDependencies: ${deps}. ${requests.length} gallery queries; ${
      looped
        ? `no end after ${maxQueries}. Repeated: ${repeated.join(", ")}`
        : `ends with ${seen.size} extensions: ${[...seen.keys()].join(", ")}`
    }.`,
    "",
  ].join("\n"),
);
process.exit(looped ? 1 : 0);
