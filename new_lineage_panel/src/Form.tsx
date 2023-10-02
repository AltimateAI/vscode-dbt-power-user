import { Input, InputProps } from "reactstrap";
import { isDarkMode } from "./App";

export function CustomInput(props: InputProps) {
  return (
    <Input
      style={{
        backgroundColor: isDarkMode ? "rgba(131, 144, 163, 0.2)" : "#ffffff",
        color: isDarkMode ? "#ffffff" : "#212529",
        borderColor: isDarkMode ? "rgba(131, 144, 163, 0.1)" : "#dee2e6",
      }}
      {...props}
    />
  );
}
