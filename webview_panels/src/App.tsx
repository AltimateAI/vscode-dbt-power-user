import { lazy, Suspense } from "react";
import { Routes, Route, Link } from "react-router-dom";
import NoMatch from "./NoMatch";

const DocumentationEditor = lazy(
  () => import("./modules/documentationEditor/DocumentationEditor"),
);
const Insights = lazy(() => import("./modules/insights/Insights"));

const Loader = () => <div>Loading...</div>;
const App = (): JSX.Element => (
  <div>
    hello webview
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/">
          <Route path="insights" element={<Insights />} />
          <Route
            path="documentation-editor"
            element={<DocumentationEditor />}
          />

          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
      <nav>
        <ul>
          <li>
            <Link to="/insights">insights</Link>
          </li>
          <li>
            <Link to="/documentation-editor">documentation-editor</Link>
          </li>
          <li>
            <Link to="/nothing-here">Nothing Here</Link>
          </li>
        </ul>
      </nav>
    </Suspense>
  </div>
);

export default App;
