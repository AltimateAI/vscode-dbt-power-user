import {
  LikeIcon,
  SettingsIcon,
  ShinesIcon,
  PreviewIcon,
  FileCodeIcon,
} from "@assets/icons";
import type { Meta } from "@storybook/react";
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Container,
  Drawer,
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
import Treeview from "../components/treeview";
import { panelLogger } from "@modules/logger";
import { MouseEvent } from "react";

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
    const handleClick = (e: MouseEvent) => {
      panelLogger.log("like clicked", e);
    };
    return (
      <Container style={{ background: "var(--background--base)" }}>
        <CardTitle tag="h3">
          Components for VSCode Power user extension
        </CardTitle>
        <br />
        <Stack>
          <Treeview
            data={[
              { id: "1", name: "Unread" },
              { id: "2", name: "Threads" },
              {
                id: "3",
                name: "Chat Rooms",
                children: [
                  { id: "c1", name: "General" },
                  { id: "c2", name: "Random" },
                  { id: "c3", name: "Open Source Projects" },
                ],
              },
              {
                id: "4",
                name: "Direct Messages",
                children: [
                  {
                    id: "d1",
                    icon: <FileCodeIcon />,
                    name: "Alice",
                    actions: [
                      <IconButton key="like" onClick={handleClick}>
                        <LikeIcon />
                      </IconButton>,
                    ],
                  },
                  { id: "d2", name: "Bob" },
                  { id: "d3", name: "Charlie" },
                ],
              },
            ]}
          />
        </Stack>
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
        <div>
          <Tag>Performance</Tag> &nbsp;
          <Tag color="primary">Primary</Tag>
        </div>
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
        <br />
        <Drawer
          buttonText="Drawer"
          title="Offcanvas title"
          buttonProps={{ title: "drawer button" }}
        >
          hello
        </Drawer>
      </Container>
    );
  },
};
