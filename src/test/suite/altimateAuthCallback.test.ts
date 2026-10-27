import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { commands, window, workspace } from "vscode";
import {
  CONNECT_STATE_KEY,
  handleAltimateAuthCallback,
} from "../../altimateAuthCallback";

describe("handleAltimateAuthCallback", () => {
  let configUpdate: jest.Mock<any>;
  let configGet: jest.Mock<any>;
  let globalState: { get: jest.Mock<any>; update: jest.Mock<any> };
  let telemetry: { sendTelemetryError: jest.Mock<any> };
  let fetchImpl: jest.Mock<any>;

  const callback = (query: string) =>
    handleAltimateAuthCallback(
      { query },
      {
        globalState,
        telemetry,
        fetchImpl: fetchImpl as unknown as typeof fetch,
      },
    );

  const okResponse = (auth_token: string) =>
    ({
      ok: true,
      status: 200,
      statusText: "OK",
      json: () => Promise.resolve({ auth_token }),
    }) as unknown as Response;

  beforeEach(() => {
    jest.clearAllMocks();
    configUpdate = jest.fn(() => Promise.resolve());
    configGet = jest.fn(() => undefined);
    (workspace.getConfiguration as jest.Mock<any>).mockReturnValue({
      get: configGet,
      update: configUpdate,
    });
    globalState = {
      get: jest.fn(() => "nonce-1"),
      update: jest.fn(() => Promise.resolve()),
    };
    telemetry = { sendTelemetryError: jest.fn() };
    fetchImpl = jest.fn(() => Promise.resolve(okResponse("key-from-exchange")));
  });

  it("exchanges the one-time token, stores the credential and reopens onboarding", async () => {
    const result = await callback(
      "instance=acme&token=tok-1&state=nonce-1&url=https%3A%2F%2Fapi.example.com%2F",
    );

    expect(result).toBe("connected");
    expect(fetchImpl).toHaveBeenCalledWith(
      "https://api.example.com/auth/social/exchange",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({ "x-tenant": "acme" }),
        body: JSON.stringify({ token: "tok-1" }),
      }),
    );
    expect(configUpdate).toHaveBeenCalledWith(
      "altimateUrl",
      "https://api.example.com/",
      true,
    );
    expect(configUpdate).toHaveBeenCalledWith(
      "altimateAiKey",
      "key-from-exchange",
      true,
    );
    expect(configUpdate).toHaveBeenCalledWith(
      "altimateInstanceName",
      "acme",
      true,
    );
    expect(globalState.update).toHaveBeenCalledWith(
      CONNECT_STATE_KEY,
      undefined,
    );
    expect(commands.executeCommand).toHaveBeenCalledWith(
      "dbtPowerUser.openOnboarding",
    );
  });

  it("falls back to the configured API URL when the callback carries none", async () => {
    configGet.mockImplementation((key: string) =>
      key === "altimateUrl" ? "https://api.getaltimate.com" : undefined,
    );

    await callback("instance=acme&token=tok-1&state=nonce-1");

    expect(fetchImpl).toHaveBeenCalledWith(
      "https://api.getaltimate.com/auth/social/exchange",
      expect.anything(),
    );
    expect(configUpdate).not.toHaveBeenCalledWith(
      "altimateUrl",
      expect.anything(),
      true,
    );
  });

  it("honours a legacy key param without calling the exchange endpoint", async () => {
    const result = await callback("instance=acme&key=legacy-key&state=nonce-1");

    expect(result).toBe("connected");
    expect(fetchImpl).not.toHaveBeenCalled();
    expect(configUpdate).toHaveBeenCalledWith(
      "altimateAiKey",
      "legacy-key",
      true,
    );
  });

  it("refuses a callback whose state does not match this session", async () => {
    const result = await callback(
      "instance=acme&token=tok-1&state=someone-else",
    );

    expect(result).toBe("state_mismatch");
    expect(fetchImpl).not.toHaveBeenCalled();
    expect(configUpdate).not.toHaveBeenCalled();
    expect(window.showErrorMessage).toHaveBeenCalledWith(
      expect.stringContaining("did not match this VS Code session"),
    );
  });

  it("surfaces a sign-in error reported by the web app", async () => {
    const result = await callback("state=nonce-1&error=sign_in_failed");

    expect(result).toBe("sign_in_failed");
    expect(fetchImpl).not.toHaveBeenCalled();
    expect(configUpdate).not.toHaveBeenCalled();
    expect(window.showErrorMessage).toHaveBeenCalledWith(
      "Altimate sign-in did not finish: sign_in_failed",
    );
  });

  it("reports a failed exchange and leaves settings untouched", async () => {
    fetchImpl.mockResolvedValueOnce({
      ok: false,
      status: 400,
      statusText: "Bad Request",
      json: () => Promise.resolve({}),
    });

    const result = await callback("instance=acme&token=expired&state=nonce-1");

    expect(result).toBe("error");
    expect(configUpdate).not.toHaveBeenCalled();
    expect(telemetry.sendTelemetryError).toHaveBeenCalledWith(
      "altimateAuthCallbackError",
      expect.any(Error),
    );
    expect(window.showErrorMessage).toHaveBeenCalledWith(
      expect.stringContaining("exchange failed (400 Bad Request)"),
    );
    expect(commands.executeCommand).not.toHaveBeenCalledWith(
      "dbtPowerUser.openOnboarding",
    );
  });

  it("rejects a callback with neither a token nor a key", async () => {
    const result = await callback("instance=acme&state=nonce-1");

    expect(result).toBe("error");
    expect(configUpdate).not.toHaveBeenCalled();
    expect(window.showErrorMessage).toHaveBeenCalledWith(
      expect.stringContaining("did not include a credential"),
    );
  });
});
