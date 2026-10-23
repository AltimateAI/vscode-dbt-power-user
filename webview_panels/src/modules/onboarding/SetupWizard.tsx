import AltimateCodeWordmark from "@assets/icons/altimate-code-wordmark.svg?react";
import {
  executeRequestInAsync,
  executeRequestInSync,
} from "@modules/app/requestExecutor";
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
import GetStartedStep from "./GetStartedStep";
import { Icon } from "./icons";
import classes from "./onboarding.module.scss";
import ProjectStep, {
  AccountState,
  Project,
  ValidationState,
} from "./ProjectStep";
import TutorialsStep, { TUTORIAL_COUNT } from "./TutorialsStep";
import { Button } from "./ui";
import WorkspaceStep, { WorkspaceState } from "./WorkspaceStep";

type Screen = "env" | "workspace" | "code" | "tutorials";

const ORDER: Screen[] = ["env", "workspace", "code", "tutorials"];

/** Step ids from `dbtPowerUser.openOnboarding` callers, old and new. */
const STEP_SCREENS: Record<string, Screen> = {
  dbt: "env",
  prerequisites: "env",
  validation: "env",
  altimate: "env",
  altimateKey: "env",
  workspace: "workspace",
  code: "code",
  finish: "tutorials",
  tutorials: "tutorials",
};

interface AltimateState {
  signedIn: boolean;
  instance: string;
  canLinkWorkspace: boolean;
  workspaceId?: string;
}

