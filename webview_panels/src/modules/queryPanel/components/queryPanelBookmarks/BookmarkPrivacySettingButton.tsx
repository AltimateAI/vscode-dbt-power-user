import { ShareIcon } from "@assets/icons";
import {
  executeRequestInAsync,
  executeRequestInSync,
} from "@modules/app/requestExecutor";
import useAppContext from "@modules/app/useAppContext";
import { updateBookmark } from "@modules/queryPanel/context/queryPanelSlice";
import { QueryBookmark } from "@modules/queryPanel/context/types";
import { useQueryPanelDispatch } from "@modules/queryPanel/QueryPanelProvider";
import {
  Button,
  FormGroup,
  IconButton,
  Input,
  Label,
  LoadingButton,
  PopoverWithButton,
  PopoverWithButtonRef,
} from "@uicore";
import { useEffect, useRef, useState } from "react";

const BookmarkPrivacySettingButton = ({
  bookmark,
}: {
  bookmark: QueryBookmark;
}): JSX.Element | null => {
  const {
    state: { currentUser },
  } = useAppContext();
  const [privacy, setPrivacy] = useState(bookmark.privacy);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const popoverRef = useRef<PopoverWithButtonRef | null>(null);
  const queryPanelDispatch = useQueryPanelDispatch();

  useEffect(() => {
    setPrivacy(bookmark.privacy);
  }, [bookmark.privacy]);

  const saveSettings = async () => {
    setIsSubmitting(true);
    try {
      const endpoint = `query/bookmark/privacy/${bookmark.id}?privacy=${encodeURIComponent(privacy)}`;
      await executeRequestInSync("fetch", {
        endpoint,
        fetchArgs: {
          method: "PUT",
        },
      });
      executeRequestInAsync("showInformationMessage", {
        infoMessage: "Successfully saved bookmark!",
      });
      popoverRef.current?.close();
      handleUpdate();
    } catch (error) {
      executeRequestInAsync("showErrorMessage", {
        infoMessage: (error as Error).message,
      });
    }
    setIsSubmitting(false);
  };

  const handleUpdate = () => {
    queryPanelDispatch(
      updateBookmark({
        ...bookmark,
        privacy,
      }),
    );
  };

  if (currentUser?.id !== bookmark.created_by_user.id) {
    return null;
  }

  return (
    <PopoverWithButton
      ref={popoverRef}
      title="Share bookmark"
      button={
        <IconButton title="Share this bookmark">
          <ShareIcon />
        </IconButton>
      }
      popoverProps={{
        placement: "bottom",
        hideArrow: true,
      }}
    >
      {({ styles, close }) => (
        <div>
          <FormGroup switch>
            <Input
              onChange={(e) =>
                setPrivacy(e.target.checked ? "public" : "private")
              }
              checked={privacy === "public"}
              type="switch"
              role="switch"
            />
            <Label check>Public (shared only within your organization)</Label>
          </FormGroup>
          <div className={styles.popoverActions}>
            <LoadingButton
              color="primary"
              loading={isSubmitting}
              onClick={saveSettings}
            >
              Save
            </LoadingButton>
            <Button outline onClick={close}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </PopoverWithButton>
  );
};

export default BookmarkPrivacySettingButton;
