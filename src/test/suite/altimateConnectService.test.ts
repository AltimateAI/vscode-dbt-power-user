import {
  afterAll,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import {
  commands,
  ConfigurationTarget,
  env,
  extensions,
  Uri,
  window,
  workspace,
} from "vscode";
import {
  AltimateConnectService,
  stripRemoteCredentials,
} from "../../services/altimateConnectService";

const PROJECT_ROOT = "/repo/jaffle_shop";

/**
 * Builds the service against fakes for its collaborators and records what it
 * opens in the browser, so each browser round-trip can be replayed by feeding
 * the callback URI back in.
 */
const harness = (opts: { altimateUrl?: string; instance?: string } = {}) => {
  const opened: string[] = [];
  const workspaceState = new Map<string, unknown>();
  const settings: [string, unknown, unknown][] = [];

  (env as Record<string, unknown>).openExternal = jest.fn(
    async (uri: unknown) => {
      opened.push(uri as string);
      return true;
    },
  );
  (Uri.parse as jest.Mock).mockImplementation((value: unknown) => value);
  (workspace.getConfiguration as jest.Mock).mockReturnValue({
    update: jest.fn(async (key: unknown, value: unknown, target: unknown) => {
      settings.push([key as string, value, target]);
    }),
  });

  const altimateRequest = {
    getInstanceName: jest.fn(() => opts.instance ?? "acme"),
    getAltimateUrl: jest.fn(
      () => opts.altimateUrl ?? "https://api.myaltimate.com",
    ),
    exchangeSocialToken: jest.fn(async () => ({
      apiKey: "key-123",
      email: "dev@acme.com",
    })),
    bindProjectToWorkspace: jest.fn(async () => ({})),
    findProjectBinding: jest.fn(async (): Promise<unknown> => undefined),
    validateCredentials: jest.fn(
      async (..._args: unknown[]): Promise<Record<string, unknown>> => ({
        ok: true,
      }),
    ),
  };
  const dbtProjectContainer = {
    getProjects: () => [
      {
        projectRoot: { fsPath: PROJECT_ROOT },
        getProjectName: () => "jaffle_shop",
      },
    ],
    getFromWorkspaceState: (key: string) => workspaceState.get(key),
    setToWorkspaceState: (key: string, value: unknown) =>
      workspaceState.set(key, value),
  };
  const telemetry = {
    sendTelemetryEvent: jest.fn(),
    sendTelemetryError: jest.fn(),
  };
  const terminal = { error: jest.fn(), debug: jest.fn() };

  const service = new AltimateConnectService(
    altimateRequest as never,
    dbtProjectContainer as never,
    telemetry as never,
    terminal as never,
  );
  const callback = (path: string, query: Record<string, string>) =>
    service.handleUri({
      path,
      query: new URLSearchParams(query).toString(),
    } as never);
  const lastState = () =>
    new URL(opened[opened.length - 1]).searchParams.get("state") ?? "";

  return { service, opened, settings, altimateRequest, callback, lastState };
};

describe("AltimateConnectService sign-in", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("opens SaaS sign-up with a redirect back to this extension", async () => {
    const h = harness();
    await h.service.startSignIn();

    const url = new URL(h.opened[0]);
    expect(url.origin + url.pathname).toBe(
      "https://app.myaltimate.com/register",
    );
    expect(url.searchParams.get("client")).toBe("power-user-for-dbt");
    expect(url.searchParams.get("redirect")).toBe(
      "vscode://innoverio.vscode-dbt-power-user/auth",
    );
    expect(h.lastState()).toMatch(/^[0-9a-f]{32}$/);
  });

  it("exchanges the token and saves the credentials", async () => {
    const h = harness();
    const connected = jest.fn();
    h.service.onDidConnectAccount(connected);
    await h.service.startSignIn();

    await h.callback("/auth", {
      state: h.lastState(),
      token: "one-time",
      instance: "acme",
      url: "https://api.myaltimate.com/",
    });

    expect(h.altimateRequest.exchangeSocialToken).toHaveBeenCalledWith(
      "https://api.myaltimate.com",
      "acme",
      "one-time",
    );
    // The URL goes first so validation triggered by the key uses it.
    expect(h.settings).toEqual([
      ["altimateUrl", "https://api.myaltimate.com", ConfigurationTarget.Global],
      ["altimateAiKey", "key-123", ConfigurationTarget.Global],
      ["altimateInstanceName", "acme", ConfigurationTarget.Global],
    ]);
    expect(connected).toHaveBeenCalledWith({
      instance: "acme",
      email: "dev@acme.com",
    });
  });

  it("rejects a callback this window did not start", async () => {
    const h = harness();
    await h.service.startSignIn();

    await h.callback("/auth", {
      state: "forged",
      token: "one-time",
      instance: "acme",
    });

    expect(h.altimateRequest.exchangeSocialToken).not.toHaveBeenCalled();
    expect(h.settings).toEqual([]);
    expect(window.showErrorMessage).toHaveBeenCalled();
  });

  it("refuses to send the token to a non-Altimate host", async () => {
    const h = harness();
    await h.service.startSignIn();

    await h.callback("/auth", {
      state: h.lastState(),
      token: "one-time",
      instance: "acme",
      url: "https://api.myaltimate.com.evil.example",
    });

    expect(h.altimateRequest.exchangeSocialToken).not.toHaveBeenCalled();
  });

  it("accepts the configured backend even off the allow-list", async () => {
    const h = harness({ altimateUrl: "http://localhost:8000" });
    await h.service.startSignIn();

    await h.callback("/auth", {
      state: h.lastState(),
      token: "one-time",
      instance: "acme",
      url: "http://localhost:8000",
    });

    expect(h.altimateRequest.exchangeSocialToken).toHaveBeenCalled();
  });
});

