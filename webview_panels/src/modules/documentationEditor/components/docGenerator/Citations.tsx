import { Citation } from "@altimateai/ui-components";
import useAppContext from "@modules/app/useAppContext";
import { Stack } from "@uicore";
import classes from "./coachAi.module.scss";
import { Citations } from "@altimateai/ui-components/chatbotV2";

const CitationsList = ({
  citations,
}: {
  citations?: Citation[];
}): JSX.Element | null => {
  const {
    state: {
      tenantInfo: { frontendUrl, teammatesEnabled: isEnabledInTenant },
    },
  } = useAppContext();

  if (!isEnabledInTenant) {
    return null;
  }
  return (
    <Stack className={classes.citations}>
      <Citations citations={citations} frontEndUrl={frontendUrl ?? ""} />
    </Stack>
  );
};

export default CitationsList;
