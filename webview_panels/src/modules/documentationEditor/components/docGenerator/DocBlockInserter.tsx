import { PopoverWithButton, Stack, Button, Input } from "@uicore";
import { RefObject, useState, useMemo } from "react";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { DocBlock } from "@modules/documentationEditor/state/types";
import { HTMLAttributes } from "react";
import { SearchIcon } from "@assets/icons";
import styles from "../../styles.module.scss";

const DocBlockIcon = (props: HTMLAttributes<HTMLElement>): JSX.Element => (
  <i className={`codicon codicon-book`} {...props} />
);

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
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredDocBlocks = useMemo(() => {
    if (!searchTerm.trim()) {
      return docBlocks;
    }
    return docBlocks.filter(
      (docBlock) =>
        docBlock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        docBlock.path.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [docBlocks, searchTerm]);

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
        <Button 
          color="primary" 
          title="Insert doc block reference"
          data-testid="doc-block-inserter"
        >
          <DocBlockIcon />
        </Button>
      }
      title="Insert Doc Block Reference"
    >
      {({ close }) => (
        <Stack direction="column" style={{ minWidth: "320px", padding: "8px" }}>
          <Stack className={styles.search} style={{ marginBottom: "12px" }}>
            <SearchIcon />
            <Input
              placeholder="Search doc blocks..."
              value={searchTerm}
              onChange={handleSearchChange}
              type="search"
            />
          </Stack>
          <div style={{ maxHeight: "240px", overflowY: "auto" }}>
            {filteredDocBlocks.length > 0 ? (
              filteredDocBlocks.map((docBlock) => (
                <div
                  key={docBlock.name}
                  style={{
                    padding: "8px 12px",
                    cursor: "pointer",
                    borderRadius: "4px",
                    marginBottom: "4px",
                    border: "1px solid transparent"
                  }}
                  className="doc-block-item"
                  onClick={() => handleInsertDocBlock(docBlock, close)}
                  onMouseEnter={(e) => {
                    const target = e.currentTarget;
                    target.style.backgroundColor = "var(--background--01)";
                    target.style.borderColor = "var(--background--02)";
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget;
                    target.style.backgroundColor = "transparent";
                    target.style.borderColor = "transparent";
                  }}
                >
                  <Stack direction="column" className="align-items-start" style={{ gap: "2px" }}>
                    <strong style={{ fontSize: "14px" }}>{docBlock.name}</strong>
                  </Stack>
                </div>
              ))
            ) : (
              <div className="text-muted text-center" style={{ padding: "16px" }}>
                No doc blocks found matching &quot;{searchTerm}&quot;
              </div>
            )}
          </div>
        </Stack>
      )}
    </PopoverWithButton>
  );
};

export default DocBlockInserter;
