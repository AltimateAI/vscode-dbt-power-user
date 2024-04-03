import { ReactNode, useState } from "react";
import classes from "./tabs.module.scss";
import Stack from "../stack/Stack";

const Tabs = ({
  tabs,
  defaultTab = 0,
}: {
  tabs: { label: string; component: ReactNode }[];
  defaultTab?: number;
}): JSX.Element => {
  const [tab, setTab] = useState(defaultTab);
  return (
    <Stack direction="column" className="align-items-start">
      <div className={classes.tabs}>
        {tabs.map((t, i) => (
          <span
            className={`${classes.tab} ${i === tab ? classes.selected : ""}`}
            key={t.label}
            onClick={(e) => {
              e.stopPropagation();
              setTab(i);
            }}
          >
            {t.label}
          </span>
        ))}
      </div>
      {tabs.find((_, i) => i === tab)?.component}
    </Stack>
  );
};

export default Tabs;
