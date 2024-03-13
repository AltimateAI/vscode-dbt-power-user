import { executeRequestInSync } from "@modules/app/requestExecutor";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { Button, OptionType, Select, Spinner, Stack } from "@uicore";
import { useEffect, useState } from "react";
import { Control, Controller, UseFormSetValue } from "react-hook-form";
import { SaveRequest } from "../types";

interface Props {
  control: Control<SaveRequest, unknown>;
  column: string;
  values?: string[];
  setValue: UseFormSetValue<SaveRequest>;
}
const AcceptedValues = ({
  control,
  column,
  setValue,
  values,
}: Props): JSX.Element => {
  const {
    state: { currentDocsData },
  } = useDocumentationContext();
  const [, setRefresh] = useState(Date.now());
  const [isLoading, setIsLoading] = useState(false);
  const getDistinctColumnValues = async () => {
    setIsLoading(true);
    const result = (await executeRequestInSync("getDistinctColumnValues", {
      model: currentDocsData?.name,
      column,
    })) as string[] | undefined;
    setIsLoading(false);

    if (result?.length && values?.length) {
      const items = ["Yes, overwrite", "Cancel"];
      const response = await executeRequestInSync("showInformationMessage", {
        infoMessage: "Overwrite the existing values?",
        items,
      });
      if (response !== items[0]) {
        return;
      }
    }
    setValue("accepted_values", result);
  };

  useEffect(() => {
    setRefresh(Date.now());
  }, [values]);
  return (
    <div>
      <Controller
        control={control}
        name="accepted_values"
        render={({ field: { onChange, ref } }) => (
          <Select
            components={{
              DropdownIndicator: null,
              Menu: () => null,
            }}
            ref={ref}
            hideOptionIcon
            isCreatable
            isClearable
            value={values?.map((v) => ({ label: v, value: v }) ?? [])}
            defaultValue={values?.map((v) => ({ label: v, value: v }) ?? [])}
            isMulti
            onChange={(updates: unknown) => {
              const newValues = ((updates ?? []) as OptionType[])?.map(
                (val) => val.value,
              );
              setValue("accepted_values", newValues);

              return onChange(newValues);
            }}
            placeholder="Type a value and press enter to add"
          />
        )}
      />
      <Stack className="mt-2 justify-content-between align-items-baseline">
        <p className="p4">Hit enter to add value</p>

        <Button disabled={isLoading} onClick={getDistinctColumnValues}>
          {isLoading ? <Spinner /> : "Get distinct column values"}
        </Button>
      </Stack>
    </div>
  );
};

export default AcceptedValues;
