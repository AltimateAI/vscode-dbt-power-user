import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ShinesIcon, YellowEyeIcon } from "@assets/icons";
import {
  DocsGenerateModelRequestV2,
  DocsGenerateUserInstructions,
} from "@modules/documentationEditor/state/types";
import {
  Button,
  Card,
  CardBody,
  DropdownButton,
  Form,
  FormGroup,
  Label,
  OptionType,
  Select,
} from "@uicore";
import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Languages, Options, Persona } from "./constants";
import classes from "./generateAll.module.scss";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";

const schema = Yup.object({
  prompt_hint: Yup.string().optional(),
  persona: Yup.string().optional(),
  language: Yup.string().optional(),
  columns: Yup.array().of(Yup.string().required()).optional(),
}).required();

interface FormProps extends DocsGenerateUserInstructions {
  columns?: string[];
}
interface Props {
  container?: HTMLElement | null;
  buttonText?: string;
  showColumns?: boolean;
  onSubmit: (data: DocsGenerateModelRequestV2) => void;
}

const GenerateAllButton = ({
  showColumns,
  container,
  buttonText = "Generate",
  onSubmit,
}: Props): JSX.Element => {
  const {
    state: { currentDocsData },
  } = useDocumentationContext();
  const { control, handleSubmit } = useForm<FormProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      columns: showColumns ? currentDocsData?.columns.map((l) => l.name) : [],
      prompt_hint: Options[0],
      language: Languages[0],
      persona: Persona[0],
    },
  });

  const [showCustomOptions, setShowCustomOptions] = useState(false);
  const onToggleClick = () => {
    setShowCustomOptions((prev) => !prev);
  };

  const onFormSubmit: SubmitHandler<FormProps> = ({ columns, ...rest }) => {
    onSubmit({ columns, user_instructions: rest });
  };

  const columnOptions = useMemo(() => {
    const options = [{ label: "Select all", value: "all" }];
    if (!currentDocsData?.columns) {
      return options;
    }
    return [
      ...options,
      ...currentDocsData.columns.map((l) => ({
        label: l.name,
        value: l.name,
      })),
    ];
  }, [currentDocsData?.columns]);

  const getCustomOptions = () => {
    return (
      <Card className={classes.optionsCard}>
        <CardBody>
          <Form onSubmit={handleSubmit(onFormSubmit)}>
            {/* <FormGroup>
              <Label>
                Custom hint
                <Controller
                  name="prompt_hint"
                  control={control}
                  render={({ field }) => (
                    <Input
                      placeholder="Describe your model"
                      type="textarea"
                      {...field}
                    />
                  )}
                />
              </Label>
            </FormGroup> */}
            {showColumns ? (
              <FormGroup>
                <Label>
                  Select column
                  <Controller
                    control={control}
                    name="columns"
                    render={({
                      field: { onChange: onSelectChange, value },
                    }) => (
                      <Select
                        isMulti
                        value={value?.map((v) => ({ label: v, value: v }))}
                        onChange={(selectedOptions) => {
                          (selectedOptions as OptionType[]).map((option) => {
                            if (option.value == "all") {
                              onSelectChange(
                                columnOptions
                                  .filter((c) => c.value !== "all")
                                  .map((c) => c.value),
                              );
                            } else {
                              onSelectChange(
                                (selectedOptions as OptionType[]).map(
                                  (v) => v.value,
                                ),
                              );
                            }
                          });
                        }}
                        options={columnOptions}
                      />
                    )}
                  />
                </Label>
              </FormGroup>
            ) : null}
            <FormGroup>
              <Label>
                Language
                <Controller
                  control={control}
                  defaultValue={""}
                  name="language"
                  render={({ field: { onChange: onSelectChange } }) => (
                    <Select
                      onChange={(val) =>
                        onSelectChange((val as OptionType).value)
                      }
                      options={Languages.map((l) => ({ label: l, value: l }))}
                    />
                  )}
                />
              </Label>
            </FormGroup>
            <FormGroup>
              <Label>
                Options
                <Controller
                  control={control}
                  defaultValue={""}
                  name="prompt_hint"
                  render={({ field: { onChange: onSelectChange } }) => (
                    <Select
                      onChange={(val) =>
                        onSelectChange((val as OptionType).value)
                      }
                      options={Options.map((l) => ({ label: l, value: l }))}
                    />
                  )}
                />
              </Label>
            </FormGroup>
            <FormGroup>
              <Label>
                Persona
                <Controller
                  control={control}
                  defaultValue={""}
                  name="persona"
                  render={({ field: { onChange: onSelectChange } }) => (
                    <Select
                      onChange={(val) =>
                        onSelectChange((val as OptionType).value)
                      }
                      options={Persona.map((l) => ({ label: l, value: l }))}
                    />
                  )}
                />
              </Label>
            </FormGroup>
            <Button color="primary" type="submit">
              Generate <YellowEyeIcon />
            </Button>
          </Form>
        </CardBody>
      </Card>
    );
  };

  return (
    <>
      <DropdownButton
        onToggleClick={onToggleClick}
        onClick={handleSubmit(onFormSubmit)}
      >
        <ShinesIcon /> {buttonText} <YellowEyeIcon />
      </DropdownButton>
      {showCustomOptions
        ? createPortal(getCustomOptions(), container ?? document.body)
        : null}
    </>
  );
};

export default GenerateAllButton;
