import { FilterIcon } from "@assets/icons";
import { OptionType, Select } from "@uicore";
import { MouseEvent, useState } from "react";

interface Props {
  tags: string[];
  onFiltersChange: (tags: string[]) => void;
}
const Filters = ({ tags, onFiltersChange }: Props): JSX.Element | null => {
  const [showForm, setShowForm] = useState(false);

  if (!tags.length) {
    return null;
  }

  const stopPropogation = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleTagsChange = (selectedTags: unknown) => {
    onFiltersChange((selectedTags as OptionType[]).map((tag) => tag.value));
  };

  return (
    <div onClick={stopPropogation}>
      <FilterIcon onClick={() => setShowForm(true)} />
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
