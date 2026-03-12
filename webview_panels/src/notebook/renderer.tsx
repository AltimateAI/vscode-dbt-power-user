import PerspectiveViewer from "@modules/queryPanel/components/perspective/PerspectiveViewer";
import type { QueryPanelStateProps } from "@modules/queryPanel/context/types";
import classes from "./renderer.module.scss";
import PreTag from "@modules/markdown/PreTag";
import { CodeBlock, Nav, NavItem, NavLink, Stack } from "@uicore";
import PerspectiveErrorBoundary from "@modules/queryPanel/components/perspective/PerspectiveErrorBoundary";
import { QueryPanelTitleTabState } from "@modules/queryPanel/components/QueryPanelContents/types";
import { useState } from "react";

interface Props {
  items: NonNullable<QueryPanelStateProps["queryResults"]>;
}
const AllItems = ({ items }: Props): JSX.Element => {
  const [tabState, setTabState] = useState(QueryPanelTitleTabState.Preview);
  const compiledCodeMarkup = items.compiled_sql;
  return (
    <Stack direction="column" className="mt-2">
      <Nav tabs>
        <NavItem>
          <NavLink
            active={QueryPanelTitleTabState.Preview === tabState}
            onClick={() => setTabState(QueryPanelTitleTabState.Preview)}
            className="cursor-pointer"
          >
            Query results{" "}
          </NavLink>
        </NavItem>
        {compiledCodeMarkup ? (
          <NavItem>
            <NavLink
              active={QueryPanelTitleTabState.Sql === tabState}
              onClick={() => setTabState(QueryPanelTitleTabState.Sql)}
              className="cursor-pointer"
            >
              SQL
            </NavLink>
          </NavItem>
        ) : null}
      </Nav>
      {tabState === QueryPanelTitleTabState.Preview ? (
        <div className={classes.perspectiveWrapper}>
          <PerspectiveErrorBoundary>
            <PerspectiveViewer
              columnNames={items.columnNames}
              columnTypes={items.columnTypes}
              data={items.data}
              styles={{ minHeight: 100, height: 400 }}
            />
          </PerspectiveErrorBoundary>
        </div>
      ) : null}
      {tabState === QueryPanelTitleTabState.Sql && compiledCodeMarkup ? (
        <div style={{ width: "fit-content" }}>
          <PreTag text={compiledCodeMarkup}>
            <CodeBlock
              code={compiledCodeMarkup}
              language="sql"
              showLineNumbers
            />
          </PreTag>
        </div>
      ) : null}
    </Stack>
  );
};

export default AllItems;
