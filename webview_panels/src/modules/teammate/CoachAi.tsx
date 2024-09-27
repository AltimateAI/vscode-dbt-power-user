import { ThinkingIcon } from "@assets/icons";
import { CoachForm, TeammateActions, useTeamMateContext } from "@lib";
import useAppContext from "@modules/app/useAppContext";
import { Drawer, DrawerRef } from "@uicore";
import { useRef } from "react";

const CoachAi = ({
  context,
}: {
  context?: Record<string, unknown>;
}): JSX.Element | null => {
  const drawerRef = useRef<DrawerRef>(null);
  const { dispatch } = useTeamMateContext();
  const {
    state: { teammatesEnabled },
  } = useAppContext();

  const onOpen = () => {
    dispatch(TeammateActions.setShowCoachingForm(true));
  };

  if (!teammatesEnabled) {
    return null;
  }

  return (
    <Drawer
      buttonProps={{ outline: true }}
      buttonText="Coach AI"
      icon={<ThinkingIcon style={{ height: 16, width: 16 }} />}
      title="Coach AI"
      onOpen={onOpen}
      ref={drawerRef}
    >
      <CoachForm taskLabel="DocGen" context={context} onClose={() => drawerRef.current?.close()}/>
    </Drawer>
  );
};

export default CoachAi;
