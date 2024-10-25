import { CommentIcon } from "@assets/icons";
import { useRef } from "react";
import { Drawer, Stack, DrawerRef, Button } from "@uicore";
import { EntityType } from "@modules/dataPilot/components/docGen/types";
import { panelLogger } from "@modules/logger";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";

interface Props {
  name: string;
  type: EntityType;
}

export const DocumentationPropagationButton = ({
  name,
  type,
}: Props): JSX.Element | null => {
  const {
    state: { currentDocsData },
  } = useDocumentationContext();
  const drawerRef = useRef<DrawerRef | null>(null);

  const propagate = () => {
    panelLogger.log("thisisit", currentDocsData, name);
  };

  if (type !== EntityType.COLUMN) {
    return null;
  }

  return (
    <Drawer
      buttonProps={{ color: "primary", title: "Propagate documentation" }}
      buttonText={<CommentIcon />}
      title="Propagate documentation"
      ref={drawerRef}
    >
      <Stack direction="column">
        <Button color="primary" onClick={propagate}>
          Propagate documentation to 3 downstream models
        </Button>
      </Stack>
    </Drawer>
  );
};
