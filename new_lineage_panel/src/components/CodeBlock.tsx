import classNames from "classnames";
import { PropsWithChildren, useEffect } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-sql";
import "prismjs/themes/prism-tomorrow.css";
import styles from "./styles.module.scss";

export const CodeBlock = ({ code }: PropsWithChildren<{ code: string }>) => {
  useEffect(() => {
    setTimeout(() => {
      Prism.highlightAll();
    }, 500);
  }, [code]);
  return (
    <div className={styles.modal_views_code_container}>
      <div className="d-flex gap-sm align-items-center">
        <pre
          className={classNames(styles.code_editor_container, "language-sql")}
        >
          <code className={classNames("language-sql", styles.code_editor)}>
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
};
