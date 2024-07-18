import { PlayCircleIcon } from "@assets/icons";
import { ApiHelper, Lineage, CllEvents, CLL } from "@lib";
import type { Table } from "@lib";
import { Button } from "@uicore";
import { useEffect, useState } from "react";
import { MissingLineageMessage, StaticLineageProps } from "./types";
import ActionWidget from "./ActionWidget";
import { Demo } from "./Demo";
import useAppContext from "@modules/app/useAppContext";
import { panelLogger } from "@modules/logger";
import {
  executeRequestInAsync,
  executeRequestInSync,
} from "@modules/app/requestExecutor";
import styles from "./lineage.module.scss";
import { Modal } from "./components/PageModal";

const LineageView = (): JSX.Element | null => {
  const {
    state: { theme, isComponentsApiInitialized },
  } = useAppContext();

  const [isApiHelperInitialized, setIsApiHelperInitialized] = useState(false);
  const [renderNode, setRenderNode] = useState<
    | ({
        node?: Table;
        aiEnabled: boolean;
      } & Partial<StaticLineageProps>)
    | undefined
  >();
  const [missingLineageMessage, setMissingLineageMessage] = useState<
    MissingLineageMessage | undefined
  >();
  const [showDemoButton, setShowDemoButton] = useState(true);
  const [showDemoModal, setShowDemoModal] = useState(false);

  useEffect(() => {
    if (!isComponentsApiInitialized) {
      return;
    }
    panelLogger.info("LineageView updating components api helper");
    // @ts-expect-error TODO: add type generic for executeRequestInSync
    ApiHelper.get = async (url: string, data?: Record<string, unknown>) => {
      switch (url) {
        case "upstreamTables":
        case "downstreamTables":
        case "getExposureDetails":
        case "getColumns":
        case "getConnectedColumns":
        case "sendFeedback":
        case "getLineageSettings":
        case "persistLineageSettings":
        case "init":
        case "openFile":
        case "openChat":
        case "showInfoNotification":
        case "previewFeature":
        case "telemetryEvents":
          return executeRequestInSync(url, { args: { params: data ?? {} } });
        case "columnLineage":
          return executeRequestInSync(url, { args: data });

        default:
          break;
      }
    };
    setIsApiHelperInitialized(true);
  }, [isComponentsApiInitialized]);

  const render = (
    data: {
      node?: Table;
      aiEnabled: boolean;
      missingLineageMessage?: MissingLineageMessage;
    } & StaticLineageProps,
  ) => {
    setMissingLineageMessage(data.missingLineageMessage);
    setRenderNode(data);
  };

  const columnLineage = ({ event }: { event: CllEvents }) => {
    if (event === CllEvents.CANCEL) {
      CLL.onCancel();
    }
  };

  useEffect(() => {
    const commandMap = {
      render,
      columnLineage: (data: { event: CllEvents }) => {
        columnLineage(data);
      },
    };

    window.addEventListener(
      "message",
      (
        event: MessageEvent<{ command: string; args: Record<string, unknown> }>,
      ) => {
        if (!event.origin.startsWith("vscode-webview://")) {
          panelLogger.debug("invalid message ", event);
          return;
        }

        panelLogger.log("lineage:message -> ", JSON.stringify(event.data));
        const { command, args } = event.data;

        if (command in commandMap) {
          (
            commandMap[command as keyof typeof commandMap] as (
              args: Record<string, unknown>,
            ) => void
          )(args);
        }
      },
    );

    panelLogger.info("lineage:onload");
    document.documentElement.classList.add(styles.lineageBody);
    executeRequestInAsync("init", {});
    // hide demo button after 10s
    setTimeout(() => {
      setShowDemoButton(false);
    }, 10000);
  }, []);

  if (!isApiHelperInitialized || !renderNode) {
    return null;
  }

  const lineageType = renderNode.details ? "sql" : "dynamic";

  return (
    <div className={styles.lineageView}>
      <ActionWidget
        missingLineageMessage={missingLineageMessage}
        aiEnabled={renderNode.aiEnabled}
      />
      <div className="bottom-right-container">
        {showDemoButton && (
          <Button
            color="primary"
            className="d-flex gap-sm align-items-center"
            onClick={(e) => {
              e.stopPropagation();
              setShowDemoModal((b) => !b);
            }}
          >
            Quick demo of Column Lineage
            <PlayCircleIcon />
          </Button>
        )}
      </div>
      <div className={styles.lineageWrap}>
        <Lineage
          theme={theme}
          dynamicLineage={renderNode}
          lineageType={lineageType}
          sqlLineage={
            lineageType === "sql"
              ? (renderNode as StaticLineageProps)
              : undefined
          }
        />
        <Modal isOpen={showDemoModal} close={() => setShowDemoModal(false)}>
          <Demo />
        </Modal>
      </div>
    </div>
  );
};

export default LineageView;