interface ExtensionMessage {
  command: string;
  payload?: {
    instance?: string;
    email?: string;
    projectRoot?: string;
    workspaceId?: string;
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
  onExit: () => void;
}

const SetupWizard = forwardRef<SetupWizardHandle, SetupWizardProps>(
  ({ initialStep, onExit }, ref) => {
    const [screen, setScreen] = useState<Screen>(
      STEP_SCREENS[initialStep ?? ""] ?? "env",
    );
    const [project, setProject] = useState<Project>();
    const [validation, setValidation] = useState<ValidationState>({
      state: "idle",
    });
    const [account, setAccount] = useState<AccountState>({ state: "idle" });
    const [canLinkWorkspace, setCanLinkWorkspace] = useState(true);
    const [workspace, setWorkspace] = useState<WorkspaceState>({
      waiting: false,
      skipped: false,
    });
    const [tutorial, setTutorial] = useState(0);

    const go = useCallback((next: Screen) => {
      setScreen(next);
      window.scrollTo(0, 0);
    }, []);

    useImperativeHandle(ref, () => ({
      navigateToStep: (stepId: string) => go(STEP_SCREENS[stepId] ?? "env"),
    }));

    // Sign-in and workspace state are per project root.
    useEffect(() => {
      void (async () => {
        const state = await request<AltimateState>("getAltimateState", {
          projectRoot: project?.projectRoot,
        });
        if (!state) {
          return;
        }
        setCanLinkWorkspace(state.canLinkWorkspace);
        if (state.signedIn) {
          setAccount((prev) =>
            prev.state === "connected"
              ? prev
              : {
                  state: "connected",
                  instance: state.instance,
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
        setWorkspace((prev) => ({ ...prev, linkedId: state.workspaceId }));
      })();
    }, [project?.projectRoot]);

    // The message listener outlives renders, so it reads the current project.
    const projectRootRef = useRef(project?.projectRoot);
    projectRootRef.current = project?.projectRoot;

    useEffect(() => {
      const handleMessage = (event: MessageEvent<ExtensionMessage>) => {
        const { command, payload } = event.data;
        if (command === "altimateAccountConnected") {
          setAccount({
            state: "connected",
            instance: payload?.instance,
            email: payload?.email,
          });
          void request<AltimateState>("getAltimateState").then((state) =>
            setCanLinkWorkspace(!!state?.canLinkWorkspace),
          );
        } else if (
          command === "workspaceLinked" &&
          payload?.projectRoot === projectRootRef.current
        ) {
          setWorkspace({
            waiting: false,
            skipped: false,
            linkedId: payload?.workspaceId,
          });
          go("code");
        }
      };
      window.addEventListener("message", handleMessage);
      return () => window.removeEventListener("message", handleMessage);
    }, [go]);

    const handleProjectChange = useCallback((next: Project | undefined) => {
      setProject(next);
      setValidation({ state: "idle" });
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
      setValidation({ state: "deps" });
      try {
        await executeRequestInSync("runDbtDeps", { projectRoot });
      } catch (err) {
        setValidation({
          state: "error",
          error: `$ dbt deps · ${summarizeError(err)}`,
        });
        return;
      }
      setValidation({ state: "debug" });
      try {
        const result = (await executeRequestInSync("validateProject", {
          projectRoot,
        })) as { summary?: ValidationState["summary"] };
        setValidation({ state: "done", summary: result?.summary });
      } catch (err) {
        panelLogger.error("onboarding: validation failed", err);
        setValidation({
          state: "error",
          error: `$ dbt debug · ${summarizeError(err)}`,
        });
      }
    }, [project]);

    /** Sign up, or sign in to an existing instance when one is given. */
    const createAccount = useCallback(async (instance?: string) => {
      setAccount({ state: "waiting", signInTo: instance });
      try {
        await executeRequestInSync("startAltimateSignIn", { instance });
      } catch (err) {
        setAccount({
          state: "idle",
          instance,
          error: err instanceof Error ? err.message : String(err),
        });
      }
    }, []);

    const linkWorkspace = useCallback(() => {
      if (!project) {
        return;
      }
      setWorkspace((prev) => ({ ...prev, waiting: true }));
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
      go("code");
    }, [go]);

    const projectName = project?.name ?? "your project";
    const validated = validation.state === "done";
    const signedIn = account.state === "connected";
    const projectDone = validated && signedIn;
    const workspaceLinked = !!workspace.linkedId;
    const pastWorkspace = ORDER.indexOf(screen) > ORDER.indexOf("workspace");

    const steps = [
      {
        label: "Project",
        screen: "env" as Screen,
        done: projectDone,
        reachable: true,
        detail: projectDone
          ? `${projectName} · validated · signed in`
          : validated
            ? "create an account to finish"
            : "dbt, Python, account",
      },
      {
        label: "Workspace",
        screen: "workspace" as Screen,
        done: workspaceLinked,
        reachable: projectDone,
        detail: workspaceLinked
          ? `${projectName} · linked`
          : pastWorkspace && workspace.skipped
            ? "skipped · set up any time"
            : "shared context for the team",
      },
      {
        label: "Get Started",
        screen: "code" as Screen,
        done: projectDone && pastWorkspace,
        reachable: projectDone && (pastWorkspace || workspace.skipped),
        detail:
          projectDone && pastWorkspace
            ? "Setup complete"
            : "AI features turn on",
      },
    ];

    const header: Record<Screen, [string, string | undefined, string]> = {
      env: ["Set up your dbt project", undefined, "Step 1 of 3 · Project"],
      workspace: [
        "Give Altimate Code a workspace",
        `A workspace is shared context for ${projectName}: integrations, skills, knowledge and memory. Set it up once and every session, in the editor or the CLI, and every teammate starts with full context.`,
        "Step 2 of 3 · Workspace",
      ],
      code: [
        "You're all set!",
        `Power User is set up for ${projectName}, with AI features switched on. Open any model to start, or take a short tour first.`,
        "Step 3 of 3 · Get Started",
      ],
      tutorials: [
        "Learn Power User in a few minutes",
        "Short clips of each feature. Pick a topic, or step through them in order.",
        "",
      ],
    };
    const [title, subtitle, panelLabel] = header[screen];

    const lastTutorial = tutorial === TUTORIAL_COUNT - 1;
    // Tutorials can be opened directly, before setup is done.
    const leaveTutorials = () => go(projectDone ? "code" : "env");
    const renderCta = () => {
      switch (screen) {
        case "env":
          return {
            back: onExit,
            hint: projectDone
              ? undefined
              : !validated
                ? "validate the project to continue"
                : account.state === "waiting"
                  ? "waiting for your browser"
                  : "create an account to continue",
            primary: (
              <Button disabled={!projectDone} onClick={() => go("workspace")}>
                Continue
              </Button>
            ),
          };
        case "workspace":
          if (workspaceLinked || !canLinkWorkspace) {
            return {
              back: () => go("env"),
              primary: <Button onClick={() => go("code")}>Continue</Button>,
            };
          }
          return {
            back: () => go("env"),
            hint: workspace.waiting ? "waiting for your browser" : undefined,
            secondary: workspace.waiting
              ? undefined
              : { label: "Not now", onClick: skipWorkspace },
            primary: (
              <Button
                external
                disabled={workspace.waiting}
                onClick={linkWorkspace}
              >
                Set Up Your Workspace
              </Button>
            ),
          };
        case "code":
          return {
            back: () => go("workspace"),
            secondary: {
              label: "Tutorials",
              onClick: () => {
                setTutorial(0);
                go("tutorials");
              },
            },
            primary: (
              <>
                <Button
                  variant="secondary"
                  onClick={() =>
                    void request("openAltimateCode", {
                      projectRoot: project?.projectRoot,
                    })
                  }
                >
                  Open Altimate Code
                </Button>
                <Button
                  onClick={() => executeRequestInAsync("closeOnboarding", {})}
                >
                  Get Started
                </Button>
              </>
            ),
          };
        case "tutorials":
          return {
            back: leaveTutorials,
            secondary:
              tutorial > 0
                ? {
                    label: "Previous",
                    onClick: () => setTutorial(tutorial - 1),
                  }
                : undefined,
            primary: (
              <Button
                onClick={() =>
                  lastTutorial ? leaveTutorials() : setTutorial(tutorial + 1)
                }
              >
                {lastTutorial ? "Done" : "Next"}
              </Button>
            ),
          };
      }
    };
    const cta = renderCta();

    return (
      <>
        <div className={classes.flow}>
          <div className={classes.rail}>
            {steps.map((step, index) => {
              const current = screen === step.screen;
              const clickable = step.reachable && !current;
              return (
                <button
                  key={step.label}
                  type="button"
                  className={[
                    classes.railItem,
                    clickable ? classes.railItemClickable : "",
                  ].join(" ")}
                  onClick={clickable ? () => go(step.screen) : undefined}
                >
                  <span
                    className={[
                      classes.railNum,
                      step.reachable ? classes.railNumReachable : "",
                      step.done ? classes.railNumDone : "",
                      current ? classes.railNumCurrent : "",
                    ].join(" ")}
                  >
                    {step.done ? (
                      <Icon
                        name="check"
                        size={15}
                        className={classes.statusOk}
                      />
                    ) : (
                      String(index + 1).padStart(2, "0")
                    )}
                  </span>
                  <span className={classes.railText}>
                    <span
                      className={[
                        classes.railLabel,
                        step.reachable || step.done
                          ? classes.railLabelReachable
                          : "",
                        current ? classes.railLabelCurrent : "",
                      ].join(" ")}
                    >
                      {step.label}
                    </span>
                    <span
                      className={[
                        classes.railDetail,
                        current ? classes.railDetailCurrent : "",
                        step.done ? classes.railDetailDone : "",
                      ].join(" ")}
                    >
                      {step.detail}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className={classes.content}>
            <div className={classes.header}>
              {screen === "tutorials" && (
                <div className={classes.eyebrow}>Tutorials</div>
              )}
              {screen === "workspace" && (
                <AltimateCodeWordmark
                  aria-label="Altimate Code"
                  className={classes.wordmark}
                />
              )}
              <h1 className={classes.title}>{title}</h1>
              {subtitle && <p className={classes.subtitle}>{subtitle}</p>}
            </div>

            {screen === "tutorials" ? (
              <TutorialsStep index={tutorial} onChange={setTutorial} />
            ) : (
              <div className={classes.panel}>
                <div className={classes.panelHead}>
                  <span className={classes.panelDot} />
                  <span className={classes.panelLabel}>{panelLabel}</span>
                </div>
                {/* Kept mounted so checks and pickers survive step changes. */}
                <div hidden={screen !== "env"}>
                  <ProjectStep
                    project={project}
                    onProjectChange={handleProjectChange}
                    onChecksChanged={resetValidation}
                    validation={validation}
                    onValidate={() => void validate()}
                    account={account}
                    onCreateAccount={(instance) => void createAccount(instance)}
                  />
                </div>
                {screen === "workspace" && (
                  <WorkspaceStep
                    projectName={projectName}
                    state={workspace}
                    canLinkWorkspace={canLinkWorkspace}
                    onOpenAgain={linkWorkspace}
                  />
                )}
                {screen === "code" && (
                  <GetStartedStep
                    workspaceSkipped={!workspaceLinked && canLinkWorkspace}
                    onSetUpWorkspace={() => go("workspace")}
                  />
                )}
              </div>
            )}
          </div>
        </div>

        <div className={classes.ctaBar}>
          <div className={classes.ctaInner}>
            <button
              type="button"
              className={[classes.mutedAction, classes.ctaLink].join(" ")}
              onClick={cta.back}
            >
              ← Back
            </button>
            <div className={classes.ctaRight}>
              {cta.hint && <span className={classes.hint}>{cta.hint}</span>}
              {cta.secondary && (
                <button
                  type="button"
                  className={[classes.mutedAction, classes.ctaLink].join(" ")}
                  onClick={cta.secondary.onClick}
                >
                  {cta.secondary.label}
                </button>
              )}
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
