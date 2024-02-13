import { UserIcon } from "@assets/icons";
import { Stack, Card, CardBody } from "@uicore";
import classes from "../../datapilot.module.scss";

interface Props {
  query: string;
}
const UserQuery = ({ query }: Props): JSX.Element => {
  return (
    <Card className={classes.promptCard}>
      <CardBody>
        <Stack>
          <UserIcon />
          {query}
        </Stack>
      </CardBody>
    </Card>
  );
};

export default UserQuery;
