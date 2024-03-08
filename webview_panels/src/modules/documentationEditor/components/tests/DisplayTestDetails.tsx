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
  IconButton,
  ListGroup,
  ListGroupItem,
  Stack,
  Tag,
} from "@uicore";
import { useState } from "react";
import AcceptedValues from "./forms/AcceptedValues";
import Relationships from "./forms/Relationships";
import { SaveRequest } from "./types";
import useTestFormSave, { TestOperation } from "./hooks/useTestFormSave";
import classes from "../../styles.module.scss";
import { DeleteIcon, EditIcon } from "@assets/icons";

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

  const isEditableTest =
    test.test_metadata?.name !== DbtGenericTests.NOT_NULL &&
    test.test_metadata?.name !== DbtGenericTests.UNIQUE;

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
          <Button outline onClick={handleCancel} disabled={isSaving}>
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
                  values={
                    (
                      test.test_metadata
                        .kwargs as TestMetadataAcceptedValuesKwArgs
                    ).values
                  }
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
                Values
              </CardTitle>
              <ListGroup className={classes.testListGroup}>
                {(
                  test.test_metadata.kwargs as TestMetadataAcceptedValuesKwArgs
                ).values?.map((value) => (
                  <ListGroupItem key={value} tag="div">
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
                Values
              </CardTitle>
              <ListGroup className={classes.testListGroup}>
                <ListGroupItem action tag="div">
                  <caption>To:</caption>{" "}
                  {
                    (
                      test.test_metadata
                        .kwargs as TestMetadataRelationshipsKwArgs
                    ).to
                  }
                </ListGroupItem>

                <ListGroupItem action tag="div">
                  <caption>Field:</caption>{" "}
                  {
                    (
                      test.test_metadata
                        .kwargs as TestMetadataRelationshipsKwArgs
                    ).field
                  }
                </ListGroupItem>
              </ListGroup>
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
              <IconButton
                style={{ color: "var(--action-red)" }}
                title="Delete test"
                onClick={handleDelete}
              >
                <DeleteIcon />
              </IconButton>
            </span>
          </Stack>
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
