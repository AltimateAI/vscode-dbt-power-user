import PerspectiveViewer from "@modules/queryPanel/components/perspective/PerspectiveViewer";
import type { QueryPanelStateProps } from "@modules/queryPanel/context/types";
import classes from "./renderer.module.scss";

interface Props {
  items: NonNullable<QueryPanelStateProps["queryResults"]>;
}
const AllItems = ({ items }: Props): JSX.Element => {
  return (
    <div className={classes.perspectiveWrapper}>
      <PerspectiveViewer
        columnNames={items.columnNames}
        columnTypes={items.columnTypes}
        data={items.data}
        styles={{ minHeight: 100, height: 400 }}
      />
    </div>
  );
};

export default AllItems;
