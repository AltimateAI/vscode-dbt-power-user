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
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
  Tag,
} from "@uicore";
import { useState } from "react";

interface Props {
  onClose: () => void;
  test: DBTModelTest;
}

const DisplayTestDetails = ({ onClose, test }: Props): JSX.Element => {
  const [testCode, setTestCode] = useState("");
  const renderCode = async () => {
    const result = (await executeRequestInSync("getTestCode", {
      path: test.path,
    })) as { code: string };
    setTestCode(result.code);
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
            <CardTitle>Values</CardTitle>
            <CardBody>
              <ListGroup>
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
    <RightSidePanel onClose={onClose}>
      <Card>
        <CardTitle>Column: {test.column_name}</CardTitle>
        <CardBody>
          Tests: <Tag color="primary">{test.key}</Tag>
        </CardBody>
      </Card>

      {getDisplayContent()}

      {testCode ? (
        <Card>
          <CardBody>{testCode}</CardBody>
        </Card>
      ) : null}
    </RightSidePanel>
  );
};

export default DisplayTestDetails;
