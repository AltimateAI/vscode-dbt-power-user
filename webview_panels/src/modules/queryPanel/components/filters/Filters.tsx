import { FilterIcon, SearchIcon } from "@assets/icons";
import { IconButton, Input, OptionType, Select, Stack } from "@uicore";
import { ChangeEvent, MouseEvent, useState } from "react";
import { ActionMeta } from "react-select";

export interface QueryFilters {
  tags: string[];
  searchQuery?: string;
}

interface Props {
  tags: string[];
  filters: QueryFilters;
  onFiltersChange: (data: { tags?: string[]; searchQuery?: string }) => void;
}
const Filters = ({
  filters: { tags: selectedTags, searchQuery },
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

  const handleTagsBlur = () => {
    if (selectedTags.length) {
      return;
    }
    setShowForm(false);
  };

  const handleTagsChange = (
    changedTags: unknown,
    triggeredAction: ActionMeta<unknown>,
  ) => {
    if (triggeredAction.action === "clear") {
      setShowForm(false);
    }
    onFiltersChange({
      tags: (changedTags as OptionType[]).map((tag) => tag.value),
    });
  };

  return (
    <Stack className="gap-1" onClick={stopPropagation}>
      {showSearch ? (
        <Input
          type="search"
          placeholder="Search query"
          onChange={handleSearchQueryChange}
          onBlur={handleBlur}
          autoFocus
          style={{ marginBottom: 4.5, maxHeight: 38 }}
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
          autoFocus
          inputId="tags"
          openMenuOnFocus
          isMulti
          options={tags?.map((v) => ({ label: v, value: v }) ?? [])}
          onChange={handleTagsChange}
          onBlur={handleTagsBlur}
        />
      ) : tags.length ? (
        <IconButton title="Search query" onClick={() => setShowForm(true)}>
          <FilterIcon />
        </IconButton>
      ) : null}
    </Stack>
  );
};

export default Filters;
