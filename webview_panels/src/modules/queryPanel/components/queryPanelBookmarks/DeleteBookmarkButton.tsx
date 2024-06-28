import { DeleteIcon } from "@assets/icons";
import {
  executeRequestInAsync,
  executeRequestInSync,
} from "@modules/app/requestExecutor";
import { setRefreshQueryBookmarksTimestamp } from "@modules/queryPanel/context/queryPanelSlice";
import { QueryBookmark } from "@modules/queryPanel/context/types";
import { useQueryPanelDispatch } from "@modules/queryPanel/QueryPanelProvider";
import { LoadingButton, Tooltip } from "@uicore";
import { useState } from "react";

const DeleteBookmarkButton = ({
  bookmark,
}: {
  bookmark: QueryBookmark;
}): JSX.Element => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryPanelDispatch = useQueryPanelDispatch();

  const deleteBookmark = async () => {
    setIsSubmitting(true);
    const confirmResponse = await executeRequestInSync("showWarningMessage", {
      infoMessage: "Do you want to delete this bookmark?",
      items: ["Yes", "No"],
    });
    if (confirmResponse === "No") {
      setIsSubmitting(false);
      return;
    }
    try {
      await executeRequestInSync("fetch", {
        endpoint: `query/bookmark/${bookmark.id}`,
        fetchArgs: {
          method: "DELETE",
        },
      });
      executeRequestInAsync("sendTelemetryEvent", {
        eventName: `query-bookmark-deleted`,
        properties: {
          name: bookmark.name,
          id: bookmark.id,
        },
      });
      executeRequestInAsync("showInformationMessage", {
        infoMessage: "Successfully deleted bookmark!",
      });
      queryPanelDispatch(setRefreshQueryBookmarksTimestamp(Date.now()));
    } catch (error) {
      executeRequestInAsync("showErrorMessage", {
        infoMessage: (error as Error).message,
      });
    }
    setIsSubmitting(false);
  };

  return (
    <Tooltip title="Delete this bookmark">
      <LoadingButton
        onClick={deleteBookmark}
        loading={isSubmitting}
        className="bg-transparent"
      >
        <DeleteIcon />
      </LoadingButton>
    </Tooltip>
  );
};

export default DeleteBookmarkButton;
