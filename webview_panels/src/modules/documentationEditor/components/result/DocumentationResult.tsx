import { formatDistance } from "date-fns";
import { GenerationDBDataProps } from "@modules/documentationEditor/types";
import { Card, CardBody, Stack, Avatar } from "@uicore";
// import ResultFeedbackButtons from "./ResultFeedbackButtons";
import { AltimateIcon } from "@assets/icons";

interface Props {
  history: GenerationDBDataProps;
}
const DocumentationResult = ({ history }: Props): JSX.Element => {
  return (
    <Card>
      <CardBody>
        <Stack>
          <center>
            <Avatar>
              <AltimateIcon />
            </Avatar>
            <caption>
              {formatDistance(new Date(history.timestamp), new Date(), {
                addSuffix: true,
              })}
            </caption>
          </center>
          <Stack direction="column">
            <Stack>
              <p>{history.data.description}</p>
            </Stack>
            {/* <Stack style={{ justifyContent: "space-between" }}>
              <Stack>
                <ResultFeedbackButtons history={history} />
              </Stack>
            </Stack> */}
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default DocumentationResult;
