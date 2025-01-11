import { PlayIcon } from "@assets/icons";
import {
  FormGroup,
  Label,
  Col,
  Input,
  IconButton,
  PopoverWithButton,
  PopoverWithButtonRef,
} from "@uicore";
import classes from "../../querypanel.module.scss";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { panelLogger } from "@modules/logger";
import useQueryPanelState from "@modules/queryPanel/useQueryPanelState";
import { useQueryPanelDispatch } from "@modules/queryPanel/QueryPanelProvider";
import { setLimit as setQueryLimit } from "@modules/queryPanel/context/queryPanelSlice";
import { executeRequestInAsync } from "@modules/app/requestExecutor";

const RunQueryWithLimit = (): JSX.Element => {
  const [isChanged, setIsChanged] = useState(false);
  const [limit, setLimit] = useState(1);
  const popoverRef = useRef<PopoverWithButtonRef | null>(null);
  const { limit: currentDefaultLimit, queryInActiveEditor } =
    useQueryPanelState();
  const dispatch = useQueryPanelDispatch();

  // reset to default limit on editor change
  useEffect(() => {
    setLimit(currentDefaultLimit ?? 500);
  }, [currentDefaultLimit, queryInActiveEditor]);

  useEffect(() => {
    if (isChanged) {
      popoverRef.current?.open();
    }
  }, [isChanged]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLimit(Number(e.target.value));
    setIsChanged(true);
  };

  const executeQuery = () => {
    panelLogger.log(`Executing query with limit ${limit}`);
    setIsChanged(false);
    executeRequestInAsync("executeQueryFromActiveWindow", { limit });
  };

  const handleDefaultChange = () => {
    panelLogger.log(`Setting default limit to ${limit}`);
    dispatch(setQueryLimit(limit));
    executeRequestInAsync("updateConfig", { limit });
    setIsChanged(false);
  };

  return (
    <div className={classes.runQueryWithLimit}>
      <FormGroup row>
        <Label for="queryLimit" sm={4} className="p-0 pt-2">
          Limit
        </Label>
        <Col sm={4} className="p-0">
          <Input
            id="queryLimit"
            name="limit"
            type="number"
            onChange={handleChange}
            value={limit}
            style={{ width: 70, height: 30 }}
          />
        </Col>
        <Col sm={2} className="p-0">
          <IconButton
            title={`Execute query with limit: ${limit}`}
            onClick={executeQuery}
            color="primary"
          >
            <PlayIcon />
          </IconButton>
        </Col>
      </FormGroup>
      <PopoverWithButton
        onClose={() => setIsChanged(false)}
        ref={popoverRef}
        button={<></>}
        width={150}
        popoverProps={{
          placement: "bottom",
          hideArrow: true,
        }}
      >
        {({ close }) => (
          <div>
            <FormGroup switch>
              <Label>
                Set as default{" "}
                <Input
                  type="switch"
                  role="switch"
                  onClick={() => {
                    close();
                    handleDefaultChange();
                  }}
                />
              </Label>
            </FormGroup>
          </div>
        )}
      </PopoverWithButton>
    </div>
  );
};

export default RunQueryWithLimit;
