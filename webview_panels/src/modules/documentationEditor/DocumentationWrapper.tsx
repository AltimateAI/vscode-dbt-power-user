import { Button, ButtonGroup } from "@uicore";
import DocumentationEditor from "./DocumentationEditor";
import { addToSelectedPage } from "./state/documentationSlice";
import { Pages } from "./state/types";
import useDocumentationContext from "./state/useDocumentationContext";
import classes from "./styles.module.scss";

const DocumentationWrapper = (): JSX.Element => {
  const {
    dispatch,
    state: { selectedPages, testsEnabled },
  } = useDocumentationContext();
  const handleClick = (page: Pages) => {
    dispatch(addToSelectedPage(page));
  };

  return (
    <div className={classes.documentationWrapper}>
      {testsEnabled ? (
        <ButtonGroup>
          <Button
            color={
              selectedPages.includes(Pages.DOCUMENTATION)
                ? "primary"
                : "secondary"
            }
            onClick={() => handleClick(Pages.DOCUMENTATION)}
          >
            Documentation
          </Button>
          <Button
            color={
              selectedPages.includes(Pages.TESTS) ? "primary" : "secondary"
            }
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
      ) : null}
      <DocumentationEditor />
    </div>
  );
};

export default DocumentationWrapper;
