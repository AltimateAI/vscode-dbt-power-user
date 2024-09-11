import { Tabs } from "@uicore";
import NotebooksList from "./NotebooksList";
import PreConfiguredNotebooksList from "./PreConfiguredNotebooksList";

const Notebooks = (): JSX.Element => {
  const tabs = [
    {
      label: "User Saved Notebooks",
      component: <NotebooksList />,
    },
    {
      label: "Pre-Configured Notebooks",
      component: <PreConfiguredNotebooksList />,
    },
  ];
  return <Tabs tabs={tabs} />;
};

export default Notebooks;
