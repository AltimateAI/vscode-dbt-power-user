import { DBTDocumentationColumn } from "@modules/documentationEditor/state/types";

export interface GeneratedResult extends Partial<DBTDocumentationColumn> {
  model: string;
  id: string;
  prompt: string;
  user_prompt: string;
  datapilot_title: string;
}

export enum Rating {
  Bad = "bad",
  Good = "good",
}

export interface Feedback {
  feedback_type?: Rating;
  feedback_message: string;
}

export enum FeedbackType {
  RESPONSE = "response",
  USER_REQUEST = "userRequest",
}

interface GeneratedFeedbackWithRating extends Feedback {
  type: FeedbackType;
  content: string;
}

export enum EntityType {
  COLUMN = "column",
  MODEL = "model",
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type FeedbackRequest = {
  requestDetails: Record<string, unknown>;
  messageSequence: GeneratedFeedbackWithRating[];
  type: string;
  name: string;
};
