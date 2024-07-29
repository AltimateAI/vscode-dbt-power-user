import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import {
  DbtGenericTests,
  DBTModelTest,
  DbtTestTypes,
  TestMetadataAcceptedValuesKwArgs,
  TestMetadataRelationshipsKwArgs,
} from "@modules/documentationEditor/state/types";
import { panelLogger } from "@modules/logger";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  IconButton,
  Stack,
  Tag,
} from "@uicore";
import { useMemo, useState } from "react";
import AcceptedValues from "./forms/AcceptedValues";
import Relationships from "./forms/Relationships";
import { SaveRequest } from "./types";
import useTestFormSave, { TestOperation } from "./hooks/useTestFormSave";
import classes from "../../styles.module.scss";
import { DeleteIcon, EditIcon } from "@assets/icons";
import { findDbtTestType } from "./utils";
import TestDetails from "./TestDetails";
import { EntityType } from "@modules/dataPilot/components/docGen/types";

const schema = Yup.object({
  to: Yup.string().optional(),
  field: Yup.string().optional(),
  accepted_values: Yup.array().of(Yup.string().required()).optional(),
}).required();

interface Props {
  onClose: () => void;
  test: DBTModelTest;
  column: string;
  type: EntityType;
}

const DisplayTestDetails = ({
  onClose,
  test,
  column,
  type,
}: Props): JSX.Element => {
  const { control, handleSubmit, setValue, watch } = useForm<SaveRequest>({
    resolver: yupResolver(schema),
  });

  const { isSaving, handleSave } = useTestFormSave();

  const [isInEditMode, setIsInEditMode] = useState(false);

  const isEditableTest =
    test.test_metadata?.name === DbtGenericTests.ACCEPTED_VALUES ||
    test.test_metadata?.name === DbtGenericTests.RELATIONSHIPS;
  const testType = findDbtTestType(test);
  const canDeleteTest =
    testType !== DbtTestTypes.SINGULAR &&
    testType !== DbtTestTypes.UNKNOWN &&
    type !== EntityType.MODEL;

  const handleDelete = () => {
    panelLogger.info("delete test", test);
    handleSave(
      { test: test.test_metadata?.name as DbtGenericTests },
      column,
      TestOperation.DELETE,
    );
    onClose();
  };

  const handleEdit = () => {
    setIsInEditMode(true);
    if (test.test_metadata?.name === DbtGenericTests.ACCEPTED_VALUES) {
      setValue(
        "accepted_values",
        (test.test_metadata.kwargs as TestMetadataAcceptedValuesKwArgs).values,
      );
      return;
    }

    if (test.test_metadata?.name === DbtGenericTests.RELATIONSHIPS) {
      setValue(
        "to",
        (test.test_metadata.kwargs as TestMetadataRelationshipsKwArgs).to,
      );
      setValue(
        "field",
        (test.test_metadata.kwargs as TestMetadataRelationshipsKwArgs).field,
      );
      return;
    }
  };

  const handleCancel = () => {
    setIsInEditMode(false);
  };

  const acceptedValues = watch("accepted_values");
  const fieldValue = watch("field");
  const toValue = watch("to");
  const formType = test.test_metadata?.name;

  const disableFormSubmit = useMemo(() => {
    if (formType === DbtGenericTests.ACCEPTED_VALUES) {
      return !acceptedValues?.length;
    }
    if (formType === DbtGenericTests.RELATIONSHIPS) {
      return !fieldValue || !toValue;
    }
    return false;
  }, [formType, fieldValue, toValue, acceptedValues]);

  const getFooter = () => {
    return (
      <CardFooter>
        <Stack className="mt-3">
          <Button
            type="submit"
            disabled={isSaving || disableFormSubmit}
            buttonText="Update"
          />
          <Button
            outline
            onClick={handleCancel}
            disabled={isSaving}
            buttonText="Cancel"
          />
        </Stack>
      </CardFooter>
    );
  };

  const onSubmit = (data: SaveRequest) => {
    const testName = test.test_metadata?.name;
    // Dont submit for non generic test
    if (!testName) {
      return;
    }

    if (!isInEditMode) {
      return;
    }

    handleSave(
      { ...data, test: testName as DbtGenericTests },
      column,
      TestOperation.UPDATE,
    );
    onClose();
  };

  const getEditableContent = () => {
    switch (test.test_metadata?.name) {
      case DbtGenericTests.UNIQUE:
      case DbtGenericTests.NOT_NULL:
        return null;
      case DbtGenericTests.ACCEPTED_VALUES:
        return (
          <Card>
            <CardBody>
              <div>
                <AcceptedValues
                  control={control}
                  values={acceptedValues}
                  column={column}
                  setValue={setValue}
                />
                {getFooter()}
              </div>
            </CardBody>
          </Card>
        );
      case DbtGenericTests.RELATIONSHIPS:
        return (
          <Card>
            <CardBody>
              <div>
                <Relationships
                  control={control}
                  toValue={
                    (
                      test.test_metadata
                        .kwargs as TestMetadataRelationshipsKwArgs
                    ).to
                  }
                  fieldValue={
                    (
                      test.test_metadata
                        .kwargs as TestMetadataRelationshipsKwArgs
                    ).field
                  }
                />
                {getFooter()}
              </div>
            </CardBody>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <Stack direction="column" className={classes.addTest}>
      <Card>
        <CardTitle>Column: {test.column_name}</CardTitle>
        <CardBody>
          <Stack className={classes.title}>
            <span>
              Test:{" "}
              <Tag color="primary" style={{ cursor: "auto" }}>
                {test.test_metadata?.name ?? test.key}
              </Tag>
            </span>
            <span>
              {isEditableTest ? (
                <IconButton title="Edit test" onClick={handleEdit}>
                  <EditIcon />
                </IconButton>
              ) : null}
              {canDeleteTest ? (
                <IconButton
                  style={{ color: "var(--action-red)" }}
                  title="Delete test"
                  onClick={handleDelete}
                >
                  <DeleteIcon />
                </IconButton>
              ) : null}
            </span>
          </Stack>
        </CardBody>
      </Card>

      <form onSubmit={handleSubmit(onSubmit)}>
        {isInEditMode ? (
          getEditableContent()
        ) : (
          <TestDetails test={test} testType={testType} />
        )}
      </form>
    </Stack>
  );
};

export default DisplayTestDetails;
