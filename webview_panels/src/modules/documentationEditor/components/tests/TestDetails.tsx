import {
  DbtGenericTests,
  DBTModelTest,
  DbtTestTypes,
  TestMetadataAcceptedValuesKwArgs,
  TestMetadataRelationshipsKwArgs,
} from "@modules/documentationEditor/state/types";
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
  Stack,
} from "@uicore";
import { useMemo } from "react";
import classes from "../../styles.module.scss";
import DbtTestCode from "./DbtTestCode";

interface Props {
  testType: DbtTestTypes;
  test: DBTModelTest;
}

const TestDetails = ({ testType, test }: Props): JSX.Element => {
  const testConfig = useMemo(() => {
    switch (testType) {
      case DbtTestTypes.GENERIC:
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
                      test.test_metadata
                        .kwargs as TestMetadataAcceptedValuesKwArgs
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
            return null;
        }
      default:
        return null;
    }
  }, []);

  return (
    <Stack direction="column">
      {testConfig}
      <DbtTestCode test={test} />
    </Stack>
  );
};

export default TestDetails;
