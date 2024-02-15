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
        pre: ({ node, ...preProps }) => {
          return (
            <PreTag
              {...preProps}
              // @ts-expect-error valid type
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
              text={node?.children?.[0]?.children?.[0]?.value}
            />
          );
        },
      }}
    >
      {response}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
