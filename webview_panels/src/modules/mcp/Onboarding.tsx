import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Button, Container } from "@uicore";
import styles from "./Onboarding.module.scss";
import { executeRequestInSync } from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";
import { MCP_ONBOARDING_STEPS } from "./constants";

interface StepProps {
  title: string;
  description: string;
  enableButton: string;
  disableButton?: string;
  isActive: boolean;
  isCompleted: boolean;
  isFirstStep: boolean;
  onButtonClick: (enabled: boolean) => void;
  onBackClick: () => void;
  image?: string;
}

const Step = ({
  title,
  description,
  enableButton,
  disableButton,
  isActive,
  isCompleted,
  isFirstStep,
  onButtonClick,
  onBackClick,
  image,
}: StepProps) => {
  return (
    <Card
      className={`${styles.step} ${isActive ? styles.active : ""} ${isCompleted ? styles.completed : ""}`}
    >
      <CardBody>
        <div className={styles.content}>
          <CardTitle tag="h6">{title}</CardTitle>
          <p className={styles.description}>{description}</p>
          {isActive && image && (
            <div className={styles.imageContainer}>
              <img src={image} alt={title} />
            </div>
          )}
          {isActive && (
            <div className="d-flex gap-1 align-items-center">
              {!isFirstStep && (
                <Button
                  color="secondary"
                  onClick={onBackClick}
                  className={styles.navButton}
                >
                  Back
                </Button>
              )}
              <Button
                color="primary"
                onClick={() => onButtonClick(true)}
                className={styles.actionButton}
              >
                {enableButton}
              </Button>
              {disableButton && (
                <Button
                  color="secondary"
                  onClick={() => onButtonClick(false)}
                  className={styles.actionButton}
                >
                  {disableButton}
                </Button>
              )}
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

interface StepConfig {
  title: string;
  description: string;
  enableButton: string;
  disableButton?: string;
  image?: string;
}

const McpOnboarding = (): JSX.Element => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [steps, setSteps] = useState<StepConfig[]>([]);

  useEffect(() => {
    const fetchMcpOnboardingConfig = async () => {
      const result = (await executeRequestInSync(
        "getMcpOnboardingConfig",
        {},
      )) as { ide: "cursor" | "vscode" };
      setSteps(
        MCP_ONBOARDING_STEPS.filter((step) => step.ide.includes(result.ide)),
      );
    };
    void fetchMcpOnboardingConfig();
  }, []);

  const handleStepBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepComplete = async (step: number, enabled: boolean) => {
    if (step === 1) {
      const result = await executeRequestInSync("configureMcp", {});
      panelLogger.log(result);
    }
    if (step === 2) {
      const result = await executeRequestInSync("enableDataSourceQueryTools", {
        enabled: enabled,
      });
      panelLogger.log(result);
    }
    if (step === 4) {
      const result = await executeRequestInSync("completeMcpOnboarding", {});
      panelLogger.log(result);
    }

    setCompletedSteps([...completedSteps, step]);
    setCurrentStep(step + 1);
  };

  return (
    <Container className={styles.onboarding}>
      <div className={styles.stepsIndicator}>
        {steps.map((_, index) => (
          <div
            key={index}
            className={`${styles.indicator} ${currentStep > index + 1 ? styles.completed : ""} ${currentStep === index + 1 ? styles.active : ""}`}
          >
            {index + 1}
          </div>
        ))}
      </div>
      <div className={styles.steps}>
        {steps.map((step, index) => (
          <Step
            key={index}
            {...step}
            isActive={currentStep === index + 1}
            isCompleted={completedSteps.includes(index + 1)}
            isFirstStep={index === 0}
            onButtonClick={(enabled) => handleStepComplete(index + 1, enabled)}
            onBackClick={handleStepBack}
          />
        ))}
      </div>
    </Container>
  );
};

export default McpOnboarding;
