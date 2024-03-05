import { AltimateIcon } from "@assets/icons";
import { Card, CardBody, CardTitle, Stack } from "@uicore";
import AskDatapilotInput from "../common/AskDatapilotInput";
import UserQuery from "../common/UserQuery";
import { QueryAnalysisFollowup } from "../queryAnalysis/types";

interface Props {
  result: QueryAnalysisFollowup;
  handleSubmit: (text: string) => void;
}
const CustomTestResult = ({ result, handleSubmit }: Props): JSX.Element => {
  return (
    <Stack direction="column">
      <UserQuery query={result.user_prompt} />

      <Card>
        <CardTitle>
          <AltimateIcon /> {result.datapilot_title}
        </CardTitle>
        <CardBody>
          <p>Generate Tests for column “listing_id” in model “customers”</p>
          <p className="p4">
            Please provide more information about which tests you need
          </p>
        </CardBody>
      </Card>

      <AskDatapilotInput handleSubmit={handleSubmit} />
    </Stack>
  );
};

export default CustomTestResult;
