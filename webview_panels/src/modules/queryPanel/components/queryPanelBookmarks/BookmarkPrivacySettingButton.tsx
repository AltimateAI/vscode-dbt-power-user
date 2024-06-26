import { ShareIcon } from "@assets/icons";
import {
  executeRequestInAsync,
  executeRequestInSync,
} from "@modules/app/requestExecutor";
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
  Popover,
  PopoverBody,
} from "@uicore";
import { ChangeEvent, useRef, useState } from "react";

const BookmarkPrivacySettingButton = ({
  bookmark,
}: {
  bookmark: QueryBookmark;
}): JSX.Element => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const queryPanelDispatch = useQueryPanelDispatch();

  const onClose = () => {
    setShowForm(false);
  };

  const onOpen = () => {
    setShowForm(true);
  };

  const saveSettings = async () => {
    setIsSubmitting(true);
    try {
      await executeRequestInSync("fetch", {
        endpoint: `query/bookmark/privacy/${bookmark.id}`,
        method: "PUT",
        body: JSON.stringify({ privacy: bookmark.privacy }),
      });
      executeRequestInAsync("showInformationMessage", {
        infoMessage: "Successfully saved bookmark!",
      });
      setShowForm(false);
    } catch (error) {
      executeRequestInAsync("showErrorMessage", {
        infoMessage: (error as Error).message,
      });
    }
    setIsSubmitting(false);
  };

  const handleUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    queryPanelDispatch(
      updateBookmark({
        ...bookmark,
        privacy: e.target.checked ? "public" : "private",
      }),
    );
  };
  return (
    <>
      <span ref={buttonRef}>
        <IconButton title="Share this bookmark" onClick={onOpen}>
          <ShareIcon />
        </IconButton>
      </span>
      <Popover
        isOpen={showForm}
        target={buttonRef}
        placement="bottom"
        hideArrow
      >
        <PopoverBody>
          <h4>Share bookmark</h4>
          <FormGroup switch>
            <Input
              onChange={handleUpdate}
              value={bookmark.privacy}
              type="switch"
              role="switch"
            />
            <Label check>Public (shared only within your organization)</Label>
          </FormGroup>
          <div>
            <LoadingButton loading={isSubmitting} onClick={saveSettings}>
              Save
            </LoadingButton>
            <Button onClick={onClose}>Cancel</Button>
          </div>
        </PopoverBody>
      </Popover>
    </>
  );
};

export default BookmarkPrivacySettingButton;
