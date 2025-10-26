import { Button, Container, Stack } from "@uicore";
import { useEffect, useRef, useState } from "react";
import classes from "./onboarding.module.scss";
import SetupWizard from "./SetupWizard";

interface NavigateToStepMessage {
  command: string;
  payload?: {
    step?: string;
  };
}

const Onboarding = (): JSX.Element => {
  const [showWizard, setShowWizard] = useState(false);
  const [initialStep, setInitialStep] = useState<string | undefined>();
  const wizardRef = useRef<{ navigateToStep: (stepId: string) => void }>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent<NavigateToStepMessage>) => {
      const message = event.data;
      if (message.command === "navigateToStep" && message.payload?.step) {
        const stepId: string = message.payload.step;

        // If wizard is already shown, navigate directly
        if (showWizard && wizardRef.current) {
          wizardRef.current.navigateToStep(stepId);
        } else {
          // Otherwise, show wizard and set initial step
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

  const handleGetStarted = () => {
    setShowWizard(true);
  };

  const handleLearnMore = () => {
    // Open documentation in browser using standard href
    window.open("https://docs.myaltimate.com/setup/quickstart/", "_blank");
  };

  if (showWizard) {
    return <SetupWizard ref={wizardRef} initialStep={initialStep} />;
  }

  return (
    <Container fluid className={classes.onboardingContainer}>
      <Stack direction="column" className={classes.content}>
        <h1 className={classes.mainTitle}>
          Supercharge your dbt workflow with Power User for dbt!
        </h1>

        <p className={classes.subtitle}>With dbt Power User, you can:</p>

        <div className={classes.featuresGrid}>
          <Stack direction="row" className={classes.featureRow}>
            <div className={classes.featureItem}>
              <span className={classes.iconChat}>💬</span>
              <span className={classes.featureText}>
                Get instant answers about your models, tests, and production
                runs
              </span>
            </div>

            <div className={classes.featureItem}>
              <span className={classes.iconSearch}>🔍</span>
              <span className={classes.featureText}>
                Explore and search faster within your dbt project
              </span>
            </div>
          </Stack>

          <Stack direction="row" className={classes.featureRow}>
            <div className={classes.featureItem}>
              <span className={classes.iconBrain}>🧠</span>
              <span className={classes.featureText}>
                Visualize model, column and SQL lineage with clarity
              </span>
            </div>

            <div className={classes.featureItem}>
              <span className={classes.iconGear}>⚙️</span>
              <span className={classes.featureText}>
                Run & debug directly in VS Code
              </span>
            </div>
          </Stack>

          <Stack direction="row" className={classes.featureRow}>
            <div className={classes.featureItem}>
              <span className={classes.iconChart}>📈</span>
              <span className={classes.featureText}>
                Get checks on performance, tests, and structure
              </span>
            </div>

            <div className={classes.featureItem}>
              <span className={classes.iconMagic}>🪄</span>
              <span className={classes.featureText}>
                Gain actionable recommendations to optimize your dbt project
              </span>
            </div>
          </Stack>
        </div>

        <Stack direction="row" className={classes.buttonGroup}>
          <Button color="secondary" size="lg" onClick={handleLearnMore}>
            Learn more
          </Button>
          <Button color="primary" size="lg" onClick={handleGetStarted}>
            Get Started
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Onboarding;
