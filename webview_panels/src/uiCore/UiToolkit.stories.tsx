import type { Meta } from "@storybook/react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./theme.scss";
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Select,
  Stack,
  Tag,
} from ".";

const meta = {
  title: "UiToolKit",
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
  render: () => {
    const options = [
      { value: "chocolate", label: "Chocolate" },
      { value: "strawberry", label: "Strawberry" },
      { value: "vanilla", label: "Vanilla" },
    ];
    return (
      <Container>
        <CardTitle tag="h3">
          UI toolkit for VSCode Power user extension
        </CardTitle>
        <br />
        <div>
          <Button color="primary">primary</Button> <Button>secondary</Button>{" "}
          <Button color="success">success</Button>{" "}
          <Button color="info">info</Button>{" "}
          <Button color="warning">warning</Button>{" "}
          <Button color="danger">danger</Button>{" "}
          <Button color="link">link</Button>
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
