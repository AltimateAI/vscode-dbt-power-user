import assert from "node:assert/strict";
import { test } from "node:test";
import { annotate, escapeData, escapeProperty } from "./lib.mjs";

function captured(fn) {
  const lines = [];
  const original = console.log;
  console.log = (line) => lines.push(line);
  try {
    fn();
  } finally {
    console.log = original;
  }
  return lines;
}

test("message data escapes %, CR and LF", () => {
  assert.equal(escapeData("100% done\r\nnext"), "100%25 done%0D%0Anext");
});

test("title properties also escape : and , and keep the text", () => {
  assert.equal(
    escapeProperty("Cursor 2.6.20 UI, linux-x64: 50%"),
    "Cursor 2.6.20 UI%2C linux-x64%3A 50%25",
  );
});

test("annotate writes one escaped workflow command", () => {
  const lines = captured(() =>
    annotate("warning", "Cursor mirror: a, b", "line 1\nline 2: 5%"),
  );
  assert.deepEqual(lines, [
    "::warning title=Cursor mirror%3A a%2C b::line 1%0Aline 2: 5%25",
  ]);
});
