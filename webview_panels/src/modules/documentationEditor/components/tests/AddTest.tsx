import { AddOutlineIcon } from "@assets/icons";
import { DbtGenericTests } from "@modules/documentationEditor/state/types";

import RightSidePanel from "@modules/panel/RightSidePanel";
import {
  IconButton,
  Card,
  CardTitle,
  CardBody,
  ListGroup,
  ListGroupItem,
} from "@uicore";
import { useState } from "react";
import TestForm from "./forms/TestForm";

interface Props {
  title: string;
  currentTests?: string[];
}

const AddTest = ({ title, currentTests }: Props): JSX.Element => {
  const [addNewTestPanel, setAddNewTestPanel] = useState(false);
  const [formType, setFormType] = useState<DbtGenericTests | null>(null);

  const handleNewTestClick = (test: DbtGenericTests) => {
    setFormType(test);
  };

  const onClose = () => {
    setAddNewTestPanel(false);
    setFormType(null);
  };

  return (
    <>
      {addNewTestPanel ? (
        <RightSidePanel onClose={onClose}>
          <Card>
            <CardTitle>Add new test</CardTitle>
            <CardBody>Column: {title}</CardBody>
          </Card>
          {!formType ? (
            <Card>
              <CardTitle>Select test for next step</CardTitle>
              <CardBody>
                <ListGroup>
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
                </ListGroup>
              </CardBody>
            </Card>
          ) : (
            <TestForm formType={formType} onClose={onClose} column={title} />
          )}
        </RightSidePanel>
      ) : null}
      <IconButton onClick={() => setAddNewTestPanel(true)}>
        <AddOutlineIcon />
      </IconButton>
    </>
  );
};

export default AddTest;
