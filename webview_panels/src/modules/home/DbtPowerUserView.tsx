import { Stack } from "@uicore";
import ParentModelsView from "./ParentModelsView";
import HomeView from "./HomeView";
import "./dbtPowerUserView.module.scss";

const DbtPowerUserView = (): JSX.Element => {
  return (
    <Stack direction="column" className="gap-0">
      <HomeView />
      <ParentModelsView />
    </Stack>
  );
};

export default DbtPowerUserView;
