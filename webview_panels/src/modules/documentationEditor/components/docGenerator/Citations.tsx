import { Badge } from "@lib";
import { Citation } from "@modules/documentationEditor/state/types";
import { Stack } from "@uicore";

const Citations = ({
  citations,
}: {
  citations?: Citation[];
}): JSX.Element | null => {
  if (!citations?.length) {
    return null;
  }
  return (
    <Stack className="mt-2">
      <h5>Learnings applied:</h5>
      <ul style={{padding: 0, display: "flex", gap: 8}}>
        {citations.map((citation, index) => (
          <li key={index} style={{ listStyle: "none" }}>
            <Badge tooltip={citation.content}>{index + 1}</Badge>
          </li>
        ))}
      </ul>
    </Stack>
  );
};

export default Citations;
