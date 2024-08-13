import styles from "../../querypanel.module.scss";
import { Stack, CodeBlock, Label, IconButton, Alert } from "@uicore";
import { useEffect, useState } from "react";
import { QueryBookmark } from "@modules/queryPanel/context/types";
import { ChevronRightIcon, OpenNewIcon } from "@assets/icons";
import BookmarkAccordion from "./BookmarkAccordion";
import useQueryPanelState from "@modules/queryPanel/useQueryPanelState";
import { QueryPanelTitleTabState } from "../QueryPanelContents/types";
import useQueryPanelCommonActions from "@modules/queryPanel/useQueryPanelCommonActions";
import { executeRequestInAsync } from "@modules/app/requestExecutor";

const QueryPanelBookmarks = (): JSX.Element => {
  const [activeBookmark, setActiveBookmark] = useState<QueryBookmark | null>(
    null,
  );
  const { queryBookmarks, tabState, queryBookmarksTagsFromDB } =
    useQueryPanelState();
  const { refetchBookmarkTags } = useQueryPanelCommonActions();

  useEffect(() => {
    if (queryBookmarksTagsFromDB) {
      return;
    }

    refetchBookmarkTags();
  }, [queryBookmarksTagsFromDB]);

  const onSelect = (qh: QueryBookmark) => {
    setActiveBookmark(qh);
  };

  const resetActiveBookmark = () => {
    setActiveBookmark(null);
  };

  const handleOpenNewClick = () => {
    executeRequestInAsync("openCodeInEditor", {
      code: activeBookmark?.raw_sql,
      name: activeBookmark?.name,
    });
  };

  const tags = (queryBookmarksTagsFromDB ?? []).map((t) => t.tag);
  return (
    <section
      className={`${styles.queryTwoCol} ${tabState === QueryPanelTitleTabState.Bookmarks ? "" : "d-none"}`}
    >
      <Stack direction="column" className={styles.limitWidth}>
        <Alert color="warning">
          Check out the{" "}
          <a href="https://docs.myaltimate.com/govern/querybookmarks/">
            documentation
          </a>{" "}
          to learn more about Query Bookmarks.
        </Alert>
        <BookmarkAccordion
          onSelect={onSelect}
          privacy="private"
          title="My bookmarks"
          tags={tags}
          bookmarks={queryBookmarks.private?.items ?? []}
        />
        <BookmarkAccordion
          onSelect={onSelect}
          privacy="public"
          title="Shared bookmarks"
          tags={tags}
          bookmarks={queryBookmarks.public?.items ?? []}
        />
      </Stack>

      {activeBookmark ? (
        <div className={styles.historyDetails}>
          <IconButton
            className={styles.closeBtn}
            color="primary"
            onClick={resetActiveBookmark}
          >
            <ChevronRightIcon />
          </IconButton>
          <h4>{activeBookmark.name}</h4>
          <div>
            <Stack>
              <Label>Tags</Label>
              {activeBookmark.tags.map((t) => t.tag).join(",")}
            </Stack>
            <Stack>
              <Label>Adapter</Label>
              {activeBookmark.adapter_type}
            </Stack>
            <Stack>
              <Label>Shared</Label>
              {activeBookmark.privacy === "private" ? "No" : "Yes"}
            </Stack>
          </div>

          {activeBookmark.raw_sql ? (
            <CodeBlock
              code={activeBookmark.raw_sql}
              language="sql"
              fileName="Code"
              showLineNumbers
              titleActions={
                <span>
                  <IconButton
                    title="Open in editor"
                    onClick={handleOpenNewClick}
                  >
                    <OpenNewIcon />
                  </IconButton>
                </span>
              }
            />
          ) : null}
        </div>
      ) : null}
    </section>
  );
};

export default QueryPanelBookmarks;
