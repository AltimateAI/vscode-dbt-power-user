import { EditIcon } from "@assets/icons";
import { DocsGenerateModelRequestV2 } from "@modules/documentationEditor/state/types";
import { Button, Input, InputGroup, Stack } from "@uicore";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import GenerateAllButton from "./GenerateAllButton";

interface Props {
  value: string;
  showColumns?: boolean;
  onSubmit: (data: DocsGenerateModelRequestV2) => void;
}
const DocGeneratorInput = ({
  showColumns,
  onSubmit,
  value,
}: Props): JSX.Element => {
  const [description, setDescription] = useState("");
  const ref = useRef(null);
  const [, setForceUpdate] = useState(Date.now());

  useEffect(() => {
    setDescription(value);
  }, [value]);

  useEffect(() => {
    if (ref.current) {
      setForceUpdate(Date.now());
    }
  }, []);

  const handleSubmit = useCallback(
    (data: DocsGenerateModelRequestV2) => {
      onSubmit({ ...data, description });
    },
    [description],
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  return (
    <div ref={ref}>
      <Stack>
        <InputGroup>
          <Input value={description} onChange={onChange} />

          <Button outline>
            <EditIcon />
          </Button>
          {ref.current ? (
            <GenerateAllButton
              onSubmit={handleSubmit}
              container={ref.current}
              showColumns={showColumns}
            />
          ) : null}
        </InputGroup>
      </Stack>
    </div>
  );
};

export default DocGeneratorInput;
