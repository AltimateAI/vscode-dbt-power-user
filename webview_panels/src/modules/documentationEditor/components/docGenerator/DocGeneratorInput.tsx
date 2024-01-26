import { DocsGenerateModelRequestV2 } from "@modules/documentationEditor/state/types";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { Input, InputGroup, Stack } from "@uicore";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import GenerateButton, { Variants } from "./GenerateButton";
import classes from "./docGenInput.module.scss";

interface Props {
  value: string;
  onSubmit: (data: DocsGenerateModelRequestV2) => void;
  placeholder?: string;
}
const DocGeneratorInput = ({
  onSubmit,
  value,
  placeholder,
}: Props): JSX.Element => {
  const {
    state: { userInstructions, currentDocsData },
  } = useDocumentationContext();
  const [showButton, setShowButton] = useState(true);
  const [description, setDescription] = useState("");

  useEffect(() => {
    setDescription(value);
  }, [value]);

  const handleSubmit = useCallback(() => {
    const columns = currentDocsData?.columns.map((c) => c.name) ?? [];
    onSubmit({ user_instructions: userInstructions, description, columns });
  }, [description, userInstructions, currentDocsData?.columns]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleHideButton = () => setShowButton(false);
  const handleShowButton = () => setShowButton(true);

  const variant = value ? Variants.ICON : Variants.ICON_WITH_TEXT;

  return (
    <Stack>
      <InputGroup className={classes.inputGroup}>
        <Input
          value={description}
          onChange={onChange}
          onFocus={handleHideButton}
          onBlur={handleShowButton}
          type="textarea"
          rows={description ? 5 : 1}
          placeholder={placeholder}
        />

        {showButton ? (
          <GenerateButton onSubmit={handleSubmit} variant={variant} />
        ) : null}
      </InputGroup>
    </Stack>
  );
};

export default DocGeneratorInput;
