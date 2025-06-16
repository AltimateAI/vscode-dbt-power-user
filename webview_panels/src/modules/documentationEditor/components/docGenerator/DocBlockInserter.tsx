import { PopoverWithButton, Stack, Button, List } from "@uicore";
import { RefObject } from "react";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { DocBlock } from "@modules/documentationEditor/state/types";

interface Props {
  inputRef: RefObject<HTMLInputElement | HTMLTextAreaElement>;
  onInsert: (docRef: string) => void;
}

const DocBlockInserter = ({
  inputRef,
  onInsert,
}: Props): JSX.Element | null => {
  const {
    state: { docBlocks },
  } = useDocumentationContext();

  if (!docBlocks.length) {
    return null;
  }

  const handleInsertDocBlock = (docBlock: DocBlock, close: () => void) => {
    const docRef = `{{ doc('${docBlock.name}') }}`;
    onInsert(docRef);
    close();

    // Focus back to the input after insertion
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  return (
    <PopoverWithButton
      button={
        <Button size="sm" color="secondary" outline>
          Doc Block
        </Button>
      }
      title="Insert Doc Block Reference"
    >
      {({ close }) => (
        <List style={{ maxHeight: "200px", overflowY: "auto" }}>
          {docBlocks.map((docBlock) => (
            <li key={docBlock.name}>
              <Button
                className="text-start w-100"
                outline
                onClick={() => handleInsertDocBlock(docBlock, close)}
              >
                <Stack className="align-items-start">
                  <strong>{docBlock.name}</strong>
                  <small className="text-muted">{docBlock.path}</small>
                </Stack>
              </Button>
            </li>
          ))}
        </List>
      )}
    </PopoverWithButton>
  );
};

export default DocBlockInserter;
