import { executeRequestInSync } from "@modules/app/requestExecutor";
import { setLoading } from "@modules/queryPanel/context/queryPanelSlice";
import { useQueryPanelDispatch } from "@modules/queryPanel/QueryPanelProvider";
import { Stack, Button, Alert } from "@uicore";
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
    await executeRequestInSync("clearQueryHistory", { error });
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 1000);
  };

  const fallbackRenderer = ({ error: errorObject }: { error: Error }) => {
    setError({
      message: errorObject.message,
      stack: errorObject.stack,
      name: errorObject.name,
    });

    return (
      <Stack
        direction="column"
        className="justify-content-center align-items-center h-100"
      >
        <Alert color="warning">
          Something went wrong while rendering the query results.
        </Alert>
        <p>
          <Button onClick={handleClick}>Click here</Button> to clear query
          history and re render the results.
        </p>
        <p>
          Please <a href="https://app.myaltimate.com/contactus">contact us</a>{" "}
          if the issue persits.
        </p>
      </Stack>
    );
  };

  return (
    <ErrorBoundary fallbackRender={fallbackRenderer}>{children}</ErrorBoundary>
  );
};

export default PerspectiveErrorBoundary;
