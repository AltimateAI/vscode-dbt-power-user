import CommonActionButtons from "@modules/commonActionButtons/CommonActionButtons";
import { Button, Container, Stack, Tag } from "@uicore";
import DocGeneratorColumnsList from "./components/docGenerator/DocGeneratorColumnsList";
import DocGeneratorInput from "./components/docGenerator/DocGeneratorInput";
import ModelOptions from "./components/model/Options";
import classes from "./styles.module.scss";

const DocumentationEditor = (): JSX.Element => (
  <Container className={classes.docGenerator}>
    <Stack className={classes.head}>
      <p>Documentation for jaffle_shop</p>
      <CommonActionButtons />
    </Stack>
    <div className={classes.body}>
      <Stack>
        <h1>
          Documentation for jaffle_shop <Tag color="">DATAPILOT</Tag>
        </h1>
      </Stack>
      <Stack>
        <Button>Save documentation</Button>
        <ModelOptions />
        <caption>Saved to jaffle_shop://models/schema.yml</caption>
      </Stack>
      <Stack direction="column">
        <h4>Description for jaffle_shop</h4>
        <DocGeneratorInput />
      </Stack>
      <DocGeneratorColumnsList />
    </div>
  </Container>
);

export default DocumentationEditor;
