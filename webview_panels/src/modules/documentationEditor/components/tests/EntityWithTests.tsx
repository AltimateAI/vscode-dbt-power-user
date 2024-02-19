import { AddOutlineIcon } from "@assets/icons";
import {
  executeRequestInAsync,
  executeRequestInSync,
} from "@modules/app/requestExecutor";
import { EntityType } from "@modules/dataPilot/components/docGen/types";
import {
  DbtGenericTests,
  DBTModelTest,
} from "@modules/documentationEditor/state/types";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import RightSidePanel from "@modules/panel/RightSidePanel";
import {
  Tag,
  IconButton,
  Stack,
  Card,
  CardTitle,
  CardBody,
  ListGroup,
  ListGroupItem,
  Label,
  Select,
  CardFooter,
  Button,
  Input,
  OptionType,
} from "@uicore";
import { useState } from "react";
import { panelLogger } from "@modules/logger";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";

interface Props {
  title: string;
  tests?: DBTModelTest[];
  type: EntityType;
}

const schema = Yup.object({
  to: Yup.string().optional(),
  field: Yup.string().optional(),
  accepted_values: Yup.string().optional(),
  test: Yup.mixed<DbtGenericTests>()
    .oneOf(Object.values(DbtGenericTests))
    .optional(),
}).required();

interface SaveRequest {
  to?: string;
  field?: string;
  accepted_values?: string;
  test?: DbtGenericTests;
}

const EntityWithTests = ({ title, tests, type }: Props) => {
  const {
    state: { currentDocsData },
  } = useDocumentationContext();
  const [addNewTestPanel, setAddNewTestPanel] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toModelOptions, setModels] = useState<OptionType[]>([]);
  const [toFieldOptions, setToFieldOptions] = useState<OptionType[]>([]);

  const { control, handleSubmit, setValue, watch, reset } =
    useForm<SaveRequest>({
      resolver: yupResolver(schema),
    });

  const handleNewTestClick = async (test: DbtGenericTests) => {
    setValue("test", test);

    if (test === DbtGenericTests.NOT_NULL || test === DbtGenericTests.UNIQUE) {
      await handleSave({ test }).catch((err) =>
        panelLogger.error("error while saving test", test, err, title),
      );
      onClose();
      return;
    }

    if (test === DbtGenericTests.RELATIONSHIPS) {
      const resultModels = (await executeRequestInSync(
        "getModelsFromProject",
        {},
      )) as { models: string[] };
      setModels(resultModels.models.map((m) => ({ label: m, value: m })));
    }
  };

  const handleSave = async (data: SaveRequest) => {
    setIsSaving(true);

    (await executeRequestInSync("saveDocumentation", {
      ...currentDocsData,
      tests: {
        column: title,
        path: tests?.[0].path,
        ...data,
      },
      patchPath: currentDocsData?.patchPath,
      dialogType: "Existing file",
    })) as { saved: boolean };
    executeRequestInAsync("getCurrentModelTests", {});

    setIsSaving(false);
  };

  const onClose = () => {
    if (!isSaving) {
      setAddNewTestPanel(false);
      setValue("test", undefined);
    }
  };

  const handleCancel = () => {
    setValue("test", undefined);
    reset();
  };

  const getColumnsOfModel = async (model: string) => {
    const columnsResult = (await executeRequestInSync("getColumnsOfModel", {
      model,
    })) as { columns: string[] };
    setToFieldOptions(
      columnsResult.columns.map((m) => ({ label: m, value: m })),
    );
  };

  const formType = watch("test");

  const getFormContent = () => {
    if (
      formType !== DbtGenericTests.RELATIONSHIPS &&
      formType !== DbtGenericTests.ACCEPTED_VALUES
    ) {
      return null;
    }
    return (
      <Card>
        <CardTitle>{formType}</CardTitle>
        <CardBody>
          {formType === DbtGenericTests.RELATIONSHIPS ? (
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
                      onChange={(val: unknown) =>
                        onChange((val as OptionType).value)
                      }
                    />
                  )}
                />
              </div>
            </div>
          ) : (
            <Stack direction="column">
              <Label>Add comma separated list of values</Label>
              <Controller
                control={control}
                name="accepted_values"
                render={({ field: { onChange } }) => (
                  <Input
                    onChange={onChange}
                    placeholder="Entire home/apt,Private room,Shared room"
                  />
                )}
              />
            </Stack>
          )}
        </CardBody>
        <CardFooter>
          <Button onClick={handleSubmit(handleSave)}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <>
      {addNewTestPanel ? (
        <RightSidePanel onClose={onClose}>
          <Card>
            <CardTitle>Add new test</CardTitle>
            <CardBody>Column: {title}</CardBody>
          </Card>
          {!formType ? (
            <Card>
              <CardTitle>Select test for next step</CardTitle>
              <CardBody>
                <ListGroup>
                  {Object.values(DbtGenericTests).map((test) => (
                    <ListGroupItem
                      onClick={() => handleNewTestClick(test)}
                      key={test}
                      action
                      tag="button"
                    >
                      {test}
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </CardBody>
            </Card>
          ) : (
            getFormContent()
          )}
        </RightSidePanel>
      ) : null}
      <div>
        <h5>
          {title}
          {type === EntityType.COLUMN ? (
            <IconButton onClick={() => setAddNewTestPanel(true)}>
              <AddOutlineIcon />
            </IconButton>
          ) : null}
        </h5>
        <Stack>
          <p>Tests:</p>
          {tests?.map((test) => (
            <Tag color="primary" key={test.key}>
              {test.key}
            </Tag>
          ))}
        </Stack>
      </div>{" "}
    </>
  );
};

export default EntityWithTests;
