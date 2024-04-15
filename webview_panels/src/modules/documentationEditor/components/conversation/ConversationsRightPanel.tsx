import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { Drawer, DrawerRef } from "@uicore";
import { useEffect, useRef } from "react";
import classes from "../../styles.module.scss";
import { ConversationGroup, ConversationGroupProvider } from "@lib";
import { panelLogger } from "@modules/logger";
import { executeRequestInAsync } from "@modules/app/requestExecutor";
import {
  updateConversationsRightPanelState,
  updateSelectedConversationGroupId,
} from "@modules/documentationEditor/state/documentationSlice";
import useAppContext from "@modules/app/useAppContext";

const ConversationsRightPanel = (): JSX.Element => {
  const {
    state: {
      showConversationsRightPanel,
      conversations,
      selectedConversationGroupId,
    },
    dispatch,
  } = useDocumentationContext();
  const {
    state: { currentUser, users },
  } = useAppContext();
  const drawerRef = useRef<DrawerRef | null>(null);

  const onClose = () => {
    dispatch(updateConversationsRightPanelState(false));
  };

  const onResolve = (
    conversationGroupId: ConversationGroup["conversation_group_id"],
  ) => {
    panelLogger.log("onReonResolveplyAdd", conversationGroupId);
    executeRequestInAsync("refetchConversations", {});
  };
  const onSelect = (
    conversationGroupId: ConversationGroup["conversation_group_id"],
  ) => {
    dispatch(updateSelectedConversationGroupId(conversationGroupId));
  };

  const onReplyAdd = (
    conversationGroupId: ConversationGroup["conversation_group_id"],
  ) => {
    panelLogger.log("onReplyAdd", conversationGroupId);
    executeRequestInAsync("refetchConversations", {});
  };

  useEffect(() => {
    if (!drawerRef.current) {
      return;
    }

    if (showConversationsRightPanel) {
      drawerRef.current.open();
      return;
    }
    drawerRef.current.close();
  }, [showConversationsRightPanel]);

  return (
    <Drawer ref={drawerRef} onClose={onClose}>
      <div className={classes.conversationsList}>
        {Object.keys(conversations).length ? (
          Object.entries(conversations).map(([shareId, conversationGroups]) =>
            conversationGroups.map((conversationGroup) => (
              <ConversationGroupProvider
                key={conversationGroup.conversation_group_id}
                conversationGroup={conversationGroup}
                shareId={shareId as unknown as number}
                isSelected={
                  selectedConversationGroupId ===
                  conversationGroup.conversation_group_id
                }
                currentUser={currentUser ?? undefined}
                onResolve={() =>
                  onResolve(conversationGroup.conversation_group_id)
                }
                onSelect={() =>
                  onSelect(conversationGroup.conversation_group_id)
                }
                users={users}
                onReplyAdd={() =>
                  onReplyAdd(conversationGroup.conversation_group_id)
                }
              />
            )),
          )
        ) : (
          <div>No conversations yet!</div>
        )}
      </div>
    </Drawer>
  );
};

export default ConversationsRightPanel;
