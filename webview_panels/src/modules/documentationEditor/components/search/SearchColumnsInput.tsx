import { SearchIcon } from "@assets/icons";
import { setSearchQuery } from "@modules/documentationEditor/state/documentationSlice";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { Input, Stack } from "@uicore";
import styles from "../../styles.module.scss";

const SearchColumnsInput = (): JSX.Element => {
  const { dispatch } = useDocumentationContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <Stack className={styles.search}>
      <SearchIcon />
      <Input
        aria-label="Search by column name"
        role="search"
        type="search"
        onChange={handleChange}
        placeholder="Search by column name"
      />
    </Stack>
  );
};

export default SearchColumnsInput;
