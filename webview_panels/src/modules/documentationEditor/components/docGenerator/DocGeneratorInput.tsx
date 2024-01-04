import { EditIcon } from "@assets/icons";
import { Button, Input, InputGroup, Stack } from "@uicore";
import { useEffect, useRef, useState } from "react";
import GenerateAllButton from "./GenerateAllButton";

const DocGeneratorInput = (): JSX.Element => {
  const ref = useRef(null);
  const [, setForceUpdate] = useState(Date.now());

  useEffect(() => {
    if (ref.current) {
      setForceUpdate(Date.now());
    }
  }, []);

  return (
    <div ref={ref}>
      <Stack>
        <InputGroup>
          <Input />

          <Button outline>
            <EditIcon />
          </Button>
          {ref.current ? <GenerateAllButton container={ref.current} /> : null}
        </InputGroup>
      </Stack>
    </div>
  );
};

export default DocGeneratorInput;
