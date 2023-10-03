import { Input, InputProps } from "reactstrap";

export function CustomInput(props: InputProps) {
  return <Input className="custom-input" {...props} />;
}
