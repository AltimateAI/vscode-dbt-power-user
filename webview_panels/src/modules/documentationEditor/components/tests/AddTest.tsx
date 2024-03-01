import { AddOutlineIcon } from "@assets/icons";
import { DbtGenericTests } from "@modules/documentationEditor/state/types";
import {
  Card,
  CardTitle,
  CardBody,
  ListGroup,
  ListGroupItem,
  Stack,
  Drawer,
  DrawerRef,
  IconButton,
} from "@uicore";
import { useRef, useState } from "react";
import TestForm from "./forms/TestForm";
import classes from "../../styles.module.scss";
import CustomTestButton from "./CustomTestButton";

interface Props {
  title: string;
  currentTests?: string[];
}

const AddTest = ({ title, currentTests }: Props): JSX.Element => {
  const [formType, setFormType] = useState<DbtGenericTests | null>(null);
  const drawerRef = useRef<DrawerRef>(null);

  const handleNewTestClick = (test: DbtGenericTests) => {
    setFormType(test);
  };

  const handleOpen = () => {
    drawerRef.current?.open();
  };
  const onClose = () => {
    setFormType(null);
    drawerRef.current?.close();
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <AddOutlineIcon />
      </IconButton>
      <Drawer ref={drawerRef}>
        <Stack direction="column" className={classes.addTest}>
          <Card>
            <CardTitle>Add new test</CardTitle>
            <CardBody className={classes.title}>Column: {title}</CardBody>
          </Card>
          {!formType ? (
            <Card>
              <CardTitle>Select test for next step</CardTitle>
              <CardBody>
                <ListGroup className={classes.testListGroup}>
                  {Object.values(DbtGenericTests).map((test) => (
                    <ListGroupItem
                      onClick={() => handleNewTestClick(test)}
                      key={test}
                      action
                      tag="button"
                      disabled={currentTests?.includes(test)}
                    >
                      {test}
                    </ListGroupItem>
                  ))}
                  <CustomTestButton column={title} />
                </ListGroup>
              </CardBody>
            </Card>
          ) : (
            <TestForm formType={formType} onClose={onClose} column={title} />
          )}
        </Stack>
      </Drawer>
    </>
  );
};

export default AddTest;
