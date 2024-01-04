import DocGeneratorInput from "./DocGeneratorInput";
import { Column } from "./types";

interface Props {
  column: Column;
}
const DocGeneratorColumn = ({ column }: Props): JSX.Element => {
  return (
    <div>
      <h4>{column.name}</h4>
      <DocGeneratorInput />
    </div>
  );
};

export default DocGeneratorColumn;
