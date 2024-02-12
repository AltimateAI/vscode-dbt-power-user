import ReactMarkdown from "react-markdown";
import classes from "./markdown.module.scss";
import PreTag from "./PreTag";

interface Props {
  response: string;
}
const MarkdownRenderer = ({ response }: Props): JSX.Element => {
  return (
    <ReactMarkdown
      className={classes.markdown}
      components={{
        pre: ({ node: _, ...preProps }) => {
          return <PreTag {...preProps} />;
        },
      }}
    >
      {response}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
