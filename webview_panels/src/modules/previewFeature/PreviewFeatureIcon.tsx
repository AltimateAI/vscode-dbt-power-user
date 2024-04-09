import { PreviewIcon } from "@assets/icons";
import { Tooltip } from "@uicore";
import classes from "./tooltip.module.scss";

const PreviewFeatureIcon = (): JSX.Element => {
  return (
    <Tooltip title="Preview feature" className={classes.tooltip}>
      <PreviewIcon />
    </Tooltip>
  );
};

export default PreviewFeatureIcon;
