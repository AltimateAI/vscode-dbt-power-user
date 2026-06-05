import { executeRequestInSync } from "@modules/app/requestExecutor";
import { DBTUnitTest } from "@modules/documentationEditor/state/types";
import { panelLogger } from "@modules/logger";
import { CodeBlock, Stack } from "@uicore";
import { useEffect, useState } from "react";

interface Props {
  test: DBTUnitTest;
  modelName: string;
}

interface GetUnitTestCodeResponse {
  yaml?: string;
  error?: string;
}

const UnitTestDetails = ({ test, modelName }: Props): JSX.Element => {
  const [content, setContent] = useState<GetUnitTestCodeResponse | null>(null);

  useEffect(() => {
    executeRequestInSync("getUnitTestCode", {
      path: test.path,
      model: modelName,
      name: test.name,
    })
      .then((result) => setContent(result as GetUnitTestCodeResponse))
      .catch((err) => {
        panelLogger.error("error loading unit test code", err);
        setContent({ error: (err as Error).message });
      });
  }, [test.path, modelName, test.name]);

  return (
    <Stack direction="column">
      {content?.yaml ? (
        <CodeBlock code={content.yaml} language="yaml" fileName={test.name} />
      ) : null}
      {content?.error ? (
        <CodeBlock code={content.error} language="yaml" fileName="Error" />
      ) : null}
    </Stack>
  );
};

export default UnitTestDetails;
