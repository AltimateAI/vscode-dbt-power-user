import { ShareIcon } from "@assets/icons";
import { executeRequestInSync } from "@modules/app/requestExecutor";
import useAppContext from "@modules/app/useAppContext";
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
import { NotebookItem } from "./types";
import { panelLogger } from "@modules/logger";

const NotebookPrivacySettingButton = ({
  notebook,
  refetchNotebook,
}: {
  notebook: NotebookItem;
  refetchNotebook: () => void;
}): JSX.Element | null => {
  const {
    state: { currentUser },
  } = useAppContext();
  const [privacy, setPrivacy] = useState(notebook.privacy);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const popoverRef = useRef<PopoverWithButtonRef | null>(null);

  const updateNotebookPrivacy = () => {
    setIsSubmitting(true);
    executeRequestInSync("openNewNotebook", {
      notebookId: notebook.id,
      privacy: privacy,
    })
      .then(() => {
        refetchNotebook();
        setIsSubmitting(false);
      })
      .catch((err) => panelLogger.info(err));
  };

  useEffect(() => {
    // Modify the setting when opening the popover to avoid one extra action from user
    setPrivacy(notebook.privacy === "private" ? "public" : "private");
  }, [notebook.privacy]);

  if (currentUser?.id !== notebook.created_by_user.id) {
    return null;
  }

  const shareText = notebook.privacy === "private" ? "Share" : "Unshare";

  return (
    <PopoverWithButton
      ref={popoverRef}
      title={
        <Stack className="justify-content-between">
          <span>{`${shareText} Notebook`}</span>
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
          title={`${shareText} this notebook`}
          style={{
            color:
              notebook.privacy === "public"
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
              onClick={(e) => {
                e.preventDefault();
                updateNotebookPrivacy();
              }}
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

export default NotebookPrivacySettingButton;
