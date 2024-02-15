import { CodeBlock, a11yLight, a11yDark } from "react-code-blocks";
import { Card, CardBody, CardTitle } from "../../";
import classes from "./codeblock.module.scss";
import useAppContext from "@modules/app/useAppContext";
import { Themes } from "@modules/app/types";

interface Props {
  code: string;
  language: "sql";
  fileName?: string;
}
const CodeBlockComponent = ({
  code,
  language,
  fileName,
}: Props): JSX.Element => {
  const {
    state: { theme },
  } = useAppContext();
  const codeBlockTheme = theme === Themes.Dark ? a11yDark : a11yLight;
  return (
    <Card className={classes.codeblock}>
      {fileName ? <CardTitle>{fileName}</CardTitle> : null}
      <CardBody>
        <CodeBlock
          showLineNumbers={false}
          text={code}
          theme={codeBlockTheme}
          language={language}
        />
      </CardBody>
    </Card>
  );
};

export default CodeBlockComponent;
