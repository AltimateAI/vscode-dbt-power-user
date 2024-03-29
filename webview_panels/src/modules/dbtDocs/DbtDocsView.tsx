import useAppContext from "@modules/app/useAppContext";
import { DbtDocs } from "../../lib/altimate/altimate-components";

const DbtDocsView = (): JSX.Element => {
  const {
    state: { isComponentsApiInitialized },
  } = useAppContext();

  if (!isComponentsApiInitialized) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <DbtDocs shareId="1" />
    </div>
  );
};

export default DbtDocsView;
