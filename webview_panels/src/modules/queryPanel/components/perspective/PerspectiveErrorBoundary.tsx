import { executeRequestInSync } from "@modules/app/requestExecutor";
import {
  setLoading,
  setQueryHistoryDisabled,
} from "@modules/queryPanel/context/queryPanelSlice";
import { useQueryPanelDispatch } from "@modules/queryPanel/QueryPanelProvider";
import { Stack, Button, Alert } from "@uicore";
import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";

const PerspectiveErrorBoundary = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const dispatch = useQueryPanelDispatch();
  const handleClick = async () => {
    await executeRequestInSync("disableQueryHistory", {});
    dispatch(setLoading(true));
    dispatch(setQueryHistoryDisabled(true));
    setTimeout(() => {
    dispatch(setLoading(false));
}, 1000);
  };

  return (
    <ErrorBoundary
      fallback={
        <Stack direction="column" className="justify-content-center align-items-center h-100">
          <Alert color="warning">Something went wrong while rendering the query results.</Alert>
          <p>
            <Button onClick={handleClick}>Click here</Button> to disable query
            history (and bookmarks) and re render the results
          </p>
          <p>Please <a href="https://app.myaltimate.com/contactus">contact us</a> if the issue persits.</p>
        </Stack>
      }
    >
      {children}
    </ErrorBoundary>
  );
};

export default PerspectiveErrorBoundary;
