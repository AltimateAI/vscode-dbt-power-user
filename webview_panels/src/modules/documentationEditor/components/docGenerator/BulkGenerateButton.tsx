import { ShinesIcon } from "@assets/icons";
import {
  executeRequestInAsync,
  executeRequestInSync,
} from "@modules/app/requestExecutor";
import {
  updateBulkDocsPropRightPanel,
  updateColumnsInCurrentDocsData,
} from "@modules/documentationEditor/state/documentationSlice";
import { DBTDocumentationColumn } from "@modules/documentationEditor/state/types";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { panelLogger } from "@modules/logger";
import { Button, DropdownButton, List, PopoverWithButton } from "@uicore";
import { useRef, useState } from "react";
import classes from "../../styles.module.scss";
import {
  isStateDirty,
  mergeCurrentAndIncomingDocumentationColumns,
} from "@modules/documentationEditor/utils";
import DocGenSelectedColumns from "./DocGenSelectedColumns";
import { noop } from "antd/es/_util/warning";

enum SidePanelState {
  DOCUMENTATION_SELECTED = "documentationSelected",
}

const BulkGenerateButton = (): JSX.Element => {
  const [sidePanelState, setSidePanelState] = useState<
    SidePanelState | undefined
  >();
  const ref = useRef<HTMLDivElement | null>(null);
  const { state, dispatch } = useDocumentationContext();
  const { currentDocsData, userInstructions } = state;

  const resetSidepanelState = () => {
    setSidePanelState(undefined);
  };

  const options = {
    Documentation: [
      { label: "Generate all columns", value: "all" },
      { label: "Generate only missing columns", value: "missing" },
      { label: "Select columns", value: "selected" },
      { label: "Propagate docs to downstream models", value: "docs-prop" },
    ],
    Tests: [{ label: "Generate all", value: "all-tests" }],
  };

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
  const generateTestsForAllColumns = async () => {
    try {
      const { columns } = (await executeRequestInSync(
        "fetchMetadataFromDatabase",
        {},
      )) as { columns: DBTDocumentationColumn[] };

      executeRequestInAsync("generateTestsForColumns", {
        columns,
      });
    } catch (err) {
      panelLogger.error("Unable to generate tests for all columns");
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
    const startTime = Date.now();
    sendTelemetryEvent(value);

    try {
      switch (value) {
        case "selected":
          setSidePanelState(SidePanelState.DOCUMENTATION_SELECTED);
          return;
        case "all": {
          const columns = await generateForAll();
          if (columns) {
            sendTelemetryEvent(value, columns, startTime);
          }
          break;
        }
        case "all-tests": {
          await generateTestsForAllColumns();
          break;
        }
        case "missing": {
          const columns = await generateDocsForMissingColumns();
          if (columns) {
            sendTelemetryEvent(value, columns, startTime);
          }
          break;
        }
        case "docs-prop": {
          dispatch(updateBulkDocsPropRightPanel(true));
          break;
        }
        default:
          return;
      }
    } catch (err) {
      panelLogger.error("error generating for columns", value, err);
    }
  };

  const isDirty = isStateDirty(state);
  const color = isDirty ? "secondary" : "primary";

  return (
    <>
      <div ref={ref}>
        <PopoverWithButton
          width="auto"
          button={
            <DropdownButton
              onToggleClick={noop}
              onClick={noop}
              color={color}
              outline={isDirty}
            >
              <ShinesIcon /> Bulk generate
            </DropdownButton>
          }
          popoverProps={{
            placement: "bottom",
            hideArrow: true,
            className: classes.bulkGenPopover,
          }}
        >
          {({ styles, close }) => (
            <div className={classes.popover}>
              <div className={styles.popoverActions}>
                <List>
                  {Object.entries(options).map(([key, actions]) => (
                    <>
                      <li className={classes.sectionTitle}>{key}</li>
                      {actions.map((option) => (
                        <li key={option.label}>
                          <Button
                            color="secondary"
                            onClick={() => {
                              close();
                              void onOptionSelect(option.value);
                            }}
                          >
                            {option.label}
                          </Button>
                        </li>
                      ))}
                    </>
                  ))}
                </List>
              </div>
            </div>
          )}
        </PopoverWithButton>
      </div>
      {sidePanelState === SidePanelState.DOCUMENTATION_SELECTED ? (
        <DocGenSelectedColumns
          onClose={resetSidepanelState}
          generateForColumns={bulkGenerateDocs}
        />
      ) : null}
    </>
  );
};

export default BulkGenerateButton;
