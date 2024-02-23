import { Stack } from "@uicore";

const HelpContent = (): JSX.Element => {
  return (
    <Stack direction="column">
      <p>
        You can write, update, and generate descriptions for your dbt models and
        columns, and save them in YAML files with a click of a button.{" "}
      </p>
      <p>
        <b>Save Documentation:</b> Once you&apos;ve added or edited the
        documentation for your model and columns, hit the
        <b> &quot;Save Documentation&quot;</b> button at the bottom to save in
        schema.yml
      </p>
      <p>
        <b>Sync Columns with Database:</b> Use the sync action to synchronize
        the model with your database and fetch the accurate columns and their
        types.
      </p>
      <p>
        <b>Generate Documentation:</b> This functionality requires an API key.
        You can generate descriptions for models and columns using the generate
        button. You can also bulk generate in a single action using the “Bulk
        Generate” button. If you want to change settings like language, or
        persona, please use the “Settings” button in the right top corner.{" "}
      </p>
      <p>
        If the description is present already, and you click the “regenerate”
        icon, DataPilot panel will be displayed on the left with prompts and
        instructions where you can guide the DataPilot to generate descriptions
        as per your specific preferences.
      </p>
      <p>
        <b>Help Us Improve:</b> We&apos;re eager to hear from you! If
        you&apos;ve tried the AI-generated documentation, let us know how it
        worked. Your feedback helps us improve and ensures we offer a valuable
        tool for the community.
      </p>
      <p>
        Need more help? Check out the&nbsp;
        <a href="https://docs.myaltimate.com/document/generatedoc/">
          documentation
        </a>
        . For any issues or concerns, please{" "}
        <a href="https://app.myaltimate.com/contactus">contact us</a> via chat
        or Slack. Happy documenting!
      </p>
    </Stack>
  );
};

export default HelpContent;
