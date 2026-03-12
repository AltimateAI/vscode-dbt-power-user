import { CodeBlock as CodeblockLib } from "@lib";
import { Themes } from "@modules/app/types";
import useAppContext from "@modules/app/useAppContext";
import { ReactNode } from "react";
import classes from "./codeblock.module.scss";

interface Props {
  code: string;
  language: Parameters<typeof CodeblockLib>["0"]["language"];
  fileName?: string;
  showLineNumbers?: boolean;
  titleActions?: ReactNode;
  classname?: string;
}
const CodeBlockComponent = ({
  code,
  language,
  fileName,
  showLineNumbers,
  titleActions,
  classname,
}: Props): JSX.Element => {
  const {
    state: { theme },
  } = useAppContext();
  const codeBlockTheme = theme === Themes.Dark ? "dark" : "light";
  const editorTheme = theme === Themes.Dark ? "vsc-dark-plus" : "tomorrow";
  return (
    <div className={classes.codeblock}>
      <CodeblockLib
        showLineNumbers={showLineNumbers}
        code={code}
        fileName={fileName}
        theme={codeBlockTheme}
        editorTheme={editorTheme}
        language={language}
        titleActions={titleActions}
        className={classname}
      />
    </div>
  );
};

export default CodeBlockComponent;
