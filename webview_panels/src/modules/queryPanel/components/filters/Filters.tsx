import { FilterIcon, SearchIcon } from "@assets/icons";
import { IconButton, Input, OptionType, Select } from "@uicore";
import { ChangeEvent, MouseEvent, useState } from "react";

interface Props {
  tags: string[];
  searchQuery?: string;
  onFiltersChange: (data: { tags?: string[]; searchQuery?: string }) => void;
}
const Filters = ({
  searchQuery,
  tags,
  onFiltersChange,
}: Props): JSX.Element | null => {
  const [showForm, setShowForm] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const stopPropagation = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleSearchQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ searchQuery: e.target.value });
  };

  const handleBlur = () => {
    if (searchQuery) {
      return;
    }
    setShowSearch(false);
  };

  const handleTagsChange = (selectedTags: unknown) => {
    onFiltersChange({
      tags: (selectedTags as OptionType[]).map((tag) => tag.value),
    });
  };

  return (
    <div className="d-flex" onClick={stopPropagation}>
      {showSearch ? (
        <Input
          type="search"
          placeholder="Search query"
          onChange={handleSearchQueryChange}
          onBlur={handleBlur}
          autoFocus
          style={{ marginBottom: 4.5 }}
        />
      ) : (
        <IconButton title="Search query" onClick={() => setShowSearch(true)}>
          <SearchIcon />
        </IconButton>
      )}
      {showForm ? (
        <Select
          components={{ DropdownIndicator: null }}
          styles={{
            container: (styles) => ({
              ...styles,
              minWidth: 200,
              marginBottom: "1rem",
            }),
          }}
          inputId="tags"
          openMenuOnFocus
          isMulti
          options={tags?.map((v) => ({ label: v, value: v }) ?? [])}
          onChange={handleTagsChange}
        />
      ) : tags.length ? (
        <IconButton title="Search query" onClick={() => setShowForm(true)}>
          <FilterIcon />
        </IconButton>
      ) : null}
    </div>
  );
};

export default Filters;
