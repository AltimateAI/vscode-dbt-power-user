import { ShinesIcon } from "@assets/icons";
import {
  executeRequestInAsync,
  executeRequestInSync,
} from "@modules/app/requestExecutor";
import { updateColumnsInCurrentDocsData } from "@modules/documentationEditor/state/documentationSlice";
import { DBTDocumentationColumn } from "@modules/documentationEditor/state/types";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { panelLogger } from "@modules/logger";
import { Button, DropdownButton, List, Popover, PopoverBody } from "@uicore";
import { useRef, useState } from "react";
import classes from "../../styles.module.scss";
import { mergeCurrentAndIncomingDocumentationColumns } from "@modules/documentationEditor/utils";

const BulkGenerateButton = (): JSX.Element => {
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

  const bulkGenerateDocs = async (
    columns: DBTDocumentationColumn[],
    isAll: boolean,
  ) => {
    const result = (await executeRequestInSync("generateDocsForColumn", {
      description: "",
      user_instructions: userInstructions,
      columnNames: columns.map((c) => c.name),
      columns: currentDocsData?.columns,
      isAll,
      isBulkGen: true,
    })) as { columns: Partial<DBTDocumentationColumn>[] };

    dispatch(
      updateColumnsInCurrentDocsData({
        columns: result.columns,
        isNewGeneration: true,
      }),
    );

    return columns;
  };
  const generateDocsForMissingColumns = async () => {
    try {
      const { columns: columnsFromDB } = (await executeRequestInSync(
        "fetchMetadataFromDatabase",
        {},
      )) as { columns: DBTDocumentationColumn[] };

      const mergedColumns = mergeCurrentAndIncomingDocumentationColumns(
        currentDocsData?.columns,
        columnsFromDB,
      );

      const columnsWithoutDescription = mergedColumns.filter(
        (column) => !column.description,
      );
      return await bulkGenerateDocs(columnsWithoutDescription, false);
    } catch (err) {
      panelLogger.error("Unable to generate docs for missing columns");
    }
  };
  const generateForAll = async () => {
    try {
      const { columns } = (await executeRequestInSync(
        "fetchMetadataFromDatabase",
        {},
      )) as { columns: DBTDocumentationColumn[] };

      return await bulkGenerateDocs(columns, true);
    } catch (err) {
      panelLogger.error("Unable to generate docs for all columns");
    }
  };

  const sendTelemetryEvent = (
    type: string,
    columns?: DBTDocumentationColumn[],
    startTime?: number,
  ) => {
    const timeTaken = startTime ? Date.now() - startTime : undefined;
    executeRequestInAsync("sendTelemetryEvent", {
      eventName: `generate-${type}-columns`,
      properties: {
        model: currentDocsData?.name,
        columns: columns?.map((c) => c.name),
      },
      measurements: { timeTaken },
    });
  };

  const onOptionSelect = async (value: string) => {
    setOpenPopover(false);
    const startTime = Date.now();
    sendTelemetryEvent(value);

    if (value === "all") {
      try {
        const columns = await generateForAll();
        if (columns) {
          sendTelemetryEvent(value, columns, startTime);
        }
      } catch (err) {
        panelLogger.error("error generating for all columns", err);
      }
      return;
    }

    if (value === "missing") {
      try {
        const columns = await generateDocsForMissingColumns();
        if (columns) {
          sendTelemetryEvent(value, columns, startTime);
        }
      } catch (err) {
        panelLogger.error("error generating for missing columns", err);
      }
      return;
    }
  };

  return (
    <div ref={ref}>
      <DropdownButton onToggleClick={onToggleClick} onClick={onToggleClick}>
        <ShinesIcon /> Bulk generate
      </DropdownButton>
      <Popover
        isOpen={openPopover}
        target={ref}
        placement="bottom"
        hideArrow
        className={classes.popover}
      >
        <PopoverBody>
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
