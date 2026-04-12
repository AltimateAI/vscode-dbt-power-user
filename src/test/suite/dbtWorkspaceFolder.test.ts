import { describe, expect, it } from "@jest/globals";
import {
  DBT_PACKAGE_DIR_NAMES,
  isDBtProjectFileOutsidePackageDir,
} from "../../dbt_client/dbtWorkspaceFolder";

describe("isDBtProjectFileOutsidePackageDir", () => {
  describe("static package-directory gate", () => {
    it("rejects POSIX paths inside dbt_packages/", () => {
      expect(
        isDBtProjectFileOutsidePackageDir(
          "/home/coder/project/dbt_packages/dbt_utils/dbt_project.yml",
          [],
        ),
      ).toBe(false);
    });

    it("rejects POSIX paths inside dbt_internal_packages/", () => {
      expect(
        isDBtProjectFileOutsidePackageDir(
          "/home/coder/project/dbt_internal_packages/dbt_date/dbt_project.yml",
          [],
        ),
      ).toBe(false);
    });

    it("rejects POSIX paths inside site-packages/", () => {
      expect(
        isDBtProjectFileOutsidePackageDir(
          "/home/coder/.venv/lib/python3.11/site-packages/dbt/dbt_project.yml",
          [],
        ),
      ).toBe(false);
    });

    it("rejects Windows paths inside dbt_packages\\", () => {
      // The reporter environment for #1776 is Windows — tphillip33's
      // diagnostics dump has paths like c:\Git\repos\phi_omop\...
      expect(
        isDBtProjectFileOutsidePackageDir(
          "c:\\Git\\repos\\phi_omop\\dbt_packages\\dbt_utils\\dbt_project.yml",
          [],
        ),
      ).toBe(false);
    });

    it("rejects mixed-separator paths (Windows + forward slashes)", () => {
      // Windows tools sometimes produce mixed-style paths, and VS Code Uri
      // normalization can yield either form. Both must be caught.
      expect(
        isDBtProjectFileOutsidePackageDir(
          "c:/Git/repos/proj/dbt_packages/dbt_utils/dbt_project.yml",
          [],
        ),
      ).toBe(false);
    });

    it("rejects deeply nested packages inside other packages", () => {
      // Some dbt packages themselves install sub-packages into their own
      // dbt_packages/ directory, creating a nested layout. The static
      // check must still reject those because any path segment match
      // wins.
      expect(
        isDBtProjectFileOutsidePackageDir(
          "/home/coder/project/dbt_packages/dbt_expectations/dbt_packages/dbt_date/dbt_project.yml",
          [],
        ),
      ).toBe(false);
    });

    it("accepts a normal root project path", () => {
      expect(
        isDBtProjectFileOutsidePackageDir(
          "/home/coder/project/dbt_project.yml",
          [],
        ),
      ).toBe(true);
    });

    it("accepts a nested real project (monorepo layout)", () => {
      // A project at /workspace/services/analytics/dbt_project.yml is a
      // legitimate project, not a package, and must pass the gate.
      expect(
        isDBtProjectFileOutsidePackageDir(
          "/workspace/services/analytics/dbt_project.yml",
          [],
        ),
      ).toBe(true);
    });

    it("does not match a directory whose name merely starts with dbt_packages", () => {
      // A directory literally named dbt_packages_backup is not a package
      // directory. Segment-based matching (not prefix matching) handles
      // this correctly.
      expect(
        isDBtProjectFileOutsidePackageDir(
          "/home/coder/project/dbt_packages_backup/dbt_project.yml",
          [],
        ),
      ).toBe(true);
    });
  });

  describe("dynamic packages-install-path gate", () => {
    it("rejects paths under a registered project's custom packages-install-path", () => {
      // dbt_project.yml supports `packages-install-path: my_custom_deps`
      // which is not in the static list. The dynamic check still catches
      // it, but only after the registered project has populated its path.
      expect(
        isDBtProjectFileOutsidePackageDir(
          "/workspace/my_custom_deps/somepkg/dbt_project.yml",
          ["/workspace/my_custom_deps"],
        ),
      ).toBe(false);
    });

    it("accepts paths outside every registered project's packages-install-path", () => {
      expect(
        isDBtProjectFileOutsidePackageDir(
          "/workspace/other/dbt_project.yml",
          ["/workspace/my_custom_deps"],
        ),
      ).toBe(true);
    });

    it("tolerates undefined entries in packagesInstallPaths", () => {
      // A project that's still initializing (refreshProjectConfig has not
      // completed) returns undefined from getPackageInstallPath(). Those
      // entries must be skipped, not throw.
      expect(
        isDBtProjectFileOutsidePackageDir(
          "/workspace/project/dbt_project.yml",
          [undefined, undefined],
        ),
      ).toBe(true);
    });
  });

  describe("race-condition guarantee (the #1776 regression)", () => {
    // Verbatim copy of the pre-fix filter in createConfigWatcher.onDidCreate.
    // Kept here so the regression characterization is unambiguous: the old
    // implementation, when called with an empty packagesInstallPaths list
    // (as it was during cold-start onDidCreate before any project had
    // finished refreshProjectConfig), returned true for every path,
    // including package subpaths. This is what let phantom projects
    // register.
    const preFixNotInDBtPackages = (
      uri: string,
      packagesInstallPaths: (string | undefined)[],
    ): boolean => {
      for (const packagesInstallPath of packagesInstallPaths) {
        if (packagesInstallPath) {
          if (uri.startsWith(packagesInstallPath)) {
            return false;
          }
        }
      }
      return true;
    };

    it("pre-fix filter WOULD register a phantom package project during the race window", () => {
      // Characterizes the bug: with no project registered yet, the old
      // filter accepts a dbt_packages subpath as a legitimate project.
      const phantomPath =
        "/workspace/project/dbt_packages/dbt_utils/dbt_project.yml";
      expect(preFixNotInDBtPackages(phantomPath, [])).toBe(true);
    });

    it("pre-fix filter WOULD register a phantom on Windows during the race window", () => {
      const phantomPath =
        "c:\\Git\\repos\\phi_omop\\dbt_packages\\dbt_utils\\dbt_project.yml";
      expect(preFixNotInDBtPackages(phantomPath, [])).toBe(true);
    });

    it("post-fix filter rejects the same phantom path during the race window", () => {
      // The fix adds a static path-segment check that runs before the
      // dynamic one, so the same phantom path is now rejected even with
      // an empty packagesInstallPaths list.
      expect(
        isDBtProjectFileOutsidePackageDir(
          "/workspace/project/dbt_packages/dbt_utils/dbt_project.yml",
          [],
        ),
      ).toBe(false);
      expect(
        isDBtProjectFileOutsidePackageDir(
          "c:\\Git\\repos\\phi_omop\\dbt_packages\\dbt_utils\\dbt_project.yml",
          [],
        ),
      ).toBe(false);
    });

    it("exposes all three package directory names on the exported constant", () => {
      // The fix relies on DBT_PACKAGE_DIR_NAMES being in sync with the
      // exclude glob used by discoverProjects(). If another maintainer
      // renames this list in the future, this assertion guards against
      // silently shrinking it below what the async discovery path excludes.
      expect([...DBT_PACKAGE_DIR_NAMES].sort()).toEqual(
        ["dbt_internal_packages", "dbt_packages", "site-packages"].sort(),
      );
    });
  });
});
