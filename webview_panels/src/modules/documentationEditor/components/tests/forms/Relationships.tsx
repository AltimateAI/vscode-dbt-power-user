import { executeRequestInSync } from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";
import { OptionType, Label, Select } from "@uicore";
import { useEffect, useMemo, useState } from "react";
import { Control, Controller } from "react-hook-form";
import { SaveRequest } from "../types";

interface Props {
  control: Control<SaveRequest, unknown>;
  toValue?: string;
  fieldValue?: string;
}
const Relationships = ({
  control,
  toValue,
  fieldValue,
}: Props): JSX.Element => {
  const [toFieldOptions, setToFieldOptions] = useState<OptionType[]>([]);
  const [toModelOptions, setModels] = useState<OptionType[]>([]);
  const [toSourceOptions, setSources] = useState<OptionType[]>([]);

  const getColumnsOfModel = async (model: string) => {
    const iterator = model.matchAll(/['"]([^'"]*)['"]/g);
    const matches = [];
    for (const match of iterator) {
      matches.push(match.map((m) => m.toString()));
    }
    if (!matches.length) {
      panelLogger.info("No model name parsed", matches);
      return;
    }

    // Refs
    if (matches.length === 1) {
      const columnsResult = (await executeRequestInSync("getColumnsOfModel", {
        model: matches[0][1],
      })) as { columns: string[] };
      setToFieldOptions(
        columnsResult.columns.map((m) => ({ label: m, value: m })),
      );
      return;
    }
    // sources
    if (matches.length > 1) {
      const columnsResult = (await executeRequestInSync("getColumnsOfSources", {
        source: matches[0][1],
        table: matches[1][1],
      })) as { columns: string[] };
      setToFieldOptions(
        columnsResult.columns.map((m) => ({ label: m, value: m })),
      );
      return;
    }
  };

  useEffect(() => {
    Promise.all([
      executeRequestInSync("getModelsInProject", {}),
      executeRequestInSync("getSourcesInProject", {}),
    ])
      .then(([modelsResponse, sourcesResponse]) => {
        setModels(
          (modelsResponse as { models: string[] }).models.map((m) => ({
            label: `ref('${m}')`,
            value: `ref('${m}')`,
          })),
        );
        setSources(
          (
            sourcesResponse as {
              sources: {
                name: string;
                tables: string[];
              }[];
            }
          ).sources
            .map(({ name, tables }) => {
              return tables.map((t) => ({
                label: `source('${name}', '${t}')`,
                value: `source('${name}', '${t}')`,
              }));
            })
            .flat(),
        );
      })
      .catch((err) => panelLogger.error("error while getting models", err));
  }, []);

  useEffect(() => {
    if (toValue) {
      getColumnsOfModel(toValue).catch((err) =>
        panelLogger.info("error while getting columns", err),
      );
    }
  }, [toValue]);

  const toOptions = useMemo(() => {
    return [...toModelOptions, ...toSourceOptions];
  }, [toModelOptions, toSourceOptions]);
  return (
    <div>
      <div style={{ marginBottom: "var(--spacing-xl)" }}>
        <Label htmlFor="relationship-to">To</Label>
        <Controller
          control={control}
          name="to"
          render={({ field: { onChange, ref, value } }) => (
            <Select
              inputId="relationship-to"
              ref={ref}
              openMenuOnFocus
              options={toOptions}
              value={toOptions.find((c) => c.value === value)}
              defaultValue={
                toValue ? { label: toValue, value: toValue } : undefined
              }
              onChange={(val: unknown) => {
                const selectedModel = (val as OptionType).value;
                getColumnsOfModel(selectedModel).catch((err) =>
                  panelLogger.error(
                    `error while fetching colums of model: ${selectedModel}`,
                    err,
                  ),
                );
                return onChange(selectedModel);
              }}
            />
          )}
        />
      </div>
      <div>
        <Label htmlFor="relationship-field">Field</Label>
        <Controller
          control={control}
          name="field"
          render={({ field: { onChange, ref, value } }) => (
            <Select
              inputId="relationship-field"
              ref={ref}
              openMenuOnFocus
              options={toFieldOptions}
              defaultValue={
                fieldValue
                  ? { label: fieldValue, value: fieldValue }
                  : undefined
              }
              value={toFieldOptions.find((c) => c.value === value)}
              onChange={(val: unknown) => onChange((val as OptionType).value)}
            />
          )}
        />
      </div>
    </div>
  );
};

export default Relationships;
