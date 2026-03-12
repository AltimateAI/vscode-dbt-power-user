import { ButtonHTMLAttributes } from "react";
import { Button, Spinner } from "reactstrap";
import classes from "./loadingButton.module.scss";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
}

const LoadingButton = ({ loading, ...rest }: Props): JSX.Element => {
  return (
    <Button
      {...rest}
      disabled={loading || rest.disabled}
      className={`${rest.className ?? ""} ${classes.loadingBtn}`}
    >
      {loading ? <Spinner /> : rest.children}
    </Button>
  );
};

export default LoadingButton;
