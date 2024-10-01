import { executeRequestInSync } from "@modules/app/requestExecutor";
import {
  setLoading,
  setQueryHistoryDisabled,
} from "@modules/queryPanel/context/queryPanelSlice";
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
    await executeRequestInSync("disableQueryHistory", { error });
    dispatch(setLoading(true));
    dispatch(setQueryHistoryDisabled(true));
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
          <Button onClick={handleClick}>Click here</Button> to disable query
          history (and bookmarks) and re render the results
        </p>
        <p>
          Please <a href="https://app.myaltimate.com/contactus">contact us</a>{" "}
          if the issue persits.
        </p>
        <p>Tip: You can enable query history again in settings</p>
      </Stack>
    );
  };

  return (
    <ErrorBoundary fallbackRender={fallbackRenderer}>{children}</ErrorBoundary>
  );
};

export default PerspectiveErrorBoundary;
