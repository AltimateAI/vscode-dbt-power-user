import { executeRequestInSync } from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";
import { Stack } from "@uicore";
import { Button, Card, Steps } from "antd";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import AltimateSetupStep from "./AltimateSetupStep";
import classes from "./onboarding.module.scss";
import PrerequisitesStep, {
  PrerequisitesStepHandle,
} from "./PrerequisitesStep";
import TutorialsStep from "./TutorialsStep";

interface WizardStep {
  id: string;
  title: string;
  description: string;
  isParent?: boolean;
  parentId?: string;
  action?: {
    label: string;
    command: string;
  };
}

const SETUP_STEPS: WizardStep[] = [
  {
    id: "dbt",
    title: "Setup dbt",
    description: "Configure your dbt environment",
    isParent: true,
  },
  {
    id: "prerequisites",
    title: "Setup Prerequisites",
    description: "Check environment",
    parentId: "dbt",
  },
  {
    id: "validation",
    title: "Validate Setup",
    description: "Configure and validate project",
    parentId: "dbt",
  },
  {
    id: "altimate",
    title: "Setup Altimate AI",
    description: "Connect to Altimate AI for advanced features",
    isParent: true,
  },
  {
    id: "altimateKey",
    title: "Configure API Key",
    description: "Connect to Altimate AI",
    parentId: "altimate",
  },
  {
    id: "altimateIntegration",
    title: "Create Integration",
    description: "Set up dbt integration",
    parentId: "altimate",
  },
  {
    id: "finish",
    title: "Tutorials",
    description:
      "Explore the tutorials below to learn about dbt Power User's features.",
  },
];

/** Find the next navigable (non-parent) step index */
const findNextStep = (fromIndex: number): number => {
  for (let i = fromIndex + 1; i < SETUP_STEPS.length; i++) {
    if (!SETUP_STEPS[i].isParent) return i;
  }
  return fromIndex;
};

/** Find the previous navigable (non-parent) step index */
const findPreviousStep = (fromIndex: number): number => {
  for (let i = fromIndex - 1; i >= 0; i--) {
    if (!SETUP_STEPS[i].isParent) return i;
  }
  return fromIndex;
};

/** Get the first child index for a parent step */
const getFirstChildIndex = (parentId: string): number => {
  const idx = SETUP_STEPS.findIndex((s) => s.parentId === parentId);
  return idx !== -1 ? idx : 0;
};

/** Determine status for a step based on currentStep */
const getStepStatus = (
  step: WizardStep,
  index: number,
  currentStep: number,
): "finish" | "process" | "wait" => {
  if (step.isParent) {
    const childIndices = SETUP_STEPS.map((s, i) =>
      s.parentId === step.id ? i : -1,
    ).filter((i) => i !== -1);
    const firstChild = Math.min(...childIndices);
    const lastChild = Math.max(...childIndices);
    if (currentStep > lastChild) return "finish";
    if (currentStep >= firstChild) return "process";
    return "wait";
  }
  if (index < currentStep) return "finish";
  if (index === currentStep) return "process";
  return "wait";
};

interface SetupWizardProps {
  initialStep?: string;
}

const SetupWizard = forwardRef<
  { navigateToStep: (stepId: string) => void },
  SetupWizardProps
