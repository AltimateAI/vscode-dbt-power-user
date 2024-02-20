import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { DbtGenericTests } from "@modules/documentationEditor/state/types";
import { Card, CardTitle, CardBody, CardFooter, Button } from "@uicore";
import AcceptedValues from "./AcceptedValues";
import Relationships from "./Relationships";
import { useEffect, useState } from "react";
import {
  executeRequestInAsync,
  executeRequestInSync,
} from "@modules/app/requestExecutor";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { panelLogger } from "@modules/logger";

interface Props {
  formType: DbtGenericTests;
  onClose: () => void;
  path?: string;
  column: string;
}

const schema = Yup.object({
  to: Yup.string().optional(),
  field: Yup.string().optional(),
  accepted_values: Yup.string().optional(),
}).required();

export interface SaveRequest {
  to?: string;
  field?: string;
  accepted_values?: string;
  test?: DbtGenericTests;
}

const TestForm = ({
  formType,
  onClose,
  path,
  column,
}: Props): JSX.Element | null => {
  const [isSaving, setIsSaving] = useState(false);
  const {
    state: { currentDocsData },
  } = useDocumentationContext();

  const { control, handleSubmit, reset } = useForm<SaveRequest>({
    resolver: yupResolver(schema),
  });

  const saveGenericTest = async () => {
    if (
      formType === DbtGenericTests.NOT_NULL ||
      formType === DbtGenericTests.UNIQUE
    ) {
      await handleSave({ test: formType });
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

  const handleSave = async (data: SaveRequest) => {
    setIsSaving(true);

    (await executeRequestInSync("saveDocumentation", {
      ...currentDocsData,
      tests: {
        column,
        path,
        ...data,
      },
      patchPath: currentDocsData?.patchPath,
      dialogType: "Existing file",
    })) as { saved: boolean };
    executeRequestInAsync("getCurrentModelTests", {});

    setIsSaving(false);
  };
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
        <Button onClick={handleSubmit(handleSave)}>Save</Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </CardFooter>
    </Card>
  );
};

export default TestForm;
