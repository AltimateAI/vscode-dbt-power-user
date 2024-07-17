import { executeRequestInSync } from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";
import { useCallback, useEffect, useState } from "react";
import { TreeviewNodeType, Treeview, IconButton } from "@uicore";
import { TreeItemCollapsibleState } from "vscode";
import { DeleteIcon, FolderIcon } from "@assets/icons";
import { NodeApi } from "react-arborist";

interface TreeItem {
  collapsibleState: TreeItemCollapsibleState;
  key: string;
  label: string;
  url: string;
}
const ParentModelsView = (): JSX.Element => {
  const [treeData, setTreeData] = useState<TreeviewNodeType[]>([]);

  const handleRenderParentModels = (data: TreeItem[]) => {
    const children = data.map((parent) => {
      return {
        id: parent.key,
        name: parent.label,
        icon: <FolderIcon />,
        actions: [
          <IconButton key={parent.label}>
            <DeleteIcon />
          </IconButton>,
        ],
      };
    });
    setTreeData([{ id: "parentModels", name: "Parent Models", children }]);
  };
  const onMesssage = useCallback(
    (event: MessageEvent<{ command: string; args: unknown }>) => {
      const { command } = event.data;
      switch (command) {
        default:
          break;
      }
    },
    [],
  );

  useEffect(() => {
    window.addEventListener("message", onMesssage);
    executeRequestInSync("getParentModels", { treeType: "parents" })
      .then((response) => {
        handleRenderParentModels(
          (response as { parentModels: TreeItem[] }).parentModels,
        );
      })
      .catch((err) =>
        panelLogger.error("error while fetching parent models", err),
      );
    return () => {
      window.removeEventListener("message", onMesssage);
    };
  }, []);

  const renderChildren = async (nodes: NodeApi<TreeviewNodeType>[]) => {
    if (!nodes.length || nodes[0].level === 0) {
      return;
    }
    const node = nodes[0];
    const response = await executeRequestInSync("getParentModels", {
      treeType: "parents",
      elementKey: nodes[0].id,
    });
    setTreeData((prev) => {
      const clone = [...prev];
      // @ts-expect-error valid
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      clone[0].children[node.rowIndex - 1].children = (
        response as { parentModels: TreeItem[] }
      ).parentModels.map((parent) => {
        return {
          id: parent.key,
          name: parent.label,
          icon: <FolderIcon />,
          actions: [
            <IconButton key={parent.label}>
              <DeleteIcon />
            </IconButton>,
          ],
        } as unknown as NodeApi<TreeviewNodeType>;
      });
      panelLogger.info(prev, clone);
      return clone;
    });
  };

  panelLogger.info("ParentModelsView", treeData);

  return (
    <div>
      <Treeview data={treeData} onSelect={renderChildren} />
    </div>
  );
};

export default ParentModelsView;
