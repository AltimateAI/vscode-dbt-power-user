import { useEffect, useRef, useState } from "react";
import "../whatsNew/fonts.scss";
import { request } from "./api";
import "./fonts.scss";
import classes from "./onboarding.module.scss";
import SetupWizard, { SavedState, SetupWizardHandle } from "./SetupWizard";

interface NavigateToStepMessage {
  command: string;
  payload?: {
    step?: string;
  };
}

const Onboarding = (): JSX.Element => {
  // The wizard mounts once the saved progress is in, so it starts there.
  const [saved, setSaved] = useState<SavedState>();
  const [initialStep, setInitialStep] = useState<string>();
  const wizardRef = useRef<SetupWizardHandle>(null);

  useEffect(() => {
    void request<SavedState>("getOnboardingState").then((state) =>
      setSaved(state ?? {}),
    );
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent<NavigateToStepMessage>) => {
      const step = event.data.payload?.step;
      if (event.data.command !== "navigateToStep" || !step) {
        return;
      }
      if (wizardRef.current) {
        wizardRef.current.navigateToStep(step);
      } else {
        setInitialStep(step);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className={classes.page}>
      {saved && (
        <SetupWizard ref={wizardRef} initialStep={initialStep} saved={saved} />
      )}
    </div>
  );
};

export default Onboarding;
