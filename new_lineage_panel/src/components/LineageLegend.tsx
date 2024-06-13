import { LENS_TYPE_COLOR } from "../utils";
import styles from "../styles.module.scss";
import { Button, Popover, PopoverBody } from "reactstrap";
import { useState } from "react";
import UpIcon from "../assets/icons/chevron-up.svg?react";
import DownIcon from "../assets/icons/chevron-down.svg?react";

const LineageLegend = () => {
  const [showLegend, setShowLegend] = useState(false);

  const toggleLegend = () => setShowLegend(!showLegend);
  return (
    <>
      <Button id="lineageLegend" className={styles.lineage_legend} type="button" onClick={toggleLegend}>
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
          {Object.entries(LENS_TYPE_COLOR).map(([k, v]) => (
            <div key={k}>
              <div className={styles.dot} style={{ backgroundColor: v }} >{k[0]}</div> {k}
            </div>
          ))}
        </PopoverBody>
      </Popover>
    </>
  );
};

export default LineageLegend;
