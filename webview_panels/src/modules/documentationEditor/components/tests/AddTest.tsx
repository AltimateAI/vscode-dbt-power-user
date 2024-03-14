import { AddIcon, RemoveIcon } from "@assets/icons";
import { DbtGenericTests } from "@modules/documentationEditor/state/types";
import {
  Card,
  CardTitle,
  CardBody,
  Stack,
  Drawer,
  DrawerRef,
  IconButton,
  Button,
  Fade,
  Tooltip,
} from "@uicore";
import { useRef, useState } from "react";
import TestForm from "./forms/TestForm";
import classes from "../../styles.module.scss";
import useTestFormSave, { TestOperation } from "./hooks/useTestFormSave";
import CustomTestButton from "./CustomTestButton";

interface Props {
  title: string;
  currentTests?: string[];
}

const AddTest = ({ title, currentTests }: Props): JSX.Element => {
  const [formType, setFormType] = useState<DbtGenericTests | null>(null);
  const [showButtons, setShowButtons] = useState(false);
  const drawerRef = useRef<DrawerRef>(null);
  const { handleSave } = useTestFormSave();

  const handleNewTestClick = (test: DbtGenericTests) => {
    if (test === DbtGenericTests.NOT_NULL || test === DbtGenericTests.UNIQUE) {
      handleSave({ test }, title, TestOperation.CREATE);
      setShowButtons(false);
      return;
    }
    setFormType(test);
    drawerRef.current?.open();
  };

  const handleOpen = () => {
    setShowButtons((prev) => !prev);
  };
  const onClose = () => {
    setFormType(null);
    drawerRef.current?.close();
    setShowButtons(false);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        color={showButtons ? "primary" : "secondary"}
        className={classes.btnAddTest}
        title={showButtons ? "Minimize" : `Add test for ${title}`}
      >
        {showButtons ? <RemoveIcon /> : <AddIcon />}
      </IconButton>
      {showButtons ? (
        <Fade>
          <Stack>
            {Object.values(DbtGenericTests)
              .filter((t) => !currentTests?.includes(t))
              .map((test) => (
                <Tooltip key={test} title="Click to add">
                  <Button
                    className={classes.newTestTag}
                    onClick={() => handleNewTestClick(test)}
                    outline
                  >
                    {test}
                  </Button>
                </Tooltip>
              ))}
            <CustomTestButton column={title} />
          </Stack>
        </Fade>
      ) : null}
      <Drawer ref={drawerRef}>
        <Stack direction="column" className={classes.addTest}>
          <Card>
            <CardTitle>
              <h5>Add new test</h5>
            </CardTitle>
            <CardBody className={classes.title}>Column: {title}</CardBody>
          </Card>
          {formType ? (
            <TestForm formType={formType} onClose={onClose} column={title} />
          ) : null}
        </Stack>
      </Drawer>
    </>
  );
};

export default AddTest;
