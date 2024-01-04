import {
  LikeIcon,
  SettingsIcon,
  ShinesIcon,
  YellowEyeIcon,
} from "@assets/icons";
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
        <Stack direction="column">
          <h5>Typography</h5>
          <h1>Heading 1 24px 500</h1>
          <h2>Heading 2 20px 500</h2>
          <h3>Heading 3 15px 500</h3>
          <h4>Heading 4 16px 500</h4>
          <h5>Heading 5 14px 500</h5>
          <h6>Heading 6 12px 500</h6>
          <p>Paragraph P1 16px 400</p>
          <div className="p1">.P1 16px 400</div>
          <div>.P2 (default) 14px 400</div>
          <caption>Caption P3 12px 400</caption>
          <div className="p3">Caption .P3 12px 400</div>
          <div className="p4">.P4 10px 400</div>
          <div className="p5">.P5 8px 400</div>
        </Stack>
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
            <ShinesIcon /> Generate All <YellowEyeIcon />
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
