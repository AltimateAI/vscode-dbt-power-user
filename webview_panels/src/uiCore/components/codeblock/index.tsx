import useAppContext from "@modules/app/useAppContext";
import { Themes } from "@modules/app/types";
import { CodeBlock as CodeblockLib } from "@lib";
import classes from "./codeblock.module.scss";

interface Props {
  code: string;
  language: Parameters<typeof CodeblockLib>["0"]["language"];
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
  const codeBlockTheme = theme === Themes.Dark ? "vsc-dark-plus" : "vs";
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
