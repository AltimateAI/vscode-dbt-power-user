import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { LoadingButton, Label, OptionType, Select, Stack } from "@uicore";
import { panelLogger } from "@modules/logger";
import { SqlDialects } from "./constants";
import { useEffect, useState } from "react";
import {
  executeRequestInAsync,
  executeRequestInSync,
} from "@modules/app/requestExecutor";
import useQueryAnalysisAction from "../useQueryAnalysisAction";
import useQueryAnalysisContext from "../provider/useQueryAnalysisContext";
import { DataPilotChatFollowup, RequestState } from "@modules/dataPilot/types";
import useDataPilotContext from "@modules/dataPilot/useDataPilotContext";
import { deleteFollowup } from "@modules/dataPilot/dataPilotSlice";

const schema = Yup.object({
  source: Yup.string().required(),
  target: Yup.string().required(),
}).required();

interface QueryTranslateRequest extends Record<string, unknown> {
  source: string;
  target: string;
}

const QueryTranslateDialectSelects = (): JSX.Element => {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { isValid },
    trigger,
  } = useForm<QueryTranslateRequest>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const [translateCompleted, setTranslateCompleted] = useState(false);
  const { executeQueryAnalysis, isLoading } = useQueryAnalysisAction();
  const { chat, onNewGeneration, history } = useQueryAnalysisContext();
  const { dispatch } = useDataPilotContext();

  const dialectOptions: OptionType[] = SqlDialects.sort().map((d) => ({
    label: d,
    value: d,
  }));

  const handleReplace = (
    translatedSql: string | undefined,
    followup: DataPilotChatFollowup,
    buttonTitle: string,
  ) => {
    panelLogger.info(followup, buttonTitle, chat?.meta, translatedSql);

    executeRequestInAsync("file:replace-contents", {
      sql: translatedSql,
      filePath: chat?.filePath,
    });
  };

  const onSubmit = async (data: QueryTranslateRequest) => {
    try {
      panelLogger.info("requesting translate", data);
      const result = (await executeQueryAnalysis({
        command: "querytranslate",
        onNewGeneration: (followup) => {
          if (followup.state === RequestState.ERROR) {
            dispatch(
              deleteFollowup({ sessionId: chat?.id, followupId: followup.id }),
            );
            return;
          }
          const translateResponse = followup.response as unknown as
            | { translatedSql: string; userSql: string }
            | undefined;
          const translatedSql = translateResponse?.translatedSql;
          return onNewGeneration({
            ...followup,
            codeBlockActions: translatedSql
              ? [
                  {
                    title: "Replace",
                    onClick: (...args) => handleReplace(translatedSql, ...args),
                  },
                ]
              : undefined,
            response: translatedSql
              ? [
                  `The translated query in \`${data.target}\` is`,
                  " ```",
                  translatedSql,
                  " ```",
                ].join("\n")
              : followup.response,
          });
        },
        sessionId: chat?.id,
        history,
        user_request: `Translate from: ${getValues("source")} to: ${getValues(
          "target",
        )}`,
        skipFollowupQuestions: true,
        request: { ...data, filePath: chat?.filePath },
      })) as unknown as { translatedSql: string; userSql: string };

      if (result.translatedSql) {
        setTranslateCompleted(true);
        await executeQueryAnalysis({
          command: "querytranslate:explanation",
          onNewGeneration: (followup) =>
            onNewGeneration({ ...followup, hideFollowup: true }),
          sessionId: chat?.id,
          history,
          user_request: "",
          skipFollowupQuestions: true,
          request: { ...data, ...result },
        });
      }
    } catch (err) {
      panelLogger.error("error while querying by user input", err);
    }
  };

  useEffect(() => {
    executeRequestInSync("getProjectAdapterType", {})
      .then((result) => {
        if (!result) {
          return;
        }
        setValue("target", result as string, { shouldValidate: true });
      })
      .catch((err) => panelLogger.info("error in getProjectAdapterType", err));
    trigger().catch((err) => panelLogger.info("error in trigger", err));
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column">
          <div>
            <Label htmlFor="source-dialect">Source SQL dialect</Label>
            <Controller
              control={control}
              name="source"
              render={({ field: { onChange, ref, value } }) => (
                <Select
                  inputId="source-dialect"
                  ref={ref}
                  isDisabled={translateCompleted || isLoading}
                  openMenuOnFocus
                  options={dialectOptions}
                  value={dialectOptions.find((c) => c.value === value)}
                  onChange={(val: unknown) => {
                    return onChange((val as OptionType).value);
                  }}
                />
              )}
            />
          </div>
          <div>
            <Label htmlFor="destination-dialect">Destination SQL dialect</Label>
            <Controller
              control={control}
              name="target"
              render={({ field: { onChange, ref, value } }) => (
                <Select
                  inputId="destination-dialect"
                  ref={ref}
                  isDisabled={translateCompleted || isLoading}
                  openMenuOnFocus
                  options={dialectOptions}
                  value={dialectOptions.find((c) => c.value === value)}
                  onChange={(val: unknown) => {
                    return onChange((val as OptionType).value);
                  }}
                />
              )}
            />
          </div>

          {!translateCompleted ? (
            <Stack className="justify-content-end">
              <LoadingButton
                loading={isLoading}
                type="submit"
                color="primary"
                disabled={!isValid}
              >
                Translate
              </LoadingButton>
            </Stack>
          ) : null}
        </Stack>
      </form>
    </div>
  );
};

export default QueryTranslateDialectSelects;
