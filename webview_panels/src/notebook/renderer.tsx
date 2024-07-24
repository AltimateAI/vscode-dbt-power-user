import PerspectiveViewer from "../modules/queryPanel/components/perspective/PerspectiveViewer";
import type { QueryPanelStateProps } from "../modules/queryPanel/context/types";

interface Props {
    items: NonNullable<QueryPanelStateProps["queryResults"]>;
}
const AllItems = ({ items }: Props): JSX.Element => {
  return (
    <div>
      <PerspectiveViewer
        columnNames={items.columnNames}
        columnTypes={items.columnTypes}
        data={items.data}
      />
    </div>
  );
};

export default AllItems;