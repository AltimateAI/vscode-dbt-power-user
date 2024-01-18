import { ShinesIcon } from "@assets/icons";
import { executeRequestInSync } from "@modules/app/requestExecutor";
import { updateColumnsInCurrentDocsData } from "@modules/documentationEditor/state/documentationSlice";
import { DBTDocumentationColumn } from "@modules/documentationEditor/state/types";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { panelLogger } from "@modules/logger";
import { Button, DropdownButton, List, Popover, PopoverBody } from "@uicore";
import { useRef, useState } from "react";
import classes from "../../styles.module.scss";

const BulkGenerateButton = () => {
  const [openPopover, setOpenPopover] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const {
    state: { currentDocsData, userInstructions },
    dispatch,
  } = useDocumentationContext();

  const onToggleClick = () => {
    setOpenPopover((prev) => !prev);
  };
  const options = [
    { label: "Generate all", value: "all" },
    { label: "Generate only missing columns", value: "missing" },
  ];

  const chunk = (a: string[], n: number) =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    [...Array(Math.ceil(a.length / n))].map((_, i) =>
      a.slice(n * i, n + n * i),
    );

  const generateForAll = async () => {
    if (!currentDocsData) {
      return;
    }
    const chunks = chunk(
      currentDocsData.columns.map((c) => c.name),
      2,
    );
    const result = await Promise.all(
      chunks.map((columns) =>
        executeRequestInSync("generateDocsForColumn", {
          description: "",
          user_instructions: userInstructions,
          columnNames: columns,
          columns: currentDocsData?.columns,
        }),
      ),
    );

    // convert 2 dim array to 1d with columns
    const allColumnsData = (
      result as { columns: Partial<DBTDocumentationColumn>[] }[]
    )
      .map((d) => d.columns)
      .flat();

    dispatch(updateColumnsInCurrentDocsData({ columns: allColumnsData }));
  };
  const onOptionSelect = (value: string) => {
    if (value === "all") {
      generateForAll().catch((err) =>
        panelLogger.error("error generating for all columns", err),
      );
    }
  };

  return (
    <div ref={ref}>
      <DropdownButton onToggleClick={onToggleClick}>
        <ShinesIcon /> Bulk generate
      </DropdownButton>
      <Popover isOpen={openPopover} target={ref} placement="bottom" hideArrow>
        <PopoverBody className={classes.popoverBody}>
          <List>
            {options.map((option) => (
              <li key={option.label}>
                <Button
                  color="link"
                  onClick={() => onOptionSelect(option.value)}
                >
                  {option.label}
                </Button>
              </li>
            ))}
          </List>
        </PopoverBody>
      </Popover>
    </div>
  );
};

export default BulkGenerateButton;
