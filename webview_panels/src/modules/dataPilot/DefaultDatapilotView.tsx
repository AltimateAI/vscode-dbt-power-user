import { Stack } from "@uicore";
import classes from "./datapilot.module.scss";
import DatapilotHeader from "./components/common/Header";

const DefaultDatapilotView = (): JSX.Element => {
  return (
    <Stack direction="column" className={classes.defaultView}>
      <DatapilotHeader />
      <section>
        <h6>Accelerate Your Work</h6>
        <p>
          Hi there, I am your DataPilot and I’m here to help you get things done
          faster. I can help with documentation, query explanation / debugging,
          and dbt model generations. Please check{" "}
          <a href="https://docs.myaltimate.com/document/generatedoc/">
            documentation
          </a>{" "}
          to know more.
        </p>
        <br />
        <p>
          I am still learning, and not perfect. Please share your feedback, so I
          can help you even better.{" "}
        </p>
      </section>

      <section>
        <p>
          To get started, please select code in a file, right click and choose
          DataPilot submenu. For documentation, start from Documentation Editor
          panel.
        </p>
      </section>
    </Stack>
  );
};

export default DefaultDatapilotView;