describe("AltimateConnectService instance sign-in", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.each([
    ["acme", "https://acme.app.getaltimate.com/login"],
    ["acme.app.getaltimate.com", "https://acme.app.getaltimate.com/login"],
    [
      "https://Acme.app.getaltimate.com/settings/api-key",
      "https://acme.app.getaltimate.com/login",
    ],
    ["acme.app.myaltimate.com", "https://acme.app.myaltimate.com/login"],
  ])("opens the login page for %s", async (input, expected) => {
    const h = harness();
    await h.service.startSignIn(input);

    const url = new URL(h.opened[0]);
    expect(url.origin + url.pathname).toBe(expected);
    expect(url.searchParams.get("client")).toBe("power-user-for-dbt");
    expect(url.searchParams.get("redirect")).toBe(
      "vscode://innoverio.vscode-dbt-power-user/auth",
    );
  });

  it.each(["acme.evil.example", "https://app.getaltimate.com.evil.example"])(
    "rejects %s, which is not an Altimate app",
    async (input) => {
      const h = harness();
      await expect(h.service.startSignIn(input)).rejects.toThrow(
        /not an Altimate URL/,
      );
      expect(h.opened).toEqual([]);
    },
  );
});

describe("AltimateConnectService API key sign-in", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("saves a free-plan key once the free-plan backend accepts it", async () => {
    const h = harness();
    const connected = jest.fn();
    h.service.onDidConnectAccount(connected);

    await h.service.connectWithApiKey(" Acme ", " key-abc ", "free");

    expect(h.altimateRequest.validateCredentials).toHaveBeenCalledTimes(1);
    expect(h.altimateRequest.validateCredentials).toHaveBeenCalledWith(
      "acme",
      "key-abc",
      "https://api.myaltimate.com",
      15_000,
    );
    expect(h.settings).toEqual([
      ["altimateUrl", "https://api.myaltimate.com", ConfigurationTarget.Global],
      ["altimateAiKey", "key-abc", ConfigurationTarget.Global],
      ["altimateInstanceName", "acme", ConfigurationTarget.Global],
    ]);
    expect(connected).toHaveBeenCalledWith({ instance: "acme" });
  });

  it("checks an enterprise key only on the enterprise backend", async () => {
    const h = harness();

    await h.service.connectWithApiKey("acme", "key-abc", "enterprise");

    expect(h.altimateRequest.validateCredentials).toHaveBeenCalledTimes(1);
    expect(h.altimateRequest.validateCredentials).toHaveBeenCalledWith(
      "acme",
      "key-abc",
      "https://api.getaltimate.com",
      15_000,
    );
    expect(h.settings[0]).toEqual([
      "altimateUrl",
      "https://api.getaltimate.com",
      ConfigurationTarget.Global,
    ]);
  });

  it("takes the instance from an address on the chosen plan", async () => {
    const h = harness();

    await h.service.connectWithApiKey(
      "https://sandbox.app.myaltimate.com/settings",
      "key-abc",
      "free",
    );

    expect(h.altimateRequest.validateCredentials).toHaveBeenCalledWith(
      "sandbox",
      "key-abc",
      "https://api.myaltimate.com",
      15_000,
    );
  });

  it("rejects an address from the other plan in browser sign-in", async () => {
    const h = harness();

    await expect(
      h.service.startSignIn("acme.app.myaltimate.com", "enterprise"),
    ).rejects.toThrow("is not an Enterprise address");
    expect(h.opened).toEqual([]);
  });

  it("opens an enterprise instance's login page for browser sign-in", async () => {
    const h = harness();

    await h.service.startSignIn("acme", "enterprise");

    expect(new URL(h.opened[0]).origin).toBe(
      "https://acme.app.getaltimate.com",
    );
  });

  it("rejects an address from the other plan", async () => {
    const h = harness();

    await expect(
      h.service.connectWithApiKey(
        "acme.app.myaltimate.com",
        "key-abc",
        "enterprise",
      ),
    ).rejects.toThrow("is not an Enterprise address");
    expect(h.altimateRequest.validateCredentials).not.toHaveBeenCalled();
  });

  it("uses the picked plan's backend over a configured one", async () => {
    const h = harness({ altimateUrl: "http://host.docker.internal:5001" });

    await h.service.connectWithApiKey("sandbox", "key-abc", "free");

    expect(h.altimateRequest.validateCredentials).toHaveBeenCalledWith(
      "sandbox",
      "key-abc",
      "https://api.myaltimate.com",
      15_000,
    );
  });

  it("names the host when the backend cannot be reached", async () => {
    const h = harness();
    h.altimateRequest.validateCredentials.mockResolvedValue({
      error: "fetch failed",
    });

    await expect(
      h.service.connectWithApiKey("sandbox", "key-abc", "free"),
    ).rejects.toThrow("Could not reach api.myaltimate.com: fetch failed");
    expect(h.settings).toEqual([]);
  });

  it("saves nothing and reports the error for a rejected key", async () => {
    const h = harness();
    h.altimateRequest.validateCredentials.mockResolvedValue({
      error:
        "Invalid credentials. Please check your API key and instance name.",
    });

    await expect(
      h.service.connectWithApiKey("acme", "bad", "free"),
    ).rejects.toThrow(
      "Invalid credentials. Please check your API key and instance name.",
    );
    expect(h.settings).toEqual([]);
  });

  it("refuses an address that is not an Altimate app", async () => {
    const h = harness();

    await expect(
      h.service.connectWithApiKey("acme.evil.com", "key-abc", "free"),
    ).rejects.toThrow("is not an Altimate URL");
    expect(h.altimateRequest.validateCredentials).not.toHaveBeenCalled();
  });
});

