import { ErrorIcon } from "@assets/icons";
import { executeRequestInSync } from "@modules/app/requestExecutor";
import { setLoading } from "@modules/queryPanel/context/queryPanelSlice";
import { useQueryPanelDispatch } from "@modules/queryPanel/QueryPanelProvider";
import { Stack, Button } from "@uicore";
import { ReactNode, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

const PerspectiveErrorBoundary = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [error, setError] = useState<Error | undefined>();
  const dispatch = useQueryPanelDispatch();

  const handleClick = async () => {
    dispatch(setLoading(true));
    try {
      await executeRequestInSync("clearQueryHistory", { error });
      // Artificial delay for UX
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleOnError = (errorObject: Error) => {
    setError({
      message: errorObject.message,
      stack: errorObject.stack,
      name: errorObject.name,
    });
  };

  const fallbackRenderer = () => {
    return (
      <Stack
        direction="column"
        className="justify-content-center align-items-center h-100"
      >
        <ErrorIcon style={{ minHeight: 75 }} />
        <h2 style={{ color: "var(--stroke--orange)" }}>
          Something went wrong while rendering the query results.
        </h2>
        <p>To clear query history and re render the results</p>
        <Button color="primary" onClick={handleClick}>
          Click here
        </Button>
        <p>
          Please <a href="https://app.myaltimate.com/contactus">contact us</a>{" "}
          if the issue persists.
        </p>
      </Stack>
    );
  };

  return (
    <ErrorBoundary fallbackRender={fallbackRenderer} onError={handleOnError}>
      {children}
    </ErrorBoundary>
  );
};

export default PerspectiveErrorBoundary;
