import { ShinesIcon, YellowEyeIcon } from "@assets/icons";
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

const GenerateAllButton = ({
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
            {buttonText} <YellowEyeIcon />
          </>
        );
      case Variants.ICON_WITH_TEXT:
        return (
          <>
            <ShinesIcon /> {buttonText} <YellowEyeIcon />
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

export default GenerateAllButton;
