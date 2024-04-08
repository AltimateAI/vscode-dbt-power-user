import { IncomingMessageProps } from "@modules/app/types";
import useAppContext from "@modules/app/useAppContext";
import { useCallback, useEffect, useState } from "react";
import { DbtDocs } from "../../lib/altimate/altimate-components";

const DbtDocsView = (): JSX.Element => {
  const {
    state: { isComponentsApiInitialized },
  } = useAppContext();

  const [shareId, setShareId] = useState("");
  const [conversationGroupId, setConversationGroupId] = useState<
    string | undefined
  >();
  const [userId, setUserId] = useState("");

  const onMesssage = useCallback(
    (event: MessageEvent<IncomingMessageProps>) => {
      const { command, args } = event.data;
      switch (command) {
        case "dbtDocsShareDetails":
          setShareId(args.shareId as string);
          setConversationGroupId(
            args.conversationGroupId as string | undefined,
          );
          setUserId(args.userId as string);
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
      <DbtDocs
        shareId={shareId}
        userId={userId}
        conversationGroupId={conversationGroupId}
        // @ts-expect-error valid type
        source={"extension"}
      />
    </div>
  );
};

export default DbtDocsView;
