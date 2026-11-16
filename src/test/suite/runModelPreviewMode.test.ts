/**
 * How Execute SQL decides between the editor text and the saved node: a
 * selection, an untitled buffer or any document that is not a file on disk
 * (a read-only `git:` document shows text that is not what is on disk) runs
 * inline; a clean file runs as its node; a dirty file runs inline and may
 * offer the node run.
 */
import { describe, expect, it } from "@jest/globals";
import { RunModel } from "../../commands/runModel";

type Editor = {
  selection: { isEmpty: boolean };
  document: { uri: { scheme: string }; isDirty: boolean };
};
const editor = (
  scheme: string,
  isDirty: boolean,
  selectionEmpty = true,
): Editor => ({
  selection: { isEmpty: selectionEmpty },
  document: { uri: { scheme }, isDirty },
});
const previewModeFor = (e: Editor) =>
  (
    Object.create(RunModel.prototype) as unknown as {
      previewModeFor(e: Editor): string;
    }
  ).previewModeFor(e);

describe("RunModel.previewModeFor", () => {
  it.each([
    ["a selection", editor("file", false, false), "inline"],
    ["an untitled buffer", editor("untitled", false), "inline"],
    ["a read-only git: document", editor("git", false), "inline"],
    ["an output or other non-file document", editor("output", false), "inline"],
    ["a clean file", editor("file", false), "as-model"],
    ["a dirty file", editor("file", true), "inline-then-offer"],
  ])("%s", (_name, e, expected) => {
    expect(previewModeFor(e)).toBe(expected);
  });
});
