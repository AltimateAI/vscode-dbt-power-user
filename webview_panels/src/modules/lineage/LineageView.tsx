import type { Table } from "@altimateai/ui-components/lineage";
import {
  ApiHelper,
  CLL,
  CllEvents,
  Lineage,
  TooltipProvider,
} from "@altimateai/ui-components/lineage";
import "@altimateai/ui-components/styles.css";
import {
  executeRequestInAsync,
  executeRequestInSync,
} from "@modules/app/requestExecutor";
import useAppContext from "@modules/app/useAppContext";
import { panelLogger } from "@modules/logger";
import { useCallback, useEffect, useState } from "react";
import ActionWidget from "./ActionWidget";
import DemoButton from "./components/demo/DemoButton";
import styles from "./lineage.module.scss";
import LineageStateCard from "./LineageStateCard";
import StaleGraphChip from "./StaleGraphChip";
import "./tailwind-globals.css";
import {
  LineageBanner as LineageBannerState,
  LineageCard,
  MissingLineageMessage,
  StaticLineageProps,
} from "./types";

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
  const [banner, setBanner] = useState<LineageBannerState | undefined>();
  const [card, setCard] = useState<LineageCard | undefined>();
  // A graph drawn earlier stays mounted under the card; while the card covers
  // it, keyboard focus and screen readers skip it.
  const graphLayer = useCallback(
    (el: HTMLDivElement | null) => {
      el?.toggleAttribute("inert", card !== undefined);
    },
    [card],
  );

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
        case "getFunctionDetails":
        case "getColumns":
        case "getConnectedColumns":
        case "sendFeedback":
        case "getLineageSettings":
        case "persistLineageSettings":
        case "init":
        case "openFile":
        case "openChat":
        case "openAltimateCodeChat":
        case "showInfoNotification":
        case "previewFeature":
        case "telemetryEvents":
        case "getRelationships":
          return executeRequestInSync(url, { args: { params: data ?? {} } });
        case "columnLineage":
          return executeRequestInSync(url, { args: data });

        default:
          break;
      }
    };
    // @ts-expect-error TODO: add type generic for executeRequestInSync
    ApiHelper.post = async (url: string, data?: Record<string, unknown>) => {
      switch (url) {
        case "dbt/v4/export-lineage":
          return executeRequestInSync("exportLineage", {
            args: { params: data ?? {} },
          });
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
      lineageBanner?: LineageBannerState;
      lineageCard?: LineageCard;
    } & StaticLineageProps,
  ) => {
    setMissingLineageMessage(data.missingLineageMessage);
    setBanner(data.lineageBanner);
    setCard(data.lineageCard);
    const event = new CustomEvent("renderStartNode", {
      detail: {
        ...data,
        lightdashEnabled: true,
        showCodeModal: true,
        config: { exportFinalLineage: false },
      },
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
      // The out-of-date notice changed while the graph stays as drawn.
      lineageBanner: (data: { banner?: LineageBannerState }) => {
        setBanner(data.banner);
      },
      columnLineage: (data: { event: CllEvents }) => {
        columnLineage(data);
      },
    };

    window.addEventListener(
      "message",
      (
        event: MessageEvent<{ command: string; args: Record<string, unknown> }>,
      ) => {
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
    <TooltipProvider>
      <div className={styles.lineageView}>
        <ActionWidget
          missingLineageMessage={missingLineageMessage}
          aiEnabled={renderNode.aiEnabled}
          lineageType={lineageType}
          showGraphTools={!card}
        />
        {/* Beside the toolbar, over the graph; the graph keeps the panel. */}
        {lineageType === "dynamic" && banner ? (
          <StaleGraphChip banner={banner} />
        ) : null}
        {lineageType === "sql" || card ? null : (
          <div className="bottom-right-container">
            <DemoButton />
          </div>
        )}
        <div className={`${styles.lineageWrap} al-tw-scope`}>
          {card ? <LineageStateCard card={card} /> : null}
          {/* No box of its own, so the graph's layout doesn't change. */}
          <div ref={graphLayer} style={{ display: "contents" }}>
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
      </div>
    </TooltipProvider>
  );
};

export default LineageView;
