import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import { CodeLens, extensions } from "vscode";
import { SqlActionsCodeLensProvider } from "../../code_lens_provider/sqlActionsCodeLensProvider";

// Git watching in this provider exists only to gate the "Review changes with
// Altimate" codelens on files with uncommitted changes. These tests cover:
//  - git is not touched at construction (lazy init avoids the activation-time
//    "Git model not found" race),
//  - a throwing getAPI(1) degrades gracefully instead of crashing,
//  - the Review lens is correctly gated on git change state.

const getExtension = extensions.getExtension as jest.Mock;

function makeChatService() {
  return {
    getRelativePath: jest.fn().mockReturnValue("models/x.sql"),
    openChat: jest.fn().mockResolvedValue(undefined),
  } as any;
}

function makeDoc(fsPath: string): any {
  return { fileName: fsPath, uri: { fsPath } };
}

function makeRepo(changedPaths: string[]) {
  return {
    state: {
      workingTreeChanges: changedPaths.map((p) => ({ uri: { fsPath: p } })),
      indexChanges: [],
      onDidChange: jest.fn().mockReturnValue({ dispose: jest.fn() }),
    },
  };
}

function makeGitExt(opts: { repos?: any[]; throwGetAPI?: boolean }) {
  return {
    isActive: true,
    activate: jest.fn().mockResolvedValue(undefined),
    exports: {
      getAPI: jest.fn(() => {
        if (opts.throwGetAPI) {
          throw new Error("Git model not found");
        }
        return {
          repositories: opts.repos ?? [],
          onDidOpenRepository: jest
            .fn()
            .mockReturnValue({ dispose: jest.fn() }),
        };
      }),
    },
  };
}

const token = {} as any;
const titlesOf = (lenses: any): (string | undefined)[] =>
  (lenses as CodeLens[]).map((l) => l.command?.title);

describe("SqlActionsCodeLensProvider git watching", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("does not touch the git extension at construction (lazy init)", () => {
    getExtension.mockReturnValue(makeGitExt({ repos: [] }));
    const provider = new SqlActionsCodeLensProvider(makeChatService());

    // Constructor must not read the git API — that races git activation.
    expect(getExtension).not.toHaveBeenCalled();

    provider.provideCodeLenses(makeDoc("a.sql"), token);
    expect(getExtension).toHaveBeenCalledWith("vscode.git");
  });

  it("does not crash when getAPI(1) throws 'Git model not found'", () => {
    getExtension.mockReturnValue(makeGitExt({ throwGetAPI: true }));
    const provider = new SqlActionsCodeLensProvider(makeChatService());

    let lenses: any;
    expect(() => {
      lenses = provider.provideCodeLenses(makeDoc("a.sql"), token);
    }).not.toThrow();

    const titles = titlesOf(lenses);
    // Base lenses still returned; Review lens absent (no git state available).
    expect(titles).toEqual(expect.arrayContaining(["$(play) Execute Query"]));
    expect(titles.some((t) => t?.includes("Review"))).toBe(false);
  });

  it("includes the Review lens for a file with uncommitted git changes", () => {
    const repo = makeRepo(["/repo/models/customers.sql"]);
    getExtension.mockReturnValue(makeGitExt({ repos: [repo] }));
    const provider = new SqlActionsCodeLensProvider(makeChatService());

    const lenses = provider.provideCodeLenses(
      makeDoc("/repo/models/customers.sql"),
      token,
    );
    expect(titlesOf(lenses)).toContain("$(sparkle) Review");
  });

  it("omits the Review lens for a file with no git changes", () => {
    const repo = makeRepo([]);
    getExtension.mockReturnValue(makeGitExt({ repos: [repo] }));
    const provider = new SqlActionsCodeLensProvider(makeChatService());

    const lenses = provider.provideCodeLenses(
      makeDoc("/repo/models/customers.sql"),
      token,
    );
    expect(titlesOf(lenses).some((t) => t?.includes("Review"))).toBe(false);
  });

  it("initializes the git watcher only once across codelens requests", () => {
    const gitExt = makeGitExt({ repos: [] });
    getExtension.mockReturnValue(gitExt);
    const provider = new SqlActionsCodeLensProvider(makeChatService());

    provider.provideCodeLenses(makeDoc("a.sql"), token);
    provider.provideCodeLenses(makeDoc("b.sql"), token);

    expect(gitExt.exports.getAPI).toHaveBeenCalledTimes(1);
  });
});
