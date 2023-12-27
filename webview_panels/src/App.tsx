import { lazy, Suspense } from 'react';
import { Routes, Route,  Link } from "react-router-dom";
// import DocumentationEditor from './modules/documentationEditor/DocumentationEditor.tsx';
// import Insights from './modules/insights/Insights.tsx';
import NoMatch from "./NoMatch.tsx";

const DocumentationEditor = lazy(() => import('./modules/documentationEditor/DocumentationEditor.js'));
const Insights = lazy(() => import('./modules/insights/Insights.js'));

const Loader = () => <div>Loading...</div>;
const App = () => {

  return (
    <>
      <div>
        hello webview

        <Suspense fallback={<Loader />}>

        <Routes>
        <Route path="/">
          <Route path="insights" element={<Insights />} />
          <Route path="documentation-editor" element={<DocumentationEditor />} />
          

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
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
    </>
  )
}

export default App
