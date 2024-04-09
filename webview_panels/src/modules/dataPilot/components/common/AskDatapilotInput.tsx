import { AskIcon } from "@assets/icons";
import { IconButton, Stack } from "@uicore";
import TextareaAutosize from "react-textarea-autosize";
import classes from "../../datapilot.module.scss";
import { ChangeEvent, FormEvent, KeyboardEvent, useState } from "react";
import { panelLogger } from "@modules/logger";

interface Props {
  handleSubmit: (test: string) => void;
  disabled?: boolean;
  loading?: boolean;
}
const AskDatapilotInput = ({
  handleSubmit,
  disabled,
  loading,
}: Props): JSX.Element => {
  const [userRequest, setUserRequest] = useState("");
  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setUserRequest(e.target.value);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    panelLogger.info("submitting user request", userRequest);

    if (!userRequest) {
      return;
    }

    handleSubmit(userRequest);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      onSubmit(e);
    }
  };

  return (
    <Stack className={classes.askInput}>
      <form onSubmit={onSubmit}>
        <TextareaAutosize
          disabled={loading}
          placeholder="Ask a followup"
          value={userRequest}
          onChange={handleOnChange}
          rows={1}
          maxRows={3}
          className="form-control"
          onKeyDown={onKeyDown}
        />

        <IconButton type="submit" disabled={disabled}>
          <AskIcon style={{ color: "var(--icon--default)" }} />
        </IconButton>
      </form>
    </Stack>
  );
};

export default AskDatapilotInput;
