import { Badge } from "@lib";
import useAppContext from "@modules/app/useAppContext";
import { Citation } from "@modules/documentationEditor/state/types";
import { Stack } from "@uicore";

const Citations = ({
  citations,
}: {
  citations?: Citation[];
}): JSX.Element | null => {
  const {
    state: {
      teammatesEnabled,
      tenantInfo: { frontendUrl },
    },
  } = useAppContext();

  if (!teammatesEnabled || !citations?.length) {
    return null;
  }
  return (
    <Stack className="mt-2">
      <h5>Learnings applied:</h5>
      <ul style={{ padding: 0, display: "flex", gap: 8, marginTop: -2 }}>
        {citations.map((citation, index) => (
          <li key={index} style={{ listStyle: "none" }}>
            <Badge
              tag={"a"}
              href={`${frontendUrl}/settings/learnings?learning=${citation.id}`}
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
