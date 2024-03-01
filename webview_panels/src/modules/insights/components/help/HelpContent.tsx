import { Stack } from "@uicore";

const HelpContent = (): JSX.Element => {
  return (
    <Stack direction="column">
      <p>
        Defer functionality in dbt allows the user to run a subset of models or
        tests without having to first build their upstream parents. Usually, it
        leads to significant cost and time savings during testing of the dbt
        models. More information about this functionality is availabale in{" "}
        <a href="https://docs.getdbt.com/reference/node-selection/defer/">
          dbt documentation
        </a>
      </p>
      <p>
        <b>Local and SaaS Mode:</b>You can either use this functionality in
        local mode where your manifest files stay in your local computer or you
        can use SaaS instance to store your manifest files so multiple team
        members can benefits from prod or staging data.
      </p>
      <p>
        Turn on favor-state if you need. If it&apos;s turned on, the defer
        functionality will favor using the node defined in the referenced
        integration, even if the node exists in the current project.
      </p>
      <p>
        <b>Help Us Improve:</b> We&apos;re eager to hear from you! If
        you&apos;ve tried the AI-generated documentation, let us know how it
        worked. Your feedback helps us improve and ensures we offer a valuable
        tool for the community.
      </p>
      <p>
        Need more help? Check out the&nbsp;
        <a href="https://docs.myaltimate.com/test/defertoprod/">
          documentation
        </a>
        . For any issues or concerns, please{" "}
        <a href="https://app.myaltimate.com/contactus">contact us</a> via chat
        or Slack.
      </p>
    </Stack>
  );
};

export default HelpContent;
