import {
  CoachForm,
  TaskLabels,
  TeammateActions,
  useTeamMateContext,
} from "@altimate/ui-components";
import useAppContext from "@modules/app/useAppContext";
import PreviewFeatureIcon from "@modules/previewFeature/PreviewFeatureIcon";
import { vscode } from "@modules/vscode";
import { Drawer, DrawerRef } from "@uicore";
import { useRef } from "react";

const ProjectHealthNewCheckButton = ({
  context,
  extra,
}: {
  context?: Record<string, unknown>;
  extra?: Record<string, unknown>;
}): JSX.Element | null => {
  const drawerRef = useRef<DrawerRef>(null);
  const { dispatch } = useTeamMateContext();
  const {
    state: {
      tenantInfo: { frontendUrl, teammatesEnabled },
    },
  } = useAppContext();

  const onOpen = () => {
    dispatch(TeammateActions.setShowCoachingForm(true));
  };

  if (!teammatesEnabled) return null;

  return (
    <Drawer
      buttonProps={{ outline: true }}
      buttonText={
        <>
          + Add new check <PreviewFeatureIcon />
        </>
      }
      onOpen={onOpen}
      ref={drawerRef}
      disableBackdropClick
    >
      <CoachForm
        taskLabel={TaskLabels.ProjectGovernor}
        context={context}
        onClose={() => {
          drawerRef.current?.close();
          if (frontendUrl)
            vscode.postMessage({
              command: "openURL",
              url: `${frontendUrl}/teammates/${TaskLabels.ProjectGovernor}`,
            });
        }}
        extra={extra}
      />
    </Drawer>
  );
};

export default ProjectHealthNewCheckButton;
