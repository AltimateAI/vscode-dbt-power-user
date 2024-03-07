import {
  BlogIcon,
  ChevronLeftIcon,
  ContactUsIcon,
  DocsIcon,
  GithubIcon,
  GlobeIcon,
  SlackIcon,
} from "@assets/icons";
import { List, Stack } from "@uicore";
import classes from "./datapilot.module.scss";
import { setShowHelp } from "./dataPilotSlice";
import useDataPilotContext from "./useDataPilotContext";

const HelpSections = [
  {
    icon: <ContactUsIcon />,
    label: "Contact us",
    url: "https://www.altimate.ai/support",
  },
  {
    icon: <DocsIcon />,
    label: "Documentation",
    url: "https://docs.myaltimate.com/",
  },
  {
    icon: <SlackIcon />,
    label: "Slack Channel",
    url: "https://getdbt.slack.com/archives/C05KPDGRMDW",
  },
  {
    icon: <GlobeIcon />,
    label: "Website",
    url: "https://www.altimate.ai/",
  },
  { icon: <BlogIcon />, label: "Blog", url: "https://blog.altimate.ai/" },
  {
    icon: <GithubIcon />,
    label: "Github",
    url: "https://github.com/AltimateAI/vscode-dbt-power-user",
  },
];

const DataPilotHelp = (): JSX.Element => {
  const { dispatch } = useDataPilotContext();
  return (
    <Stack direction="column" className={classes.help}>
      <Stack direction="column">
        <h3>
          <a
            className={classes.back}
            onClick={() => dispatch(setShowHelp(false))}
          >
            <ChevronLeftIcon />
          </a>
          Help
        </h3>
        <h6>Here are some resources to utilize DataPilot more effectively</h6>
      </Stack>
      <List className={classes.links}>
        {HelpSections.map(({ icon, label, url }) => (
          <li key={label} className={classes.link}>
            <a href={url}>
              {icon}
              <p className="p2">{label}</p>
            </a>
          </li>
        ))}
      </List>
    </Stack>
  );
};

export default DataPilotHelp;
