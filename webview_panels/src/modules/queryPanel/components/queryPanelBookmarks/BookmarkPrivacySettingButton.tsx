import { ShareIcon } from "@assets/icons";
import {
  executeRequestInAsync,
  executeRequestInSync,
} from "@modules/app/requestExecutor";
import useAppContext from "@modules/app/useAppContext";
import { QueryBookmark } from "@modules/queryPanel/context/types";
import useQueryPanelCommonActions from "@modules/queryPanel/useQueryPanelCommonActions";
import {
  Button,
  FormGroup,
  IconButton,
  Input,
  LoadingButton,
  PopoverWithButton,
  PopoverWithButtonRef,
  Stack,
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
  const { refetchBookmarks } = useQueryPanelCommonActions();

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
      executeRequestInAsync("sendTelemetryEvent", {
        eventName:
          privacy === "public"
            ? `query-bookmark-shared`
            : `query-bookmark-unshared`,
        properties: {
          name: bookmark.name,
          id: bookmark.id,
        },
      });
      executeRequestInAsync("showInformationMessage", {
        infoMessage: "Successfully saved bookmark!",
      });
      popoverRef.current?.close();
      refetchBookmarks();
    } catch (error) {
      executeRequestInAsync("showErrorMessage", {
        infoMessage: (error as Error).message,
      });
    }
    setIsSubmitting(false);
  };

  if (currentUser?.id !== bookmark.created_by_user.id) {
    return null;
  }

  const shareText = bookmark.privacy === "private" ? "Share" : "Unshare";

  return (
    <PopoverWithButton
      ref={popoverRef}
      title={
        <Stack className="justify-content-between">
          <span>{`${shareText} Bookmark`}</span>
          <FormGroup switch>
            <Input
              onChange={(e) =>
                setPrivacy(e.target.checked ? "public" : "private")
              }
              checked={privacy === "public"}
              type="switch"
              role="switch"
            />
          </FormGroup>
        </Stack>
      }
      button={
        <IconButton
          title={`${shareText} this bookmark`}
          style={{
            color:
              bookmark.privacy === "public"
                ? "var(--primary-color)"
                : "inherit",
          }}
        >
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
          <div className="p3">Shared with all users in SaaS instance</div>
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
