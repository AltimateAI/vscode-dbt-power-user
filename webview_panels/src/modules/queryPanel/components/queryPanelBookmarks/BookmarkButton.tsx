import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { BookmarkIcon } from "@assets/icons";
import { QueryHistory } from "@modules/queryPanel/context/types";
import {
  Button,
  FormGroup,
  IconButton,
  Input,
  Label,
  LoadingButton,
  OptionType,
  PopoverWithButton,
  PopoverWithButtonRef,
  Select,
  Stack,
} from "@uicore";
import { useRef } from "react";
import { panelLogger } from "@modules/logger";
import {
  executeRequestInAsync,
  executeRequestInSync,
} from "@modules/app/requestExecutor";
import { useQueryPanelDispatch } from "@modules/queryPanel/QueryPanelProvider";
import {
  setQueryBookmarksTagsFromDB,
  setTabState,
} from "@modules/queryPanel/context/queryPanelSlice";
import { QueryPanelTitleTabState } from "../QueryPanelContents/types";
import pageStyles from "../../querypanel.module.scss";
import useQueryPanelState from "@modules/queryPanel/useQueryPanelState";
import { ActionMeta } from "react-select";

interface Props {
  queryHistory: QueryHistory;
}

interface BookmarkRequest {
  name: string;
  tags?: string[];
}

const schema = Yup.object({
  name: Yup.string().required(),
  tags: Yup.array().of(Yup.string().required()).optional(),
}).required();

const BookmarkButton = ({ queryHistory }: Props): JSX.Element => {
  const dispatch = useQueryPanelDispatch();
  const { queryBookmarksTagsFromDB, refetchBookmarks } = useQueryPanelState();
  const popoverRef = useRef<PopoverWithButtonRef | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { isSubmitting, isValid },
  } = useForm<BookmarkRequest>({
    resolver: yupResolver(schema),
    defaultValues: {
      tags: [queryHistory.projectName],
    },
  });
  const tags = watch("tags");

  const onSubmit = async (data: BookmarkRequest) => {
    try {
      panelLogger.info("saving bookmark", queryHistory, data);
      const request = {
        bookmark_name: data.name,
        raw_sql: queryHistory.rawSql,
        compiled_sql: queryHistory.compiledSql,
        adapter_type: queryHistory.adapter,
        tags_list: data.tags,
      };

      const response = await executeRequestInSync("fetch", {
        endpoint: "query/bookmark/",
        fetchArgs: {
          body: JSON.stringify(request ?? {}),
          method: "POST",
        },
      });
      panelLogger.info("saved bookmark", response);
      refetchBookmarks();
      executeRequestInAsync("sendTelemetryEvent", {
        eventName: `query-bookmark-added`,
        properties: {
          name: data.name,
        },
      });
      onClose();
      const actionResponse = await executeRequestInSync(
        "showInformationMessage",
        {
          infoMessage: "Successfully saved bookmark!",
          items: ["Ok", "View bookmark"],
        },
      );
      if (actionResponse === "View bookmark") {
        dispatch(setTabState(QueryPanelTitleTabState.Bookmarks));
      }
    } catch (error) {
      panelLogger.error("error saving bookmark", error);
      reset(data);
    }
  };

  const onClose = () => {
    popoverRef.current?.close();
    reset();
  };

  return (
    <PopoverWithButton
      ref={popoverRef}
      title="Add bookmark"
      button={
        <IconButton title="Bookmark this query">
          <BookmarkIcon />
        </IconButton>
      }
    >
      {({ styles, close }) => (
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="column">
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange } }) => (
                  <FormGroup>
                    <Label for="bookmarkName" style={{ paddingTop: 3 }}>
                      Name
                    </Label>
                    <Input
                      id="bookmarkName"
                      type="text"
                      onChange={onChange}
                      placeholder="Bookmark name"
                    />
                  </FormGroup>
                )}
              />
              <Controller
                control={control}
                name="tags"
                render={({ field: { onChange, ref } }) => (
                  <FormGroup>
                    <Label for="tags" sm={2} style={{ paddingTop: 3 }}>
                      Tags
                    </Label>
                    <Select
                      components={{ DropdownIndicator: null }}
                      classNames={{
                        container: () => pageStyles.selectControl,
                      }}
                      ref={ref}
                      inputId="tags"
                      options={queryBookmarksTagsFromDB.map((v) => ({
                        label: v.tag,
                        value: v.tag,
                      }))}
                      isCreatable
                      isClearable
                      closeMenuOnSelect={false}
                      value={tags?.map((v) => ({ label: v, value: v }) ?? [])}
                      defaultValue={[]}
                      isMulti
                      onChange={(
                        updates: unknown,
                        triggeredAction: ActionMeta<unknown>,
                      ) => {
                        const newValues = (
                          (updates ?? []) as OptionType[]
                        )?.map((val) => val.value);
                        setValue("tags", newValues);

                        if (triggeredAction.action === "create-option") {
                          dispatch(
                            setQueryBookmarksTagsFromDB([
                              {
                                tag: (triggeredAction.option as OptionType)
                                  .value,
                                id: Date.now(),
                              },
                              ...queryBookmarksTagsFromDB,
                            ]),
                          );
                        }
                        return onChange(newValues);
                      }}
                      placeholder="Type a value and press enter to add"
                    />
                  </FormGroup>
                )}
              />
            </Stack>
            <div className={styles.popoverActions}>
              <LoadingButton
                loading={isSubmitting}
                disabled={!isValid}
                type="submit"
                color="primary"
              >
                Save
              </LoadingButton>
              <Button
                onClick={() => {
                  close();
                  onClose();
                }}
                outline
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}
    </PopoverWithButton>
  );
};

export default BookmarkButton;
