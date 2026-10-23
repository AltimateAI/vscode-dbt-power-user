import AltimateMark from "@assets/icons/altimate-mark.svg?react";
import { useEffect, useRef, useState } from "react";
import "../whatsNew/fonts.scss";
import "./fonts.scss";
import { Icon, IconName } from "./icons";
import classes from "./onboarding.module.scss";
import SetupWizard, { SetupWizardHandle } from "./SetupWizard";
import { Button } from "./ui";

interface NavigateToStepMessage {
  command: string;
  payload?: {
    step?: string;
  };
}

const FEATURES: [IconName, string, string][] = [
  ["code", "Autocomplete", "ref(), sources and macros as you type"],
  ["git-merge", "Lineage", "Model and column level, in one click"],
  ["table", "Query preview", "Results and compiled SQL next to the model"],
  [
    "player-play",
    "Run and test",
    "Build parents, children and tests without typing",
  ],
  ["file-text", "Docs editor", "Edit descriptions next to the model"],
  ["scan", "Health check", "Scan the project before you commit"],
];

const Onboarding = (): JSX.Element => {
  const [showWizard, setShowWizard] = useState(false);
  const [initialStep, setInitialStep] = useState<string | undefined>();
  const wizardRef = useRef<SetupWizardHandle>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent<NavigateToStepMessage>) => {
      const message = event.data;
      if (message.command === "navigateToStep" && message.payload?.step) {
        const stepId: string = message.payload.step;
        if (showWizard && wizardRef.current) {
          wizardRef.current.navigateToStep(stepId);
        } else {
          setInitialStep(stepId);
          setShowWizard(true);
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [showWizard]);

  return (
    <div className={classes.page}>
      {showWizard ? (
        <SetupWizard
          ref={wizardRef}
          initialStep={initialStep}
          onExit={() => {
            setInitialStep(undefined);
            setShowWizard(false);
          }}
        />
      ) : (
        <div className={classes.splash}>
          <div className={classes.splashInner}>
            <div className={classes.splashHead}>
              <div className={classes.brand}>
                <AltimateMark />
                <span className={classes.brandName}>Power User for dbt</span>
              </div>
              <h1 className={classes.hero}>
                Everything dbt, inside your editor.
              </h1>
              <p className={classes.lead}>
                Autocomplete, lineage, query previews, docs and tests for your
                dbt project. Free and local.
              </p>
            </div>
            <div className={classes.tileGrid}>
              {FEATURES.map(([icon, title, text]) => (
                <div key={title} className={classes.tile}>
                  <span className={classes.tileIcon}>
                    <Icon name={icon} size={22} />
                  </span>
                  <div className={classes.tileText}>
                    <span className={classes.tileTitle}>{title}</span>
                    <span className={classes.tileDesc}>{text}</span>
                  </div>
                </div>
              ))}
            </div>
            <Button onClick={() => setShowWizard(true)}>Get Started</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Onboarding;
