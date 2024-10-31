import { CommentIcon } from "@assets/icons";
import { useRef, useState } from "react";
import { Drawer, Stack, DrawerRef, Button } from "@uicore";
import { EntityType } from "@modules/dataPilot/components/docGen/types";
import { panelLogger } from "@modules/logger";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { executeRequestInSync } from "@modules/app/requestExecutor";
import { ColumnLineage } from "@lib";

interface Props {
  name: string;
  type: EntityType;
}

export const DocumentationPropagationButton = ({
  name,
  type,
}: Props): JSX.Element | null => {
  const {
    state: { currentDocsData },
  } = useDocumentationContext();
  const drawerRef = useRef<DrawerRef | null>(null);
  const [allColumns, setAllColumns] = useState<[string, string][]>(
    currentDocsData ? [[currentDocsData.uniqueId, name]] : [],
  );
  const [currColumns, setCurrColumns] = useState<[string, string][]>(
    currentDocsData ? [[currentDocsData.uniqueId, name]] : [],
  );

  const propagate = async () => {
    panelLogger.log("thisisit", currentDocsData, name);
    const result = (await executeRequestInSync("getDownstreamColumns", {
      model: currentDocsData?.uniqueId,
      column: name,
    })) as { column_lineage: ColumnLineage[] };
    panelLogger.log("thisisitresult", result);
    const newColumns: [string, string][] = [];
    const oldColumns = currColumns.map((c) => c.join("/"));
    for (const item of result.column_lineage) {
      if (item.type === "indirect") continue;
      // if (item.viewsType !== "Unchanged") continue;
      if (oldColumns.includes(item.target.join("/"))) {
        newColumns.push(item.source);
      }
    }
    setCurrColumns(newColumns);
    setAllColumns((prev) => [...prev, ...newColumns]);
  };

  if (type !== EntityType.COLUMN) {
    return null;
  }

  return (
    <Drawer
      buttonProps={{ color: "primary", title: "Propagate documentation" }}
      buttonText={<CommentIcon />}
      title="Propagate documentation"
      ref={drawerRef}
    >
      <Stack direction="column" className="gap-md">
        {allColumns.map((item) => (
          <Stack
            direction="column"
            key={item[0] + "/" + item[1]}
            className="gap-0"
          >
            <div>{item[0]}</div>
            <div>{item[1]}</div>
          </Stack>
        ))}
        <Button color="primary" onClick={propagate}>
          Propagate documentation to 3 downstream models
        </Button>
      </Stack>
    </Drawer>
  );
};
