import { useState } from "react";
import { Card, CardBody, CardTitle, Button, Container } from "@uicore";
import styles from "./Onboarding.module.scss";
import { executeRequestInSync } from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";
import { EnableMcpImage, TryChatImage } from "./assets";

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

const McpOnboarding = (): JSX.Element => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

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

  const steps = [
    {
      title: "Setup MCP server",
      description:
        "In this step, MCP server will be started and a configuration file will be created",
      enableButton: "Let's do it!",
    },
    {
      title: "Advanced Data Tools",
      description:
        "Enhance your experience with advanced data exploration features. By enabling this option, you allow data lookup queries to be processed and shared with Cursor. Features include:\n• Query specific column values\n• Execute SQL\n• Previewing data structures",
      enableButton: "Enable Advanced Features",
      disableButton: "Disable Features",
    },
    {
      title: "Enable MCP server",
      description:
        "Open Cursor Settings and select the MCP from sidebar. Click 'Disabled' button next to 'dbtPowerUser' to enable it.",
      image: EnableMcpImage,
      enableButton: "Ok done!",
    },
    {
      title: "Try out the chat!",
      description:
        "Open chat and select agent mode. Try this prompt 'Get list of projects'. If you see message like 'Called MCP tool', then you are all set!",
      image: TryChatImage,
      enableButton: "All set!",
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
