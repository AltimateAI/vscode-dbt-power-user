import { useState } from "react";
import { Card, CardBody, CardTitle, Button, Container } from "@uicore";
import styles from "./Onboarding.module.scss";
import { executeRequestInSync } from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";
import { EnableMcpImage, TryChatImage } from "./assets";

interface StepProps {
  title: string;
  description: string;
  buttonText: string;
  isActive: boolean;
  isCompleted: boolean;
  onButtonClick: () => void;
  image?: string;
}

const Step = ({
  title,
  description,
  buttonText,
  isActive,
  isCompleted,
  onButtonClick,
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
            <Button
              color="primary"
              onClick={onButtonClick}
              className={styles.actionButton}
            >
              {buttonText}
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

const McpOnboarding = (): JSX.Element => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleStepComplete = async (step: number) => {
    if (step === 1) {
      const result = await executeRequestInSync("configureMcp", {});
      panelLogger.log(result);
    }
    if (step === 2) {
      const result = await executeRequestInSync("enableDataSourceQueryTools", {});
      panelLogger.log(result);
    }
    if (step === 4) {
      const result = await executeRequestInSync("completeMcpOnboarding", {});
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
      buttonText: "Let's do it!",
    },
    {
      title: "Enable Advanced Data Tools",
      description: "Allow enhanced data exploration features for better code generation:\n• Query column values\n• Execute sample SQL\n• Get data previews",
      buttonText: "Enable Features",
    },
    {
      title: "Enable MCP server",
      description:
        "Open Cursor Settings and select the MCP from sidebar. Click 'Disabled' button next to 'dbtPowerUser' to enable it.",
      image: EnableMcpImage,
      buttonText: "Ok done!",
    },
    {
      title: "Try out the chat!",
      description:
        "Open chat and select agent mode. Try this prompt 'Get list of projects'. If you see message like 'Called MCP tool', then you are all set!",
      image: TryChatImage,
      buttonText: "All set!",
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
