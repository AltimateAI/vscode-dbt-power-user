import { VIEWS_TYPE_COLOR, ViewsTypes } from "../utils";
import styles from "./styles.module.scss";
import { Button, Popover, PopoverBody } from "reactstrap";
import { FunctionComponent, useState } from "react";
import UpIcon from "../assets/icons/chevron-up.svg?react";
import DownIcon from "../assets/icons/chevron-down.svg?react";
import Tooltip from "./Tooltip";
import CodeIcon from "../assets/icons/code.svg?react";

export const ViewsTypeBadge: FunctionComponent<{
  viewsType: string;
}> = ({ viewsType }) => (
  <Tooltip tooltipLabel={viewsType}>
    <div
      style={{
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        "--views-color": VIEWS_TYPE_COLOR[viewsType as ViewsTypes],
      }}
      className={styles.views_type_badge}
    >
      {viewsType[0]}
    </div>
  </Tooltip>
);

const LineageLegend = () => {
  const [showLegend, setShowLegend] = useState(false);

  const toggleLegend = () => {
    setShowLegend(true);
    setTimeout(() => {
      setShowLegend(false);
    }, 3000);
  };
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
          {Object.keys(VIEWS_TYPE_COLOR).map((k) => (
            <div key={k} className="d-flex gap-sm mb-1 align-items-center">
              <ViewsTypeBadge viewsType={k} />
              <div>{k}</div>
            </div>
          ))}
          <div className="d-flex gap-sm mb-1 align-items-center">
            <div className={styles.column_code_icon}>
              <CodeIcon />
            </div>
            <div>Code</div>
          </div>
          <div className="d-flex gap-sm mb-1 align-items-center">
            <div className={styles.edge_select}>
              <div />
            </div>
            <div>Select</div>
          </div>
          <div className="d-flex gap-sm mb-1 align-items-center">
            <div className={styles.edge_non_select}>
              <div />
            </div>
            <div>Non select</div>
          </div>
        </PopoverBody>
      </Popover>
    </>
  );
};

export default LineageLegend;
