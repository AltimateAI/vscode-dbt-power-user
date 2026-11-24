import { describe, expect, it } from "@jest/globals";
import { encodeMentions } from "../../comment_provider/mentions";

const users = ["Local", "Local Member", "Sarav", "A.B (Ext)"];

describe("encodeMentions", () => {
  it("encodes a two-word display name as one mention", () => {
    expect(encodeMentions("@Local Member please review ", users)).toBe(
      "@[Local Member](Local Member) please review ",
    );
  });

  it("prefers the longest matching display name", () => {
    expect(encodeMentions("@Local please and @Local Member ", users)).toBe(
      "@[Local](Local) please and @[Local Member](Local Member) ",
    );
  });

  it("encodes a known name at the end of the text or before punctuation", () => {
    expect(encodeMentions("thanks @Sarav, cc @Local Member", users)).toBe(
      "thanks @[Sarav](Sarav), cc @[Local Member](Local Member)",
    );
  });

  it("escapes regex characters in display names", () => {
    expect(encodeMentions("@A.B (Ext) hi", users)).toBe(
      "@[A.B (Ext)](A.B (Ext)) hi",
    );
  });

  it("does not match a known name inside a longer word", () => {
    expect(encodeMentions("@Localhost is down ", users)).toBe(
      "@[Localhost](Localhost) is down ",
    );
  });

  it("keeps the first-word encoding when no users are loaded", () => {
    expect(encodeMentions("@Local Member please ", [])).toBe(
      "@[Local](Local) Member please ",
    );
  });

  it("leaves text without mentions unchanged", () => {
    expect(encodeMentions("no mentions here", users)).toBe("no mentions here");
  });
});
