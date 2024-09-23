import { HelpIcon } from "@assets/icons";
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
      icon={<HelpIcon />}
      title="Coach AI"
      onOpen={onOpen}
    >
      <CoachForm />
    </Drawer>
  );
};

export default CoachAi;
