import { RefreshIcon } from "@assets/icons";
import { Alert, Button, Stack } from "@uicore";
import DocGeneratorColumn from "./DocGeneratorColumn";
import GenerateAllButton from "./GenerateAllButton";

const DocGeneratorColumnsList = (): JSX.Element => {
  const columns = [{ name: "Order_id" }, { name: "Customer_id" }];

  return (
    <div>
      <Stack>
        <h1>Columns</h1>
        <Button color="warning">
          <RefreshIcon /> Sync with the Database
        </Button>
        <GenerateAllButton />
      </Stack>
      <Alert color="warning">
        Note: If you need to override existing documentation, please
        (re)generate documentation at individual column level
      </Alert>
      <Stack direction="column">
        {columns.map((column) => (
          <DocGeneratorColumn key={column.name} column={column} />
        ))}
      </Stack>
    </div>
  );
};

export default DocGeneratorColumnsList;
