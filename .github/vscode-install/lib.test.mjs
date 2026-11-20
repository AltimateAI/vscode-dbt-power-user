import assert from "node:assert/strict";
import test from "node:test";
import {
  pickBaseline,
  projectFiles,
  shellQuote,
  versionsFromQuery,
} from "./lib.mjs";

const PRE = { key: "Microsoft.VisualStudio.Code.PreRelease", value: "true" };

function query(versions) {
  return { results: [{ extensions: [{ versions }] }] };
}

test("versionsFromQuery reads target and pre-release flag", () => {
  const got = versionsFromQuery(
    query([
      { version: "0.70.0", targetPlatform: "linux-x64", properties: [] },
      { version: "0.59.9", targetPlatform: "linux-x64", properties: [PRE] },
      { version: "0.40.0" },
    ]),
  );
  assert.deepEqual(got, [
    { version: "0.70.0", target: "linux-x64", preRelease: false },
    { version: "0.59.9", target: "linux-x64", preRelease: true },
    { version: "0.40.0", target: "universal", preRelease: false },
  ]);
});

test("versionsFromQuery returns nothing for an unknown extension", () => {
  assert.deepEqual(versionsFromQuery({ results: [{ extensions: [] }] }), []);
  assert.deepEqual(versionsFromQuery({}), []);
});

const published = [
  { version: "0.71.0", target: "linux-x64", preRelease: true },
  { version: "0.70.0", target: "linux-x64", preRelease: false },
  { version: "0.70.0", target: "win32-x64", preRelease: false },
  { version: "0.69.0", target: "linux-x64", preRelease: false },
  { version: "0.69.0", target: "darwin-arm64", preRelease: false },
  { version: "0.9.0", target: "universal", preRelease: false },
];

test("pickBaseline takes the newest stable release older than the build", () => {
  assert.equal(pickBaseline(published, "linux-x64", "0.71.0"), "0.70.0");
  // A build whose version is already published starts from the release before it.
  assert.equal(pickBaseline(published, "linux-x64", "0.70.0"), "0.69.0");
});

test("pickBaseline skips pre-releases and other targets", () => {
  assert.equal(pickBaseline(published, "linux-x64", "0.72.0"), "0.70.0");
  assert.equal(pickBaseline(published, "darwin-arm64", "0.71.0"), "0.69.0");
});

test("pickBaseline compares versions numerically and falls back to universal", () => {
  assert.equal(pickBaseline(published, "darwin-x64", "0.71.0"), "0.9.0");
  assert.equal(pickBaseline(published, "linux-x64", "0.9.0"), undefined);
});

test("projectFiles writes a DuckDB profile with forward slashes", () => {
  const files = projectFiles("vsix_check", "D:\\a\\_temp\\check\\db.duckdb");
  assert.match(
    files["profiles/profiles.yml"],
    /path: 'D:\/a\/_temp\/check\/db\.duckdb'/,
  );
  assert.match(files["dbt_project.yml"], /^name: vsix_check$/m);
  assert.equal(files["models/vsix_check.sql"], "select 1 as id\n");
});

test("shellQuote quotes only what a shell would split", () => {
  assert.deepEqual(shellQuote(["--install-extension", "a b.vsix", "x@1.0.0"]), [
    "--install-extension",
    '"a b.vsix"',
    "x@1.0.0",
  ]);
});
