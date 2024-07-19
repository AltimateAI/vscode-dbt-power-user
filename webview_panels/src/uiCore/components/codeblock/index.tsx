import useAppContext from "@modules/app/useAppContext";
import { Themes } from "@modules/app/types";
import { CodeBlock as CodeblockLib } from "@lib";
import classes from "./codeblock.module.scss";
import { ReactNode } from "react";

interface Props {
  code: string;
  language: Parameters<typeof CodeblockLib>["0"]["language"];
  fileName?: string;
  showLineNumbers?: boolean;
  titleActions?: ReactNode;
}
const CodeBlockComponent = ({
  code,
  language,
  fileName,
  showLineNumbers,
  titleActions,
}: Props): JSX.Element => {
  const {
    state: { theme },
  } = useAppContext();
  const codeBlockTheme = theme === Themes.Dark ? "vsc-dark-plus" : "vs";
  return (
    <div className={classes.codeblock}>
      <CodeblockLib
        showLineNumbers={showLineNumbers}
        code={code}
        fileName={fileName}
        theme={theme}
        editorTheme={codeBlockTheme}
        language={language}
        titleActions={titleActions}
      />
    </div>
  );
};

export default CodeBlockComponent;
