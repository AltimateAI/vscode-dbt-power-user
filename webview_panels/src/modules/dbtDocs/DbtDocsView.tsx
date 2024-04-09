import { DbtDocs } from "@lib";
import { IncomingMessageProps } from "@modules/app/types";
import useAppContext from "@modules/app/useAppContext";
import { useCallback, useEffect, useState } from "react";

const DbtDocsView = (): JSX.Element => {
  const {
    state: { isComponentsApiInitialized },
  } = useAppContext();

  const [shareId, setShareId] = useState<number>();
  const [conversationGroupId, setConversationGroupId] = useState<
    number
  >();
  const [userId, setUserId] = useState<number>();

  const onMesssage = useCallback(
    (event: MessageEvent<IncomingMessageProps>) => {
      const { command, args } = event.data;
      switch (command) {
        case "dbtDocsShareDetails":
          setShareId(args.shareId as number);
          setConversationGroupId(
            args.conversationGroupId as number | undefined,
          );
          setUserId(args.userId as number);
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
