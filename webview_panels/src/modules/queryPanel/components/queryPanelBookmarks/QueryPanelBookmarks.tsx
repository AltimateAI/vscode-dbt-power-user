import styles from "../../querypanel.module.scss";
import { Stack, CodeBlock, Label, IconButton } from "@uicore";
import { useEffect, useState } from "react";
import { QueryBookmark } from "@modules/queryPanel/context/types";
import { ChevronRightIcon } from "@assets/icons";
import BookmarkAccordion from "./BookmarkAccordion";
import { executeRequestInSync } from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";
import useQueryPanelState from "@modules/queryPanel/useQueryPanelState";
import { QueryPanelTitleTabState } from "../QueryPanelContents/types";
import { setQueryBookmarksTagsFromDB } from "@modules/queryPanel/context/queryPanelSlice";
import { useQueryPanelDispatch } from "@modules/queryPanel/QueryPanelProvider";

const QueryPanelBookmarks = (): JSX.Element => {
  const [activeBookmark, setActiveBookmark] = useState<QueryBookmark | null>(
    null,
  );
  const { queryBookmarks, tabState, queryBookmarksTagsFromDB } =
    useQueryPanelState();
  const dispatch = useQueryPanelDispatch();

  useEffect(() => {
    executeRequestInSync("fetch", {
      endpoint: `query/bookmark/tags`,
      fetchArgs: {
        method: "GET",
      },
    })
      .then((response) => {
        dispatch(
          setQueryBookmarksTagsFromDB(response as QueryBookmark["tags"]),
        );
      })
      .catch((error) => {
        panelLogger.error("Error fetching tags", error);
      });
  }, []);

  const onSelect = (qh: QueryBookmark) => {
    setActiveBookmark(qh);
  };

  const resetActiveBookmark = () => {
    setActiveBookmark(null);
  };

  const tags = queryBookmarksTagsFromDB.map((t) => t.tag);
  return (
    <section
      className={`${styles.queryTwoCol} ${tabState === QueryPanelTitleTabState.Bookmarks ? "" : "d-none"}`}
    >
      <Stack direction="column" className={styles.limitWidth}>
        <BookmarkAccordion
          onSelect={onSelect}
          privacy="private"
          title="My bookmarks"
          tags={tags}
          bookmarks={queryBookmarks.private.items}
        />
        <BookmarkAccordion
          onSelect={onSelect}
          privacy="public"
          title="Shared bookmarks"
          tags={tags}
          bookmarks={queryBookmarks.public.items}
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
              <Label>Description</Label>
              <span>{activeBookmark.description}</span>
            </Stack>
            <Stack>
              <Label>Tags</Label>
              {activeBookmark.tags.map((t) => t.tag).join(",")}
            </Stack>
            <Stack>
              <Label>Adapter</Label>
              {activeBookmark.adapter_type}
            </Stack>
            <Stack>
              <Label>Privacy</Label>
              {activeBookmark.privacy}
            </Stack>
          </div>

          {activeBookmark.raw_sql ? (
            <CodeBlock
              code={activeBookmark.raw_sql}
              language="sql"
              fileName="Raw sql"
            />
          ) : null}
        </div>
      ) : null}
    </section>
  );
};

export default QueryPanelBookmarks;
