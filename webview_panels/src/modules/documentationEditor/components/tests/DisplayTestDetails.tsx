import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { executeRequestInSync } from "@modules/app/requestExecutor";
import {
  DbtGenericTests,
  DBTModelTest,
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
  CodeBlock,
  ListGroup,
  ListGroupItem,
  Stack,
  Tag,
} from "@uicore";
import { useState } from "react";
import AcceptedValues from "./forms/AcceptedValues";
import Relationships from "./forms/Relationships";
import { SaveRequest } from "./types";
import useTestFormSave from "./hooks/useTestFormSave";
import classes from "../../styles.module.scss";

const schema = Yup.object({
  to: Yup.string().optional(),
  field: Yup.string().optional(),
  accepted_values: Yup.string().optional(),
}).required();

interface Props {
  onClose: () => void;
  test: DBTModelTest;
  column: string;
}

const DisplayTestDetails = ({ onClose, test, column }: Props): JSX.Element => {
  const { control, handleSubmit, setValue } = useForm<SaveRequest>({
    resolver: yupResolver(schema),
  });

  const { isSaving, handleSave } = useTestFormSave();

  const [testCode, setTestCode] = useState("");
  const [isInEditMode, setIsInEditMode] = useState(false);

  const handleEdit = () => {
    setIsInEditMode(true);
    if (test.test_metadata?.name === DbtGenericTests.ACCEPTED_VALUES) {
      setValue(
        "accepted_values",
        (
          test.test_metadata.kwargs as TestMetadataAcceptedValuesKwArgs
        ).values?.join(","),
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

  const getFooter = () => {
    return (
      <CardFooter>
        <Stack className="mt-3">
          <Button type="submit" disabled={isSaving}>
            Update
          </Button>
          <Button onClick={handleCancel} disabled={isSaving}>
            Cancel
          </Button>
        </Stack>
      </CardFooter>
    );
  };

  const renderCode = async () => {
    const result = (await executeRequestInSync("getTestCode", {
      path: test.path,
    })) as { code: string };
    setTestCode(result.code);
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

    handleSave({ ...data, test: testName as DbtGenericTests }, column, false);
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
                <p className="mb-0">Selected</p>
                <Tag className="mb-2" color="primary">
                  {test.test_metadata?.name}
                </Tag>
                <AcceptedValues
                  control={control}
                  value={(
                    test.test_metadata
                      .kwargs as TestMetadataAcceptedValuesKwArgs
                  ).values?.join(",")}
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
                <p>Selected</p>
                <Tag className="mb-2" color="primary">
                  {test.test_metadata?.name}
                </Tag>
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

  const getDisplayContent = () => {
    switch (test.test_metadata?.name) {
      case DbtGenericTests.UNIQUE:
      case DbtGenericTests.NOT_NULL:
        return null;
      case DbtGenericTests.ACCEPTED_VALUES:
        return (
          <Card>
            <CardBody>
              <CardTitle className="d-flex justify-content-between">
                Values <Button onClick={handleEdit}>Edit</Button>
              </CardTitle>
              <ListGroup className={classes.testListGroup}>
                {(
                  test.test_metadata.kwargs as TestMetadataAcceptedValuesKwArgs
                ).values?.map((value) => (
                  <ListGroupItem key={value} action tag="button">
                    {value}
                  </ListGroupItem>
                ))}
              </ListGroup>
            </CardBody>
          </Card>
        );
      case DbtGenericTests.RELATIONSHIPS:
        return (
          <Card>
            <CardBody>
              <CardTitle className="d-flex justify-content-between">
                Values <Button onClick={handleEdit}>Edit</Button>
              </CardTitle>
              <div>
                To:{" "}
                {
                  (test.test_metadata.kwargs as TestMetadataRelationshipsKwArgs)
                    .to
                }
              </div>

              <div>
                Field:{" "}
                {
                  (test.test_metadata.kwargs as TestMetadataRelationshipsKwArgs)
                    .field
                }
              </div>
            </CardBody>
          </Card>
        );

      default:
        renderCode().catch((err) =>
          panelLogger.error("error while getting code for test", err, test),
        );
        return null;
    }
  };
  return (
    <Stack direction="column" className={classes.addTest}>
      <Card>
        <CardTitle>Column: {test.column_name}</CardTitle>
        <CardBody>
          <div className={classes.title}>
            Test:{" "}
            <Tag color="primary">{test.test_metadata?.name ?? test.key}</Tag>
          </div>
        </CardBody>
      </Card>

      <form onSubmit={handleSubmit(onSubmit)}>
        {isInEditMode ? getEditableContent() : getDisplayContent()}
      </form>
      {testCode ? (
        <CodeBlock code={testCode} language="sql" fileName="Values" />
      ) : null}
    </Stack>
  );
};

export default DisplayTestDetails;
