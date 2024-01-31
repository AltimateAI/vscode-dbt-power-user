import { ShinesIcon } from "@assets/icons";
import PreviewFeatureIcon from "@modules/previewFeature/PreviewFeatureIcon";
import { Button } from "@uicore";

export enum Variants {
  ICON,
  TEXT,
  ICON_WITH_TEXT,
}
interface Props {
  variant?: Variants;
  buttonText?: string;
  onSubmit: () => void;
}

const GenerateButton = ({
  variant = Variants.ICON,
  buttonText = "Generate",
  onSubmit,
}: Props): JSX.Element => {
  const getButtonText = () => {
    switch (variant) {
      case Variants.ICON:
        return <ShinesIcon />;
      case Variants.TEXT:
        return (
          <>
            {buttonText} <PreviewFeatureIcon />
          </>
        );
      case Variants.ICON_WITH_TEXT:
        return (
          <>
            <ShinesIcon /> {buttonText} <PreviewFeatureIcon />
          </>
        );
    }
  };
  return (
    <Button color="primary" onClick={onSubmit}>
      {getButtonText()}
    </Button>
  );
};

export default GenerateButton;
