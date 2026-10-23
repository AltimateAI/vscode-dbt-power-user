import { Icon, IconName } from "./icons";
import classes from "./onboarding.module.scss";

const AI_FEATURES: [IconName, string, string][] = [
  ["message-2", "Ask", "Explain a model, trace a column"],
  ["wand", "Fix", "Failed runs and tests, one click"],
  ["file-text", "Docs and tests", "Generated from the model"],
  ["bolt", "Optimize SQL", "Rewrite for performance"],
  ["language", "Translate", "Move SQL between dialects"],
  ["shield-check", "Review", "Your diff, before the PR"],
];

interface GetStartedStepProps {
  workspaceSkipped: boolean;
  onSetUpWorkspace: () => void;
}

const GetStartedStep = ({
  workspaceSkipped,
  onSetUpWorkspace,
}: GetStartedStepProps): JSX.Element => (
  <div className={[classes.stepBody, classes.stepBodyTight].join(" ")}>
    <div className={classes.tileGrid}>
      {AI_FEATURES.map(([icon, title, text]) => (
        <div key={title} className={classes.tile}>
          <div className={classes.tileTop}>
            <span className={classes.tileIcon}>
              <Icon name={icon} size={22} />
            </span>
            <Icon name="circle-check" size={18} className={classes.statusOk} />
          </div>
          <div className={classes.tileText}>
            <span className={classes.tileTitle}>{title}</span>
            <span className={classes.tileDesc}>{text}</span>
          </div>
        </div>
      ))}
    </div>
    <a
      href="https://help.altimate.ai/dbt-power-user/"
      target="_blank"
      rel="noopener noreferrer"
      className={[classes.linkAction, classes.moreLink].join(" ")}
    >
      +12 more features
      <Icon name="arrow-right" size={15} />
    </a>
    {workspaceSkipped && (
      <div className={classes.notice}>
        <Icon name="stack-2" size={18} />
        <span>
          No workspace yet. Altimate Code runs without shared context until you
          set one up.
        </span>
        <button
          type="button"
          className={classes.linkAction}
          onClick={onSetUpWorkspace}
        >
          Set Up Workspace →
        </button>
      </div>
    )}
  </div>
);

export default GetStartedStep;
