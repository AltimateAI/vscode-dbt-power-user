import { TooltipProvider } from "@altimateai/lego";
import type { Table } from "@altimateai/ui-components/lineage";
import {
  executeRequestInAsync,
  executeRequestInSync,
} from "@modules/app/requestExecutor";
import useAppContext from "@modules/app/useAppContext";
import { panelLogger } from "@modules/logger";
import { useEffect, useState } from "react";
import ActionWidget from "./ActionWidget";
import DemoButton from "./components/demo/DemoButton";
import styles from "./lineage.module.scss";
import "./tailwind-globals.css";
import { MissingLineageMessage, StaticLineageProps } from "./types";

// Dynamic import to isolate load errors from crashing the entire app.
// ApiHelper is imported here (not statically) to get the same module instance
// that lineage components use internally, enabling runtime patching.
interface LineageModuleExports {
  Lineage: typeof import("@altimateai/ui-components/lineage").Lineage;
  CLL: typeof import("@altimateai/ui-components/lineage").CLL;
  CllEvents: typeof import("@altimateai/ui-components/lineage").CllEvents;
  ApiHelper: typeof import("@altimateai/ui-components/lineage").ApiHelper;
}
let lineageModule: LineageModuleExports | null = null;
let lineageLoadError: unknown = null;

const lineageReady = import("@altimateai/ui-components/lineage")
  .then((mod: LineageModuleExports) => {
    lineageModule = mod;
    panelLogger.info("lineage module loaded successfully");
  })
  .catch((err: unknown) => {
    lineageLoadError = err;
    panelLogger.error("Failed to load lineage module:", err);
  });

const LineageView = (): JSX.Element | null => {
  const {
    state: { theme, isComponentsApiInitialized },
  } = useAppContext();

  const [isApiHelperInitialized, setIsApiHelperInitialized] = useState(false);
  const [isLineageLoaded, setIsLineageLoaded] = useState(!!lineageModule);
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
    if (!lineageModule) {
      void lineageReady.then(() => setIsLineageLoaded(true));
    }
  }, []);

  useEffect(() => {
    if (!isComponentsApiInitialized || !lineageModule) {
      return;
    }
    panelLogger.info("LineageView updating components api helper");
    const { ApiHelper } = lineageModule;
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
  }, [isComponentsApiInitialized, isLineageLoaded]);

  const render = (
    data: {
      node?: Table;
      aiEnabled: boolean;
      missingLineageMessage?: MissingLineageMessage;
    } & StaticLineageProps,
  ) => {
    setMissingLineageMessage(data.missingLineageMessage);
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

  const columnLineage = (data: { event: string }) => {
    if (!lineageModule) return;
    if (data.event === (lineageModule.CllEvents.CANCEL as string)) {
      lineageModule.CLL.onCancel();
    }
  };

  useEffect(() => {
    const commandMap = {
      render,
      columnLineage: (data: { event: string }) => {
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

  if (lineageLoadError) {
    return (
      <div style={{ color: "red", padding: "1em", whiteSpace: "pre-wrap" }}>
        <strong>Failed to load lineage module:</strong>
        <br />
        {String(lineageLoadError)}
        <br />
        {lineageLoadError instanceof Error ? lineageLoadError.stack : ""}
      </div>
    );
  }

  if (!isLineageLoaded || !isApiHelperInitialized || !renderNode) {
    return null;
  }

  const Lineage = lineageModule!.Lineage;
  const lineageType = renderNode.details ? "sql" : "dynamic";

  return (
    <TooltipProvider>
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
        <div className={`${styles.lineageWrap} al-tw-scope`}>
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
    </TooltipProvider>
  );
};

export default LineageView;
