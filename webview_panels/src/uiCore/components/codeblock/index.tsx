import useAppContext from "@modules/app/useAppContext";
import { Themes } from "@modules/app/types";
import classes from "./codeblock.module.scss";
import { ReactNode } from "react";
import { panelLogger } from "@modules/logger";
// import { CodeBlock } from "@altimateai/ui-components";

interface Props {
  code: string;
  language: string;
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
  const editorTheme = theme === Themes.Dark ? "vsc-dark-plus" : "vs";
  panelLogger.info("CodeBlockComponent", {
    code,
    language,
    fileName,
    showLineNumbers,
    titleActions,
    classname,
    codeBlockTheme,
    editorTheme,
  });
  return (
    <div className={classes.codeblock}>
      {/* <CodeBlock
        showLineNumbers={showLineNumbers}
        code={code}
        fileName={fileName}
        theme={codeBlockTheme}
        editorTheme={editorTheme}
        language={language}
        titleActions={titleActions}
        className={classname}
      /> */}
    </div>
  );
};

export default CodeBlockComponent;
