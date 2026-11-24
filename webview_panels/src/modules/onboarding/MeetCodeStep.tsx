import AltimateCodeWordmark from "@assets/icons/altimate-code-wordmark.svg?react";
import classes from "./onboarding.module.scss";

const USES: [string, string, string][] = [
  [
    "Ask about any model",
    "Ask in plain English. Answers come from your models, not from a generic chatbot.",
    "“Explain the customers model” · “What feeds orders?”",
  ],
  [
    "Fix a failed run",
    "Paste the error. It finds the cause and suggests the fix in your code.",
    "“Why did stg_orders fail?”",
  ],
  [
    "Review and document",
    "Before you merge, see what a change would break and add tests and docs in one go.",
    "“What breaks if I rename customer_id?”",
  ],
];

/** Introduces Altimate Code. Nothing is configured here. */
const MeetCodeStep = (): JSX.Element => (
  <div>
    <div className={classes.introHead}>
      <div className={classes.introBrand}>
        <AltimateCodeWordmark
          aria-label="Altimate Code"
          className={classes.wordmark}
        />
        <span className={classes.introLead}>What you can do now</span>
      </div>
      <span className={classes.statusChip}>
        <span className={classes.statusDot} />
        runs locally · works with any model
      </span>
    </div>
    {USES.map(([title, text, example]) => (
      <div key={title} className={classes.featureRow}>
        <span className={classes.featureSquare} />
        <div className={classes.featureBody}>
          <span className={classes.featureTitle}>{title}</span>
          <span className={classes.featureText}>{text}</span>
          <span className={classes.featureExample}>try: {example}</span>
        </div>
      </div>
    ))}
  </div>
);

export default MeetCodeStep;
