export enum Rating {
  Bad = "bad",
  Good = "good",
}

export interface Feedback {
  feedback_type?: Rating;
  feedback_message?: string;
}

export enum FeedbackType {
  RESPONSE = "response",
  USER_REQUEST = "userRequest",
}

interface GeneratedFeedbackWithRating
  extends Feedback,
    Record<string, unknown> {
  type: FeedbackType;
}

export interface FeedbackRequest extends Record<string, unknown> {
  requestDetails: Record<string, unknown>;
  messageSequence: GeneratedFeedbackWithRating[];
}
