import altimateCodeWordmark from "@assets/onboarding/altimate-code-wordmark.svg?url";
import altimateMark from "@assets/onboarding/altimate-mark.svg?url";
import altimateWordmark from "@assets/onboarding/altimate-wordmark-white.svg?url";
import powerUserIcon from "@assets/onboarding/power-user-icon.png";
import { executeRequestInSync } from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";
import { useCallback, useEffect, useRef, useState } from "react";
import classes from "./flow.module.scss";

type Integration = "core" | "fusion" | "cloud" | "corecommand";

interface Diagnostics {
  pythonInstalled: boolean;
  dbtInstalled: boolean;
  projectsFound: boolean;
  projectCount: number;
  dbtIntegrationMode: string;
  pythonPath?: string;
  pythonVersion?: string;
  dbtVersion?: string;
  adapterType?: string;
  projectName?: string;
  projectRoot?: string;
  fileAssociationsConfigured: boolean;
}

interface Project {
  label: string;
  projectRoot: string;
}

interface AccountStatus {
  connected: boolean;
  instanceName?: string;
  maskedKey?: string;
}

interface PersistedState {
  step?: 1 | 2 | 3 | 4;
  projectRoot?: string;
  validated?: boolean;
  validationSummary?: string;
  workspaceEnabled?: boolean;
  workspaceOpened?: boolean;
  finished?: boolean;
}

const INTEGRATION_LABEL: Record<string, { name: string; desc: string }> = {
  core: { name: "dbt Core", desc: "installed with Python" },
  corecommand: { name: "dbt Core (CLI)", desc: "run from the command line" },
  fusion: { name: "dbt Fusion (beta)", desc: "the dbt Fusion CLI" },
  cloud: { name: "dbt Cloud CLI", desc: "connects to dbt Cloud" },
};

const DOCS_URL = "https://help.altimate.ai/dbt-power-user/";
const TUTORIALS_URL =
  "https://help.altimate.ai/dbt-power-user/develop/autocomplete/";

const Check = ({ state }: { state: "ok" | "pending" | "bad" | "busy" }) => (
  <span
    className={`${classes.check} ${
      state === "pending"
        ? classes.pending
        : state === "bad"
          ? classes.bad
          : state === "busy"
            ? classes.busy
            : ""
    }`}
    aria-hidden="true"
  >
    {state === "ok" && (
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#06220f"
        strokeWidth="3.2"
      >
        <path d="m5 12 5 5L20 7" />
      </svg>
    )}
    {state === "bad" && (
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ffffff"
        strokeWidth="3"
      >
        <path d="M6 6l12 12M18 6 6 18" />
      </svg>
    )}
  </span>
);

const ExternalIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
  </svg>
);

