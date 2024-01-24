import { Input, InputProps } from "reactstrap";

export function CustomInput(props: InputProps) {
  return <Input className="custom-input" {...props} />;
}

export function CustomMultilineInput(props: InputProps) {
  return (
    <Input
      className="custom-input"
      {...props}
      type="textarea"
      rows={4}
    />
  );
}
