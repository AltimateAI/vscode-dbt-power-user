import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { Drawer, DrawerRef } from "@uicore";
import { useEffect, useMemo, useRef } from "react";
import classes from "../../styles.module.scss";
import {
  ConversationGroup,
  ConversationGroupProvider,
  ConversationSources,
  DbtDocsShareDetails,
} from "@lib";
import { panelLogger } from "@modules/logger";
import { executeRequestInAsync } from "@modules/app/requestExecutor";
import {
  updateConversationsRightPanelState,
  updateSelectedConversationGroup,
} from "@modules/documentationEditor/state/documentationSlice";
import useAppContext from "@modules/app/useAppContext";

const ConversationsRightPanel = (): JSX.Element => {
  const {
    state: {
      showConversationsRightPanel,
      conversations: allConversations,
      selectedConversationGroup,
      currentDocsData,
    },
    dispatch,
  } = useDocumentationContext();
  const {
    state: { currentUser, users },
  } = useAppContext();

  // Get only conversation groups specific to this model
  const conversations = useMemo(() => {
    if (!currentDocsData?.uniqueId || !currentDocsData?.resource_type) {
      return {};
    }

    return Object.entries(allConversations).reduce(
      (
        acc: Record<DbtDocsShareDetails["share_id"], ConversationGroup[]>,
        [shareId, conversationGroups],
      ) => {
        // Find conversation groups which are added for this model and has field column
        const conversationGroupsInCurrentModel = conversationGroups.filter(
          (conversationGroup) =>
            conversationGroup.meta.uniqueId === currentDocsData.uniqueId &&
            conversationGroup.meta.resource_type ===
              currentDocsData.resource_type &&
            conversationGroup.meta.field,
        );

        // show the share doc only if atleast one conv group is in this model
        if (conversationGroupsInCurrentModel.length) {
          acc[shareId as unknown as number] = conversationGroupsInCurrentModel;
        }
        return acc;
      },
      {},
    );
  }, [
    allConversations,
    currentDocsData?.resource_type,
    currentDocsData?.uniqueId,
  ]);

  const drawerRef = useRef<DrawerRef | null>(null);

  const onClose = () => {
    dispatch(updateConversationsRightPanelState(false));
  };

  const onResolve = (
    conversationGroupId: ConversationGroup["conversation_group_id"],
  ) => {
    panelLogger.log("onResolve", conversationGroupId);
    executeRequestInAsync("refetchConversations", {});
  };
  const onSelect = (
    shareId: DbtDocsShareDetails["share_id"],
    conversationGroupId: ConversationGroup["conversation_group_id"],
  ) => {
    dispatch(updateSelectedConversationGroup({ conversationGroupId, shareId }));
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
                  selectedConversationGroup?.conversationGroupId ===
                  conversationGroup.conversation_group_id
                }
                currentUser={currentUser ?? undefined}
                onResolve={() =>
                  onResolve(conversationGroup.conversation_group_id)
                }
                onSelect={() =>
                  onSelect(
                    shareId as unknown as number,
                    conversationGroup.conversation_group_id,
                  )
                }
                users={users}
                onReplyAdd={() =>
                  onReplyAdd(conversationGroup.conversation_group_id)
                }
                source={ConversationSources.DOCUMENTATION_EDITOR}
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
