import AltimateLogo from "@assets/icons/altimate-logo.svg";
import { executeRequestInSync } from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { request, runCommand } from "./api";
import { Icon } from "./icons";
import classes from "./onboarding.module.scss";
import { Button, CheckStatus, ExternalLink, StatusIcon } from "./ui";

const SIGN_UP_URL = "https://app.myaltimate.com/register";

/** The Altimate deployment an account is on. */
export type AltimatePlan = "free" | "enterprise";

/** Community, Pro and Team share the app.myaltimate.com deployment. */
const PLANS: [AltimatePlan, string][] = [
  ["free", "Community, Pro or Team plan"],
  ["enterprise", "Enterprise"],
];

export interface Project {
  name: string;
  projectRoot: string;
  adapter: string;
}

export interface ValidationState {
  state: "idle" | "deps" | "debug" | "done" | "error";
  summary?: { models: number; seeds: number; tests: number };
  error?: string;
}

export interface AccountState {
  state: "idle" | "waiting" | "connected";
  instance?: string;
  /** The instance being signed in to; absent while signing up. */
  signInTo?: string;
  /** Why the last sign-in could not start. */
  error?: string;
  email?: string;
  /** The last characters of the saved API key. */
  keyHint?: string;
  /** Signed in before this wizard run, rather than through it. */
  existing?: boolean;
}

interface DiagnosticsStatus {
  projects: Project[];
  pythonInstalled: boolean;
  dbtInstalled: boolean;
  projectsFound: boolean;
  dbtIntegrationMode: string;
  pythonPath?: string;
  pythonVersion?: string;
  dbtVersion?: string;
  fileAssociationsConfigured: boolean;
}

interface Interpreter {
  path: string;
  description: string;
  recommended: boolean;
}

type Integration = "core" | "fusion" | "cloud";
type OpenPicker = "project" | "integration" | "python" | undefined;

const INTEGRATIONS: Record<Integration, [string, string, string]> = {
  core: [
    "dbt Core",
    "Local dbt installed with Python",
    "https://help.altimate.ai/dbt-power-user/setup/reqdConfig/",
  ],
  fusion: [
    "dbt Fusion",
    "Fusion CLI, faster parsing (beta)",
    "https://help.altimate.ai/dbt-power-user/setup/reqdConfigFusion/",
  ],
  cloud: [
    "dbt Cloud CLI",
    "Runs against your dbt Cloud project",
    "https://help.altimate.ai/dbt-power-user/setup/reqdConfigCloud/",
  ],
};

const DETAIL_CLASS: Record<CheckStatus, string> = {
  pending: "",
  checking: "",
  ok: classes.detailOk,
  warning: classes.detailWarn,
  error: classes.detailError,
};

interface Option {
  key: string;
  title: string;
  desc: string;
  tag?: string;
  selected: boolean;
  onPick: () => void;
}

interface CheckRowProps {
  title: string;
  status: CheckStatus;
  blocked?: boolean;
  detail: string;
  fixes?: ReactNode;
  action?: { label: string; onClick: () => void };
  children?: ReactNode;
}

const CheckRow = ({
  title,
  status,
  blocked,
  detail,
  fixes,
  action,
  children,
}: CheckRowProps) => (
  <div
    className={[classes.check, blocked ? classes.checkBlocked : ""].join(" ")}
  >
    <div className={classes.checkMain}>
      <StatusIcon status={status} />
      <div className={classes.checkBody}>
        <span className={classes.checkTitle}>{title}</span>
        <span className={[classes.checkDetail, DETAIL_CLASS[status]].join(" ")}>
          {detail}
        </span>
        {fixes && <div className={classes.checkFixes}>{fixes}</div>}
      </div>
      {action && (
        <button
          type="button"
          className={[classes.linkAction, classes.checkAction].join(" ")}
          onClick={action.onClick}
        >
          {action.label}
        </button>
      )}
    </div>
    {children}
  </div>
);

const OptionList = ({
  options,
  scroll,
}: {
  options: Option[];
  scroll?: boolean;
}) => (
  <div
    className={[
      classes.optionList,
      scroll ? classes.optionListScroll : "",
    ].join(" ")}
  >
    {options.map((option) => (
      <button
        key={option.key}
        type="button"
        className={[
          classes.option,
          option.selected ? classes.optionSelected : "",
        ].join(" ")}
        onClick={option.onPick}
      >
        <span className={classes.optionRadio} />
        <span className={classes.optionText}>
          <span className={classes.optionTitle}>{option.title}</span>
          <span className={classes.optionDesc}>{option.desc}</span>
        </span>
        {option.tag && <span className={classes.optionTag}>{option.tag}</span>}
      </button>
    ))}
  </div>
);

