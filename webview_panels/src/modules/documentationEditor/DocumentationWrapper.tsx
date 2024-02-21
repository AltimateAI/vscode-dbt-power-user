import { Button, ButtonGroup } from "@uicore";
import DocumentationEditor from "./DocumentationEditor";
import DocumentationTests from "./DocumentationTests";
import { setActivePage } from "./state/documentationSlice";
import { Pages } from "./state/types";
import useDocumentationContext from "./state/useDocumentationContext";
import classes from "./styles.module.scss";

const DocumentationWrapper = (): JSX.Element => {
  const {
    dispatch,
    state: { activePage },
  } = useDocumentationContext();
  const handleClick = (page: Pages) => {
    dispatch(setActivePage(page));
  };

  return (
    <div className={classes.documentationWrapper}>
      <ButtonGroup>
        <Button
          color={activePage === Pages.DOCUMENTATION ? "primary" : "secondary"}
          onClick={() => handleClick(Pages.DOCUMENTATION)}
        >
          Documentation
        </Button>
        <Button
          color={activePage === Pages.TESTS ? "primary" : "secondary"}
          onClick={() => handleClick(Pages.TESTS)}
        >
          Tests
        </Button>
        {/* <Button
          color={activePage === Pages.TAGS ? "primary" : "secondary"}
          onClick={() => handleClick(Pages.TAGS)}
        >
          Tags
        </Button> */}
      </ButtonGroup>

      {activePage === Pages.DOCUMENTATION ? <DocumentationEditor /> : null}
      {activePage === Pages.TESTS ? <DocumentationTests /> : null}
    </div>
  );
};

export default DocumentationWrapper;
