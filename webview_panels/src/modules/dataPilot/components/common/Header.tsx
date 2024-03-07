import { AltimateIcon } from "@assets/icons";
import PreviewFeatureIcon from "@modules/previewFeature/PreviewFeatureIcon";
import { Stack } from "@uicore";

const DatapilotHeader = (): JSX.Element => {
  return (
    <Stack style={{ alignItems: "end" }}>
      <AltimateIcon />
      <div>
        <h3>Hello, there!</h3>
        <h6>
          How can I help you today? <PreviewFeatureIcon />
        </h6>
      </div>
    </Stack>
  );
};

export default DatapilotHeader;
