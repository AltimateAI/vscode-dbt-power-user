import { useState } from "react";
import { Button, Container, Stack } from "@uicore";
import classes from "./onboarding.module.scss";
import SetupWizard from "./SetupWizard";

const Onboarding = (): JSX.Element => {
  const [showWizard, setShowWizard] = useState(false);

  const handleGetStarted = () => {
    setShowWizard(true);
  };

  const handleLearnMore = () => {
    // Open documentation in browser using standard href
    window.open("https://docs.myaltimate.com/setup/quickstart/", "_blank");
  };

  if (showWizard) {
    return <SetupWizard />;
  }

  return (
    <Container fluid className={classes.onboardingContainer}>
      <Stack direction="column" className={classes.content}>
        <h1 className={classes.mainTitle}>
          Supercharge your productivity with Altimate Datamates!
        </h1>

        <p className={classes.subtitle}>With Datamates, you can:</p>

        <div className={classes.featuresGrid}>
          <Stack direction="row" className={classes.featureRow}>
            <div className={classes.featureItem}>
              <span className={classes.iconPencil}>✏️</span>
              <span className={classes.featureText}>
                Write SQL & YAML faster
              </span>
            </div>

            <div className={classes.featureItem}>
              <span className={classes.iconBulb}>💡</span>
              <span className={classes.featureText}>Debug with ease</span>
            </div>

            <div className={classes.featureItem}>
              <span className={classes.iconDocs}>📚</span>
              <span className={classes.featureText}>
                Automate documentation
              </span>
            </div>
          </Stack>

          <Stack direction="row" className={classes.featureRow}>
            <div className={classes.featureItem}>
              <span className={classes.iconChart}>📈</span>
              <span className={classes.featureText}>Stay in flow</span>
            </div>

            <div className={classes.featureItem}>
              <span className={classes.iconDatabase}>🗄️</span>
              <span className={classes.featureText}>
                Works with dbt Core & dbt Cloud
              </span>
            </div>
          </Stack>
        </div>

        <p className={classes.moreText}>...and much more!</p>

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
