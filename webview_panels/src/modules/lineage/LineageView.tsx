import { ApiHelper, Lineage, CllEvents, CLL } from "@lib";
import type { Table } from "@lib";
import { useEffect, useState } from "react";
import { MissingLineageMessage, StaticLineageProps } from "./types";
import ActionWidget from "./ActionWidget";
import useAppContext from "@modules/app/useAppContext";
import { panelLogger } from "@modules/logger";
import {
  executeRequestInAsync,
  executeRequestInSync,
} from "@modules/app/requestExecutor";
import styles from "./lineage.module.scss";
import DemoButton from "./components/demo/DemoButton";

const LineageView = (): JSX.Element | null => {
  const {
    state: { theme, isComponentsApiInitialized },
  } = useAppContext();

  const [isApiHelperInitialized, setIsApiHelperInitialized] = useState(false);
  const [renderNode, setRenderNode] = useState<
    {
      node?: Table;
      aiEnabled: boolean;
    } & Partial<StaticLineageProps>
  >({ aiEnabled: true });
  const [missingLineageMessage, setMissingLineageMessage] = useState<
    MissingLineageMessage | undefined
  >();

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
    const event = new CustomEvent("renderStartNode", {
      detail: data,
    });
    document.dispatchEvent(event);
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
        lineageType={lineageType}
      />
      {lineageType === "sql" ? null : (
        <div className="bottom-right-container">
          <DemoButton />
        </div>
      )}
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
          allowSyncColumnsWithDB
        />
      </div>
    </div>
  );
};

export default LineageView;
