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
import RightSidePanel from "@modules/panel/RightSidePanel";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  ListGroup,
  ListGroupItem,
  Tag,
} from "@uicore";
import { useState } from "react";
import AcceptedValues from "./forms/AcceptedValues";
import Relationships from "./forms/Relationships";
import { SaveRequest } from "./types";
import useTestFormSave from "./hooks/useTestFormSave";

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
  const { control, handleSubmit } = useForm<SaveRequest>({
    resolver: yupResolver(schema),
  });

  const { isSaving, handleSave } = useTestFormSave();

  const [testCode, setTestCode] = useState("");
  const [isInEditMode, setIsInEditMode] = useState(false);

  const handleEdit = () => {
    setIsInEditMode(true);
  };

  const handleCancel = () => {
    setIsInEditMode(false);
  };

  const getFooter = () => {
    return (
      <CardFooter>
        <Button type="submit" disabled={isSaving}>
          Save
        </Button>
        <Button onClick={handleCancel} disabled={isSaving}>
          Cancel
        </Button>
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

    handleSave({ ...data, test: testName as DbtGenericTests }, column).catch(
      (err) =>
        panelLogger.error("error while editing test", err, testName, data),
    );
  };

  const getDisplayContent = () => {
    if (!test.column_name) {
      renderCode().catch((err) =>
        panelLogger.error("error while getting code for test", err, test),
      );
      return null;
    }

    switch (test.test_metadata?.name) {
      case DbtGenericTests.UNIQUE:
      case DbtGenericTests.NOT_NULL:
        return null;
      case DbtGenericTests.ACCEPTED_VALUES:
        return (
          <Card>
            <CardTitle>
              Values <Button onClick={handleEdit}>Edit</Button>
            </CardTitle>
            <CardBody>
              {isInEditMode ? (
                <div>
                  <p>Selected</p>
                  <Button>{test.test_metadata?.name}</Button>
                  <AcceptedValues
                    control={control}
                    value={(
                      test.test_metadata
                        .kwargs as TestMetadataAcceptedValuesKwArgs
                    ).values?.join(",")}
                  />
                  {getFooter()}
                </div>
              ) : (
                <ListGroup>
                  {(
                    test.test_metadata
                      .kwargs as TestMetadataAcceptedValuesKwArgs
                  ).values?.map((value) => (
                    <ListGroupItem key={value} action tag="button">
                      {value}
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </CardBody>
          </Card>
        );
      case DbtGenericTests.RELATIONSHIPS:
        return (
          <Card>
            <CardBody>
              {isInEditMode ? (
                <div>
                  <p>Selected</p>
                  <Button>{test.test_metadata?.name}</Button>
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
              ) : (
                <>
                  <Button onClick={handleEdit}>Edit</Button>
                  <div>
                    To:{" "}
                    {
                      (
                        test.test_metadata
                          .kwargs as TestMetadataRelationshipsKwArgs
                      ).to
                    }
                  </div>

                  <div>
                    Field:{" "}
                    {
                      (
                        test.test_metadata
                          .kwargs as TestMetadataRelationshipsKwArgs
                      ).field
                    }
                  </div>
                </>
              )}
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
    <RightSidePanel onClose={onClose}>
      <Card>
        <CardTitle>Column: {test.column_name}</CardTitle>
        <CardBody>
          Tests: <Tag color="primary">{test.key}</Tag>
        </CardBody>
      </Card>

      <form onSubmit={handleSubmit(onSubmit)}>{getDisplayContent()}</form>
      {testCode ? (
        <Card>
          <CardBody>{testCode}</CardBody>
        </Card>
      ) : null}
    </RightSidePanel>
  );
};

export default DisplayTestDetails;
