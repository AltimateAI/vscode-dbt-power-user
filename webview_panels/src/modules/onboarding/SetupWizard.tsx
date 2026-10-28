import AltimateLogo from "@assets/icons/altimate-logo.svg";
import AltimateMark from "@assets/icons/altimate-mark.svg?react";
import { executeRequestInSync } from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { request } from "./api";
import { Icon } from "./icons";
import MeetCodeStep from "./MeetCodeStep";
import classes from "./onboarding.module.scss";
import ProjectStep, {
  AccountState,
  AltimatePlan,
  Project,
  ValidationState,
} from "./ProjectStep";
import ReadyStep from "./ReadyStep";
import { Button } from "./ui";
import WorkspaceStep, { WorkspaceState } from "./WorkspaceStep";

type Screen = "connect" | "code" | "workspace" | "ready";

const ORDER: Screen[] = ["connect", "code", "workspace", "ready"];

const STEP_LABELS: Record<Screen, string> = {
  connect: "Connect your project",
  code: "Meet Altimate Code",
  workspace: "Set up a workspace",
  ready: "Start working",
};

const PANEL_LABELS: Record<Screen, string> = {
  connect: "Project",
  code: "Altimate Code",
  workspace: "Workspace",
  ready: "Start working",
};

/** Step ids from `dbtPowerUser.openOnboarding` callers, old and new. */
const STEP_SCREENS: Record<string, Screen> = {
  dbt: "connect",
  prerequisites: "connect",
  validation: "connect",
  altimate: "connect",
  altimateKey: "connect",
  connect: "connect",
  code: "code",
  workspace: "workspace",
  finish: "ready",
  tutorials: "ready",
  ready: "ready",
};

type Summary = NonNullable<ValidationState["summary"]>;

/** What the extension keeps of this page, so it reopens where it was left. */
export interface SavedState {
  screen?: Screen;
  projectRoot?: string;
  validation?: Summary | null;
  workspaceSkipped?: boolean;
}

interface AltimateState {
  signedIn: boolean;
  instance: string;
  keyHint?: string;
  canLinkWorkspace: boolean;
  supportsBrowserSignIn: boolean;
  workspaceId?: string;
}

interface ExtensionMessage {
  command: string;
  payload?: {
    instance?: string;
    email?: string;
    projectRoot?: string;
    workspaceId?: string;
    flow?: "signIn" | "workspace";
    message?: string;
  };
}

/** Pull the first error line, and the one after it, out of dbt output. */
const summarizeError = (err: unknown): string => {
  const text = err instanceof Error ? err.message : String(err);
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const index = lines.findIndex((line) => /error/i.test(line));
  const picked =
    index === -1 ? lines.slice(0, 1) : lines.slice(index, index + 2);
  return picked.join(" ").slice(0, 240);
};

export interface SetupWizardHandle {
  navigateToStep: (stepId: string) => void;
}

interface SetupWizardProps {
  initialStep?: string;
  saved: SavedState;
}

