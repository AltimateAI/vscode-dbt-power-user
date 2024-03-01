import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { DbtGenericTests } from "@modules/documentationEditor/state/types";
import { Card, CardTitle, CardBody, CardFooter, Button, Stack } from "@uicore";
import AcceptedValues from "./AcceptedValues";
import Relationships from "./Relationships";
import { useEffect } from "react";
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

  const saveGenericTest = () => {
    if (
      formType === DbtGenericTests.NOT_NULL ||
      formType === DbtGenericTests.UNIQUE
    ) {
      handleSave({ test: formType }, column, true);
      onClose();
      return;
    }
  };
  useEffect(() => {
    if (!formType || isSaving) {
      return;
    }

    saveGenericTest();
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
      <CardTitle>
        <div>Selected test</div>
        <Button color="primary">{formType}</Button>
      </CardTitle>
      <CardBody>
        {formType === DbtGenericTests.RELATIONSHIPS ? (
          <Relationships control={control} />
        ) : (
          <AcceptedValues control={control} />
        )}
      </CardBody>
      <CardFooter>
        <Stack className="mt-3">
          <Button
            onClick={handleSubmit((d) => {
              handleSave({ ...d, test: formType }, column, true);
              onClose();
            })}
            color="primary"
          >
            Add
          </Button>
          <Button onClick={handleCancel} outline>
            Cancel
          </Button>
        </Stack>
      </CardFooter>
    </Card>
  );
};

export default TestForm;
