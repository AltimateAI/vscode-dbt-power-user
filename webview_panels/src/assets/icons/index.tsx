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
export { default as SelectUncheckedIcon } from "./select-unchecked.svg?react";
export { default as SelectCheckedIcon } from "./select-checked.svg?react";
export { default as UserIcon } from "./user.svg?react";
export { default as BlogIcon } from "./blog.svg?react";
export { default as ContactUsIcon } from "./contact.svg?react";
export { default as DocsIcon } from "./docs.svg?react";
export { default as SlackIcon } from "./slack.svg?react";
export { default as EditIcon } from "./edit.svg?react";
export { default as EmptySquareIcon } from "./square.svg?react";
export { default as CheckedSquareIcon } from "./checked-square.svg?react";
export { default as TestsIcon } from "./tests.svg?react";
export { default as FolderIcon } from "./folder.svg?react";
export { default as PlayCircleIcon } from "./play-circle.svg?react";
export { default as NoBookmarksIcon } from "./no-bookmarks.svg?react";
export { default as NoHistoryIcon } from "./no-history.svg?react";
import LoadingSpinnerUrl from "./spinner.gif";
import LineageGif from "./lineage.gif";
import "./styles.css";

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

export const RemoveIcon = (props: HTMLAttributes<HTMLElement>): JSX.Element => (
  <Icon icon="remove" {...props} />
);

export const AddIcon = (props: HTMLAttributes<HTMLElement>): JSX.Element => (
  <Icon icon="add" {...props} />
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

export const ArrowUpIcon = (
  props: HTMLAttributes<HTMLElement>,
): JSX.Element => <Icon icon="chevron-up" {...props} />;

export const ArrowDownIcon = (
  props: HTMLAttributes<HTMLElement>,
): JSX.Element => <Icon icon="chevron-down" {...props} />;

export const ArrowRightIcon = (
  props: HTMLAttributes<HTMLElement>,
): JSX.Element => <Icon icon="chevron-right" {...props} />;

export const ArrowLeftIcon = (
  props: HTMLAttributes<HTMLElement>,
): JSX.Element => <Icon icon="chevron-left" {...props} />;

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

export const CloseIcon = (props: HTMLAttributes<HTMLElement>): JSX.Element => (
  <Icon icon="close" {...props} />
);

export const CommentIcon = (
  props: HTMLAttributes<HTMLElement>,
): JSX.Element => <Icon icon="comment" {...props} />;

export const LoadingSpinner = (): JSX.Element => (
  <img
    // @ts-expect-error added in altimateWebViewProvider
    src={(window.spinnerUrl as string) ?? LoadingSpinnerUrl}
    alt="Altimate loader"
  />
);

export const LineageDemo = (): JSX.Element => (
  <img
    // @ts-expect-error added in altimateWebViewProvider
    src={(window.lineageGif as string) ?? LineageGif}
    alt="Lineage demo"
  />
);

export const LoadingIcon = (
  props: HTMLAttributes<HTMLElement>,
): JSX.Element => <Icon icon="loading" className="rotate" {...props} />;

export const PlayCircleIcon = (
  props: HTMLAttributes<HTMLElement>,
): JSX.Element => <Icon icon="play-circle" {...props} />;

export const BookmarkIcon = (
  props: HTMLAttributes<HTMLElement>,
): JSX.Element => <Icon icon="bookmark" {...props} />;

export const ShareIcon = (props: HTMLAttributes<HTMLElement>): JSX.Element => (
  <Icon icon="live-share" {...props} />
);

export const FilterIcon = (props: HTMLAttributes<HTMLElement>): JSX.Element => (
  <Icon icon="filter" {...props} />
);

export const SearchIcon = (props: HTMLAttributes<HTMLElement>): JSX.Element => (
  <Icon icon="search" {...props} />
);

export const FileCodeIcon = (
  props: HTMLAttributes<HTMLElement>,
): JSX.Element => <Icon icon="file-code" {...props} />;
