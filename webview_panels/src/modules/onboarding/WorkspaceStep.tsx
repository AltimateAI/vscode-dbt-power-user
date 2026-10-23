import { Icon, IconName } from "./icons";
import classes from "./onboarding.module.scss";
import { Button } from "./ui";

export interface WorkspaceState {
  waiting: boolean;
  skipped: boolean;
  linkedId?: string;
  /** Why the last browser round trip did not link a workspace. */
  error?: string;
}

const WORKSPACES_GUIDE = "https://help.altimate.ai/workspaces/user-guide/home/";

const blocks = (projectName: string): [IconName, string, string][] => [
  [
    "stack-2",
    "Context, once",
    "Integrations, skills like /convert-to-dbt, knowledge such as a migration checklist, and memory that learns as you work",
  ],
  [
    "users",
    "Shared with your team",
    `Everyone on ${projectName} gets the same setup, in Power User and in the CLI`,
  ],
  [
    "switch-horizontal",
    "One per project",
    "Each workspace has its own integrations, skills, knowledge and people",
  ],
];

interface WorkspaceStepProps {
  projectName: string;
  state: WorkspaceState;
  canLinkWorkspace: boolean;
  onOpenAgain: () => void;
}

const WorkspaceStep = ({
  projectName,
  state,
  canLinkWorkspace,
  onOpenAgain,
}: WorkspaceStepProps): JSX.Element => (
  <div className={classes.stepBody}>
    {state.waiting ? (
      <div className={classes.waiting}>
        <span className={[classes.spinner, classes.spinnerLg].join(" ")} />
        <div className={classes.waitingTitle}>Finish in your browser</div>
        <div className={classes.waitingText}>
          This page updates when the workspace is linked to {projectName}.
        </div>
        <button
          type="button"
          className={[classes.linkAction, classes.accountLink].join(" ")}
          onClick={onOpenAgain}
        >
          Open again
        </button>
      </div>
    ) : (
      <>
        <div className={classes.wsBlocks}>
          {blocks(projectName).map(([icon, title, desc]) => (
            <div key={title} className={classes.wsBlock}>
              <Icon name={icon} size={22} />
              <div className={classes.tileText}>
                <span className={classes.wsBlockTitle}>{title}</span>
                <span className={classes.wsBlockDesc}>{desc}</span>
              </div>
            </div>
          ))}
        </div>
        {state.error && (
          <div className={classes.notice}>
            <Icon name="alert-triangle" size={18} />
            <span>{state.error}. Set up the workspace again, or skip it.</span>
          </div>
        )}
        {state.linkedId && (
          <div className={classes.notice}>
            <Icon name="circle-check" size={18} />
            <span>
              {projectName} is linked to a workspace. Continue to start using
              it.
            </span>
          </div>
        )}
        {!canLinkWorkspace && (
          <p className={classes.unavailable}>
            Workspaces are not available for this Altimate instance yet. You can
            continue without one.
          </p>
        )}
        <Button
          variant="secondary"
          external
          className={classes.guideButton}
          href={WORKSPACES_GUIDE}
        >
          <Icon name="book" size={17} />
          Workspaces Guide
        </Button>
      </>
    )}
  </div>
);

export default WorkspaceStep;
