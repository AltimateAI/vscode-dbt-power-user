import { RefreshIcon } from "@assets/icons";
import ResultFeedbackButtons from "@modules/documentationEditor/components/result/ResultFeedbackButtons";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  IconButton,
  List,
  Stack,
} from "@uicore";
import { GeneratedResult } from "./types";
import classes from "../datapilot.module.scss";
import { executeRequestInAsync } from "@modules/app/requestExecutor";

interface Props {
  generatedResults: GeneratedResult[];
}
const NewGenerationResults = ({
  generatedResults,
}: Props): JSX.Element | null => {
  const handleDocInsert = (result: GeneratedResult) =>
    executeRequestInAsync("docgen:insert", { ...result });

  if (!generatedResults.length) {
    return null;
  }
  return (
    <List className={classes.chatList}>
      {generatedResults.map((result) => (
        <li key={result.name}>
          <Card>
            <CardTitle>Regenerated</CardTitle>
            <CardBody>
              {result.description}
              <Stack>
                <Stack>
                  <Button onClick={() => handleDocInsert(result)}>
                    Insert
                  </Button>
                  <IconButton>
                    <RefreshIcon />
                  </IconButton>
                </Stack>
                <Stack>
                  <ResultFeedbackButtons
                    data={{
                      columnDescription: result.description ?? "",
                      columnName: result.name ?? "",
                      model: result.model,
                    }}
                  />
                </Stack>
              </Stack>
            </CardBody>
          </Card>
        </li>
      ))}
    </List>
  );
};

export default NewGenerationResults;
