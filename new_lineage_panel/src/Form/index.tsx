import { FunctionComponent, PropsWithChildren } from "react";

interface InputProps {
  type?: string;
  size?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  rows?: number;
  className?: string;
  placeholder?: string;
}

export const Input: FunctionComponent<InputProps> = (props) => {
  return <input type={props.type} value={props.value} onChange={props.onChange} />;
};

interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  color?: string;
  size?: string;
}

export const Button: FunctionComponent<PropsWithChildren<ButtonProps>> = (
  props
) => {
  return <button {...props} />;
};
