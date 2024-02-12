import ReactMarkdown from "react-markdown";
import Code from "./Code";
import classes from "./markdown.module.scss";

interface Props {
  response: string;
}
const MarkdownRenderer = ({ response }: Props): JSX.Element => {
  return (
    <ReactMarkdown
      className={classes.markdown}
      components={{
        // Override the default behavior for code blocks
        code({ children, ...props }) {
          if (!children) {
            return null;
          }
          const value = String(children).replace(/\n$/, "");

          return (
            <Code {...props} language={props.lang}>
              {value}
            </Code>
          );
        },
      }}
    >
      {response}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
