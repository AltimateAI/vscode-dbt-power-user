import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { LoadingButton, Label, OptionType, Select, Stack } from "@uicore";
import { panelLogger } from "@modules/logger";
import { SqlDialects } from "./constants";
import { useEffect } from "react";
import { executeRequestInSync } from "@modules/app/requestExecutor";
import useQueryAnalysisAction from "../useQueryAnalysisAction";
import useQueryAnalysisContext from "../provider/useQueryAnalysisContext";

const schema = Yup.object({
  source_dialect: Yup.string().required(),
  target_dialect: Yup.string().required(),
}).required();

interface QueryTranslateRequest extends Record<string, unknown> {
  source_dialect: string;
  target_dialect: string;
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

  const { executeQueryAnalysis, isLoading } = useQueryAnalysisAction();
  const { chat, onNewGeneration, history } = useQueryAnalysisContext();

  const dialectOptions: OptionType[] = SqlDialects.map((d) => ({
    label: d,
    value: d,
  }));

  const onSubmit = async (data: QueryTranslateRequest) => {
    try {
      panelLogger.info("requesting translate", data);
      const result = await executeQueryAnalysis({
        command: "querytranslate",
        onNewGeneration,
        sessionId: chat?.id,
        history,
        user_request: `Translate from: ${getValues(
          "source_dialect",
        )} to: ${getValues("target_dialect")}`,
        skipFollowupQuestions: true,
        request: data,
      });

      if (result) {
        await executeQueryAnalysis({
          command: "querytranslate:explanation",
          onNewGeneration,
          sessionId: chat?.id,
          history,
          user_request: "",
          skipFollowupQuestions: true,
          request: { ...data, translated_sql: result },
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
        setValue("target_dialect", result as string, { shouldValidate: true });
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
              name="source_dialect"
              render={({ field: { onChange, ref, value } }) => (
                <Select
                  inputId="source-dialect"
                  ref={ref}
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
              name="target_dialect"
              render={({ field: { onChange, ref, value } }) => (
                <Select
                  inputId="destination-dialect"
                  ref={ref}
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
        </Stack>
      </form>
    </div>
  );
};

export default QueryTranslateDialectSelects;