describe("AltimateConnectService setup link", () => {
  const setupLink = (query: Record<string, string>) => ({
    path: "/setup",
    query: new URLSearchParams(query).toString(),
  });
  const ENTERPRISE = {
    tenant: "acme",
    token: "one-time",
    apiUrl: "https://api.getaltimate.com",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("exchanges the token and saves the credentials once the user confirms", async () => {
    (window.showInformationMessage as jest.Mock).mockResolvedValue(
      "Sign In" as never,
    );
    const h = harness();
    const connected = jest.fn();
    h.service.onDidConnectAccount(connected);

    await h.service.handleUri(setupLink(ENTERPRISE) as never);

    expect(h.altimateRequest.exchangeSocialToken).toHaveBeenCalledWith(
      "https://api.getaltimate.com",
      "acme",
      "one-time",
    );
    // Altimate Code picks the key up from these settings itself.
    expect(h.settings.map(([key, value]) => [key, value])).toEqual([
      ["altimateUrl", "https://api.getaltimate.com"],
      ["altimateAiKey", "key-123"],
      ["altimateInstanceName", "acme"],
    ]);
    expect(connected).toHaveBeenCalledWith({
      instance: "acme",
      email: "dev@acme.com",
    });
  });

  it("does not spend the token when the user declines", async () => {
    (window.showInformationMessage as jest.Mock).mockResolvedValue(
      undefined as never,
    );
    const h = harness();

    await h.service.handleUri(setupLink(ENTERPRISE) as never);

    expect(h.altimateRequest.exchangeSocialToken).not.toHaveBeenCalled();
    expect(h.settings).toEqual([]);
  });

  it("ignores a link that carries the API key instead of a token", async () => {
    const h = harness();

    await h.service.handleUri(
      setupLink({
        tenant: "acme",
        apiKey: "key-456",
        apiUrl: "https://api.getaltimate.com",
      }) as never,
    );

    expect(window.showInformationMessage).not.toHaveBeenCalled();
    expect(h.settings).toEqual([]);
    expect(window.showErrorMessage).toHaveBeenCalled();
  });

  it("refuses a link to a non-Altimate backend without asking", async () => {
    const h = harness();

    await h.service.handleUri(
      setupLink({ ...ENTERPRISE, apiUrl: "https://evil.example" }) as never,
    );

    expect(window.showInformationMessage).not.toHaveBeenCalled();
    expect(h.settings).toEqual([]);
  });

  it("saves nothing when the token was already used", async () => {
    (window.showInformationMessage as jest.Mock).mockResolvedValue(
      "Sign In" as never,
    );
    const h = harness();
    h.altimateRequest.exchangeSocialToken.mockRejectedValue(
      new Error("Sign-in token exchange failed with status 400") as never,
    );

    await h.service.handleUri(setupLink(ENTERPRISE) as never);

    expect(h.settings).toEqual([]);
    expect(window.showErrorMessage).toHaveBeenCalled();
  });
});

describe("AltimateConnectService workspace link", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("is only offered for the freemium deployment", () => {
    expect(harness().service.canLinkWorkspace()).toBe(true);
    expect(
      harness({
        altimateUrl: "https://api.getaltimate.com",
      }).service.canLinkWorkspace(),
    ).toBe(false);
  });

  it("opens the tenant's create-and-link page with the project", async () => {
    const h = harness();
    await h.service.startWorkspaceLink(PROJECT_ROOT);

    const url = new URL(h.opened[0]);
    expect(url.origin + url.pathname).toBe(
      "https://acme.app.myaltimate.com/workspaces/create-and-link",
    );
    expect(url.searchParams.get("redirect")).toBe(
      "vscode://innoverio.vscode-dbt-power-user/workspace-bound",
    );
    const fragment = new URLSearchParams(url.hash.slice(1));
    expect(fragment.get("project_name")).toBe("jaffle_shop");
    expect(fragment.get("project_path")).toBe(PROJECT_ROOT);
  });

  it("binds and remembers the workspace returned for the project", async () => {
    const h = harness();
    const linked = jest.fn();
    h.service.onDidLinkWorkspace(linked);
    await h.service.startWorkspaceLink(PROJECT_ROOT);

    await h.callback("/workspace-bound", {
      state: h.lastState(),
      workspace_id: "42",
      tenant: "acme",
    });

    // The fake project path has no git remote.
    expect(h.altimateRequest.bindProjectToWorkspace).toHaveBeenCalledWith(
      42,
      undefined,
      PROJECT_ROOT,
    );
    expect(h.service.getLinkedWorkspaceId(PROJECT_ROOT)).toBe("42");
    expect(linked).toHaveBeenCalledWith({
      projectRoot: PROJECT_ROOT,
      workspaceId: "42",
    });
  });

  it("rejects a workspace from another instance", async () => {
    const h = harness();
    await h.service.startWorkspaceLink(PROJECT_ROOT);

    await h.callback("/workspace-bound", {
      state: h.lastState(),
      workspace_id: "42",
      tenant: "other",
    });

    expect(h.altimateRequest.bindProjectToWorkspace).not.toHaveBeenCalled();
    expect(h.service.getLinkedWorkspaceId(PROJECT_ROOT)).toBeUndefined();
  });
});

