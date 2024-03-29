import { IncomingMessageProps } from "@modules/app/types";
import useAppContext from "@modules/app/useAppContext";
import { useCallback, useEffect, useState } from "react";
import { DbtDocs } from "../../lib/altimate/altimate-components";

const DbtDocsView = (): JSX.Element => {
  const {
    state: { isComponentsApiInitialized },
  } = useAppContext();

  const [shareId, setShareId] = useState("");

  const onMesssage = useCallback(
    (event: MessageEvent<IncomingMessageProps>) => {
      const { command, args } = event.data;
      switch (command) {
        case "renderShareId":
          setShareId(args.shareId as string);
          break;
        default:
          break;
      }
    },
    [],
  );

  useEffect(() => {
    window.addEventListener("message", onMesssage);

    return () => {
      window.removeEventListener("message", onMesssage);
    };
  }, [onMesssage]);

  if (!isComponentsApiInitialized || !shareId) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <DbtDocs shareId={shareId} userId="1"/>
    </div>
  );
};

export default DbtDocsView;
