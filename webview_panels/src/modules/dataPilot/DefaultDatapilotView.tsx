import { AltimateIcon, YellowEyeIcon } from "@assets/icons";
import { Stack } from "@uicore";
import classes from "./datapilot.module.scss";

const DefaultDatapilotView = () => {
  return (
    <Stack direction="column" className={classes.defaultView}>
      <Stack>
        <AltimateIcon />
        <div>
          <h1>Welcome to datapilot</h1>
          <p>
            Automate your workflow & Do faster coding <YellowEyeIcon />
          </p>
        </div>
      </Stack>
      <section>
        <h4>Efficient Data Modeling & Validation with dbt</h4>
        <p>
          Master dbt for seamless data modeling and validation. Run and convert
          models with ease. Compile SQL, estimate BigQuery costs, and validate
          code effortlessly. Access outputs and enhance documentation. Ideal for
          all skill levels.
        </p>
      </section>
    </Stack>
  );
};

export default DefaultDatapilotView;
