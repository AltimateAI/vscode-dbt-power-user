import ThumbsupIcon from "./assets/icons/thumbsup.svg?react";
import ThumbsdownIcon from "./assets/icons/thumbsdown.svg?react";
import ThumbsupSelectedIcon from "./assets/icons/thumbsup_selected.svg?react";
import ThumbsdownSelectedIcon from "./assets/icons/thumbsdown_selected.svg?react";
import { Button } from "reactstrap";
import styles from "./styles.module.scss";
import { useState } from "react";
import { CustomMultilineInput } from "./Form";
import { sendFeedback } from "./service";
import { openChat } from "./service_utils";

enum FeedbackState {
  None = "",
  Postive = "good",
  Negative = "bad",
}

function Feedback({ close }: { close: () => void }) {
  const [feedbackState, setFeedbackState] = useState(FeedbackState.None);
  const [feedbackInput, setFeedbackInput] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  return (
    <div className="p-2 h-100 d-flex flex-column">
      <div className="mb-2 d-flex">
        <div className="fw-semibold fs-5">Feedback</div>
        <div className="spacer"></div>
        <Button
          size="sm"
          color="primary"
          onClick={(e) => {
            e.stopPropagation();
            openChat();
          }}
        >
          Chat with us
        </Button>
      </div>
      <div className={styles.feedback_body}>
        {!isSubmitted && (
          <>
            <div className="d-flex gap-sm m-2">
              {feedbackState === FeedbackState.Postive ? (
                <ThumbsupSelectedIcon
                  className="cursor-pointer"
                  onClick={() => setFeedbackState(FeedbackState.None)}
                />
              ) : (
                <ThumbsupIcon
                  className="cursor-pointer"
                  onClick={() => setFeedbackState(FeedbackState.Postive)}
                />
              )}
              {feedbackState === FeedbackState.Negative ? (
                <ThumbsdownSelectedIcon
                  className="cursor-pointer"
                  onClick={() => setFeedbackState(FeedbackState.None)}
                />
              ) : (
                <ThumbsdownIcon
                  className="cursor-pointer"
                  onClick={() => setFeedbackState(FeedbackState.Negative)}
                />
              )}
            </div>
            <p>AI still needs humans sometimes, please help it out 🙂</p>
            <CustomMultilineInput
              value={feedbackInput}
              onChange={(e) => setFeedbackInput(e.target.value)}
              placeholder="What did AI do wrong? What it should have done?"
            />
            <div className="mt-3 d-flex gap-sm">
              <Button
                size="sm"
                color="primary"
                onClick={async (e) => {
                  e.stopPropagation();
                  if (feedbackState === FeedbackState.None) return;
                  await sendFeedback({
                    feedback_value: feedbackState,
                    feedback_text: feedbackInput,
                  });
                  setIsSubmitted(true);
                }}
              >
                Submit
              </Button>
              <Button
                size="sm"
                color="link"
                className={styles.cancel_btn}
                onClick={(e) => {
                  e.stopPropagation();
                  close();
                }}
              >
                Cancel
              </Button>
            </div>
          </>
        )}
        {isSubmitted && (
          <>
            <p>Many thanks for your feedback!</p>
            <Button
              size="sm"
              color="primary"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
            >
              Close
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export { Feedback };
