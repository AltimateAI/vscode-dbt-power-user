import { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import classes from "./markdown.module.scss";
import { IconButton } from "@uicore";
import { CopyIcon } from "@assets/icons";

const PreTag = ({
  children,
  text,
  ...rest
}: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement> & {
  text?: string;
}): JSX.Element => {
  const [isCopied, setIsCopied] = useState(false);

  const setCopied = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <div className={classes.pre}>
      {text ? (
        <div className="code__icons">
          <CopyToClipboard text={text}>
            <IconButton
              title={`${
                !isCopied ? "Copy to clipboard" : "Copied to clipboard"
              }`}
              onClick={() => setCopied()}
            >
              <i
                className={`codicon ${
                  !isCopied ? "codicon-files" : "codicon-pass-filled"
                }`}
              />
              <CopyIcon />
            </IconButton>
          </CopyToClipboard>
        </div>
      ) : null}
      <pre {...rest}>{children}</pre>
    </div>
  );
};

export default PreTag;