describe("AltimateConnectService.openAltimateCode", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (extensions.getExtension as jest.Mock).mockReturnValue({});
  });

  it("opens plain chat when no workspace is linked", async () => {
    const h = harness();
    await h.service.openAltimateCode(PROJECT_ROOT);

    expect(commands.executeCommand).toHaveBeenCalledWith("altimate.openChat", {
      showWorkspace: false,
    });
    expect(h.opened).toEqual([]);
  });

  it("opens chat beside the editor on the project's linked workspace", async () => {
    const h = harness();
    await h.service.startWorkspaceLink(PROJECT_ROOT);
    await h.callback("/workspace-bound", {
      state: h.lastState(),
      workspace_id: "42",
      tenant: "acme",
    });

    await h.service.openAltimateCode(PROJECT_ROOT, { beside: true });

    expect(commands.executeCommand).toHaveBeenCalledWith("altimate.openChat", {
      showWorkspace: true,
      workspaceId: "42",
      beside: true,
    });
  });

  it("points to the marketplace when Altimate Code is not installed", async () => {
    (extensions.getExtension as jest.Mock).mockReturnValue(undefined);
    const h = harness();
    await h.service.openAltimateCode(PROJECT_ROOT);

    expect(commands.executeCommand).toHaveBeenCalledWith(
      "workbench.extensions.search",
      "altimateai.vscode-altimate-mcp-server",
    );
  });
});

