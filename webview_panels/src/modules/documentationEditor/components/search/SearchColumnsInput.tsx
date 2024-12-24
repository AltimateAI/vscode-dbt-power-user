import { setSearchQuery } from "@modules/documentationEditor/state/documentationSlice";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { Input } from "@uicore";

const SearchColumnsInput = (): JSX.Element => {
  const { dispatch } = useDocumentationContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return <Input onChange={handleChange} placeholder="Search by column name" />;
};

export default SearchColumnsInput;
