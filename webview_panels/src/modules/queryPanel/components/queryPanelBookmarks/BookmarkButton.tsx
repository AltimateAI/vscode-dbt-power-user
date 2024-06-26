import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { BookmarkIcon } from "@assets/icons";
import { QueryHistory } from "@modules/queryPanel/context/types";
import {
  Button,
  IconButton,
  Input,
  LoadingButton,
  OptionType,
  Popover,
  PopoverBody,
  Select,
} from "@uicore";
import { MouseEvent, useRef, useState } from "react";
import { panelLogger } from "@modules/logger";
import {
  executeRequestInAsync,
  executeRequestInSync,
} from "@modules/app/requestExecutor";
import { useQueryPanelDispatch } from "@modules/queryPanel/QueryPanelProvider";
import { setTabState } from "@modules/queryPanel/context/queryPanelSlice";
import { QueryPanelTitleTabState } from "../QueryPanelContents/types";

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
  const [showForm, setShowForm] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { isSubmitting, isValid },
  } = useForm<BookmarkRequest>({
    resolver: yupResolver(schema),
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
      executeRequestInAsync("getQueryBookmarks", {});
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
      onClose();
    } catch (error) {
      panelLogger.error("error saving bookmark", error);
      executeRequestInAsync("showErrorMessage", {
        infoMessage: (error as Error).message,
        items: ["Ok"],
      });
    }
  };

  const onClose = () => {
    setShowForm(false);
    reset();
  };

  const onOpen = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setShowForm(true);
  };

  return (
    <>
      <span ref={buttonRef}>
        <IconButton title="Bookmark this query" onClick={onOpen}>
          <BookmarkIcon />
        </IconButton>
      </span>
      <Popover
        isOpen={showForm}
        target={buttonRef}
        placement="bottom"
        hideArrow
      >
        <PopoverBody>
          <h4>Add bookmark</h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange } }) => (
                <Input
                  type="text"
                  onChange={onChange}
                  placeholder="Bookmark name"
                />
              )}
            />
            <Controller
              control={control}
              name="tags"
              render={({ field: { onChange, ref } }) => (
                <Select
                  components={{
                    DropdownIndicator: null,
                    Menu: () => null,
                  }}
                  ref={ref}
                  inputId="tags"
                  hideOptionIcon
                  isCreatable
                  isClearable
                  value={tags?.map((v) => ({ label: v, value: v }) ?? [])}
                  defaultValue={[]}
                  isMulti
                  onChange={(updates: unknown) => {
                    const newValues = ((updates ?? []) as OptionType[])?.map(
                      (val) => val.value,
                    );
                    setValue("tags", newValues);

                    return onChange(newValues);
                  }}
                  placeholder="Type a value and press enter to add"
                />
              )}
            />
            <div>
              <LoadingButton
                loading={isSubmitting}
                disabled={!isValid}
                type="submit"
              >
                Save
              </LoadingButton>
              <Button onClick={onClose}>Cancel</Button>
            </div>
          </form>
        </PopoverBody>
      </Popover>
    </>
  );
};

export default BookmarkButton;
