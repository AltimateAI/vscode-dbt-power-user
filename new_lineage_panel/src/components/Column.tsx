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

import CteDarkIcon from "../assets/icons/dbt_node_cte_dark.svg?react";
import ModelDarkIcon from "../assets/icons/dbt_node_model_dark.svg?react";
import SeedDarkIcon from "../assets/icons/dbt_node_seed_dark.svg?react";
import SourceDarkIcon from "../assets/icons/dbt_node_source_dark.svg?react";
import ExposureDarkIcon from "../assets/icons/dbt_node_exposure_dark.svg?react";
// import AnalysisDarkIcon from "../assets/icons/dbt_node_analysis_dark.svg?react";
import SnapshotDarkIcon from "../assets/icons/dbt_node_snapshot_dark.svg?react";
import MetricsDarkIcon from "../assets/icons/dbt_node_metrics_dark.svg?react";

import CteLightIcon from "../assets/icons/dbt_node_cte_light.svg?react";
import ModelLightIcon from "../assets/icons/dbt_node_model_light.svg?react";
import SeedLightIcon from "../assets/icons/dbt_node_seed_light.svg?react";
import SourceLightIcon from "../assets/icons/dbt_node_source_light.svg?react";
import ExposureLightIcon from "../assets/icons/dbt_node_exposure_light.svg?react";
// import AnalysisLightIcon from "../assets/icons/dbt_node_analysis_light.svg?react";
import SnapshotLightIcon from "../assets/icons/dbt_node_snapshot_light.svg?react";
import MetricsLightIcon from "../assets/icons/dbt_node_metrics_light.svg?react";

import styles from "../styles.module.scss";
import { UncontrolledTooltip } from "reactstrap";
import { getDarkMode } from "../Lineage";

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

const NodeTypeDarkIcon: FunctionComponent<{ nodeType: string }> = ({
  nodeType,
}) => (
  <div>
    {nodeType === "seed" && <SeedDarkIcon />}
    {nodeType === "model" && <ModelDarkIcon />}
    {nodeType === "cte" && <CteDarkIcon />}
    {nodeType === "source" && <SourceDarkIcon />}
    {nodeType === "exposure" && <ExposureDarkIcon />}
    {nodeType === "analysis" && <AnalysisIcon />}
    {nodeType === "snapshot" && <SnapshotDarkIcon />}
    {nodeType === "semantic_model" && <MetricsDarkIcon />}
    {nodeType === "macros" && <MacrosIcon />}
    {nodeType === "unknown" && <ModelDarkIcon />}
  </div>
);

const NodeTypeLightIcon: FunctionComponent<{ nodeType: string }> = ({
  nodeType,
}) => (
  <div>
    {nodeType === "seed" && <SeedLightIcon />}
    {nodeType === "model" && <ModelLightIcon />}
    {nodeType === "cte" && <CteLightIcon />}
    {nodeType === "source" && <SourceLightIcon />}
    {nodeType === "exposure" && <ExposureLightIcon />}
    {nodeType === "analysis" && <AnalysisIcon />}
    {nodeType === "snapshot" && <SnapshotLightIcon />}
    {nodeType === "semantic_model" && <MetricsLightIcon />}
    {nodeType === "macros" && <MacrosIcon />}
    {nodeType === "unknown" && <ModelLightIcon />}
  </div>
);

export const NodeTypeIcon: FunctionComponent<{ nodeType: string }> = ({
  nodeType,
}) => (
  <div>
    {nodeType === "seed" && <SeedIcon />}
    {nodeType === "model" && <ModelIcon />}
    {nodeType === "cte" && <ModelIcon />}
    {nodeType === "source" && <SourceIcon />}
    {nodeType === "exposure" && <ExposureIcon />}
    {nodeType === "analysis" && <AnalysisIcon />}
    {nodeType === "snapshot" && <SnapshotIcon />}
    {nodeType === "semantic_model" && <MetricsIcon />}
    {nodeType === "macros" && <MacrosIcon />}
    {nodeType === "unknown" && <ModelIcon />}
  </div>
);

export const NodeTypeIconForSQL: FunctionComponent<{
  nodeType: string;
}> = ({ nodeType }) => {
  const isDarkMode = getDarkMode();
  return isDarkMode ? (
    <NodeTypeDarkIcon nodeType={nodeType} />
  ) : (
    <NodeTypeLightIcon nodeType={nodeType} />
  );
};

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
  semantic_model: styles.metrics,
  macros: styles.macros,
  analysis: styles.analysis,
  cte: styles.model,
  unknown: styles.exposure,
};

export const NODE_TYPE_SHORTHAND = {
  seed: "SED",
  model: "MDL",
  source: "SRC",
  exposure: "EXP",
  snapshot: "SNP",
  semantic_model: "MET",
  macros: "SEM",
  analysis: "ANY",
  cte: "CTE",
  unknown: "UNK",
};
