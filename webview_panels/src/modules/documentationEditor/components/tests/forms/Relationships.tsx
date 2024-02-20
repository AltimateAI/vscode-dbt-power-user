import { executeRequestInSync } from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";
import { OptionType, Label, Select } from "@uicore";
import { useEffect, useState } from "react";
import { Control, Controller } from "react-hook-form";
import { SaveRequest } from "./TestForm";

interface Props {
  control: Control<SaveRequest, unknown>;
}
const Relationships = ({ control }: Props): JSX.Element => {
  const [toFieldOptions, setToFieldOptions] = useState<OptionType[]>([]);
  const [toModelOptions, setModels] = useState<OptionType[]>([]);

  const getColumnsOfModel = async (model: string) => {
    const columnsResult = (await executeRequestInSync("getColumnsOfModel", {
      model,
    })) as { columns: string[] };
    setToFieldOptions(
      columnsResult.columns.map((m) => ({ label: m, value: m })),
    );
  };

  useEffect(() => {
    executeRequestInSync("getModelsFromProject", {})
      .then((resultModels) => {
        setModels(
          (resultModels as { models: string[] }).models.map((m) => ({
            label: m,
            value: m,
          })),
        );
      })
      .catch((err) => panelLogger.error("error while getting models", err));
  }, []);

  return (
    <div>
      <div>
        <Label>To</Label>
        <Controller
          control={control}
          name="to"
          render={({ field: { onChange, ref, value } }) => (
            <Select
              ref={ref}
              options={toModelOptions}
              value={toModelOptions.find((c) => c.value === value)}
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
        <Label>Field</Label>
        <Controller
          control={control}
          name="field"
          render={({ field: { onChange, ref, value } }) => (
            <Select
              ref={ref}
              options={toFieldOptions}
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
