import { describe, expect, it } from "@jest/globals";
import { WhatsNewPanel } from "../../webview_provider/whatsNewPanel";

// `isMinorOrMajorUpgrade` is the rule that decides whether the What's New page
// opens by itself after an update. It's the feature's most user-visible
// behaviour and can't practically be hand-tested across every version
// transition — each manual check consumes the trigger, because activation
// persists the current version whether or not the page opened.
describe("WhatsNewPanel.isMinorOrMajorUpgrade", () => {
  describe("opens on a minor or major upgrade", () => {
    it.each([
      ["0.62.1", "0.63.0", "minor bump"],
      ["0.62.1", "0.63.4", "minor bump carrying a patch"],
      ["0.62.1", "1.0.0", "major bump"],
      ["0.9.9", "1.0.0", "major rollover"],
      ["1.2.3", "2.0.0", "major bump from a released major"],
      ["0.62.1", "0.70.0", "several minors at once (skipped releases)"],
    ])("%s -> %s (%s)", (prev, curr) => {
      expect(WhatsNewPanel.isMinorOrMajorUpgrade(prev, curr)).toBe(true);
    });
  });

  describe("stays silent on patch-only or non-upgrades", () => {
    it.each([
      ["0.62.1", "0.62.2", "patch bump"],
      ["0.62.1", "0.62.11", "patch bump, multi-digit"],
      ["0.62.1", "0.62.1", "same version (a plain reload)"],
    ])("%s -> %s (%s)", (prev, curr) => {
      expect(WhatsNewPanel.isMinorOrMajorUpgrade(prev, curr)).toBe(false);
    });
  });

  describe("never opens when going backwards", () => {
    // Downgrades happen when a user rolls back a release or installs an older
    // VSIX. Showing "What's New" for changes they just lost would be wrong.
    it.each([
      ["0.63.0", "0.62.1", "minor downgrade"],
      ["1.0.0", "0.9.9", "major downgrade"],
      ["0.62.2", "0.62.1", "patch downgrade"],
    ])("%s -> %s (%s)", (prev, curr) => {
      expect(WhatsNewPanel.isMinorOrMajorUpgrade(prev, curr)).toBe(false);
    });
  });

  describe("tolerates version strings it can't read", () => {
    // Better to stay silent than to pop the page open on a value we failed to
    // parse — a spurious auto-open is more annoying than a missed one.
    it.each([
      ["", "0.63.0", "empty previous"],
      ["not-a-version", "0.63.0", "unparseable previous"],
      ["0.62.1", "", "empty current"],
      ["0.62.1", "garbage", "unparseable current"],
      ["0.62", "0.63.0", "previous missing patch segment"],
    ])("%s -> %s (%s)", (prev, curr) => {
      expect(WhatsNewPanel.isMinorOrMajorUpgrade(prev, curr)).toBe(false);
    });
  });

  describe("handles real-world version shapes", () => {
    it("ignores a pre-release suffix and compares the numeric core", () => {
      expect(
        WhatsNewPanel.isMinorOrMajorUpgrade("0.62.1", "0.63.0-beta.1"),
      ).toBe(true);
    });

    it("does not open for a pre-release of the same minor", () => {
      expect(
        WhatsNewPanel.isMinorOrMajorUpgrade("0.62.1", "0.62.2-beta.1"),
      ).toBe(false);
    });

    it("tolerates surrounding whitespace", () => {
      expect(WhatsNewPanel.isMinorOrMajorUpgrade(" 0.62.1 ", " 0.63.0 ")).toBe(
        true,
      );
    });
  });
});
