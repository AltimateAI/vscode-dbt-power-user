import { executeRequestInSync } from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";
import { Stack } from "@uicore";
import { Button, Card, Steps } from "antd";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import AltimateSetupStep from "./AltimateSetupStep";
import classes from "./onboarding.module.scss";
import PrerequisitesStep from "./PrerequisitesStep";
import TutorialsStep from "./TutorialsStep";

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
    title: "Setup dbt",
    description:
      "Ensure dbt project is open, Python interpreter is configured, and dbt is installed. Then validate your project setup.",
  },
  {
    id: "setupAltimate",
    title: "Setup Altimate AI",
    description:
      "Connect to Altimate AI and create a dbt integration to unlock advanced features like column-level lineage, AI-powered documentation generation, query translation, collaboration features, and more. This step is optional but highly recommended.",
  },
  {
    id: "finish",
    title: "Tutorials",
    description:
      "Explore the tutorials below to learn about dbt Power User's features.",
  },
];

interface SetupWizardProps {
  initialStep?: string;
}

const SetupWizard = forwardRef<
  { navigateToStep: (stepId: string) => void },
  SetupWizardProps
>(({ initialStep }, ref) => {
  // Find initial step index
  const getInitialStepIndex = () => {
    if (initialStep) {
      const index = SETUP_STEPS.findIndex((step) => step.id === initialStep);
      return index !== -1 ? index : 0;
    }
    return 0;
  };

  const [currentStep, setCurrentStep] = useState(getInitialStepIndex());

  // Update currentStep when initialStep prop changes
  useEffect(() => {
    if (initialStep) {
      const index = SETUP_STEPS.findIndex((step) => step.id === initialStep);
      if (index !== -1) {
        setCurrentStep(index);
      }
    }
  }, [initialStep]);

  // Expose navigateToStep method via ref
  useImperativeHandle(ref, () => ({
    navigateToStep: (stepId: string) => {
      const index = SETUP_STEPS.findIndex((step) => step.id === stepId);
      if (index !== -1) {
        setCurrentStep(index);
      }
    },
  }));

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
                <PrerequisitesStep onComplete={handleNext} />
              ) : currentStepData.id === "setupAltimate" ? (
                <AltimateSetupStep onComplete={handleNext} />
              ) : currentStepData.id === "finish" ? (
                <TutorialsStep />
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
});

SetupWizard.displayName = "SetupWizard";

export default SetupWizard;
