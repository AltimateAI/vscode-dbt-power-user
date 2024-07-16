import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { DbtGenericTests } from "@modules/documentationEditor/state/types";
import {
  Card,
  CardTitle,
  CardBody,
  CardFooter,
  Button,
  Stack,
  Tag,
} from "@uicore";
import AcceptedValues from "./AcceptedValues";
import Relationships from "./Relationships";
import { useEffect, useMemo } from "react";
import useTestFormSave, { TestOperation } from "../hooks/useTestFormSave";
import { SaveRequest } from "../types";
import { sendTelemetryEvent } from "../../telemetry";
import { TelemetryEvents } from "@telemetryEvents";

interface Props {
  formType: DbtGenericTests;
  onClose: () => void;
  column: string;
}

const schema = Yup.object({
  to: Yup.string().optional(),
  field: Yup.string().optional(),
  accepted_values: Yup.array().of(Yup.string().required()).optional(),
}).required();

const TestForm = ({ formType, onClose, column }: Props): JSX.Element | null => {
  const { isSaving, handleSave } = useTestFormSave();

  const { control, handleSubmit, reset, setValue, watch } =
    useForm<SaveRequest>({
      resolver: yupResolver(schema),
    });

  const saveGenericTest = () => {
    if (
      formType === DbtGenericTests.NOT_NULL ||
      formType === DbtGenericTests.UNIQUE
    ) {
      handleSave({ test: formType }, column, TestOperation.CREATE);
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

  const acceptedValues = watch("accepted_values");
  const fieldValue = watch("field");
  const toValue = watch("to");

  const disableFormSubmit = useMemo(() => {
    if (formType === DbtGenericTests.ACCEPTED_VALUES) {
      return !acceptedValues?.length;
    }
    if (formType === DbtGenericTests.RELATIONSHIPS) {
      return !fieldValue || !toValue;
    }
    return false;
  }, [formType, fieldValue, toValue, acceptedValues]);

  const handleSaveClick = handleSubmit((d) => {
    sendTelemetryEvent(
      formType === DbtGenericTests.ACCEPTED_VALUES
        ? TelemetryEvents["DocumentationEditor/AcceptedValuesSaveClick"]
        : TelemetryEvents["DocumentationEditor/RelationshipsSaveClick"],
    );
    handleSave({ ...d, test: formType }, column, TestOperation.CREATE);
    onClose();
  });

  if (
    formType !== DbtGenericTests.RELATIONSHIPS &&
    formType !== DbtGenericTests.ACCEPTED_VALUES
  ) {
    return null;
  }

  return (
    <Card>
      <CardTitle>
        <div className="mb-1">Selected test</div>
        <Tag color="primary" style={{ cursor: "auto" }}>
          {formType}
        </Tag>
      </CardTitle>
      <CardBody>
        {formType === DbtGenericTests.RELATIONSHIPS ? (
          <Relationships control={control} />
        ) : (
          <AcceptedValues
            control={control}
            column={column}
            setValue={setValue}
            values={acceptedValues}
          />
        )}
      </CardBody>
      <CardFooter>
        <Stack className="mt-3">
          <Button
            onClick={handleSaveClick}
            color="primary"
            disabled={disableFormSubmit}
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
