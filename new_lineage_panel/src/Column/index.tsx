import { FunctionComponent, useMemo } from "react";
import BooleanIcon from "../assets/icons/boolean.svg?react";
import TextIcon from "../assets/icons/text.svg?react";
import NumberIcon from "../assets/icons/number.svg?react";
import ObjectIcon from "../assets/icons/object.svg?react";
import DatetimeIcon from "../assets/icons/datetime.svg?react";
import GeospatialIcon from "../assets/icons/geospatial.svg?react";

const ColumnDatatype: FunctionComponent<{
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

export { ColumnDatatype };
