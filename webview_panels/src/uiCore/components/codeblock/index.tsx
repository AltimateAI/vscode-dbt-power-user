import { CodeBlock, nord } from "react-code-blocks";
import { Card, CardBody, CardTitle } from "../../";

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
    <Card>
      <CardTitle>{fileName}</CardTitle>
      <CardBody>
        <CodeBlock text={code} theme={nord} language={language} />
      </CardBody>
    </Card>
  );
};

export default CodeBlockComponent;
