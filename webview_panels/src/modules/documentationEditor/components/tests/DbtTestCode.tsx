import { executeRequestInSync } from "@modules/app/requestExecutor";
import { DBTModelTest } from "@modules/documentationEditor/state/types";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { panelLogger } from "@modules/logger";
import { CodeBlock } from "@uicore";
import { useEffect, useState } from "react";

interface GetTestCodeResponse {
  sql?: string;
  config?: string;
}
const DbtTestCode = ({ test }: { test: DBTModelTest }): JSX.Element | null => {
  const {
    state: { currentDocsData },
  } = useDocumentationContext();
  const [testCode, setTestCode] = useState<
    (GetTestCodeResponse & { error?: string }) | null
  >(null);

  panelLogger.info(testCode);
  const loadTestCode = async () => {
    if (!currentDocsData?.name) {
      return;
    }
    try {
      const result = (await executeRequestInSync("getTestCode", {
        test,
        model: currentDocsData.name,
      })) as GetTestCodeResponse;
      setTestCode(result);
    } catch (err) {
      setTestCode({ error: (err as Error).message });
    }
  };

  useEffect(() => {
    if (!currentDocsData?.name) {
      return;
    }

    loadTestCode().catch((err) =>
      panelLogger.info("error loading test code", err),
    );
  }, [currentDocsData?.name]);

  if (!testCode) {
    return null;
  }

  return (
    <>
      {testCode.config ? (
        <CodeBlock code={testCode.config} language="yaml" fileName="Config" />
      ) : null}
      {testCode.sql ? (
        <CodeBlock code={testCode.sql} language="sql" fileName="Source" />
      ) : null}
      {testCode.error ? (
        <CodeBlock code={testCode.error} language="yaml" fileName="Source" />
      ) : null}
    </>
  );
};

export default DbtTestCode;
