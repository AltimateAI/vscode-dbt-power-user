import { Nav, NavItem, NavLink } from "@uicore";
import DocumentationEditor from "./DocumentationEditor";
import DocumentationTests from "./DocumentationTests";
import { setActivePage } from "./state/documentationSlice";
import { Pages } from "./state/types";
import useDocumentationContext from "./state/useDocumentationContext";

const DocumentationWrapper = (): JSX.Element => {
  const {
    dispatch,
    state: { activePage },
  } = useDocumentationContext();
  const handleClick = (page: Pages) => {
    dispatch(setActivePage(page));
  };

  return (
    <div>
      <Nav justified pills>
        <NavItem>
          <NavLink
            active={activePage === Pages.DOCUMENTATION}
            onClick={() => handleClick(Pages.DOCUMENTATION)}
          >
            Documentation
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={activePage === Pages.TESTS}
            onClick={() => handleClick(Pages.TESTS)}
          >
            Tests
          </NavLink>
        </NavItem>
      </Nav>
      {activePage === Pages.DOCUMENTATION ? <DocumentationEditor /> : null}
      {activePage === Pages.TESTS ? <DocumentationTests /> : null}
    </div>
  );
};

export default DocumentationWrapper;
