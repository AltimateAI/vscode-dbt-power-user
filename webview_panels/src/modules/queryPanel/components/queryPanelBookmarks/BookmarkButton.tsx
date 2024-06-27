import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { BookmarkIcon } from "@assets/icons";
import { QueryBookmark, QueryHistory } from "@modules/queryPanel/context/types";
import {
  Button,
  Col,
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
import { useEffect, useRef, useState } from "react";
import { panelLogger } from "@modules/logger";
import {
  executeRequestInAsync,
  executeRequestInSync,
} from "@modules/app/requestExecutor";
import { useQueryPanelDispatch } from "@modules/queryPanel/QueryPanelProvider";
import { setTabState } from "@modules/queryPanel/context/queryPanelSlice";
import { QueryPanelTitleTabState } from "../QueryPanelContents/types";
import pageStyles from "../../querypanel.module.scss";

interface Props {
  queryHistory: QueryHistory;
}

interface BookmarkRequest {
  name: string;
  description: string;
  tags?: string[];
}

const schema = Yup.object({
  name: Yup.string().required(),
  description: Yup.string().required(),
  tags: Yup.array().of(Yup.string().required()).optional(),
}).required();

const BookmarkButton = ({ queryHistory }: Props): JSX.Element => {
  const dispatch = useQueryPanelDispatch();
  const [tagsFromDB, setTags] = useState<string[]>([]);
  const popoverRef = useRef<PopoverWithButtonRef | null>(null);

  useEffect(() => {
    executeRequestInSync("fetch", {
      endpoint: "query/bookmark/tags",
      fetchArgs: {
        method: "GET",
      },
    })
      .then((response) => {
        setTags(
          (response as undefined | QueryBookmark["tags"])?.map(
            (tag) => tag.tag,
          ) ?? [],
        );
      })
      .catch((err) => panelLogger.error("Unable to get tags", err));
  }, []);
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
        description: data.description,
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
                  <FormGroup row>
                    <Label for="bookmarkName" sm={2} style={{ paddingTop: 3 }}>
                      Name
                    </Label>
                    <Col sm={9}>
                      <Input
                        id="bookmarkName"
                        type="text"
                        onChange={onChange}
                        placeholder="Bookmark name"
                      />
                    </Col>
                  </FormGroup>
                )}
              />
              <Controller
                control={control}
                name="description"
                render={({ field: { onChange } }) => (
                  <FormGroup row>
                    <Label for="description" sm={2} style={{ paddingTop: 3 }}>
                      Description
                    </Label>
                    <Col sm={9}>
                      <Input
                        id="description"
                        type="textarea"
                        onChange={onChange}
                        placeholder="Description"
                      />
                    </Col>
                  </FormGroup>
                )}
              />
              <Controller
                control={control}
                name="tags"
                render={({ field: { onChange, ref } }) => (
                  <FormGroup row>
                    <Label for="tags" sm={2} style={{ paddingTop: 3 }}>
                      Tags
                    </Label>
                    <Col sm={9}>
                      <Select
                        components={{ DropdownIndicator: null }}
                        classNames={{
                          container: () => pageStyles.selectControl,
                        }}
                        ref={ref}
                        inputId="tags"
                        options={tagsFromDB.map((v) => ({
                          label: v,
                          value: v,
                        }))}
                        isCreatable
                        isClearable
                        value={tags?.map((v) => ({ label: v, value: v }) ?? [])}
                        defaultValue={[]}
                        isMulti
                        onChange={(updates: unknown) => {
                          const newValues = (
                            (updates ?? []) as OptionType[]
                          )?.map((val) => val.value);
                          setValue("tags", newValues);

                          return onChange(newValues);
                        }}
                        placeholder="Type a value and press enter to add"
                      />
                    </Col>
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
