import { CoachAIIcon } from "@assets/icons";
import { CoachForm, TeammateActions, useTeamMateContext } from "@lib";
import useAppContext from "@modules/app/useAppContext";
import { Drawer, DrawerRef } from "@uicore";
import { useRef } from "react";
import classes from "./coachAi.module.scss";

const CoachAi = ({
  context,
  extra,
}: {
  context?: Record<string, unknown>;
  extra?: Record<string, unknown>;
}): JSX.Element | null => {
  const drawerRef = useRef<DrawerRef>(null);
  const { dispatch } = useTeamMateContext();
  const {
    state: { tenantInfo },
  } = useAppContext();

  const onOpen = () => {
    dispatch(TeammateActions.setShowCoachingForm(true));
  };

  if (!tenantInfo.teammatesEnabled) {
    return null;
  }

  return (
    <Drawer
      buttonProps={{ outline: true }}
      buttonText=" "
      icon={<CoachAIIcon style={{ height: 16, width: 16 }} />}
      title={
        <>
          <CoachAIIcon className={classes.coachAiIcon} /> Coach AI
        </>
      }
      onOpen={onOpen}
      ref={drawerRef}
    >
      <CoachForm
        taskLabel="DocGen"
        context={context}
        onClose={() => drawerRef.current?.close()}
        extra={extra}
      />
    </Drawer>
  );
};

export default CoachAi;
