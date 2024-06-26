import { FilterIcon, SearchIcon } from "@assets/icons";
import { IconButton, Input, OptionType, Select } from "@uicore";
import { ChangeEvent, MouseEvent, useState } from "react";

interface Props {
  tags: string[];
  onFiltersChange: (data: { tags?: string[]; searchQuery?: string }) => void;
}
const Filters = ({ tags, onFiltersChange }: Props): JSX.Element | null => {
  const [showForm, setShowForm] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const stopPropagation = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleSearchQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ searchQuery: e.target.value });
  };

  const handleTagsChange = (selectedTags: unknown) => {
    onFiltersChange({
      tags: (selectedTags as OptionType[]).map((tag) => tag.value),
    });
  };

  return (
    <div onClick={stopPropagation}>
      <IconButton title="Search query" onClick={() => setShowSearch(true)}>
        <SearchIcon />
      </IconButton>
      {showSearch ? (
        <Input
          type="text"
          placeholder="Search query"
          onChange={handleSearchQueryChange}
        />
      ) : null}
      {tags.length ? <FilterIcon onClick={() => setShowForm(true)} /> : null}
      {showForm ? (
        <Select
          inputId="tags"
          openMenuOnFocus
          isMulti
          options={tags?.map((v) => ({ label: v, value: v }) ?? [])}
          onChange={handleTagsChange}
        />
      ) : null}
    </div>
  );
};

export default Filters;
