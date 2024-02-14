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

interface Props {
  icon: string;
}
const Icon = ({ icon }: Props) => <i className={`codicon codicon-${icon}`} />;

export const GlobeIcon = (): JSX.Element => <Icon icon="globe" />;
export const GithubIcon = (): JSX.Element => <Icon icon="github-inverted" />;
export const FilesIcon = (): JSX.Element => <Icon icon="files" />;
export const CheckedIcon = (): JSX.Element => <Icon icon="pass-filled" />;
export const RefreshIcon = (): JSX.Element => <Icon icon="debug-restart" />;
export const SettingsIcon = (): JSX.Element => <Icon icon="gear" />;
export const ChevronDownIcon = (): JSX.Element => <Icon icon="chevron-down" />;
export const ChevronRightIcon = (): JSX.Element => (
  <Icon icon="chevron-right" />
);
export const ChevronLeftIcon = (): JSX.Element => <Icon icon="chevron-left" />;
export const MoreIcon = (): JSX.Element => <Icon icon="more" />;
export const InfoCircleIcon = (): JSX.Element => <Icon icon="info" />;
export const AskIcon = (): JSX.Element => <Icon icon="send" />;
