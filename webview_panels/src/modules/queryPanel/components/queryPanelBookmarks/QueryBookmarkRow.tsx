import { QueryBookmark } from "@modules/queryPanel/context/types";
import { ListGroupItem, Stack, Tag, Tooltip } from "@uicore";
import ExecuteQueryButton from "../queryPanelQueryHistory/ExecuteQueryButton";
import BookmarkPrivacySettingButton from "./BookmarkPrivacySettingButton";
import DeleteBookmarkButton from "./DeleteBookmarkButton";

interface Props {
  bookmark: QueryBookmark;
  onSelect: (bookmark: QueryBookmark) => void;
  isSharedView?: boolean;
}
const QueryBookmarkRow = ({
  bookmark,
  onSelect,
  isSharedView,
}: Props): JSX.Element => {
  return (
    <ListGroupItem>
      <Stack onClick={() => onSelect(bookmark)}>
        {bookmark.name}

        <Stack>
          {bookmark.tags.slice(0, 2).map((tag) => (
            <Tag key={tag.id}>{tag.tag}</Tag>
          ))}
          {bookmark.tags.length > 2 ? (
            <Tooltip
              placement="top"
              title={bookmark.tags
                .slice(2)
                .map((t) => t.tag)
                .join(", ")}
            >
              <Tag>+{bookmark.tags.length - 2} tags</Tag>
            </Tooltip>
          ) : null}
        </Stack>
      </Stack>
      <Stack>
        {isSharedView ? (
          <span className="me-2">{bookmark.created_by_user.first_name}</span>
        ) : null}

        <span>
          {new Date(bookmark.created_on).toLocaleString("default", {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          {new Date(bookmark.created_on).toLocaleString("default", {
            day: "numeric",
            month: "short",
            year: "2-digit",
          })}
        </span>
        <ExecuteQueryButton
          query={bookmark.raw_sql}
          projectName={""}
          editorName={bookmark.name}
        />
        <BookmarkPrivacySettingButton bookmark={bookmark} />
        <DeleteBookmarkButton bookmark={bookmark} />
      </Stack>
    </ListGroupItem>
  );
};

export default QueryBookmarkRow;
