import { ShinesIcon, YellowEyeIcon } from "@assets/icons";
import {
  Button,
  Card,
  CardBody,
  DropdownButton,
  Form,
  FormGroup,
  Input,
  Label,
  Select,
} from "@uicore";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Languages, Options, Persona } from "./constants";
import classes from "./generateAll.module.scss";

interface Props {
  container?: HTMLElement | null;
}
const GenerateAllButton = ({ container }: Props): JSX.Element => {
  const [showCustomOptions, setShowCustomOptions] = useState(false);
  const onToggleClick = () => {
    setShowCustomOptions((prev) => !prev);
  };

  const getCustomOptions = () => {
    return (
      <Card className={classes.optionsCard}>
        <CardBody>
          <Form>
            <FormGroup>
              <Label>
                Custom hint
                <Input
                  name="hint"
                  placeholder="Describe your model"
                  type="textarea"
                />
              </Label>
            </FormGroup>
            <FormGroup>
              <Label>
                Select column
                <Select options={[]} />
              </Label>
            </FormGroup>
            <FormGroup>
              <Label>
                Language
                <Select options={Languages} />
              </Label>
            </FormGroup>
            <FormGroup>
              <Label>
                Options
                <Select options={Options} />
              </Label>
            </FormGroup>
            <FormGroup>
              <Label>
                Persona
                <Select options={Persona} />
              </Label>
            </FormGroup>
            <Button color="primary">
              Generate <YellowEyeIcon />
            </Button>
          </Form>
        </CardBody>
      </Card>
    );
  };

  return (
    <>
      <DropdownButton onToggleClick={onToggleClick}>
        <ShinesIcon /> Generate All <YellowEyeIcon />
      </DropdownButton>
      {showCustomOptions
        ? createPortal(getCustomOptions(), container ?? document.body)
        : null}
    </>
  );
};

export default GenerateAllButton;