describe("AltimateConnectService review fixes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("accepts the callback of an earlier sign-in after Open again", async () => {
    const h = harness();
    await h.service.startSignIn();
    const first = h.lastState();
    await h.service.startSignIn();

    await h.callback("/auth", {
      state: first,
      token: "one-time",
      instance: "acme",
    });

    expect(h.altimateRequest.exchangeSocialToken).toHaveBeenCalled();
  });

  it("rejects an instance name that is not a tenant label", async () => {
    const h = harness();
    const failed = jest.fn();
    h.service.onDidFailConnect(failed);
    await h.service.startSignIn();

    await h.callback("/auth", {
      state: h.lastState(),
      token: "one-time",
      instance: "acme.evil/x",
    });

    expect(h.altimateRequest.exchangeSocialToken).not.toHaveBeenCalled();
    expect(failed).toHaveBeenCalledWith(
      expect.objectContaining({ flow: "signIn" }),
    );
  });

  it("matches the workspace tenant without regard to case", async () => {
    const h = harness({ instance: "Acme" });
    await h.service.startWorkspaceLink(PROJECT_ROOT);

    await h.callback("/workspace-bound", {
      state: h.lastState(),
      workspace_id: "42",
      tenant: "acme",
    });

    expect(h.altimateRequest.bindProjectToWorkspace).toHaveBeenCalled();
  });

  it("tells the wizard when the workspace setup was cancelled", async () => {
    const h = harness();
    const failed = jest.fn();
    h.service.onDidFailConnect(failed);
    await h.service.startWorkspaceLink(PROJECT_ROOT);

    await h.callback("/workspace-bound", {
      state: h.lastState(),
      error: "cancelled",
    });

    expect(h.altimateRequest.bindProjectToWorkspace).not.toHaveBeenCalled();
    expect(failed).toHaveBeenCalledWith({
      flow: "workspace",
      message: "Workspace setup was cancelled",
    });
  });

  it("forgets a project's workspace once signed in to another instance", async () => {
    const h = harness();
    await h.service.startWorkspaceLink(PROJECT_ROOT);
    await h.callback("/workspace-bound", {
      state: h.lastState(),
      workspace_id: "42",
      tenant: "acme",
    });
    expect(h.service.getLinkedWorkspaceId(PROJECT_ROOT)).toBe("42");

    h.altimateRequest.getInstanceName.mockReturnValue("other");

    expect(h.service.getLinkedWorkspaceId(PROJECT_ROOT)).toBeUndefined();
  });

  it("asks before replacing an existing sign-in from a setup link", async () => {
    (window.showInformationMessage as jest.Mock).mockResolvedValue(
      "Replace Sign-In" as never,
    );
    const h = harness({ instance: "current" });

    await h.service.handleUri({
      path: "/setup",
      query: new URLSearchParams({
        tenant: "acme",
        token: "one-time",
        apiUrl: "https://api.getaltimate.com",
      }).toString(),
    } as never);

    expect(window.showInformationMessage).toHaveBeenCalledWith(
      `Replace Power User for dbt's Altimate sign-in "current" with "acme"?`,
      expect.objectContaining({
        modal: true,
        detail: expect.stringContaining("api.getaltimate.com"),
      }),
      "Replace Sign-In",
    );
    expect(h.altimateRequest.exchangeSocialToken).toHaveBeenCalled();
  });

  it("offers no browser sign-in or workspace in editors the SaaS cannot reach", () => {
    const scheme = env.uriScheme;
    (env as Record<string, unknown>).uriScheme = "vscodium";
    const h = harness();

    expect(h.service.supportsBrowserSignIn()).toBe(false);
    expect(h.service.canLinkWorkspace()).toBe(false);

    (env as Record<string, unknown>).uriScheme = scheme;
  });
});

