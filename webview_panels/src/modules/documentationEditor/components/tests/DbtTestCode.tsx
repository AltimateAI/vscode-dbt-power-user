import { executeRequestInSync } from "@modules/app/requestExecutor";
import { DBTModelTest } from "@modules/documentationEditor/state/types";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { panelLogger } from "@modules/logger";
import { CodeBlock } from "@uicore";
import { useEffect, useState } from "react";

const DbtTestCode = ({ test }: { test: DBTModelTest }): JSX.Element | null => {
  const {
    state: { currentDocsData },
  } = useDocumentationContext();
  const [testCode, setTestCode] = useState("");

  panelLogger.info(testCode);
  const loadTestCode = async () => {
    if (!currentDocsData?.name) {
      return;
    }
    const result = (await executeRequestInSync("getTestCode", {
      test,
      model: currentDocsData.name,
    })) as { code: string };
    setTestCode(result.code);
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

  return <CodeBlock code={testCode} language="sql" fileName="Details" />;
};

export default DbtTestCode;
