import { AddIcon } from "@assets/icons";
import { DbtGenericTests } from "@modules/documentationEditor/state/types";
import {
  Card,
  CardTitle,
  CardBody,
  Stack,
  Drawer,
  DrawerRef,
  IconButton,
  Tag,
  Fade,
} from "@uicore";
import { useRef, useState } from "react";
import TestForm from "./forms/TestForm";
import classes from "../../styles.module.scss";
import useTestFormSave, { TestOperation } from "./hooks/useTestFormSave";

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
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        color="secondary"
        className={classes.btnAddTest}
        title={`Add test for ${title}`}
      >
        <AddIcon />
      </IconButton>
      {showButtons ? (
        <Fade>
          <Stack>
            {Object.values(DbtGenericTests)
              .filter((t) => !currentTests?.includes(t))
              .map((test) => (
                <Tag key={test} onClick={() => handleNewTestClick(test)}>
                  {test}
                </Tag>
              ))}
          </Stack>
        </Fade>
      ) : null}
      <Drawer ref={drawerRef}>
        <Stack direction="column" className={classes.addTest}>
          <Card>
            <CardTitle>Add new test</CardTitle>
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
