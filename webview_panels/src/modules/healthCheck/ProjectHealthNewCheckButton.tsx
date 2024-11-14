import {
  CoachForm,
  ProjectGovernorCheckConfirmationResponse,
  TaskLabels,
  TeammateActions,
  useTeamMateContext,
} from "@lib";
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

  const onOpen = () => {
    dispatch(TeammateActions.setShowCoachingForm(true));
  };

  return (
    <Drawer
      buttonProps={{ outline: true }}
      buttonText="+ Add new check"
      onOpen={onOpen}
      ref={drawerRef}
    >
      <CoachForm
        taskLabel={TaskLabels.ProjectGovernor}
        context={context}
        onClose={(data?: ProjectGovernorCheckConfirmationResponse) => {
          drawerRef.current?.close();
          if (data?.frontend_url)
            vscode.postMessage({
              command: "openURL",
              url: `${data.frontend_url}/teammates/${TaskLabels.ProjectGovernor}`,
            });
        }}
        extra={extra}
      />
    </Drawer>
  );
};

export default ProjectHealthNewCheckButton;