const OnboardingFlow = (): JSX.Element => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [diag, setDiag] = useState<Diagnostics | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [changingProject, setChangingProject] = useState(false);
  const [validationError, setValidationError] = useState<string | undefined>();
  const restoredRoot = useRef<string | undefined>();
  const [account, setAccount] = useState<AccountStatus>({ connected: false });
  const [accountPending, setAccountPending] = useState(false);
  const [showKeyForm, setShowKeyForm] = useState(false);
  const [keyInstance, setKeyInstance] = useState("");
  const [keyValue, setKeyValue] = useState("");
  const [keySaving, setKeySaving] = useState(false);
  const [validated, setValidated] = useState(false);
  const [validating, setValidating] = useState(false);
  const [validationSummary, setValidationSummary] = useState<string>("");
  const [error, setError] = useState<string | undefined>();
  const [changingIntegration, setChangingIntegration] = useState(false);
  const [workspaceEnabled, setWorkspaceEnabled] = useState(true);
  const [workspaceOpened, setWorkspaceOpened] = useState(false);
  const [firstModel, setFirstModel] = useState<{
    name: string;
    fileName: string;
  } | null>(null);
  const restored = useRef(false);

  const persist = useCallback(
    (patch: PersistedState) => {
      void executeRequestInSync("saveOnboardingState", {
        state: {
          step,
          projectRoot: project?.projectRoot,
          validated,
          validationSummary,
          workspaceEnabled,
          workspaceOpened,
          ...patch,
        },
      }).catch((e) => panelLogger.error("saveOnboardingState", e));
    },
    [
      step,
      project?.projectRoot,
      validated,
      validationSummary,
      workspaceEnabled,
      workspaceOpened,
    ],
  );

  const loadDiagnostics = useCallback(async () => {
    try {
      const d = (await executeRequestInSync(
        "getDiagnosticsStatus",
        {},
      )) as Diagnostics;
      setDiag(d);
    } catch (e) {
      panelLogger.error("getDiagnosticsStatus", e);
    }
  }, []);

  const loadProject = useCallback(async () => {
    try {
      const list = ((await executeRequestInSync("getProjects", {})) ??
        []) as Project[];
      setProjects(list);
      setProject((current) => {
        if (!list.length) {
          return null;
        }
        const wanted = current?.projectRoot ?? restoredRoot.current;
        return list.find((p) => p.projectRoot === wanted) ?? list[0];
      });
    } catch (e) {
      panelLogger.error("getProjects", e);
    }
  }, []);

  const loadAccount = useCallback(async () => {
    try {
      const a = (await executeRequestInSync(
        "getAccountStatus",
        {},
      )) as AccountStatus;
      setAccount(a);
      if (a.connected) {
        setAccountPending(false);
      }
    } catch (e) {
      panelLogger.error("getAccountStatus", e);
    }
  }, []);

  useEffect(() => {
    void loadDiagnostics();
    void loadProject();
    void loadAccount();
    // the project container may still be initializing; retry a few times
    const retries = [2000, 5000, 10000].map((ms) =>
      setTimeout(() => {
        void loadProject();
        void loadDiagnostics();
      }, ms),
    );
    void (async () => {
      try {
        const s = (await executeRequestInSync(
          "getOnboardingState",
          {},
        )) as PersistedState | null;
        if (s && !s.finished) {
          if (s.projectRoot) {
            restoredRoot.current = s.projectRoot;
          }
          if (s.validated) {
            setValidated(true);
            setValidationSummary(s.validationSummary ?? "");
          }
          if (typeof s.workspaceEnabled === "boolean") {
            setWorkspaceEnabled(s.workspaceEnabled);
          }
          if (s.workspaceOpened) {
            setWorkspaceOpened(true);
          }
          if (s.step) {
            setStep(s.step);
          }
        }
      } catch (e) {
        panelLogger.error("getOnboardingState", e);
      } finally {
        restored.current = true;
      }
    })();

    const onMessage = (event: MessageEvent) => {
      const data = event.data as {
        command?: string;
        payload?: Record<string, unknown>;
      };
      if (data.command === "accountConnected") {
        setAccount({
          connected: true,
          instanceName: data.payload?.instanceName as string | undefined,
          maskedKey: data.payload?.maskedKey as string | undefined,
        });
        setAccountPending(false);
        setShowKeyForm(false);
      } else if (data.command === "pythonEnvironmentChanged") {
        void loadDiagnostics();
      } else if (data.command === "navigateToStep") {
        const id = (data.payload?.step as string | undefined) ?? "";
        if (["altimate", "altimateKey", "unlock"].includes(id)) {
          setStep(2);
        } else if (id === "workspace") {
          setStep(3);
        } else if (["finish", "tutorials", "start"].includes(id)) {
          setStep(4);
        } else {
          setStep(1);
        }
      }
    };
    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("message", onMessage);
      retries.forEach((r) => clearTimeout(r));
    };
  }, [loadDiagnostics, loadProject, loadAccount]);

  useEffect(() => {
    if (step !== 4) {
      return;
    }
    void executeRequestInSync("getFirstModel", {
      projectRoot: project?.projectRoot ?? "",
    })
      .then((m) => setFirstModel((m as typeof firstModel) ?? null))
      .catch((e) => panelLogger.error("getFirstModel", e));
  }, [step, project?.projectRoot]);

  const goTo = (next: 1 | 2 | 3 | 4) => {
    setStep(next);
    persist({ step: next });
  };

  const run = async (command: string, params: Record<string, unknown> = {}) => {
    setError(undefined);
    try {
      return await executeRequestInSync(command, params);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
      throw e;
    }
  };

  const handleValidate = async () => {
    const root = project?.projectRoot ?? diag?.projectRoot;
    if (!root) {
      setError("No dbt project found in this workspace.");
      return;
    }
    setValidating(true);
    setValidated(false);
    setValidationError(undefined);
    try {
      await executeRequestInSync("runDbtDeps", { projectRoot: root });
      await executeRequestInSync("validateProject", { projectRoot: root });
      const summary = (await executeRequestInSync("getProjectSummary", {
        projectRoot: root,
      })) as { summary?: string };
      const text = summary?.summary?.length
        ? summary.summary
        : "passed · warehouse connection works";
      setValidated(true);
      setValidationSummary(text);
      persist({ validated: true, validationSummary: text });
      void loadDiagnostics();
    } catch (e) {
      panelLogger.error("validate", e);
      const msg = (e instanceof Error ? e.message : String(e)).trim();
      const firstLine =
        msg
          .split("\n")
          .map((l) => l.trim())
          .find((l) => l && !/^\d{2}:\d{2}:\d{2}/.test(l)) ??
        "validation failed";
      setValidationError(firstLine.slice(0, 160));
    } finally {
      setValidating(false);
    }
  };

  const handleProjectChange = (root: string) => {
    const next = projects.find((p) => p.projectRoot === root) ?? null;
    setChangingProject(false);
    if (!next || next.projectRoot === project?.projectRoot) {
      return;
    }
    setProject(next);
    setValidated(false);
    setValidationSummary("");
    setValidationError(undefined);
    persist({
      projectRoot: next.projectRoot,
      validated: false,
      validationSummary: "",
    });
  };

  const handleCreateAccount = async () => {
    setAccountPending(true);
    try {
      await run("startAccountSetup", {});
    } catch (e) {
      setAccountPending(false);
    }
  };

  const handleSaveKey = async () => {
    if (!keyInstance.trim() || !keyValue.trim()) {
      setError("Enter both the instance name and the API key.");
      return;
    }
    setKeySaving(true);
    try {
      await run("saveAltimateKey", {
        apiKey: keyValue.trim(),
        instanceName: keyInstance.trim(),
      });
      await loadAccount();
      setShowKeyForm(false);
      setAccountPending(false);
    } catch (e) {
      panelLogger.error("saveAltimateKey", e);
    } finally {
      setKeySaving(false);
    }
  };

  const keyFormOpen = accountPending || showKeyForm;

  const handleCancelKeyForm = () => {
    setAccountPending(false);
    setShowKeyForm(false);
    setKeyInstance("");
    setKeyValue("");
    setError(undefined);
  };

  const handleIntegrationChange = async (next: Integration) => {
    if (!diag || next === diag.dbtIntegrationMode) {
      setChangingIntegration(false);
      return;
    }
    // The extension reloads the window on this change; persist first so we resume here.
    persist({ step: 1, validated: false, validationSummary: "" });
    setValidated(false);
    try {
      await run("setDbtIntegration", { integrationType: next });
    } catch (e) {
      panelLogger.error("setDbtIntegration", e);
    }
    setChangingIntegration(false);
  };

  const handleCreateWorkspace = async () => {
    try {
      await run("openWorkspaceCreation", { projectName: project?.label ?? "" });
      setWorkspaceOpened(true);
      persist({ workspaceOpened: true, step: 4 });
      setStep(4);
    } catch (e) {
      panelLogger.error("openWorkspaceCreation", e);
    }
  };

  const handleOpenModel = async (action: "explain" | "lineage" | "preview") => {
    try {
      await run("openFirstModel", {
        projectRoot: project?.projectRoot ?? "",
        action,
      });
    } catch (e) {
      panelLogger.error("openFirstModel", e);
    }
  };

  const handleFinish = async () => {
    try {
      await run("finishOnboarding", {});
    } catch (e) {
      panelLogger.error("finishOnboarding", e);
    }
  };

  const openUrl = (url: string) => {
    void executeRequestInSync("openUrl", { url }).catch((e) =>
      panelLogger.error("openUrl", e),
    );
  };

  const integ =
    INTEGRATION_LABEL[diag?.dbtIntegrationMode ?? "core"] ??
    INTEGRATION_LABEL.core;
  const projectName =
    project?.label ??
    diag?.projectName ??
    (diag?.projectsFound ? "your project" : "no project found");
  const canContinueStep1 = validated && account.connected;

  const stepClass = (n: number) =>
    n === step ? classes.active : n < step ? classes.done : "";

  return (
    <div className={classes.root}>
      <header className={classes.navbar}>
        <div className={classes.brand}>
          <img src={powerUserIcon} alt="" />
          <span className={classes.brandName}>Power User for dbt</span>
          <span className={classes.brandSep} aria-hidden="true"></span>
          <span className={classes.brandSub}>
            Getting started · step {step} of 4
          </span>
        </div>
        <div className={classes.navRight}>
          <span>by</span>
          <img src={altimateWordmark} alt="Altimate AI" />
        </div>
      </header>
      <div className={classes.main}>
        <nav className={classes.rail} aria-label="Setup steps">
          <div className={`${classes.railStep} ${stepClass(1)}`}>
            <span className={`${classes.railNum} ${stepClass(1)}`}>
              {step > 1 ? "✓" : "01"}
            </span>
            <div>
              <div className={classes.railTitle}>Connect your project</div>
            </div>
          </div>
          <div className={`${classes.railStep} ${stepClass(2)}`}>
            <span className={`${classes.railNum} ${stepClass(2)}`}>
              {step > 2 ? "✓" : "02"}
            </span>
            <div>
              <div className={classes.railTitle}>Meet Altimate Code</div>
            </div>
          </div>
          <div className={`${classes.railStep} ${stepClass(3)}`}>
            <span className={`${classes.railNum} ${stepClass(3)}`}>
              {step > 3 ? "✓" : "03"}
            </span>
            <div>
              <div className={classes.railTitle}>Set up a workspace</div>
            </div>
          </div>
          <div className={`${classes.railStep} ${stepClass(4)}`}>
            <span className={`${classes.railNum} ${stepClass(4)}`}>04</span>
            <div>
              <div className={classes.railTitle}>Start working</div>
            </div>
          </div>
        </nav>

        <div className={classes.content}>
          {step === 1 && (
            <>
              <div>
                <h1 className={classes.title}>Connect your dbt project</h1>
                <p className={classes.subtitle}>
                  {!validated
                    ? `We found ${projectName}. Validate it, then create your free Altimate account.`
                    : !account.connected
                      ? `${projectName} is ready. Last thing: create your free Altimate account.`
                      : "All set. Continue to meet Altimate Code."}
                </p>
              </div>

              <div className={classes.panel}>
                <div className={classes.panelHeader}>
                  <span className={classes.square}></span>Project
                </div>

                <div className={classes.row}>
                  <Check
                    state={diag?.projectsFound ? "ok" : diag ? "bad" : "busy"}
                  />
                  <div>
                    <div className={classes.rowTitle}>dbt project</div>
                    <div
                      className={`${classes.rowSub} ${diag && !diag.projectsFound ? classes.bad : ""}`}
                    >
                      {diag?.projectsFound
                        ? projects.length > 1
                          ? `${projectName} · ${projects.length} projects in this workspace`
                          : `${projectName} · dbt_project.yml`
                        : "no dbt_project.yml in this workspace"}
                    </div>
                  </div>
                  <span className={classes.rowAction}>
                    {projects.length > 1 &&
                      (changingProject ? (
                        <select
                          className={classes.select}
                          value={project?.projectRoot ?? ""}
                          onChange={(e) => handleProjectChange(e.target.value)}
                          onBlur={() => setChangingProject(false)}
                          aria-label="dbt project"
                        >
                          {projects.map((p) => (
                            <option key={p.projectRoot} value={p.projectRoot}>
                              {p.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <a onClick={() => setChangingProject(true)}>Change</a>
                      ))}
                    {diag && !diag.projectsFound && (
                      <a
                        onClick={() =>
                          void run("executeCommand", {
                            vscodeCommand: "vscode.openFolder",
                          })
                        }
                      >
                        Open folder
                      </a>
                    )}
                  </span>
                </div>

                <div className={classes.row}>
                  <Check state="ok" />
                  <div>
                    <div className={classes.rowTitle}>How you run dbt</div>
                    <div className={classes.rowSub}>
                      {integ.name}, {integ.desc}
                    </div>
                  </div>
                  <span className={classes.rowAction}>
                    {changingIntegration ? (
                      <label>
                        <span
                          style={{
                            position: "absolute",
                            width: 1,
                            height: 1,
                            overflow: "hidden",
                            clip: "rect(0 0 0 0)",
                          }}
                        >
                          Integration type
                        </span>
                        <select
                          className={classes.select}
                          defaultValue={diag?.dbtIntegrationMode ?? "core"}
                          onChange={(e) =>
                            void handleIntegrationChange(
                              e.target.value as Integration,
                            )
                          }
                          onBlur={() => setChangingIntegration(false)}
                        >
                          <option value="core">dbt Core</option>
                          <option value="fusion">dbt Fusion (beta)</option>
                          <option value="cloud">dbt Cloud CLI</option>
                        </select>
                      </label>
                    ) : (
                      <a onClick={() => setChangingIntegration(true)}>Change</a>
                    )}
                  </span>
                </div>

                <div className={classes.row}>
                  <Check
                    state={
                      diag ? (diag.pythonInstalled ? "ok" : "bad") : "busy"
                    }
                  />
                  <div>
                    <div className={classes.rowTitle}>Python interpreter</div>
                    <div
                      className={`${classes.rowSub} ${diag && !diag.pythonInstalled ? classes.bad : ""}`}
                    >
                      {diag?.pythonInstalled
                        ? [
                            diag.pythonPath,
                            diag.pythonVersion
                              ? `Python ${diag.pythonVersion}`
                              : undefined,
                          ]
                            .filter(Boolean)
                            .join(" · ")
                        : "no interpreter selected"}
                    </div>
                  </div>
                  <span className={classes.rowAction}>
                    <a
                      onClick={() =>
                        void run("executeCommand", {
                          vscodeCommand: "python.setInterpreter",
                        })
                      }
                    >
                      Change
                    </a>
                  </span>
                </div>

                <div className={classes.row}>
                  <Check
                    state={diag ? (diag.dbtInstalled ? "ok" : "bad") : "busy"}
                  />
                  <div>
                    <div className={classes.rowTitle}>dbt</div>
                    <div
                      className={`${classes.rowSub} ${diag && !diag.dbtInstalled ? classes.bad : ""}`}
                    >
                      {diag?.dbtInstalled
                        ? [
                            diag.dbtVersion
                              ? `dbt-core ${diag.dbtVersion}`
                              : "installed",
                            diag.adapterType && diag.adapterType !== "unknown"
                              ? `dbt-${diag.adapterType}`
                              : undefined,
                          ]
                            .filter(Boolean)
                            .join(" · ")
                        : "not found in this Python"}
                    </div>
                  </div>
                  <span className={classes.rowAction}>
                    {diag && !diag.dbtInstalled && (
                      <a
                        onClick={() =>
                          void run("installDbt", {
                            integrationType: diag.dbtIntegrationMode,
                          })
                        }
                      >
                        Install dbt
                      </a>
                    )}
                  </span>
                </div>

                <div className={classes.row}>
                  <Check
                    state={
                      diag
                        ? diag.fileAssociationsConfigured
                          ? "ok"
                          : "pending"
                        : "busy"
                    }
                  />
                  <div>
                    <div className={classes.rowTitle}>File types</div>
                    <div
                      className={`${classes.rowSub} ${diag && !diag.fileAssociationsConfigured ? classes.dim : ""}`}
                    >
                      {diag?.fileAssociationsConfigured
                        ? ".sql and .yml files open as dbt files"
                        : "open .sql and .yml files as dbt files"}
                    </div>
                  </div>
                  <span className={classes.rowAction}>
                    {diag && !diag.fileAssociationsConfigured && (
                      <a
                        onClick={() =>
                          void run("configureFileAssociations", {}).then(() =>
                            loadDiagnostics(),
                          )
                        }
                      >
                        Turn on
                      </a>
                    )}
                  </span>
                </div>

                <div className={classes.row} style={{ alignItems: "center" }}>
                  <Check
                    state={
                      validating
                        ? "busy"
                        : validated
                          ? "ok"
                          : validationError
                            ? "bad"
                            : "pending"
                    }
                  />
                  <div>
                    <div className={classes.rowTitle}>
                      Validate {projectName}
                    </div>
                    <div
                      className={`${classes.rowSub} ${validated ? "" : validationError ? classes.bad : classes.dim}`}
                    >
                      {validating
                        ? "installing packages, then checking your connection…"
                        : validated
                          ? validationSummary
                          : validationError
                            ? validationError
                            : "installs packages and checks your warehouse connection"}
                    </div>
                  </div>
                  <span className={classes.rowAction}>
                    {validated ? (
                      <a
                        onClick={() => void handleValidate()}
                        style={{ color: "#ffffff" }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          aria-hidden="true"
                        >
                          <path d="M21 12a9 9 0 1 1-3-6.7M21 4v5h-5" />
                        </svg>
                        Recheck
                      </a>
                    ) : (
                      <>
                        {validationError && !validating && (
                          <a onClick={() => void run("showOutput", {})}>
                            Open output
                          </a>
                        )}
                        <button
                          type="button"
                          className={classes.ghostBtn}
                          disabled={
                            validating || !(project ?? diag?.projectRoot)
                          }
                          onClick={() => void handleValidate()}
                        >
                          {validating
                            ? "Validating…"
                            : validationError
                              ? "Retry"
                              : "Validate Project"}
                        </button>
                      </>
                    )}
                  </span>
                </div>

                {error && <div className={classes.error}>{error}</div>}

                {account.connected ? (
                  <div className={`${classes.cta} ${classes.ok}`}>
                    <img
                      className={classes.ctaLogo}
                      src={altimateMark}
                      alt=""
                    />
                    <div className={classes.ctaBody}>
                      <div className={classes.ctaTitle}>
                        <Check state="ok" /> Altimate account connected
                      </div>
                      <div className={classes.rowSub} style={{ marginTop: 6 }}>
                        instance {account.instanceName} · API key{" "}
                        {account.maskedKey} saved
                      </div>
                    </div>
                    <a
                      className={classes.ctaAction}
                      onClick={() =>
                        void run("executeCommand", {
                          vscodeCommand: "workbench.action.openSettings",
                        })
                      }
                      style={{ color: "rgba(255,255,255,0.8)", fontSize: 16 }}
                    >
                      Manage
                    </a>
                  </div>
                ) : (
                  <div
                    className={`${classes.cta} ${validated ? classes.active : classes.disabled}`}
                  >
                    <img
                      className={classes.ctaLogo}
                      src={altimateMark}
                      alt=""
                    />
                    <div className={classes.ctaBody}>
                      <div className={classes.ctaTitle}>
                        Set up your Altimate account
                      </div>
                      <div className={classes.ctaDesc}>
                        Unlocks Altimate Code, an AI agent for data work that
                        runs locally on your machine. No data is shared. Free,
                        no credit card.
                      </div>
                      {keyFormOpen ? (
                        <>
                          {accountPending && (
                            <div className={classes.ctaNote}>
                              Finish signing up in your browser. This page
                              updates on its own. If it doesn&apos;t, paste your
                              instance name and API key from Settings → API Key.{" "}
                              <a onClick={() => void handleCreateAccount()}>
                                Open sign-up again
                              </a>
                            </div>
                          )}
                          <div className={classes.inlineForm}>
                            <input
                              placeholder="Instance name"
                              value={keyInstance}
                              onChange={(e) => setKeyInstance(e.target.value)}
                              aria-label="Instance name"
                            />
                            <input
                              placeholder="API key"
                              type="password"
                              value={keyValue}
                              onChange={(e) => setKeyValue(e.target.value)}
                              aria-label="API key"
                            />
                            <button
                              type="button"
                              className={classes.ghostBtn}
                              disabled={keySaving}
                              onClick={handleCancelKeyForm}
                            >
                              Cancel
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className={classes.ctaNote}>
                          Opens in your browser. Already have an account?{" "}
                          <a
                            onClick={() => validated && setShowKeyForm(true)}
                            style={{ color: "rgba(255,255,255,0.7)" }}
                          >
                            Sign in
                          </a>
                        </div>
                      )}
                    </div>
                    {keyFormOpen ? (
                      <button
                        type="button"
                        className={`${classes.primaryBtn} ${classes.ctaAction}`}
                        disabled={keySaving}
                        onClick={() => void handleSaveKey()}
                      >
                        {keySaving ? "Checking…" : "Connect"}
                      </button>
                    ) : (
                      <button
                        type="button"
                        className={`${classes.primaryBtn} ${classes.ctaAction}`}
                        disabled={!validated}
                        onClick={() => void handleCreateAccount()}
                      >
                        Create Altimate Account <ExternalIcon />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <h1 className={classes.title}>Meet Altimate Code</h1>
                <p className={classes.subtitle}>
                  Altimate Code is an AI agent specialized for data-native
                  workflows. It works locally and sits between any LLM and your
                  entire data stack.
                </p>
              </div>

              <div className={classes.panel}>
                <div className={classes.panelHeader}>
                  <span className={classes.square}></span>Altimate Code
                </div>

                <div className={classes.block}>
                  <div className={classes.blockHead}>
                    <img
                      className={classes.wordmark}
                      src={altimateCodeWordmark}
                      alt="Altimate Code"
                    />
                    <span className={classes.statusOk}>
                      <span className={classes.dot}></span>runs locally · works
                      with any model
                    </span>
                  </div>
                  <p className={classes.blockText}>What you can do now</p>
                </div>

                <div className={classes.subRow}>
                  <span className={classes.square}></span>
                  <div>
                    <div className={classes.subTitle}>Ask about any model</div>
                    <p className={classes.subText}>
                      Ask in plain English. Answers come from your models, not
                      from a generic chatbot.
                    </p>
                    <span className={classes.chips}>
                      try: &ldquo;Explain the customers model&rdquo; ·
                      &ldquo;What feeds orders?&rdquo;
                    </span>
                  </div>
                </div>

                <div className={classes.subRow}>
                  <span className={classes.square}></span>
                  <div>
                    <div className={classes.subTitle}>Fix a failed run</div>
                    <p className={classes.subText}>
                      Paste the error. It finds the cause and suggests the fix
                      in your code.
                    </p>
                    <span className={classes.chips}>
                      try: &ldquo;Why did stg_orders fail?&rdquo;
                    </span>
                  </div>
                </div>

                <div className={classes.subRow}>
                  <span className={classes.square}></span>
                  <div>
                    <div className={classes.subTitle}>Review and document</div>
                    <p className={classes.subText}>
                      Before you merge, see what a change would break and add
                      tests and docs in one go.
                    </p>
                    <span className={classes.chips}>
                      try: &ldquo;What breaks if I rename customer_id?&rdquo;
                    </span>
                  </div>
                </div>

                {error && <div className={classes.error}>{error}</div>}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div>
                <h1 className={classes.title}>Set up a workspace</h1>
                <p className={classes.subtitle}>
                  A workspace teaches the AI how your organization works: your
                  data setup, skills, knowledge and best practices, so it
                  follows them every time.
                </p>
              </div>

              <div className={classes.panel}>
                <div className={classes.panelHeader}>
                  <span className={classes.square}></span>Workspace
                </div>

                <div className={classes.subRow}>
                  <span className={`${classes.square} ${classes.green}`}></span>
                  <div>
                    <div className={classes.subTitle}>Connections</div>
                    <p className={classes.subText}>
                      Your warehouse and dbt setup, connected once and reused
                      everywhere.
                    </p>
                  </div>
                </div>
                <div className={classes.subRow}>
                  <span className={`${classes.square} ${classes.green}`}></span>
                  <div>
                    <div className={classes.subTitle}>Skills</div>
                    <p className={classes.subText}>
                      Your conventions and best practices, so work is built,
                      tested and reviewed your way.
                    </p>
                  </div>
                </div>
                <div className={classes.subRow}>
                  <span className={`${classes.square} ${classes.green}`}></span>
                  <div>
                    <div className={classes.subTitle}>Knowledge</div>
                    <p className={classes.subText}>
                      Definitions, docs and decisions that count as the source
                      of truth.
                    </p>
                  </div>
                </div>
                <div className={classes.subRow}>
                  <span className={`${classes.square} ${classes.green}`}></span>
                  <div>
                    <div className={classes.subTitle}>Memory</div>
                    <p className={classes.subText}>
                      What it learns from working with you, kept so results get
                      more precise over time.
                    </p>
                  </div>
                </div>

                <div className={`${classes.cta} ${classes.blue}`}>
                  <img className={classes.ctaLogo} src={altimateMark} alt="" />
                  <div className={classes.ctaBody}>
                    <div className={classes.ctaTitle}>
                      Create a workspace for {projectName}
                    </div>
                    <div className={classes.ctaDesc}>
                      Build a workspace for {projectName}: add your conventions,
                      best practices and definitions so the AI follows your
                      organization&apos;s context. Opens in your browser. You
                      can also do this later from the Altimate panel.
                    </div>
                  </div>
                  <label
                    className={`${classes.switchWrap} ${classes.ctaAction}`}
                    htmlFor="ws-toggle"
                  >
                    <span>{workspaceEnabled ? "Enabled" : "Off"}</span>
                    <span className={classes.switch}>
                      <input
                        id="ws-toggle"
                        type="checkbox"
                        checked={workspaceEnabled}
                        onChange={(e) => {
                          setWorkspaceEnabled(e.target.checked);
                          persist({ workspaceEnabled: e.target.checked });
                        }}
                      />
                      <span className={classes.track}></span>
                      <span className={classes.knob}></span>
                    </span>
                  </label>
                </div>
                {error && <div className={classes.error}>{error}</div>}
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <div>
                <h1 className={classes.title}>You&apos;re ready</h1>
                <p className={classes.subtitle}>
                  Everything is set up for {projectName}. Here is where things
                  stand.
                </p>
              </div>

              <div className={classes.panel}>
                <div className={classes.panelHeader}>
                  <span className={classes.square}></span>Start working
                </div>

                <div className={classes.row}>
                  <Check state="ok" />
                  <div>
                    <div className={classes.rowTitle}>Power User for dbt</div>
                    <div className={classes.rowSub}>
                      {[
                        projectName,
                        diag?.dbtVersion
                          ? `dbt-core ${diag.dbtVersion}`
                          : integ.name,
                        "run, preview, tests, lineage",
                      ].join(" · ")}
                    </div>
                  </div>
                  <span className={classes.statusOk}>
                    <span className={classes.dot}></span>ready
                  </span>
                </div>
                <div className={classes.row}>
                  <Check state={account.connected ? "ok" : "pending"} />
                  <div>
                    <div className={classes.rowTitle}>Altimate Code</div>
                    <div
                      className={`${classes.rowSub} ${account.connected ? "" : classes.dim}`}
                    >
                      {account.connected
                        ? `instance ${account.instanceName} · runs locally`
                        : "not connected"}
                    </div>
                  </div>
                  <span className={classes.statusOk}>
                    {account.connected && (
                      <>
                        <span className={classes.dot}></span>connected
                      </>
                    )}
                  </span>
                </div>
                <div className={classes.row}>
                  <Check state={workspaceOpened ? "ok" : "pending"} />
                  <div>
                    <div className={classes.rowTitle}>Workspace</div>
                    <div
                      className={`${classes.rowSub} ${workspaceOpened ? "" : classes.dim}`}
                    >
                      {workspaceOpened
                        ? `${projectName} · created in Altimate`
                        : "skipped for now · add your organization's context any time from Altimate"}
                    </div>
                  </div>
                  <span className={classes.rowAction}>
                    <a onClick={() => void handleCreateWorkspace()}>
                      {workspaceOpened ? "Open ↗" : "Create ↗"}
                    </a>
                  </span>
                </div>

                <div
                  style={{
                    margin: "20px 32px 24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                  }}
                >
                  <div
                    className={`${classes.cta} ${classes.active}`}
                    style={{ margin: 0 }}
                  >
                    <div className={classes.ctaBody}>
                      <div className={classes.ctaTitle}>
                        Try it on your own model
                      </div>
                      <div className={classes.ctaDesc}>
                        Opens {firstModel?.fileName ?? "a model"} with Altimate
                        Code beside it, ready for your first question.
                      </div>
                      <div className={classes.ctaNote}>
                        Not ready for AI yet?{" "}
                        <a onClick={() => void handleOpenModel("lineage")}>
                          See its lineage
                        </a>{" "}
                        ·{" "}
                        <a onClick={() => void handleOpenModel("preview")}>
                          Preview its results
                        </a>
                      </div>
                    </div>
                    <button
                      type="button"
                      className={`${classes.primaryBtn} ${classes.orange} ${classes.ctaAction}`}
                      onClick={() => void handleOpenModel("explain")}
                    >
                      Open {firstModel?.fileName ?? "a model"}
                    </button>
                  </div>
                  <div className={classes.links}>
                    Want to look around first?{" "}
                    <a onClick={() => openUrl(TUTORIALS_URL)}>Tutorials</a> ·{" "}
                    <a onClick={() => openUrl(DOCS_URL)}>Help docs</a>
                  </div>
                </div>
                {error && <div className={classes.error}>{error}</div>}
              </div>
            </>
          )}
        </div>
      </div>

      <div className={classes.footer}>
        <button
          type="button"
          className={classes.back}
          disabled={step === 1}
          onClick={() => goTo((step - 1) as 1 | 2 | 3 | 4)}
        >
          ← Back
        </button>
        <div className={classes.footerRight}>
          {step === 1 && (
            <>
              <span
                className={`${classes.hint} ${canContinueStep1 ? classes.ok : ""}`}
              >
                {!validated
                  ? "Validate the project to continue"
                  : !account.connected
                    ? "Create an account to continue"
                    : "Ready"}
              </span>
              <button
                type="button"
                className={classes.footerBtn}
                disabled={!canContinueStep1}
                onClick={() => goTo(2)}
              >
                Continue
              </button>
            </>
          )}
          {step === 2 && (
            <>
              <span className={`${classes.hint} ${classes.ok}`}>
                {account.connected
                  ? `Connected · instance ${account.instanceName}`
                  : "Nothing to set up here"}
              </span>
              <button
                type="button"
                className={classes.footerBtn}
                onClick={() => goTo(3)}
              >
                Continue
              </button>
            </>
          )}
          {step === 3 && (
            <>
              <span className={classes.hint}>
                {workspaceEnabled
                  ? "Opens Altimate in your browser"
                  : "You can create a workspace later"}
              </span>
              <button
                type="button"
                className={`${classes.footerBtn} ${classes.ghost}`}
                onClick={() => {
                  persist({ workspaceOpened: false, step: 4 });
                  setStep(4);
                }}
              >
                Skip for now
              </button>
              {workspaceEnabled ? (
                <button
                  type="button"
                  className={classes.footerBtn}
                  onClick={() => void handleCreateWorkspace()}
                >
                  Create Workspace <ExternalIcon />
                </button>
              ) : (
                <button
                  type="button"
                  className={classes.footerBtn}
                  onClick={() => goTo(4)}
                >
                  Continue
                </button>
              )}
            </>
          )}
          {step === 4 && (
            <>
              <span className={classes.hint}>
                Reopen this page any time from the dbt item in the status bar
              </span>
              <button
                type="button"
                className={classes.footerBtn}
                onClick={() => void handleFinish()}
              >
                Finish
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;
