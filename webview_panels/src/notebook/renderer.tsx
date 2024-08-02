import PerspectiveViewer from "@modules/queryPanel/components/perspective/PerspectiveViewer";
import type { QueryPanelStateProps } from "@modules/queryPanel/context/types";
import { useMemo } from "react";

interface Props {
  items: NonNullable<QueryPanelStateProps["queryResults"]>;
}
const AllItems = ({ items }: Props): JSX.Element => {
  const height = useMemo(() => {
    // Setting this height explicitly, because the perspective viewer does not get height 100% in case of notebook output
    if (Array.isArray(items.data) && items.data.length > 0) {
      return Math.max((items.data.length + 1) * 24 + 80, 150);
    }

    return undefined;
  }, [items.data]);
  return (
    <div>
      <PerspectiveViewer
        columnNames={items.columnNames}
        columnTypes={items.columnTypes}
        data={items.data}
        styles={{ height }}
      />
    </div>
  );
};

export default AllItems;
