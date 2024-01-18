import { DocsGenerateModelRequestV2 } from "@modules/documentationEditor/state/types";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { Input, InputGroup, Stack } from "@uicore";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import GenerateAllButton, { Variants } from "./GenerateAllButton";

interface Props {
  value: string;
  onSubmit: (data: DocsGenerateModelRequestV2) => void;
}
const DocGeneratorInput = ({ onSubmit, value }: Props): JSX.Element => {
  const {
    state: { userInstructions },
  } = useDocumentationContext();
  const [description, setDescription] = useState("");

  useEffect(() => {
    setDescription(value);
  }, [value]);

  const handleSubmit = useCallback(() => {
    onSubmit({ user_instructions: userInstructions, description });
  }, [description]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const variant = value ? Variants.ICON : Variants.ICON_WITH_TEXT;

  return (
    <Stack>
      <InputGroup>
        <Input value={description} onChange={onChange} />

        <GenerateAllButton onSubmit={handleSubmit} variant={variant} />
      </InputGroup>
    </Stack>
  );
};

export default DocGeneratorInput;
