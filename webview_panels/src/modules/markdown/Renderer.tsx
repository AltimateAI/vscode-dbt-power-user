import ReactMarkdown from "react-markdown";
import classes from "./markdown.module.scss";
import PreTag from "./PreTag";
import { CodeBlock } from "@uicore";

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
        code: ({ node, ...codeProps }) => {
          // @ts-expect-error valid type
          const text = node?.children[0].value as string;
          const codeblock = text.includes("\n");
          if (codeblock) {
            return <CodeBlock code={text} language="sql" />;
          }
          return <code {...codeProps} />;
        },
      }}
    >
      {response}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
