import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import classes from "./markdown.module.scss";
import { IconButton } from "@uicore";

interface Props {
  children: string;
  language?: string;
}
const Code = ({ children, language }: Props): JSX.Element => {
  const [isCopied, setIsCopied] = useState(false);

  SyntaxHighlighter.registerLanguage("jsx", jsx);

  const setCopied = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <div className={classes.code}>
      <div className="code__icons">
        <CopyToClipboard text={children}>
          <IconButton
            title={`${!isCopied ? "Copy to clipboard" : "Copied to clipboard"}`}
            onClick={() => setCopied()}
          >
            <i
              className={`codicon ${
                !isCopied ? "codicon-files" : "codicon-pass-filled"
              }`}
            />
          </IconButton>
        </CopyToClipboard>
      </div>

      <SyntaxHighlighter language={language}>{children}</SyntaxHighlighter>
    </div>
  );
};

export default Code;
