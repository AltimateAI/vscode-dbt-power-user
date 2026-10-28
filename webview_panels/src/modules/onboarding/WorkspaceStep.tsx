import AltimateLogo from "@assets/icons/altimate-logo.svg";
import { Icon } from "./icons";
import classes from "./onboarding.module.scss";

export interface WorkspaceState {
  waiting: boolean;
  skipped: boolean;
  linkedId?: string;
  /** Why the last browser round trip did not link a workspace. */
  error?: string;
}

const PARTS: [string, string][] = [
  [
    "Connections",
    "Your warehouse and dbt setup, connected once and reused everywhere.",
  ],
  [
    "Skills",
    "Your conventions and best practices, so work is built, tested and reviewed your way.",
  ],
  [
    "Knowledge",
    "Definitions, docs and decisions that count as the source of truth.",
  ],
  [
    "Memory",
    "What it learns from working with you, kept so results get more precise over time.",
  ],
];

interface WorkspaceStepProps {
  projectName: string;
  state: WorkspaceState;
  canLinkWorkspace: boolean;
  /** False in editors the SaaS cannot redirect back to, like code-server. */
  supportsBrowserSignIn: boolean;
  onOpenAgain: () => void;
}

const WorkspaceStep = ({
  projectName,
  state,
  canLinkWorkspace,
  supportsBrowserSignIn,
  onOpenAgain,
}: WorkspaceStepProps): JSX.Element => (
  <div>
    {PARTS.map(([title, text]) => (
      <div key={title} className={classes.featureRow}>
        <span
          className={[classes.featureSquare, classes.featureSquareGreen].join(
            " ",
          )}
        />
        <div className={classes.featureBody}>
          <span className={classes.featureTitle}>{title}</span>
          <span className={classes.featureText}>{text}</span>
        </div>
      </div>
    ))}
    <div className={classes.readyBody}>
      <div
        className={[
          classes.workspaceCard,
          state.linkedId ? classes.accountCardOk : "",
        ].join(" ")}
      >
        {state.waiting ? (
          <span className={[classes.spinner, classes.spinnerLg].join(" ")} />
        ) : state.linkedId ? (
          <Icon name="circle-check" size={22} className={classes.statusOk} />
        ) : (
          <img src={AltimateLogo} alt="" />
        )}
        <div className={classes.accountText}>
          <span className={classes.accountTitle}>
            {state.linkedId
              ? `${projectName} is linked to a workspace`
              : state.waiting
                ? "Finish in your browser"
                : canLinkWorkspace
                  ? `Create a workspace for ${projectName}`
                  : supportsBrowserSignIn
                    ? "Workspaces are not available here yet"
                    : "Create workspaces from VS Code or Cursor"}
          </span>
          <span className={classes.accountDesc}>
            {state.linkedId
              ? "Altimate Code uses its context for this project, in the editor and the CLI."
              : state.waiting
                ? `This page updates when the workspace is linked to ${projectName}.`
                : canLinkWorkspace
                  ? `Build a workspace for ${projectName}: add your conventions, best practices and definitions so the AI follows your organization's context. Opens in your browser. You can also do this later from the Altimate panel.`
                  : supportsBrowserSignIn
                    ? "Creating one here needs a free-plan Altimate instance. You can continue without one."
                    : "This editor runs in the browser, so it cannot receive the workspace link back from Altimate. Create it from desktop VS Code or Cursor, or continue without one."}
          </span>
          {state.error && !state.waiting && (
            <span
              className={[classes.checkDetail, classes.detailError].join(" ")}
            >
              {state.error}. Create the workspace again, or skip it.
            </span>
          )}
        </div>
        {state.waiting && (
          <button
            type="button"
            className={[classes.linkAction, classes.accountLink].join(" ")}
            onClick={onOpenAgain}
          >
            Open again
          </button>
        )}
      </div>
    </div>
  </div>
);

export default WorkspaceStep;
