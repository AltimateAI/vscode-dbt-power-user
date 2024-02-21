import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { DbtGenericTests } from "@modules/documentationEditor/state/types";
import { Card, CardTitle, CardBody, CardFooter, Button } from "@uicore";
import AcceptedValues from "./AcceptedValues";
import Relationships from "./Relationships";
import { useEffect } from "react";
import { panelLogger } from "@modules/logger";
import useTestFormSave from "../hooks/useTestFormSave";
import { SaveRequest } from "../types";

interface Props {
  formType: DbtGenericTests;
  onClose: () => void;
  column: string;
}

const schema = Yup.object({
  to: Yup.string().optional(),
  field: Yup.string().optional(),
  accepted_values: Yup.string().optional(),
}).required();

const TestForm = ({ formType, onClose, column }: Props): JSX.Element | null => {
  const { isSaving, handleSave } = useTestFormSave();

  const { control, handleSubmit, reset } = useForm<SaveRequest>({
    resolver: yupResolver(schema),
  });

  const saveGenericTest = async () => {
    if (
      formType === DbtGenericTests.NOT_NULL ||
      formType === DbtGenericTests.UNIQUE
    ) {
      await handleSave({ test: formType }, column);
      onClose();
      return;
    }
  };
  useEffect(() => {
    if (!formType || isSaving) {
      return;
    }

    saveGenericTest().catch((err) =>
      panelLogger.error("error while saving test", formType, err, column),
    );
  }, [formType, isSaving]);

  const handleCancel = () => {
    reset();
    if (!isSaving) {
      onClose();
    }
  };

  if (
    formType !== DbtGenericTests.RELATIONSHIPS &&
    formType !== DbtGenericTests.ACCEPTED_VALUES
  ) {
    return null;
  }

  return (
    <Card>
      <CardTitle>{formType}</CardTitle>
      <CardBody>
        {formType === DbtGenericTests.RELATIONSHIPS ? (
          <Relationships control={control} />
        ) : (
          <AcceptedValues control={control} />
        )}
      </CardBody>
      <CardFooter>
        <Button
          onClick={handleSubmit((d) =>
            handleSave({ ...d, test: formType }, column),
          )}
        >
          Save
        </Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </CardFooter>
    </Card>
  );
};

export default TestForm;
