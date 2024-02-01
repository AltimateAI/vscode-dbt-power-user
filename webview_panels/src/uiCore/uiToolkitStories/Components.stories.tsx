import { LikeIcon, SettingsIcon, ShinesIcon, PreviewIcon } from "@assets/icons";
import type { Meta } from "@storybook/react";
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Container,
  DropdownButton,
  Form,
  FormGroup,
  IconButton,
  Input,
  Label,
  Select,
  Stack,
  Tag,
} from "..";

const meta = {
  title: "UiToolKit/Components",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
  },
} satisfies Meta;

export default meta;

export const UIKit = {
  render: (): JSX.Element => {
    const options = [
      { value: "chocolate", label: "Chocolate" },
      { value: "strawberry", label: "Strawberry" },
      { value: "vanilla", label: "Vanilla" },
    ];
    return (
      <Container style={{ background: "var(--background--base)" }}>
        <CardTitle tag="h3">
          Components for VSCode Power user extension
        </CardTitle>
        <br />
        <Stack>
          <Button color="primary">primary</Button>
          <Button>secondary</Button>
          <Button color="success">success</Button>{" "}
          <Button color="info">info</Button>{" "}
          <Button color="warning">warning</Button>{" "}
          <Button color="danger">danger</Button>{" "}
          <Button color="link">link</Button>
          <Button outline>Settings</Button>
          <DropdownButton onToggleClick={() => null}>
            <ShinesIcon /> Generate All <PreviewIcon />
          </DropdownButton>
        </Stack>
        <br />
        <div>
          <h5>Icon buttons</h5>
          <IconButton title="Like">
            <LikeIcon />
          </IconButton>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </div>
        <br />
        <div>
          <Label>Single select</Label>
          <Select options={options} />
          <br />
          <Label>Multi select</Label>
          <Select options={options} isMulti />
        </div>
        <br />
        <Card>
          <CardTitle tag="h6">Card title</CardTitle>
          <CardBody>
            <CardText>Card body text</CardText>
          </CardBody>
        </Card>
        <br />
        <Tag color="primary">Performance</Tag>
        <br />
        <Stack
          style={{ padding: 8, border: "1px solid #ccc", borderRadius: 2 }}
        >
          <div>Row Stack 1</div>
          <div>Row Stack 2</div>
          <div>Row Stack 3</div>
          <div>Row Stack 4</div>
        </Stack>
        <br />
        <Stack
          direction="column"
          style={{ padding: 8, border: "1px solid #ccc", borderRadius: 2 }}
        >
          <div>Column Stack 1</div>
          <div>Column Stack 2</div>
          <div>Column Stack 3</div>
          <div>Column Stack 4</div>
        </Stack>
        <br />
        <Form>
          <FormGroup switch>
            <Label>
              Switch
              <Input type="switch" name="form-switch" />
            </Label>
          </FormGroup>
          <FormGroup>
            <Stack>
              <Label for="form-input">Label</Label>
              <Input
                id="form-input"
                name="form-input"
                placeholder=""
                type="text"
                value={""}
              />
            </Stack>
          </FormGroup>
        </Form>
      </Container>
    );
  },
};
