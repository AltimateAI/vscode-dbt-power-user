import { HTMLAttributes } from "react";
export { default as LikeIcon } from "./like.svg?react";
export { default as DislikeIcon } from "./dislike.svg?react";
export { default as ShinesIcon } from "./shines.svg?react";
export { default as PreviewIcon } from "./preview.svg?react";
export { default as HelpIcon } from "./help.svg?react";
export { default as FeedbackIcon } from "./feedback.svg?react";
export { default as AltimateIcon } from "./altimate.svg?react";
export { default as CheckBlueIcon } from "./check-blue.svg?react";
export { default as UncheckIcon } from "./uncheck.svg?react";
export { default as UserIcon } from "./user.svg?react";
export { default as BlogIcon } from "./blog.svg?react";
export { default as ContactUsIcon } from "./contact.svg?react";
export { default as DocsIcon } from "./docs.svg?react";
export { default as SlackIcon } from "./slack.svg?react";
export { default as AddOutlineIcon } from "./add-outline.svg?react";
export { default as EditIcon } from "./edit.svg?react";

interface Props {
  icon: string;
}
const Icon = ({
  icon,
  className = "",
  ...rest
}: Props & HTMLAttributes<HTMLElement>) => (
  <i className={`${className} codicon codicon-${icon}`} {...rest} />
);

export const DeleteIcon = (props: HTMLAttributes<HTMLElement>): JSX.Element => (
  <Icon icon="trash" {...props} />
);

export const GlobeIcon = (props: HTMLAttributes<HTMLElement>): JSX.Element => (
  <Icon icon="globe" {...props} />
);

export const GithubIcon = (props: HTMLAttributes<HTMLElement>): JSX.Element => (
  <Icon icon="github-inverted" {...props} />
);

export const FilesIcon = (props: HTMLAttributes<HTMLElement>): JSX.Element => (
  <Icon icon="files" {...props} />
);

export const CheckedIcon = (
  props: HTMLAttributes<HTMLElement>,
): JSX.Element => <Icon icon="pass-filled" {...props} />;

export const RefreshIcon = (
  props: HTMLAttributes<HTMLElement>,
): JSX.Element => <Icon icon="debug-restart" {...props} />;

export const SettingsIcon = (
  props: HTMLAttributes<HTMLElement>,
): JSX.Element => <Icon icon="gear" {...props} />;

export const ChevronDownIcon = (
  props: HTMLAttributes<HTMLElement>,
): JSX.Element => <Icon icon="chevron-down" {...props} />;

export const ChevronRightIcon = (
  props: HTMLAttributes<HTMLElement>,
): JSX.Element => <Icon icon="chevron-right" {...props} />;

export const ChevronLeftIcon = (
  props: HTMLAttributes<HTMLElement>,
): JSX.Element => <Icon icon="chevron-left" {...props} />;

export const MoreIcon = (props: HTMLAttributes<HTMLElement>): JSX.Element => (
  <Icon icon="more" {...props} />
);

export const InfoCircleIcon = (
  props: HTMLAttributes<HTMLElement>,
): JSX.Element => <Icon icon="info" {...props} />;

export const AskIcon = (props: HTMLAttributes<HTMLElement>): JSX.Element => (
  <Icon icon="send" {...props} />
);
