import { FunctionComponent, ReactElement, useMemo } from "react";
import BooleanIcon from "../assets/icons/boolean.svg?react";
import TextIcon from "../assets/icons/text.svg?react";
import NumberIcon from "../assets/icons/number.svg?react";
import ObjectIcon from "../assets/icons/object.svg?react";
import DatetimeIcon from "../assets/icons/datetime.svg?react";
import GeospatialIcon from "../assets/icons/geospatial.svg?react";
import ModelIcon from "../assets/icons/model.svg?react";
import SeedIcon from "../assets/icons/seed.svg?react";
import SourceIcon from "../assets/icons/source.svg?react";
import ExposureIcon from "../assets/icons/exposure.svg?react";
import AnalysisIcon from "../assets/icons/analysis.svg?react";
import SnapshotIcon from "../assets/icons/snapshot.svg?react";
import MetricsIcon from "../assets/icons/metrics.svg?react";
import MacrosIcon from "../assets/icons/macros.svg?react";
import styles from "../styles.module.scss";
import { UncontrolledTooltip } from "reactstrap";

export const ColumnDatatype: FunctionComponent<{
  datatype: string;
  color?: string;
  size?: string;
}> = ({ datatype, color, size = "1rem" }) => {
  const [Icon, compColor] = useMemo(() => {
    switch (datatype.toLowerCase()) {
      case "integer":
      case "float":
      case "double precision":
      case "double":
      case "bigint":
        return [NumberIcon, "#FF754C"];
      case "bool":
      case "boolean":
        return [BooleanIcon, "#00A5DB"];
      case "text":
      case "character":
      case "character varying":
      case "varchar":
        return [TextIcon, "#3F8CFF"];
      case "geospatial":
        return [GeospatialIcon, "#01CD8C"];
      case "date":
      case "timestamp":
      case "timestamp with time zone":
        return [DatetimeIcon, "#247EFE"];
      default:
        return [ObjectIcon, "#6A24FE"];
    }
  }, [datatype]);

  return (
    <div
      style={{ color: color || compColor }}
      className="d-flex align-items-center"
    >
      <Icon width={size} height={size} />
    </div>
  );
};

export const NodeTypeIcon: FunctionComponent<{ nodeType: string }> = ({
  nodeType,
}) => (
  <div>
    {nodeType === "seed" && <SeedIcon />}
    {nodeType === "model" && <ModelIcon />}
    {nodeType === "source" && <SourceIcon />}
    {nodeType === "exposure" && <ExposureIcon />}
    {nodeType === "analysis" && <AnalysisIcon />}
    {nodeType === "snapshot" && <SnapshotIcon />}
    {nodeType === "metrics" && <MetricsIcon />}
    {nodeType === "macros" && <MacrosIcon />}
  </div>
);

export const TableNodePill: FunctionComponent<{
  id: string;
  icon: ReactElement;
  label: string;
  text: string;
}> = ({ id, icon, text, label }) => (
  <>
    <div className={styles.table_node_pill} id={id}>
      <div className={styles.icon}>{icon}</div>
      <div>{text}</div>
    </div>
    <UncontrolledTooltip target={id}>{label}</UncontrolledTooltip>
  </>
);

export const NODE_TYPE_STYLES = {
  seed: styles.seed,
  model: styles.model,
  source: styles.source,
  exposure: styles.exposure,
  snapshot: styles.snapshot,
  metrics: styles.metrics,
  macros: styles.macros,
  analysis: styles.analysis,
};

export const NODE_TYPE_SHORTHAND = {
  seed: "SED",
  model: "MDL",
  source: "SRC",
  exposure: "EXP",
  snapshot: "SNP",
  metrics: "MET",
  macros: "SEM",
  analysis: "ANY",
};
