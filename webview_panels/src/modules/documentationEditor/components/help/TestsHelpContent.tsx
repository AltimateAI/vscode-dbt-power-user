import { Stack } from "@uicore";
import { TelemetryEvents } from "../../../../../../src/telemetry/events";
import { sendTelemetryEvent } from "../telemetry";

const TestHelpContent = (): JSX.Element => {
  return (
    <Stack direction="column">
      <p>
        You can add or view tests for your dbt model columns with this
        functionality.
      </p>
      <p>
        <b>View Tests:</b> You can view already written tests for the dbt model
        and columns in this panel.
      </p>
      <p>
        <b>Add Tests:</b> You can easily add or edit generic dbt tests - unique,
        not_null, accepted_values and relationships . You can also generate code
        for custom tests from various packages like dbt expectations, dbt utils
        using DataPilot chat. Generating custom tests requires an API key.
      </p>
      <p>
        <b>Save Tests:</b> Once you&apos;ve added or edited generic tests, hit
        the <b>&quot;Save Tests&quot;</b> button at the bottom to save in yaml
        file. Generated custom tests need to be added to yaml files manually.
      </p>
      <p>
        <b>Sync Columns with Database:</b> Use the sync action to synchronize
        the model with your database and fetch the accurate columns and their
        types.
      </p>
      <p>
        <b>Help Us Improve:</b> We&apos;re eager to hear from you! If
        you&apos;ve tried the tests generation, let us know how it worked. Your
        feedback helps us improve and ensures we offer a valuable tool for the
        community.
      </p>
      <p>
        Need more help? Check out the&nbsp;
        <a
          onClick={() =>
            sendTelemetryEvent(
              TelemetryEvents[
                "DocumentationEditor/HelpDocumentationLinkInTestsClick"
              ],
            )
          }
          href="https://docs.myaltimate.com/test/generatetest"
        >
          documentation
        </a>
        . For any issues or concerns, please{" "}
        <a
          onClick={() =>
            sendTelemetryEvent(
              TelemetryEvents[
                "DocumentationEditor/HelpContactusLinkInTestsClick"
              ],
            )
          }
          href="https://app.myaltimate.com/contactus"
        >
          contact us
        </a>{" "}
        via chat or Slack. Happy documenting!
      </p>
    </Stack>
  );
};

export default TestHelpContent;