const SetupWizard = forwardRef<SetupWizardHandle, SetupWizardProps>(
  ({ initialStep, saved }, ref) => {
    // A restored step past the first needs the validation it was reached with.
    const [screen, setScreen] = useState<Screen>(
      STEP_SCREENS[initialStep ?? ""] ??
        (saved.validation ? saved.screen : undefined) ??
        "connect",
    );
    // The restored root lets the first checks keep the project, and with it
    // the restored validation.
    const [project, setProject] = useState<Project | undefined>(
      saved.projectRoot
        ? { projectRoot: saved.projectRoot, name: "", adapter: "" }
        : undefined,
    );
    const [validation, setValidation] = useState<ValidationState>(
      saved.validation
        ? { state: "done", summary: saved.validation }
        : { state: "idle" },
    );
    const [account, setAccount] = useState<AccountState>({ state: "idle" });
    const [canLinkWorkspace, setCanLinkWorkspace] = useState(true);
    const [supportsBrowserSignIn, setSupportsBrowserSignIn] = useState(true);
    const [workspace, setWorkspace] = useState<WorkspaceState>({
      waiting: false,
      skipped: !!saved.workspaceSkipped,
    });

    // The furthest step reached, which stays reachable from the sidebar.
    const [furthest, setFurthest] = useState(ORDER.indexOf(screen));

    const go = useCallback((next: Screen) => {
      setScreen(next);
      setFurthest((prev) => Math.max(prev, ORDER.indexOf(next)));
      window.scrollTo(0, 0);
    }, []);

    useImperativeHandle(ref, () => ({
      navigateToStep: (stepId: string) => go(STEP_SCREENS[stepId] ?? "connect"),
    }));

    // The message listener outlives renders, so it reads the current project.
    const projectRootRef = useRef(project?.projectRoot);
    projectRootRef.current = project?.projectRoot;

    useEffect(() => {
      void request("saveOnboardingState", {
        state: {
          screen,
          projectRoot: project?.projectRoot,
          validation:
            validation.state === "done" ? (validation.summary ?? null) : null,
          workspaceSkipped: workspace.skipped,
        },
      });
    }, [
      screen,
      project?.projectRoot,
      validation.state,
      validation.summary,
      workspace.skipped,
    ]);

    const loadAltimateState = useCallback(async (projectRoot?: string) => {
      const state = await request<AltimateState>("getAltimateState", {
        projectRoot,
      });
      if (state) {
        setCanLinkWorkspace(state.canLinkWorkspace);
        setSupportsBrowserSignIn(state.supportsBrowserSignIn);
      }
      return state;
    }, []);

    // Sign-in and workspace state are per project root; a different project
    // starts its workspace step afresh.
    useEffect(() => {
      const projectRoot = project?.projectRoot;
      void (async () => {
        const state = await loadAltimateState(projectRoot);
        // Drop a response for a project the user has since switched away from.
        if (!state || projectRootRef.current !== projectRoot) {
          return;
        }
        if (!state.signedIn) {
          // A step restored from the last session needs the account too.
          setScreen("connect");
        }
        if (state.signedIn) {
          setAccount((prev) =>
            prev.state === "connected"
              ? prev
              : {
                  state: "connected",
                  instance: state.instance,
                  keyHint: state.keyHint,
                  existing: true,
                },
          );
        } else if (state.instance) {
          // Pre-fill sign-in with an instance an admin may have configured.
          setAccount((prev) =>
            prev.state === "idle"
              ? { ...prev, instance: state.instance }
              : prev,
          );
        }
        setWorkspace((prev) => ({
          waiting: false,
          skipped: prev.skipped,
          linkedId: state.workspaceId,
        }));
      })();
    }, [project?.projectRoot, loadAltimateState]);

    useEffect(() => {
      const handleMessage = (event: MessageEvent<ExtensionMessage>) => {
        const { command, payload } = event.data;
        if (command === "altimateAccountConnected") {
          setAccount({
            state: "connected",
            instance: payload?.instance,
            email: payload?.email,
          });
          // Workspace links belong to an account, so re-read this project's.
          const projectRoot = projectRootRef.current;
          void loadAltimateState(projectRoot).then((state) => {
            setAccount((prev) =>
              prev.state === "connected"
                ? { ...prev, keyHint: state?.keyHint }
                : prev,
            );
            if (projectRootRef.current === projectRoot) {
              setWorkspace((prev) => ({
                ...prev,
                linkedId: state?.workspaceId,
              }));
            }
          });
        } else if (command === "altimateConnectFailed") {
          // A failed or cancelled browser round trip ends the waiting state.
          if (payload?.flow === "workspace") {
            setWorkspace((prev) => ({
              ...prev,
              waiting: false,
              error: payload.message,
            }));
          } else {
            setAccount((prev) =>
              prev.state === "waiting"
                ? {
                    state: "idle",
                    instance: prev.signInTo,
                    error: payload?.message,
                  }
                : prev,
            );
          }
        } else if (
          command === "workspaceLinked" &&
          payload?.projectRoot === projectRootRef.current
        ) {
          setWorkspace({
            waiting: false,
            skipped: false,
            linkedId: payload?.workspaceId,
          });
          go("ready");
        }
      };
      window.addEventListener("message", handleMessage);
      return () => window.removeEventListener("message", handleMessage);
    }, [go, loadAltimateState]);

    const handleProjectChange = useCallback((next: Project | undefined) => {
      if (next?.projectRoot !== projectRootRef.current) {
        setValidation({ state: "idle" });
      }
      setProject(next);
    }, []);

    const resetValidation = useCallback(
      () => setValidation({ state: "idle" }),
      [],
    );

    const validate = useCallback(async () => {
      if (!project) {
        return;
      }
      const { projectRoot } = project;
      // A result for a project the user has since switched away from is dropped.
      const stillCurrent = () => projectRootRef.current === projectRoot;
      setValidation({ state: "deps" });
      try {
        await executeRequestInSync("runDbtDeps", { projectRoot });
      } catch (err) {
        if (stillCurrent()) {
          setValidation({
            state: "error",
            error: `$ dbt deps · ${summarizeError(err)}`,
          });
        }
        return;
      }
      if (!stillCurrent()) {
        return;
      }
      setValidation({ state: "debug" });
      try {
        const result = (await executeRequestInSync("validateProject", {
          projectRoot,
        })) as { summary?: ValidationState["summary"] };
        if (stillCurrent()) {
          setValidation({ state: "done", summary: result?.summary });
        }
      } catch (err) {
        panelLogger.error("onboarding: validation failed", err);
        if (stillCurrent()) {
          setValidation({
            state: "error",
            error: `$ dbt debug · ${summarizeError(err)}`,
          });
        }
      }
    }, [project]);

    /** Sign up, or sign in to an existing instance when one is given. */
    const createAccount = useCallback(
      async (instance?: string, plan?: AltimatePlan) => {
        setAccount({ state: "waiting", signInTo: instance });
        try {
          await executeRequestInSync("startAltimateSignIn", { instance, plan });
        } catch (err) {
          setAccount({
            state: "idle",
            instance,
            error: err instanceof Error ? err.message : String(err),
          });
        }
      },
      [],
    );

    /** Drop a browser sign-in error once the user changes the form. */
    const dismissAccountError = useCallback(
      () =>
        setAccount((prev) =>
          prev.error ? { ...prev, error: undefined } : prev,
        ),
      [],
    );

    /** Sign in with an instance and API key; resolves to the error, if any. */
    const connectWithKey = useCallback(
      async (instance: string, apiKey: string, plan: AltimatePlan) => {
        try {
          await executeRequestInSync("connectAltimateApiKey", {
            instance,
            apiKey,
            plan,
          });
          return undefined;
        } catch (err) {
          return err instanceof Error ? err.message : String(err);
        }
      },
      [],
    );

    /** Leave a sign-in that is waiting on the browser, to start a different one. */
    const cancelSignIn = useCallback(() => {
      // The abandoned browser tab must not sign in after all.
      void request("cancelAltimateSignIn");
      setAccount((prev) =>
        prev.state === "waiting"
          ? { state: "idle", instance: prev.signInTo }
          : prev,
      );
    }, []);

    const linkWorkspace = useCallback(() => {
      if (!project) {
        return;
      }
      setWorkspace((prev) => ({ ...prev, waiting: true, error: undefined }));
      void request("startWorkspaceLink", {
        projectRoot: project.projectRoot,
      }).then((started) => {
        if (!started) {
          setWorkspace((prev) => ({ ...prev, waiting: false }));
        }
      });
    }, [project]);

    const skipWorkspace = useCallback(() => {
      setWorkspace((prev) => ({ ...prev, waiting: false, skipped: true }));
      go("ready");
    }, [go]);

    // A project restored from the last session has no name until checks run.
    const projectName = project?.name ? project.name : "your project";
    const validated = validation.state === "done";
    const signedIn = account.state === "connected";
    const projectDone = validated && signedIn;
    const workspaceLinked = !!workspace.linkedId;
    const index = ORDER.indexOf(screen);

    const done: Record<Screen, boolean> = {
      connect: projectDone,
      code: projectDone && furthest > 1,
      workspace:
        projectDone && (workspaceLinked || workspace.skipped || furthest > 2),
      ready: false,
    };
    // Past the first step, a step is reachable once it has been reached;
    // Meet Altimate Code is reachable as soon as the project is done.
    const reachable = (i: number) =>
      i === 0 || (projectDone && i <= Math.max(furthest, 1));

    const header: Record<Screen, [string, string]> = {
      connect: [
        "Connect your dbt project",
        validated
          ? signedIn
            ? `${projectName} is ready, and your Altimate account is connected.`
            : `${projectName} is ready. Last thing: connect your Altimate account.`
          : "Check your setup, validate the project, then connect your Altimate account.",
      ],
      code: [
        "Meet Altimate Code",
        "Altimate Code is an AI agent specialized for data-native workflows. It works locally and sits between any LLM and your entire data stack.",
      ],
      workspace: [
        "Set up a workspace",
        "A workspace teaches the AI how your organization works: your data setup, skills, knowledge and best practices, so it follows them every time.",
      ],
      ready: [
        "You're ready",
        `Everything is set up for ${projectName}. Here is where things stand.`,
      ],
    };
    const [title, subtitle] = header[screen];

    const renderCta = () => {
      switch (screen) {
        case "connect":
          return {
            hint: projectDone
              ? "Ready"
              : !validated
                ? "Validate the project to continue"
                : account.state === "waiting"
                  ? "Waiting for your browser"
                  : "Connect your Altimate account to continue",
            hintOk: projectDone,
            primary: (
              <Button disabled={!projectDone} onClick={() => go("code")}>
                Continue
              </Button>
            ),
          };
        case "code":
          return {
            hint: account.instance
              ? `Connected · instance ${account.instance}`
              : "Connected",
            hintOk: true,
            primary: <Button onClick={() => go("workspace")}>Continue</Button>,
          };
        case "workspace":
          if (workspaceLinked || !canLinkWorkspace) {
            return {
              primary: <Button onClick={() => go("ready")}>Continue</Button>,
            };
          }
          return {
            hint: workspace.waiting
              ? "Waiting for your browser"
              : "Opens Altimate in your browser",
            // Available while waiting too: the browser may never come back.
            secondary: (
              <Button variant="secondary" onClick={skipWorkspace}>
                Skip for now
              </Button>
            ),
            primary: (
              <Button
                external
                disabled={workspace.waiting}
                onClick={linkWorkspace}
              >
                Create Workspace
              </Button>
            ),
          };
        case "ready":
          return {
            hint: "Reopen this page any time from the dbt item in the status bar",
            primary: (
              <Button onClick={() => void request("finishOnboarding")}>
                Finish
              </Button>
            ),
          };
      }
    };
    const cta = renderCta();

    return (
      <>
        <header className={classes.navbar}>
          <div className={classes.navInner}>
            <div className={classes.brand}>
              <AltimateMark />
              <span className={classes.brandName}>Power User for dbt</span>
            </div>
            <span className={classes.navStep}>
              Getting started · step {index + 1} of {ORDER.length}
            </span>
            <span className={classes.navBy}>
              by
              <img src={AltimateLogo} alt="" />
              <span className={classes.navByName}>Altimate AI</span>
            </span>
          </div>
        </header>

        <div className={classes.flow}>
          <nav className={classes.rail}>
            {ORDER.map((step, i) => {
              const current = screen === step;
              const clickable = reachable(i) && !current;
              return (
                <button
                  key={step}
                  type="button"
                  className={[
                    classes.railItem,
                    current ? classes.railItemCurrent : "",
                    clickable ? classes.railItemClickable : "",
                  ].join(" ")}
                  aria-current={current ? "step" : undefined}
                  onClick={clickable ? () => go(step) : undefined}
                >
                  <span
                    className={[
                      classes.railNum,
                      done[step] && !current ? classes.railNumDone : "",
                      current ? classes.railNumCurrent : "",
                    ].join(" ")}
                  >
                    {done[step] && !current ? (
                      <Icon name="check" size={13} />
                    ) : (
                      String(i + 1).padStart(2, "0")
                    )}
                  </span>
                  <span
                    className={[
                      classes.railLabel,
                      current || done[step] || reachable(i)
                        ? classes.railLabelReachable
                        : "",
                      current ? classes.railLabelCurrent : "",
                    ].join(" ")}
                  >
                    {STEP_LABELS[step]}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className={classes.content}>
            <div className={classes.header}>
              <h1 className={classes.title}>{title}</h1>
              <p className={classes.subtitle}>{subtitle}</p>
            </div>

            <div className={classes.panel}>
              <div className={classes.panelHead}>
                <span className={classes.panelDot} />
                <span className={classes.panelLabel}>
                  {PANEL_LABELS[screen]}
                </span>
              </div>
              {/* Kept mounted so checks and pickers survive step changes. */}
              <div hidden={screen !== "connect"}>
                <ProjectStep
                  project={project}
                  onProjectChange={handleProjectChange}
                  onChecksChanged={resetValidation}
                  validation={validation}
                  onValidate={() => void validate()}
                  account={account}
                  supportsBrowserSignIn={supportsBrowserSignIn}
                  onCreateAccount={(instance, plan) =>
                    void createAccount(instance, plan)
                  }
                  onDismissAccountError={dismissAccountError}
                  onCancelSignIn={cancelSignIn}
                  onConnectWithKey={connectWithKey}
                />
              </div>
              {screen === "code" && <MeetCodeStep />}
              {screen === "workspace" && (
                <WorkspaceStep
                  projectName={projectName}
                  state={workspace}
                  canLinkWorkspace={canLinkWorkspace}
                  supportsBrowserSignIn={supportsBrowserSignIn}
                  onOpenAgain={linkWorkspace}
                />
              )}
              {screen === "ready" && project && (
                <ReadyStep
                  project={project}
                  instance={account.instance}
                  workspaceLinked={workspaceLinked}
                  canLinkWorkspace={canLinkWorkspace}
                  onSetUpWorkspace={() => go("workspace")}
                />
              )}
            </div>
          </div>
        </div>

        <div className={classes.ctaBar}>
          <div className={classes.ctaInner}>
            {index > 0 ? (
              <button
                type="button"
                className={[classes.mutedAction, classes.ctaLink].join(" ")}
                onClick={() => go(ORDER[index - 1])}
              >
                ← Back
              </button>
            ) : (
              <span />
            )}
            <div className={classes.ctaRight}>
              {cta.hint && (
                <span
                  className={[
                    classes.hint,
                    cta.hintOk ? classes.hintOk : "",
                  ].join(" ")}
                >
                  {cta.hint}
                </span>
              )}
              {cta.secondary}
              {cta.primary}
            </div>
          </div>
        </div>
      </>
    );
  },
);

SetupWizard.displayName = "SetupWizard";

export default SetupWizard;
