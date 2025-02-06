import { Citation, Citations } from "@altimate/ui-components/chatbot";
import useAppContext from "@modules/app/useAppContext";
import { Stack } from "@uicore";
import classes from "./coachAi.module.scss";

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
      <Citations citations={citations} frontendUrl={frontendUrl ?? ""} />
    </Stack>
  );
};

export default CitationsList;
