import { LikeIcon, DislikeIcon } from "@assets/icons";
import { Button, IconButton, Input, Stack } from "@uicore";
import { useState } from "react";

const ResultFeedbackButtons = (): JSX.Element => {
  const [showForm, setShowForm] = useState(false);

  const handleClick = (_isLiked: boolean) => {
    setShowForm(true);
  };

  return (
    <Stack direction="column">
      <Stack>
        <IconButton title="Like" onClick={() => handleClick(true)}>
          <LikeIcon />
        </IconButton>
        <IconButton title="Dislike" onClick={() => handleClick(false)}>
          <DislikeIcon />
        </IconButton>
      </Stack>
      {showForm ? (
        <Stack direction="column">
          <h5>AI still needs humans sometimes, please help it out 🙂</h5>
          <Input type="textarea" />
          <Stack>
            <Button color="primary">Submit</Button>
            <Button onClick={() => setShowForm(false)}>Cancel</Button>
          </Stack>
        </Stack>
      ) : null}
    </Stack>
  );
};

export default ResultFeedbackButtons;
