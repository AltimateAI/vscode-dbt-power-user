import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { LikeIcon, DislikeIcon } from "@assets/icons";
import { Button, Form, IconButton, Input, Stack } from "@uicore";
import { useCallback, useState } from "react";
import { Feedback, Rating } from "./types";
import { panelLogger } from "@modules/logger";
import { executeRequestInSync } from "@modules/app/requestExecutor";

interface Props {
  getFeedbackData: (data: Feedback) => void;
}

const schema = Yup.object({
  feedback_type: Yup.mixed<Rating>().oneOf(Object.values(Rating)).optional(),
  feedback_message: Yup.string().optional(),
}).required();

const ResultFeedbackButtons = ({ getFeedbackData }: Props): JSX.Element => {
  const [showForm, setShowForm] = useState(false);

  const { control, handleSubmit, setValue, watch } = useForm<Feedback>({
    resolver: yupResolver(schema),
  });

  const onFeedbackSubmit = async (feedbackData: Feedback) => {
    if (
      feedbackData.feedback_type === Rating.Bad &&
      !feedbackData.feedback_message
    ) {
      panelLogger.info("no feedback", feedbackData);
      return;
    }

    const data = getFeedbackData(feedbackData);
    panelLogger.info("feedback submitted", feedbackData, data);
    await executeRequestInSync("sendFeedback", {
      comment: feedbackData.feedback_message,
      rating: feedbackData.feedback_type,
      data,
    });
    setShowForm(false);
  };
  const watchRating = watch("feedback_type");

  const handleCancel = () => {
    setValue("feedback_type", undefined);
    setShowForm(false);
  };
  const handleClick = (isLiked: boolean) => {
    setShowForm(true);
    setValue("feedback_type", isLiked ? Rating.Good : Rating.Bad);
  };

  const handleLike = () => {
    onFeedbackSubmit({
      feedback_message: "",
      feedback_type: Rating.Good,
    }).catch((err) =>
      panelLogger.error("error while submitting feedback", err),
    );
  };

  const onFormRender = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      node.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const isGoodRating = watchRating === Rating.Good;
  const isBadRating = watchRating === Rating.Bad;
  const placeholder = isGoodRating
    ? "Please share your feedback!"
    : "What did AI do wrong? What it should have done?";

  return (
    <>
      <Stack>
        <IconButton
          className={`${isGoodRating ? "active" : ""} outline`}
          title="Like"
          onClick={handleLike}
        >
          <LikeIcon />
        </IconButton>
        <IconButton
          className={`${isBadRating ? "active" : ""} outline`}
          title="Dislike"
          onClick={() => handleClick(false)}
        >
          <DislikeIcon />
        </IconButton>
      </Stack>
      {showForm ? (
        <Form onSubmit={handleSubmit(onFeedbackSubmit)}>
          <Stack direction="column" ref={onFormRender}>
            <h5>AI still needs humans sometimes, please help it out 🙂</h5>
            <Controller
              control={control}
              name="feedback_message"
              render={({ field: { onChange } }) => (
                <Input
                  type="textarea"
                  onChange={onChange}
                  placeholder={placeholder}
                />
              )}
            />
            <Stack>
              <Button color="primary" type="submit">
                Submit
              </Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </Stack>
          </Stack>
        </Form>
      ) : null}
    </>
  );
};

export default ResultFeedbackButtons;
