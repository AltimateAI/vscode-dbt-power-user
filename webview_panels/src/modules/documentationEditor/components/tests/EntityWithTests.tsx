import { AddOutlineIcon } from "@assets/icons";
import { EntityType } from "@modules/dataPilot/components/docGen/types";
import { DBTModelTest } from "@modules/documentationEditor/state/types";
import RightSidePanel from "@modules/panel/RightSidePanel";
import { Tag, IconButton, Stack } from "@uicore";
import { useState } from "react";

interface Props {
  title: string;
  tests?: DBTModelTest[];
  type: EntityType;
}
const EntityWithTests = ({ title, tests, type }: Props) => {
  const [showSettingsPanel, setShowSettingsPanel] = useState(false);

  return (
    <>
      {showSettingsPanel ? (
        <RightSidePanel
          title="Add new test"
          onClose={() => setShowSettingsPanel(false)}
        >
          <Stack>
            {type === EntityType.COLUMN ? "Column" : "Model"}: {title}
          </Stack>
        </RightSidePanel>
      ) : null}
      <div>
        <h5>
          {title}
          <IconButton onClick={() => setShowSettingsPanel(true)}>
            <AddOutlineIcon />
          </IconButton>
        </h5>
        <Stack>
          <p>Tests:</p>
          {tests?.map((test) => (
            <Tag color="primary" key={test.key}>
              {test.key}
            </Tag>
          ))}
        </Stack>
      </div>{" "}
    </>
  );
};

export default EntityWithTests;