interface ProjectStepProps {
  project?: Project;
  onProjectChange: (project: Project | undefined) => void;
  onChecksChanged: () => void;
  validation: ValidationState;
  onValidate: () => void;
  account: AccountState;
  /** False in editors the SaaS cannot redirect back to after sign-in. */
  supportsBrowserSignIn: boolean;
  onCreateAccount: (instance?: string) => void;
  onCancelSignIn: () => void;
  /** Resolves to the error when the key is not accepted. */
  onConnectWithKey: (
    instance: string,
    apiKey: string,
    plan: AltimatePlan,
  ) => Promise<string | undefined>;
}

const ProjectStep = ({
  project,
  onProjectChange,
  onChecksChanged,
  validation,
  onValidate,
  account,
  supportsBrowserSignIn,
  onCreateAccount,
  onCancelSignIn,
  onConnectWithKey,
}: ProjectStepProps): JSX.Element => {
  const [diagnostics, setDiagnostics] = useState<DiagnosticsStatus>();
  const [checking, setChecking] = useState(false);
  const [checksError, setChecksError] = useState<string>();
  const [open, setOpen] = useState<OpenPicker>();
  const [interpreters, setInterpreters] = useState<Interpreter[]>([]);
  const [pythonQuery, setPythonQuery] = useState("");
  const [installing, setInstalling] = useState(false);
  const [installFailed, setInstallFailed] = useState(false);
  const [instanceInput, setInstanceInput] = useState("");
  const [keyInput, setKeyInput] = useState("");
  const [showKeyForm, setShowKeyForm] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [keyError, setKeyError] = useState<string>();
  const [plan, setPlan] = useState<AltimatePlan>("free");
  // Editors the browser cannot sign in to only offer the key form.
  const keyForm = showKeyForm || !supportsBrowserSignIn;

  const closeKeyForm = () => {
    setShowKeyForm(false);
    setInstanceInput("");
    setKeyInput("");
    setKeyError(undefined);
    setPlan("free");
  };

  /** Enterprise instances can also sign in on their login page. */
  const signInWithBrowser = () => {
    const instance = instanceInput.trim();
    if (!instance) {
      setKeyError("Enter your instance name");
      return;
    }
    onCreateAccount(instance);
  };

  const connect = async () => {
    const instance = instanceInput.trim();
    const apiKey = keyInput.trim();
    if (!instance || !apiKey || connecting) {
      return;
    }
    setConnecting(true);
    setKeyError(undefined);
    const error = await onConnectWithKey(instance, apiKey, plan);
    setConnecting(false);
    if (error) {
      setKeyError(error);
    } else {
      setKeyInput("");
    }
  };

  // An instance from settings or a failed attempt pre-fills sign-in.
  useEffect(() => {
    if (account.state === "idle" && account.instance) {
      setInstanceInput(account.instance);
    }
  }, [account.state, account.instance]);

  const runChecks = useCallback(
    async (silent = false, keepValidation = false) => {
      // Anything a check can change invalidates the last validation.
      if (!keepValidation) {
        onChecksChanged();
      }
      if (!silent) {
        setChecking(true);
      }
      setChecksError(undefined);
      try {
        const status = (await executeRequestInSync(
          "getDiagnosticsStatus",
          {},
        )) as DiagnosticsStatus;
        setDiagnostics(status);
        onProjectChange(
          status.projects.find((p) => p.projectRoot === project?.projectRoot) ??
            status.projects[0],
        );
        return status;
      } catch (err) {
        panelLogger.error("onboarding: diagnostics failed", err);
        setChecksError(err instanceof Error ? err.message : String(err));
        return undefined;
      } finally {
        setChecking(false);
      }
    },
    [onChecksChanged, onProjectChange, project?.projectRoot],
  );

  // The listener below outlives renders, so it reads the latest runChecks.
  const runChecksRef = useRef(runChecks);
  runChecksRef.current = runChecks;

  useEffect(() => {
    // The first checks keep a validation restored from the last session.
    void runChecksRef.current(false, true);
    // Interpreter changes land after dbt detection finishes in the extension.
    const handleMessage = (event: MessageEvent<{ command?: string }>) => {
      if (event.data.command === "pythonEnvironmentChanged") {
        void runChecksRef.current(true);
      } else if (event.data.command === "projectsChanged") {
        // A reparse leaves a project's validation standing.
        void runChecksRef.current(true, true);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const toggle = (picker: OpenPicker) => {
    const next = open === picker ? undefined : picker;
    setOpen(next);
    if (next === "python") {
      setPythonQuery("");
      void request<{ interpreters: Interpreter[] }>(
        "getPythonInterpreters",
      ).then((result) => setInterpreters(result?.interpreters ?? []));
    }
  };

  const fixAndRecheck = async (action: Promise<unknown>) => {
    await action;
    await runChecks();
  };

  const d = diagnostics;
  const integration = (d?.dbtIntegrationMode ?? "core") as Integration;
  const [integrationLabel, integrationDesc, integrationDocs] =
    INTEGRATIONS[integration] ?? INTEGRATIONS.core;
  const installDbt = async () => {
    setInstalling(true);
    setInstallFailed(false);
    await request("installDbt", { integrationType: integration });
    // Still installing until the recheck lands, so the stale "not installed"
    // result doesn't offer Install again. A full recheck also picks up
    // projects registered by the install.
    const status = await runChecks(true);
    setInstalling(false);
    setInstallFailed(!!status && !status.dbtInstalled);
  };

  const pythonPath = d?.pythonPath ?? "the selected interpreter";
  // The extension joins the Python API's version tuple, which can carry
  // release-level objects after the numeric parts.
  const pythonVersionNumber = d?.pythonVersion?.match(/^\d+(\.\d+)*/)?.[0];
  const pythonVersion = pythonVersionNumber
    ? ` · Python ${pythonVersionNumber}`
    : "";
  const projects = d?.projects ?? [];
  const busy = checking || !d;
  const statusOf = (ok: boolean): CheckStatus =>
    busy ? "checking" : ok ? "ok" : "error";

  const projectStatus = statusOf(!!d?.projectsFound);
  const pythonBlocked = !busy && projectStatus !== "ok";
  const pythonStatus: CheckStatus = busy
    ? "checking"
    : pythonBlocked
      ? "pending"
      : !d?.pythonInstalled
        ? "error"
        : !d.dbtInstalled
          ? "warning"
          : "ok";
  const dbtBlocked = pythonBlocked || pythonStatus === "error";
  const dbtStatus: CheckStatus = installing
    ? "checking"
    : busy
      ? "checking"
      : dbtBlocked
        ? "pending"
        : d?.dbtInstalled
          ? "ok"
          : "error";
  const filesStatus = statusOf(!!d?.fileAssociationsConfigured);
  const allOk =
    [projectStatus, pythonStatus, dbtStatus, filesStatus].every(
      (s) => s === "ok",
    ) && !!project;

  const dbtDetail = () => {
    if (installing) {
      return `installing ${integrationLabel} into ${pythonPath}`;
    }
    if (dbtBlocked) {
      return pythonBlocked
        ? "needs a dbt project first"
        : "needs an interpreter first";
    }
    if (d?.dbtInstalled) {
      const version = d.dbtVersion ?? "";
      if (integration === "core") {
        return [
          `dbt-core ${version}`.trim(),
          project && `dbt-${project.adapter}`,
        ]
          .filter(Boolean)
          .join(" · ");
      }
      return `${integration === "fusion" ? "dbt-fusion" : "dbt Cloud CLI"} ${version}`.trim();
    }
    return installFailed
      ? "the install did not finish · see the notification for details"
      : `dbt is not installed for ${pythonPath}`;
  };

  const debugCommand =
    integration === "cloud" ? "$ dbt environment show" : "$ dbt debug";
  const validating =
    validation.state === "deps" || validation.state === "debug";
  const validationStatus: CheckStatus = validating
    ? "checking"
    : validation.state === "done"
      ? "ok"
      : validation.state === "error"
        ? "error"
        : "pending";
  const summary = validation.summary;
  const validationDetail = {
    idle: allOk
      ? `runs dbt deps, then ${debugCommand.slice(2)}`
      : "fix the items above first",
    deps: "$ dbt deps",
    debug: debugCommand,
    done: summary
      ? `${summary.models} models · ${summary.seeds} seeds · ${summary.tests} tests · connection ok`
      : "connection ok",
    error: validation.error ?? "validation failed",
  }[validation.state];

  const filteredInterpreters = interpreters.filter(
    (i) =>
      i.path === d?.pythonPath ||
      `${i.path} ${i.description}`
        .toLowerCase()
        .includes(pythonQuery.toLowerCase()),
  );

  return (
    <div className={classes.panelBody}>
      {checksError && (
        <div className={classes.banner}>
          <span className={classes.statusError} />
          <div className={classes.bannerText}>
            <span className={classes.checkTitle}>Checks could not run</span>
            <span className={classes.checkDetail}>
              {checksError} · nothing below is known yet
            </span>
          </div>
          <Button nav variant="secondary" onClick={() => void runChecks()}>
            Recheck
          </Button>
        </div>
      )}

      <CheckRow
        title="dbt project"
        status={projectStatus}
        detail={
          busy
            ? "checking…"
            : projectStatus === "error"
              ? "no dbt_project.yml in any open folder"
              : projects.length > 1
                ? `${project?.name} · ${projects.length} projects in this workspace`
                : project
                  ? `${project.name} · dbt_project.yml`
                  : "dbt_project.yml found · loading the project"
        }
        fixes={
          projectStatus === "error" && (
            <>
              <Button
                nav
                onClick={() =>
                  void fixAndRecheck(runCommand("vscode.openFolder"))
                }
              >
                Open Folder
              </Button>
              <ExternalLink href="https://docs.getdbt.com/docs/build/projects">
                What counts as a dbt project
              </ExternalLink>
            </>
          )
        }
        action={
          !busy && projects.length > 1
            ? {
                label: open === "project" ? "Done" : "Change",
                onClick: () => toggle("project"),
              }
            : undefined
        }
      >
        {open === "project" && projects.length > 1 && (
          <div className={classes.options}>
            <OptionList
              options={projects.map((p) => ({
                key: p.projectRoot,
                title: p.name,
                desc: p.projectRoot,
                selected: p.projectRoot === project?.projectRoot,
                onPick: () => {
                  setOpen(undefined);
                  onProjectChange(p);
                },
              }))}
            />
          </div>
        )}
      </CheckRow>

      <CheckRow
        title="How you run dbt"
        status={busy ? "checking" : "ok"}
        detail={`${integrationLabel} · ${integrationDesc}`}
        action={{
          label: open === "integration" ? "Done" : "Change",
          onClick: () => toggle("integration"),
        }}
      >
        {open === "integration" && (
          <div className={classes.options}>
            <OptionList
              options={(Object.keys(INTEGRATIONS) as Integration[]).map(
                (key) => ({
                  key,
                  title: INTEGRATIONS[key][0],
                  desc: INTEGRATIONS[key][1],
                  selected: key === integration,
                  onPick: () => {
                    setOpen(undefined);
                    void fixAndRecheck(
                      request("setDbtIntegration", { integrationType: key }),
                    );
                  },
                }),
              )}
            />
          </div>
        )}
      </CheckRow>

      <CheckRow
        title="Python interpreter"
        status={pythonStatus}
        blocked={pythonBlocked}
        detail={
          busy
            ? "checking…"
            : pythonBlocked
              ? "needs a dbt project first"
              : pythonStatus === "error"
                ? "no interpreter selected for this workspace"
                : `${pythonPath}${pythonVersion}${pythonStatus === "warning" ? " · dbt not installed here" : ""}`
        }
        fixes={
          pythonStatus === "error" && (
            <>
              <Button
                nav
                onClick={() =>
                  void fixAndRecheck(runCommand("python.setInterpreter"))
                }
              >
                Select Interpreter
              </Button>
              <Button
                nav
                variant="secondary"
                onClick={() =>
                  void fixAndRecheck(
                    runCommand("dbtPowerUser.detectPythonFromTerminal"),
                  )
                }
              >
                Detect From Terminal
              </Button>
            </>
          )
        }
        action={
          pythonStatus === "ok" || pythonStatus === "warning"
            ? {
                label: open === "python" ? "Done" : "Change",
                onClick: () => toggle("python"),
              }
            : undefined
        }
      >
        {open === "python" && (
          <div className={classes.options}>
            <div className={classes.search}>
              <Icon name="search" size={16} />
              <input
                value={pythonQuery}
                onChange={(e) => setPythonQuery(e.target.value)}
                placeholder="Filter by path, version or tool"
              />
              <span className={classes.searchCount}>
                {filteredInterpreters.length} of {interpreters.length}
              </span>
            </div>
            <OptionList
              scroll
              options={filteredInterpreters.map((i) => ({
                key: i.path,
                title: i.path,
                desc: i.description,
                tag: i.recommended ? "Recommended" : undefined,
                selected: i.path === d?.pythonPath,
                onPick: () => {
                  setOpen(undefined);
                  void fixAndRecheck(
                    request("setPythonInterpreter", { pythonPath: i.path }),
                  );
                },
              }))}
            />
            {filteredInterpreters.length === 0 && (
              <div className={classes.optionEmpty}>
                No interpreter matches that filter.
              </div>
            )}
            <div className={classes.optionFooter}>
              <button
                type="button"
                className={classes.linkAction}
                onClick={() =>
                  void fixAndRecheck(runCommand("python.setInterpreter"))
                }
              >
                <Icon name="folder" size={15} />
                Enter interpreter path…
              </button>
              <button
                type="button"
                className={classes.mutedAction}
                onClick={() =>
                  void fixAndRecheck(
                    runCommand("dbtPowerUser.detectPythonFromTerminal"),
                  )
                }
              >
                <Icon name="terminal-2" size={15} />
                Detect From Terminal
              </button>
            </div>
          </div>
        )}
      </CheckRow>

      <CheckRow
        title="dbt"
        status={dbtStatus}
        blocked={dbtBlocked && !busy}
        detail={busy && !installing ? "checking…" : dbtDetail()}
        fixes={
          dbtStatus === "error" && (
            <>
              <Button nav onClick={() => void installDbt()}>
                {installFailed
                  ? "Retry Install"
                  : `Install ${integrationLabel}`}
              </Button>
              <ExternalLink href={integrationDocs}>
                {installFailed ? "Install manually" : "Why this fails"}
              </ExternalLink>
            </>
          )
        }
      />

      <CheckRow
        title="File types"
        status={filesStatus}
        detail={
          busy
            ? "checking…"
            : filesStatus === "ok"
              ? ".sql and .yml files open as dbt files"
              : ".sql and .yml files don't open as dbt files · highlighting and autocomplete will be off"
        }
        fixes={
          filesStatus === "error" && (
            <Button
              nav
              onClick={() =>
                void fixAndRecheck(request("configureFileAssociations"))
              }
            >
              Turn On
            </Button>
          )
        }
      />

      <div className={[classes.checkMain, classes.validateRow].join(" ")}>
        <StatusIcon status={validationStatus} />
        <div className={classes.checkBody}>
          <span className={classes.checkTitle}>
            Validate {project?.name ?? "project"}
          </span>
          <span
            className={[
              classes.checkDetail,
              DETAIL_CLASS[validationStatus],
            ].join(" ")}
          >
            {validationDetail}
            {validating && <span className={classes.blink}>_</span>}
          </span>
          {validation.state === "error" && (
            <div className={classes.checkFixes}>
              <Button nav onClick={onValidate}>
                Retry
              </Button>
              <Button
                nav
                variant="secondary"
                onClick={() =>
                  void request("openProfilesYml", {
                    projectRoot: project?.projectRoot,
                  })
                }
              >
                Open profiles.yml
              </Button>
              <button
                type="button"
                className={classes.linkAction}
                onClick={() => void request("showLogs")}
              >
                Open Output
              </button>
            </div>
          )}
        </div>
        {validation.state === "idle" && (
          <Button
            nav
            variant="secondary"
            disabled={!allOk}
            onClick={onValidate}
          >
            Validate Project
          </Button>
        )}
        {validation.state === "done" && (
          <button
            type="button"
            className={classes.mutedAction}
            onClick={() => void runChecks()}
          >
            <Icon name="refresh" size={15} />
            Recheck
          </button>
        )}
      </div>

      <div
        className={[
          classes.accountRow,
          validation.state === "done" ? "" : classes.accountRowLocked,
        ].join(" ")}
      >
        {account.state === "idle" && (
          <div className={classes.accountCard}>
            <img src={AltimateLogo} alt="Altimate" />
            <div className={classes.accountText}>
              <span className={classes.accountTitle}>
                Set up your Altimate account
              </span>
              <span className={classes.accountDesc}>
                Unlocks Altimate Code, an AI agent for data work that runs
                locally on your machine. No data is shared. Free, no credit
                card.
              </span>
              {keyForm ? (
                <form
                  className={classes.signInForm}
                  onSubmit={(e) => {
                    e.preventDefault();
                    void connect();
                  }}
                >
                  <input
                    className={classes.textInput}
                    value={instanceInput}
                    onChange={(e) => setInstanceInput(e.target.value)}
                    placeholder="Instance name"
                    aria-label="Instance name"
                    autoComplete="off"
                  />
                  <input
                    className={classes.textInput}
                    type="password"
                    value={keyInput}
                    onChange={(e) => setKeyInput(e.target.value)}
                    placeholder="API key"
                    aria-label="API key"
                    autoComplete="off"
                  />
                  <select
                    className={[classes.textInput, classes.planSelect].join(
                      " ",
                    )}
                    value={plan}
                    onChange={(e) => {
                      setPlan(e.target.value as AltimatePlan);
                      setKeyError(undefined);
                    }}
                    aria-label="Altimate plan"
                  >
                    {PLANS.map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                  {/* Submits on Enter; the visible Connect button sits beside the card text. */}
                  <button type="submit" hidden />
                </form>
              ) : null}
              {(keyError ?? account.error) && (
                <span
                  className={[classes.checkDetail, classes.detailError].join(
                    " ",
                  )}
                >
                  {keyError ?? account.error}
                </span>
              )}
              <span className={classes.accountMeta}>
                {keyForm ? (
                  <>
                    Find both in your Altimate app under Settings → API Keys.
                    {plan === "enterprise" && supportsBrowserSignIn && (
                      <>
                        {" "}
                        Or{" "}
                        <button
                          type="button"
                          className={classes.metaLink}
                          onClick={signInWithBrowser}
                        >
                          sign in with your browser
                        </button>
                      </>
                    )}
                    {plan === "free" && !supportsBrowserSignIn && (
                      <>
                        {" "}
                        No account yet?{" "}
                        <a
                          className={classes.metaLink}
                          href={SIGN_UP_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Create one
                        </a>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    Community, Pro or Team · opens in your browser.
                    <br />
                    Enterprise, or have an API key?{" "}
                    <button
                      type="button"
                      className={classes.metaLink}
                      onClick={() => setShowKeyForm(true)}
                    >
                      Enter your details
                    </button>
                  </>
                )}
              </span>
            </div>
            {keyForm ? (
              <div className={classes.accountActions}>
                <Button
                  nav
                  disabled={
                    connecting || !instanceInput.trim() || !keyInput.trim()
                  }
                  onClick={() => void connect()}
                >
                  {connecting ? "Connecting…" : "Connect"}
                </Button>
                {supportsBrowserSignIn && (
                  <button
                    type="button"
                    className={[classes.mutedAction, classes.accountLink].join(
                      " ",
                    )}
                    onClick={closeKeyForm}
                  >
                    Cancel
                  </button>
                )}
              </div>
            ) : (
              <Button nav external onClick={() => onCreateAccount()}>
                Continue with Altimate
              </Button>
            )}
          </div>
        )}
        {account.state === "waiting" && (
          <div className={classes.accountCard}>
            <span className={[classes.spinner, classes.spinnerLg].join(" ")} />
            <div className={classes.accountText}>
              <span className={classes.accountTitle}>
                {account.signInTo
                  ? `Finish signing in to ${account.signInTo} in your browser`
                  : "Finish signing up in your browser"}
              </span>
              <span className={classes.accountMeta}>
                {account.signInTo
                  ? "this page updates when you are signed in"
                  : "app.myaltimate.com/register · this page updates when your account is ready"}
              </span>
            </div>
            <button
              type="button"
              className={[classes.linkAction, classes.accountLink].join(" ")}
              onClick={() => onCreateAccount(account.signInTo)}
            >
              Open again
            </button>
            <button
              type="button"
              className={[classes.mutedAction, classes.accountLink].join(" ")}
              onClick={onCancelSignIn}
            >
              Use a different account
            </button>
          </div>
        )}
        {account.state === "connected" && (
          <div
            className={[classes.accountCard, classes.accountCardOk].join(" ")}
          >
            <Icon name="circle-check" size={22} className={classes.statusOk} />
            <div className={classes.accountText}>
              <span className={classes.accountTitle}>
                {account.existing ? "Signed in to Altimate" : "Account created"}
              </span>
              <span className={classes.accountMeta}>
                {[
                  account.email,
                  account.instance && `instance ${account.instance}`,
                  account.keyHint && `key ••••${account.keyHint}`,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </span>
            </div>
            <button
              type="button"
              className={[classes.linkAction, classes.accountLink].join(" ")}
              onClick={() => void request("openAltimateSettings")}
            >
              Manage
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectStep;
