import { Lineage } from "@lib";

const LineageView = () => {
  return (
    <div>
      <Lineage theme="dark" renderNode={{ node: undefined, aiEnabled: true }} />
    </div>
  );
};

export default LineageView;
