import { useState } from "react";
import { Card, CardBody, CardTitle, Button, Container } from "@uicore";
import styles from "./Onboarding.module.scss";
import { executeRequestInSync } from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";

interface StepProps {
  title: string;
  description: string;
  buttonText: string;
  isActive: boolean;
  isCompleted: boolean;
  onButtonClick: () => void;
}

const Step = ({
  title,
  description,
  buttonText,
  isActive,
  isCompleted,
  onButtonClick,
}: StepProps) => {
  return (
    <Card
      className={`${styles.step} ${isActive ? styles.active : ""} ${isCompleted ? styles.completed : ""}`}
    >
      <CardBody>
        <CardTitle tag="h6">{title}</CardTitle>
        <p className={styles.description}>{description}</p>
        {isActive && (
          <Button
            color="primary"
            onClick={onButtonClick}
            className={styles.actionButton}
          >
            {buttonText}
          </Button>
        )}
      </CardBody>
    </Card>
  );
};

const McpOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleStepComplete = async (step: number) => {
    if (step === 1) {
      const result = await executeRequestInSync("configureMcp", {});
      panelLogger.log(result);
    }

    setCompletedSteps([...completedSteps, step]);
    setCurrentStep(step + 1);
  };

  const steps = [
    {
      title: "Setup MCP server",
      description:
        "In this step, MCP server will be started and a configuration file will be created",
      buttonText: "Setup",
    },
    {
      title: "Enable MCP server",
      description:
        "Open Cursor Settings and select the MCP from sidebar. Click 'Disabled' button next to 'dbtPowerUser' to enable it.",
      buttonText: "Enabled",
    },
    {
      title: "Try out the chat!",
      description:
        "Open chat and select agent mode. Try this prompt 'Get list of projects'. If you see message like 'Called MCP tool', then you are all set!",
      buttonText: "Works",
    },
  ];

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
            onButtonClick={() => handleStepComplete(index + 1)}
          />
        ))}
      </div>
    </Container>
  );
};

export default McpOnboarding;
