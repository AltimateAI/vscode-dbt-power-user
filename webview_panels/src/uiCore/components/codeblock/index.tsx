import useAppContext from "@modules/app/useAppContext";
import { Themes } from "@modules/app/types";
import { CodeBlock as CodeblockLib } from "@lib";
import classes from "./codeblock.module.scss";

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
  const codeBlockTheme =
    theme === Themes.Dark ? "solarizedDark" : "solarizedLight";
  return (
    <div className={classes.codeblock}>
    <CodeblockLib
      showLineNumbers={false}
      code={code}
      fileName={fileName}
      theme={codeBlockTheme}
      language={language}
    />
    </div>
  );
};

export default CodeBlockComponent;
