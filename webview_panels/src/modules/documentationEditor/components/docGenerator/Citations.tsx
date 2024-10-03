import { Badge } from "@lib";
import useAppContext from "@modules/app/useAppContext";
import { Citation } from "@modules/documentationEditor/state/types";
import { Stack } from "@uicore";
import classes from "./coachAi.module.scss";

const Citations = ({
  citations,
}: {
  citations?: Citation[];
}): JSX.Element | null => {
  const {
    state: {
      teammatesEnabled,
      tenantInfo: { frontendUrl, teammatesEnabled: isEnabledInTenant },
    },
  } = useAppContext();

  if (!teammatesEnabled || !isEnabledInTenant || !citations?.length) {
    return null;
  }
  return (
    <Stack className={classes.coachAi}>
      Learnings applied:
      <ul style={{ padding: 0, display: "flex", gap: 8, marginTop: -2 }}>
        {citations.map((citation, index) => (
          <li key={index} style={{ listStyle: "none" }}>
            <Badge
              tag={"a"}
              href={`${frontendUrl}/teammates/${citation.taskLabel as string}?learning=${citation.id}`}
              tooltip={citation.content}
            >
              {index + 1}
            </Badge>
          </li>
        ))}
      </ul>
    </Stack>
  );
};

export default Citations;
