import { ThinkingIcon } from "@assets/icons";
import { CoachForm, TeammateActions, useTeamMateContext } from "@lib";
import { Drawer } from "@uicore";

const CoachAi = () => {
  const { dispatch } = useTeamMateContext();

  const onOpen = () => {
    dispatch(TeammateActions.setShowCoachingForm(true));
  };
  return (
    <Drawer
      buttonProps={{ outline: true }}
      buttonText="Coach AI"
      icon={<ThinkingIcon style={{height: 16, width: 16}}/>}
      title="Coach AI"
      onOpen={onOpen}
    >
      <CoachForm taskLabel="DocGen"/>
    </Drawer>
  );
};

export default CoachAi;
