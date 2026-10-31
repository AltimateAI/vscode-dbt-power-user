import type { LineageRef, Table } from "@altimateai/ui-components/lineage";
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
import { useEffect, useRef, useState } from "react";
import ActionWidget from "./ActionWidget";
import DemoButton from "./components/demo/DemoButton";
import styles from "./lineage.module.scss";
import LineageBanner from "./LineageBanner";
import bannerStyles from "./lineageBanner.module.scss";
import "./tailwind-globals.css";
import {
  LineageBanner as LineageBannerState,
  MissingLineageMessage,
  StaticLineageProps,
} from "./types";
import { useGraphBelowToolbar } from "./useGraphBelowToolbar";

// Where the stale-graph banner sits: a strip across the top of the panel,
// above the graph's toolbar ("top"), or under the toolbar ("underToolbar").
// Either way the graph starts below both.
type BannerPlacement = "top" | "underToolbar";
const BANNER_PLACEMENT = "top" as BannerPlacement;

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
  const lineageRef = useRef<LineageRef>(null);

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
    } & StaticLineageProps,
  ) => {
    setMissingLineageMessage(data.missingLineageMessage);
    setBanner(data.lineageBanner);
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
      // The banner changed while the graph stays as drawn.
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

  const lineageType = renderNode?.details ? "sql" : "dynamic";
  const shownBanner = lineageType === "dynamic" ? banner : undefined;
  // The toolbar is only in the page once the API helper is set up.
  const belowToolbar = useGraphBelowToolbar(
    shownBanner !== undefined && isApiHelperInitialized,
    // The lineage fits the graph to its pane on every rerender.
    () => lineageRef.current?.rerender(),
  );

  if (!isApiHelperInitialized || !renderNode) {
    return null;
  }

  const bannerElement = shownBanner ? (
    <LineageBanner banner={shownBanner} />
  ) : null;
  const offset =
    belowToolbar === undefined ? undefined : { marginTop: belowToolbar };

  return (
    <TooltipProvider>
      <div className={styles.lineageView}>
        {BANNER_PLACEMENT === "top" ? bannerElement : null}
        <div className={styles.graphArea}>
          <ActionWidget
            missingLineageMessage={missingLineageMessage}
            aiEnabled={renderNode.aiEnabled}
            lineageType={lineageType}
            className={shownBanner ? bannerStyles.wrappingToolbar : undefined}
          />
          {lineageType === "sql" ? null : (
            <div className="bottom-right-container">
              <DemoButton />
            </div>
          )}
          {BANNER_PLACEMENT === "underToolbar" && bannerElement ? (
            <div style={offset}>{bannerElement}</div>
          ) : null}
          <div
            className={`${styles.lineageWrap} al-tw-scope`}
            style={BANNER_PLACEMENT === "top" ? offset : undefined}
          >
            <Lineage
              ref={lineageRef}
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
