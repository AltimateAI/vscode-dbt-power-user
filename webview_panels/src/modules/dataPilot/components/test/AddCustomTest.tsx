import { Card, CardBody, CardTitle, Stack } from "@uicore";
import UserQuery from "../common/UserQuery";
import useDataPilotContext from "@modules/dataPilot/useDataPilotContext";
import { DatapilotCustomTestChat } from "../queryAnalysis/types";
import { AltimateIcon } from "@assets/icons";

const AddCustomTest = () => {
  const {
    state: { items, currentSessionId },
  } = useDataPilotContext();

  const chat = currentSessionId
    ? (items[currentSessionId] as DatapilotCustomTestChat | undefined)
    : undefined;

  if (!chat) {
    return null;
  }
  return (
    <Stack direction="column">
      <UserQuery query={chat.query} />

      <Card>
            <CardTitle>
              <AltimateIcon /> Datapilot response
            </CardTitle>
            <CardBody>
              <p>Generate Tests for column “listing_id” in model “customers”</p>
              <p className="p2">Please provide more information about which tests you need</p>
            </CardBody>
          </Card>
    </Stack>
  );
};

export default AddCustomTest;
