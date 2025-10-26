import { executeRequestInSync } from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";
import { Stack } from "@uicore";
import { Button, Card, Steps } from "antd";
import { useState } from "react";
import AltimateSetupStep from "./AltimateSetupStep";
import classes from "./onboarding.module.scss";
import PrerequisitesStep from "./PrerequisitesStep";
import ProjectSetupStep from "./ProjectSetupStep";

interface WizardStep {
  id: string;
  title: string;
  description: string;
  action?: {
    label: string;
    command: string;
  };
  isConditional?: boolean;
}

const SETUP_STEPS: WizardStep[] = [
  {
    id: "prerequisites",
    title: "Setup Prerequisites",
    description:
      "Ensure dbt project is open, Python interpreter is configured, and dbt is installed.",
  },
  {
    id: "setupAltimate",
    title: "Setup Altimate AI",
    description:
      "Connect to Altimate AI and create a dbt integration to unlock advanced features like column-level lineage, AI-powered documentation generation, query translation, collaboration features, and more. This step is optional but highly recommended.",
  },
  {
    id: "setupProject",
    title: "Setup and validate project",
    description:
      "Select your dbt project, install dependencies, and validate your setup.",
  },
  {
    id: "finish",
    title: "Finish setup",
    description:
      "Congratulations! If you followed all the steps, the extension should be set up for your project. You can now start using dbt Power User's features like auto-completion, query preview, lineage visualization, and more.",
    action: {
      label: "View Documentation",
      command: "openDocumentation",
    },
  },
];

const SetupWizard = (): JSX.Element => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleStepAction = async (step: WizardStep) => {
    try {
      if (step.action) {
        if (step.action.command === "openDocumentation") {
          window.open(
            "https://docs.myaltimate.com/setup/quickstart/",
            "_blank",
          );
        } else {
          await executeRequestInSync("executeCommand", {
            vscodeCommand: step.action.command,
          });
        }
      }
    } catch (err) {
      panelLogger.error(`Error executing step action for ${step.id}`, err);
    }
  };

  const handleNext = () => {
    if (currentStep < SETUP_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = SETUP_STEPS[currentStep];

  return (
    <div className={classes.wizardContainer}>
      <h1 className={classes.wizardTitle}>Setup dbt Power User</h1>
      <p className={classes.wizardSubtitle}>
        Follow these steps to configure dbt Power User for your project
      </p>

      <div className={classes.wizardContent}>
        <div className={classes.wizardSidebar}>
          <Steps
            current={currentStep}
            onChange={setCurrentStep}
            direction="vertical"
            items={SETUP_STEPS.map((step) => ({
              title: step.title,
              description: step.isConditional ? "(Conditional)" : undefined,
            }))}
            className={classes.wizardSteps}
          />
        </div>

        <div className={classes.wizardMain}>
          <Card className={classes.stepCard}>
            <h2>{currentStepData.title}</h2>
            <p className={classes.stepDescription}>
              {currentStepData.description}
            </p>

            <Stack direction="row" className={classes.stepActions}>
              {currentStepData.id === "prerequisites" ? (
                <PrerequisitesStep />
              ) : currentStepData.id === "setupProject" ? (
                <ProjectSetupStep onComplete={handleNext} />
              ) : currentStepData.id === "setupAltimate" ? (
                <AltimateSetupStep onComplete={handleNext} />
              ) : (
                currentStepData.action && (
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => handleStepAction(currentStepData)}
                  >
                    {currentStepData.action.label}
                  </Button>
                )
              )}
            </Stack>

            <Stack direction="row" className={classes.wizardNavigation}>
              <Button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                size="large"
              >
                Previous
              </Button>
              <div className={classes.stepCounter}>
                Step {currentStep + 1} of {SETUP_STEPS.length}
              </div>
              <Button
                type="primary"
                onClick={handleNext}
                disabled={currentStep === SETUP_STEPS.length - 1}
                size="large"
              >
                Next
              </Button>
            </Stack>
          </Card>

          <div className={classes.wizardFooter}>
            <p>
              Need help?{" "}
              <a
                href="https://www.altimate.ai/support"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupWizard;