describe("AltimateConnectService workspace bind failures", () => {
  const SHARED = { datamate: { id: 7, name: "Shared" } };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.each([
    [
      "https://dev:ghp_secret@github.com/acme/jaffle.git",
      "https://github.com/acme/jaffle.git",
    ],
    ["http://token@git.acme.dev/jaffle", "http://git.acme.dev/jaffle"],
    [
      "https://github.com/acme/jaffle.git",
      "https://github.com/acme/jaffle.git",
    ],
    ["git@github.com:acme/jaffle.git", "git@github.com:acme/jaffle.git"],
    ["ssh://git@github.com/acme/jaffle", "ssh://git@github.com/acme/jaffle"],
  ])("sends %s as %s", (remote, expected) => {
    expect(stripRemoteCredentials(remote)).toBe(expected);
  });

  it("uses the workspace a project is already bound to without the browser", async () => {
    const h = harness();
    h.altimateRequest.findProjectBinding.mockResolvedValue(SHARED);
    const linked = jest.fn();
    h.service.onDidLinkWorkspace(linked);

    await h.service.startWorkspaceLink(PROJECT_ROOT);

    expect(h.opened).toEqual([]);
    expect(linked).toHaveBeenCalledWith({
      projectRoot: PROJECT_ROOT,
      workspaceId: "7",
    });
  });

  it("keeps the handoff open for a retry after a failed bind", async () => {
    const h = harness();
    h.altimateRequest.bindProjectToWorkspace.mockRejectedValueOnce(
      new Error("server responded with 502") as never,
    );
    const failed = jest.fn();
    h.service.onDidFailConnect(failed);
    await h.service.startWorkspaceLink(PROJECT_ROOT);
    const params = { state: h.lastState(), workspace_id: "42", tenant: "acme" };

    await h.callback("/workspace-bound", params);
    expect(failed).toHaveBeenCalledWith({
      flow: "workspace",
      message: "server responded with 502",
    });

    await h.callback("/workspace-bound", params);
    expect(h.altimateRequest.bindProjectToWorkspace).toHaveBeenCalledTimes(2);
    expect(h.service.getLinkedWorkspaceId(PROJECT_ROOT)).toBe("42");
  });

  it("offers the existing workspace when the project is bound elsewhere", async () => {
    (window.showWarningMessage as jest.Mock).mockResolvedValue(
      'Use "Shared"' as never,
    );
    const h = harness();
    h.altimateRequest.bindProjectToWorkspace.mockRejectedValue(
      new Error("server responded with 409") as never,
    );
    const failed = jest.fn();
    h.service.onDidFailConnect(failed);
    await h.service.startWorkspaceLink(PROJECT_ROOT);
    // Bound by a teammate while the browser page was open.
    h.altimateRequest.findProjectBinding.mockResolvedValue(SHARED);

    await h.callback("/workspace-bound", {
      state: h.lastState(),
      workspace_id: "42",
      tenant: "acme",
    });

    expect(failed).toHaveBeenCalledWith({
      flow: "workspace",
      message:
        'This project is already linked to the workspace "Shared", so the new workspace was not linked.',
    });
    expect(h.service.getLinkedWorkspaceId(PROJECT_ROOT)).toBe("7");
  });

  it("rejects a callback after switching to another backend", async () => {
    const h = harness();
    await h.service.startWorkspaceLink(PROJECT_ROOT);
    h.altimateRequest.getAltimateUrl.mockReturnValue(
      "https://api.getaltimate.com",
    );

    await h.callback("/workspace-bound", {
      state: h.lastState(),
      workspace_id: "42",
      tenant: "acme",
    });

    expect(h.altimateRequest.bindProjectToWorkspace).not.toHaveBeenCalled();
  });

  it("ignores a sign-in the user moved on from", async () => {
    const h = harness();
    await h.service.startSignIn();
    h.service.cancelSignIn();

    await h.callback("/auth", {
      state: h.lastState(),
      token: "one-time",
      instance: "acme",
    });

    expect(h.altimateRequest.exchangeSocialToken).not.toHaveBeenCalled();
  });
});

// The harness reconfigures shared vscode mocks; put them back for any suite
// that runs after this one in the same module registry.
afterAll(() => {
  (workspace.getConfiguration as jest.Mock).mockReturnValue({
    get: jest.fn(),
    has: jest.fn(),
    update: jest.fn(),
  });
  (extensions.getExtension as jest.Mock).mockReset();
  (Uri.parse as jest.Mock).mockReset();
  delete (env as Record<string, unknown>).openExternal;
});