>(({ initialStep }, ref) => {
  const getInitialStepIndex = () => {
    if (initialStep) {
      const index = SETUP_STEPS.findIndex((step) => step.id === initialStep);
      if (index !== -1) {
        // If pointing at a parent, jump to its first child
        if (SETUP_STEPS[index].isParent) {
          return getFirstChildIndex(SETUP_STEPS[index].id);
        }
        return index;
      }
    }
    // Default to first navigable step
    return findNextStep(-1);
  };

  const [currentStep, setCurrentStep] = useState(getInitialStepIndex());
  const [stepReady, setStepReady] = useState(false);
  const [stepLoading, setStepLoading] = useState(false);
  const stepRef = useRef<PrerequisitesStepHandle>(null);

  useEffect(() => {
    if (initialStep) {
      const index = SETUP_STEPS.findIndex((step) => step.id === initialStep);
      if (index !== -1) {
        if (SETUP_STEPS[index].isParent) {
          setCurrentStep(getFirstChildIndex(SETUP_STEPS[index].id));
        } else {
          setCurrentStep(index);
        }
      }
    }
  }, [initialStep]);

  useImperativeHandle(ref, () => ({
    navigateToStep: (stepId: string) => {
      const index = SETUP_STEPS.findIndex((step) => step.id === stepId);
      if (index !== -1) {
        if (SETUP_STEPS[index].isParent) {
          setCurrentStep(getFirstChildIndex(SETUP_STEPS[index].id));
        } else {
          setCurrentStep(index);
        }
      }
    },
  }));

  // Reset readiness when step changes
  useEffect(() => {
    const needsReadinessCheck = ["prerequisites", "altimateKey"].includes(
      SETUP_STEPS[currentStep]?.id ?? "",
    );
    setStepReady(!needsReadinessCheck);
    setStepLoading(false);
  }, [currentStep]);

  const handleReadyChange = useCallback((ready: boolean, loading?: boolean) => {
    setStepReady(ready);
    setStepLoading(loading ?? false);
  }, []);

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
    setCurrentStep(findNextStep(currentStep));
  };

  const handlePrevious = () => {
    setCurrentStep(findPreviousStep(currentStep));
  };

  const handleNextClick = () => {
    if (stepRef.current) {
      stepRef.current.triggerNext();
    } else {
      handleNext();
    }
  };

  const currentStepData = SETUP_STEPS[currentStep];

  // Determine which parent group is active so we can hide inactive substeps
  const activeParentId = currentStepData.isParent
    ? currentStepData.id
    : currentStepData.parentId;

  // Only show: top-level steps (parents + standalone) and children of the active parent
  const visibleSteps = SETUP_STEPS.map((step, index) => ({
    step,
    originalIndex: index,
  })).filter(({ step }) => !step.parentId || step.parentId === activeParentId);

  const currentVisibleIndex = visibleSteps.findIndex(
    ({ originalIndex }) => originalIndex === currentStep,
  );

  // Count only navigable steps for the step counter
  const navigableSteps = SETUP_STEPS.filter((s) => !s.isParent);
  const currentNavigableIndex = navigableSteps.findIndex(
    (s) => s.id === currentStepData.id,
  );
  const isFirstNavigable = currentNavigableIndex === 0;
  const isLastNavigable = currentNavigableIndex === navigableSteps.length - 1;

  return (
    <div className={classes.wizardContainer}>
      <h1 className={classes.wizardTitle}>Setup dbt Power User</h1>
      <p className={classes.wizardSubtitle}>
        Follow these steps to configure dbt Power User for your project
      </p>

      <div className={classes.wizardContent}>
        <div className={classes.wizardSidebar}>
          <Steps
            current={currentVisibleIndex}
            direction="vertical"
            items={visibleSteps.map(({ step, originalIndex }) => ({
              title: step.title,
              className: step.parentId ? classes.substep : classes.parentStep,
              status: getStepStatus(step, originalIndex, currentStep),
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
              {currentStepData.id === "prerequisites" && (
                <PrerequisitesStep
                  ref={stepRef}
                  phase="prerequisites"
                  onComplete={handleNext}
                  onReadyChange={handleReadyChange}
                />
              )}
              {currentStepData.id === "validation" && (
                <PrerequisitesStep
                  ref={stepRef}
                  phase="validation"
                  onComplete={handleNext}
                  onReadyChange={handleReadyChange}
                />
              )}
              {currentStepData.id === "altimateKey" && (
                <AltimateSetupStep
                  phase="key"
                  onComplete={handleNext}
                  onReadyChange={handleReadyChange}
                />
              )}
              {currentStepData.id === "altimateIntegration" && (
                <AltimateSetupStep
                  phase="integration"
                  onComplete={handleNext}
                  onReadyChange={handleReadyChange}
                />
              )}
              {currentStepData.id === "finish" && <TutorialsStep />}
              {currentStepData.action && (
                <Button
                  type="primary"
                  size="large"
                  onClick={() => handleStepAction(currentStepData)}
                >
                  {currentStepData.action.label}
                </Button>
              )}
            </Stack>

            <Stack direction="row" className={classes.wizardNavigation}>
              {!isFirstNavigable ? (
                <Button onClick={handlePrevious} size="large">
                  Back
                </Button>
              ) : (
                <div />
              )}
              <div />
              {!isLastNavigable ? (
                <Button
                  type="primary"
                  onClick={handleNextClick}
                  disabled={!stepReady}
                  loading={stepLoading}
                  size="large"
                >
                  Next
                </Button>
              ) : (
                <div />
              )}
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
