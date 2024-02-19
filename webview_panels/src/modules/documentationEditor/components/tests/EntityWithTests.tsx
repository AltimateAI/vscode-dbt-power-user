import { AddOutlineIcon } from "@assets/icons";
import { executeRequestInSync } from "@modules/app/requestExecutor";
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
  const [addNewTestPanel, setAddNewTestPanel] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // TODO: fill the values
  const toModelOptions = [{ label: "customer", value: "customer" }];
  const toFieldOptions = [{ label: "customer", value: "customer" }];

  const { control, handleSubmit, setValue, watch, reset } =
    useForm<SaveRequest>({
      resolver: yupResolver(schema),
    });

  const handleNewTestClick = async (test: DbtGenericTests) => {
    if (test === DbtGenericTests.NOT_NULL || test === DbtGenericTests.UNIQUE) {
      setIsSaving(true);
      await executeRequestInSync("saveModelTest", {
        column: title,
        test,
        path: tests?.[0].path,
      });
      setIsSaving(false);
    }

    setValue("test", test);
  };

  const handleSave = async (data: SaveRequest) => {
    setIsSaving(true);
    await executeRequestInSync("saveModelTest", {
      column: title,
      path: tests?.[0].path,
      ...data,
      accepted_values: data.accepted_values?.split(",").map((s) => s.trim()),
    });
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

  const formType = watch("test");

  const getFormContent = () => {
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
                      onChange={(val: unknown) =>
                        onChange((val as OptionType).value)
                      }
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
