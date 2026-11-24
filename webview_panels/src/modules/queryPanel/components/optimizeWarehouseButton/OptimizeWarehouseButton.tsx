import { ZapIcon } from "@assets/icons";
import { executeRequestInSync } from "@modules/app/requestExecutor";
import { sendTelemetryEvent } from "@modules/documentationEditor/components/telemetry";
import { panelLogger } from "@modules/logger";
import { vscode } from "@modules/vscode";
import { TelemetryEvents } from "@telemetryEvents";
import { Button } from "@uicore";
import { useEffect, useState } from "react";

// Snowflake Marketplace listing for the Altimate Native App. Opened in an
// external browser; the app is installed from Snowflake, not from the extension.
const SNOWFLAKE_NATIVE_APP_URL =
  "https://app.snowflake.com/marketplace/listing/GZTYZ1VSPRPWK/altimate-ai-altimate-lite-for-ai-and-warehouse-cost-optimization";

const SNOWFLAKE_ADAPTER = "snowflake";

const OptimizeWarehouseButton = (): JSX.Element | null => {
  const [isSnowflake, setIsSnowflake] = useState(false);

  useEffect(() => {
    executeRequestInSync("getProjectAdapterType", {})
      .then((adapter) =>
        setIsSnowflake(
          typeof adapter === "string" &&
            adapter.toLowerCase() === SNOWFLAKE_ADAPTER,
        ),
      )
      .catch((err) => {
        // Stay hidden when the adapter can't be determined, so the button never
        // surfaces to non-Snowflake users.
        panelLogger.error("error while getting project adapter type", err);
        setIsSnowflake(false);
      });
  }, []);

  const handleClick = () => {
    sendTelemetryEvent(TelemetryEvents["QueryPanel/OptimizeWarehouseClick"]);
    vscode.postMessage({ command: "openURL", url: SNOWFLAKE_NATIVE_APP_URL });
  };

  if (!isSnowflake) {
    return null;
  }

  return (
    <Button
      color="success"
      icon={<ZapIcon />}
      showTextAlways
      onClick={handleClick}
      title="Optimize your Snowflake warehouses with the Altimate Native App"
      aria-label="optimize-warehouse"
    >
      Optimize Warehouse
    </Button>
  );
};

export default OptimizeWarehouseButton;
