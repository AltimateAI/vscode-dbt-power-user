import { CodeBlock, solarizedDark, solarizedLight } from "react-code-blocks";
import { Card, CardBody, CardTitle } from "../../";
import classes from "./codeblock.module.scss";
import useAppContext from "@modules/app/useAppContext";
import { Themes } from "@modules/app/types";

interface Props {
  code: string;
  language: "sql" | "yaml";
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
  const codeBlockTheme = theme === Themes.Dark ? solarizedDark : solarizedLight;
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
