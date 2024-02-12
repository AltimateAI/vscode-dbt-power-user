import { CodeBlock, nord } from "react-code-blocks";
import { Card, CardBody, CardTitle } from "../../";
import classes from "./codeblock.module.scss";

interface Props {
  code: string;
  language: "sql";
  fileName: string;
}
const CodeBlockComponent = ({
  code,
  language,
  fileName,
}: Props): JSX.Element => {
  return (
    <Card className={classes.codeblock}>
      {fileName ? <CardTitle>{fileName}</CardTitle> : null}
      <CardBody>
        <CodeBlock
          showLineNumbers={false}
          text={code}
          theme={nord}
          language={language}
        />
      </CardBody>
    </Card>
  );
};

export default CodeBlockComponent;
