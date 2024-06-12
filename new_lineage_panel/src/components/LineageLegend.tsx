import { LENS_TYPE_COLOR } from "../utils";
import styles from "./styles.module.scss";
import { Button, Popover, PopoverBody } from "reactstrap";
import { FunctionComponent, useState } from "react";
import UpIcon from "../assets/icons/chevron-up.svg?react";
import DownIcon from "../assets/icons/chevron-down.svg?react";
import Tooltip from "./Tooltip";

export const LensTypeBadge: FunctionComponent<{
  lensType: string;
}> = ({ lensType }) => (
  <Tooltip tooltipLabel={lensType}>
    <div
      style={{
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        "--lens-color":
          LENS_TYPE_COLOR[lensType as keyof typeof LENS_TYPE_COLOR],
      }}
      className={styles.lens_type_badge}
    >
      {lensType[0]}
    </div>
  </Tooltip>
);

const LineageLegend = () => {
  const [showLegend, setShowLegend] = useState(false);

  const toggleLegend = () => setShowLegend(!showLegend);
  return (
    <>
      <Button
        id="lineageLegend"
        className={styles.lineage_legend}
        type="button"
        onClick={toggleLegend}
      >
        Legend
        {showLegend ? <DownIcon /> : <UpIcon />}
      </Button>
      <Popover
        flip
        target="lineageLegend"
        isOpen={showLegend}
        className={styles.column_legend}
        placement="top"
      >
        <PopoverBody>
          {Object.keys(LENS_TYPE_COLOR).map((k) => (
            <div key={k} className="d-flex gap-sm mb-1">
              <LensTypeBadge lensType={k} />
              <div>{k}</div>
            </div>
          ))}
        </PopoverBody>
      </Popover>
    </>
  );
};

export default LineageLegend;
