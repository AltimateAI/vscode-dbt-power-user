import AutocompleteMacroGif from "@assets/tutorial-images/autocomplete-macro.gif";
import AutocompleteModelGif from "@assets/tutorial-images/autocomplete-model.gif";
import AutocompleteSourceGif from "@assets/tutorial-images/autocomplete-source.gif";
import ColumnLineageGif from "@assets/tutorial-images/column-lineage.gif";
import DefinitionMacroGif from "@assets/tutorial-images/definition-macro.gif";
import DefinitionModelGif from "@assets/tutorial-images/definition-model.gif";
import DocGenerationUsingAiGif from "@assets/tutorial-images/doc-generation-using-ai.gif";
import DocsEditorGif from "@assets/tutorial-images/docs-editor.gif";
import EDAAndExportGif from "@assets/tutorial-images/EDA-and-export.gif";
import GenerateModelFromSourceGif from "@assets/tutorial-images/generate-model-from-source.gif";
import GenerateModelFromSQLGif from "@assets/tutorial-images/generate-model-from-SQL.gif";
import GraphGif from "@assets/tutorial-images/graph.gif";
import ModelLineageGif from "@assets/tutorial-images/model-lineage.gif";
import ProjectScanGif from "@assets/tutorial-images/project-scan.gif";
import QueryExplanationGif from "@assets/tutorial-images/query-explanation.gif";
import QueryResultsAndSQLGif from "@assets/tutorial-images/query-results-and-SQL.gif";
import { Tabs } from "antd";
import classes from "./onboarding.module.scss";

// Define the type for tutorial images
interface TutorialImages {
  generateModelFromSource?: string;
  generateModelFromSQL?: string;
  autocompleteModel?: string;
  autocompleteMacro?: string;
  autocompleteSource?: string;
  definitionModel?: string;
  definitionMacro?: string;
  queryResultsAndSQL?: string;
  edaAndExport?: string;
  queryExplanation?: string;
  graph?: string;
  docsEditor?: string;
  docGenerationUsingAi?: string;
  modelLineage?: string;
  columnLineage?: string;
  projectScan?: string;
}

// Extend the window interface
declare global {
  interface Window {
    tutorialImages?: TutorialImages;
  }
}

// Get tutorial images from window (provided by webview) or use imported fallbacks
const tutorialImages: TutorialImages = window.tutorialImages ?? {};

interface TutorialItem {
  id: string;
  title: string;
  content: JSX.Element;
}

const TUTORIALS: TutorialItem[] = [
  {
    id: "generate_models",
    title: "Generate dbt models",
    content: (
      <div className={classes.tutorialContent}>
        <h4>Start by generating a new dbt model from source files or SQL</h4>
        <img
          src={
            tutorialImages.generateModelFromSource ?? GenerateModelFromSourceGif
          }
          alt="Generate a model from your source definition"
          className={classes.tutorialImage}
        />
        <p>
          <strong>Note:</strong> You can configure a file name template and
          prefix in the extension settings
        </p>
        <h4>You can also convert existing SQL to dbt model</h4>
        <img
          src={tutorialImages.generateModelFromSQL ?? GenerateModelFromSQLGif}
          alt="Generate a model from SQL"
          className={classes.tutorialImage}
        />
      </div>
    ),
  },
  {
    id: "autocompletion",
    title: "Auto-completion",
    content: (
      <div className={classes.tutorialContent}>
        <h4>
          The extension will help you write dbt code faster by auto-completing
          model, macro and source names
        </h4>
        <img
          src={tutorialImages.autocompleteModel ?? AutocompleteModelGif}
          alt="Autocomplete model"
          className={classes.tutorialImage}
        />
        <img
          src={tutorialImages.autocompleteMacro ?? AutocompleteMacroGif}
          alt="Autocomplete macro"
          className={classes.tutorialImage}
        />
        <img
          src={tutorialImages.autocompleteSource ?? AutocompleteSourceGif}
          alt="Autocomplete source"
          className={classes.tutorialImage}
        />
        <h4>
          You can also see the preview or click on the definition to go to the
          actual file
        </h4>
        <img
          src={tutorialImages.definitionModel ?? DefinitionModelGif}
          alt="Definition model"
          className={classes.tutorialImage}
        />
        <img
          src={tutorialImages.definitionMacro ?? DefinitionMacroGif}
          alt="Definition macro"
          className={classes.tutorialImage}
        />
      </div>
    ),
  },
  {
    id: "previews",
    title: "Query results preview",
    content: (
      <div className={classes.tutorialContent}>
        <h4>
          While developing the model, see the results of the dbt model as well
          as the actual SQL query in the query panel
        </h4>
        <img
          src={tutorialImages.queryResultsAndSQL ?? QueryResultsAndSQLGif}
          alt="Preview query results and SQL"
          className={classes.tutorialImage}
        />
        <h4>
          Analyze the results data with operations like &apos;split by&apos;,
          &apos;group by&apos; as well as create different types of charts. You
          can also export the data as CSV
        </h4>
        <img
          src={tutorialImages.edaAndExport ?? EDAAndExportGif}
          alt="Results data analysis and export"
          className={classes.tutorialImage}
        />
        <h4>
          Quickly understand complex dbt models (sometimes written by others) by
          generating query explanations
        </h4>
        <img
          src={tutorialImages.queryExplanation ?? QueryExplanationGif}
          alt="Query explanation"
          className={classes.tutorialImage}
        />
      </div>
    ),
  },
  {
    id: "dependants",
    title: "Build and run models",
    content: (
      <div className={classes.tutorialContent}>
        <h4>
          After your model is ready, instead of typing commands, just click to
          build and run parent / children models as well as tests
        </h4>
        <img
          src={tutorialImages.graph ?? GraphGif}
          alt="See the graph and execute parent or children models"
          className={classes.tutorialImage}
        />
        <p>
          <strong>Note:</strong> there is also a toolbar on the right section of
          file, that can be used for performing many operations like build or
          run models, query preview etc.
        </p>
      </div>
    ),
  },
  {
    id: "documentation",
    title: "Documentation editor",
    content: (
      <div className={classes.tutorialContent}>
        <h4>
          Edit your dbt model and column descriptions in the Documentation
          Editor
        </h4>
        <img
          src={tutorialImages.docsEditor ?? DocsEditorGif}
          alt="Edit and update your docs inline using the docs editor"
          className={classes.tutorialImage}
        />
        <h4>
          Generate descriptions for models and columns that include various
          options like long, short, for business or make it funny! Documentation
          editor will also save written description in YAML file with the
          correct formatting
        </h4>
        <img
          src={tutorialImages.docGenerationUsingAi ?? DocGenerationUsingAiGif}
          alt="Generate descriptions for models and columns"
          className={classes.tutorialImage}
        />
      </div>
    ),
  },
  {
    id: "lineage",
    title: "Model and column lineage",
    content: (
      <div className={classes.tutorialContent}>
        <h4>You can see the parent and children of the models</h4>
        <img
          src={tutorialImages.modelLineage ?? ModelLineageGif}
          alt="See the parents and children of your model"
          className={classes.tutorialImage}
        />
        <h4>
          Explore column lineage to gauge the impact of your changes on other
          models
        </h4>
        <img
          src={tutorialImages.columnLineage ?? ColumnLineageGif}
          alt="Column lineage"
          className={classes.tutorialImage}
        />
      </div>
    ),
  },
  {
    id: "healthcheck",
    title: "Project Health Check",
    content: (
      <div className={classes.tutorialContent}>
        <h4>
          Before you commit changes to production, scan your entire dbt project
          to identify following issues:
        </h4>
        <ul>
          <li>
            <strong>Undocumented Models</strong> - Missing schema.yml files
          </li>
          <li>
            <strong>Undocumented Columns</strong> - Columns missing in
            schema.yml files
          </li>
          <li>
            <strong>Extra Columns</strong> - Columns not present in model but
            specified in schema.yml files
          </li>
          <li>
            <strong>Seeds and Models Absent in the Database</strong>
          </li>
        </ul>
        <img
          src={tutorialImages.projectScan ?? ProjectScanGif}
          alt="Project scan"
          className={classes.tutorialImage}
        />
      </div>
    ),
  },
];

const TutorialsStep = (): JSX.Element => {
  return (
    <div className={classes.tutorialsContainer}>
      <div className={classes.tutorialsHeader}>
        <h3>Explore Tutorials</h3>
        <p>
          Learn about dbt Power User features through these interactive
          tutorials. Click through the tabs to explore each feature.
        </p>
      </div>

      <Tabs
        defaultActiveKey="generate_models"
        type="card"
        tabPosition="left"
        className={classes.tutorialsTabs}
        items={TUTORIALS.map((tutorial) => ({
          key: tutorial.id,
          label: tutorial.title,
          children: tutorial.content,
        }))}
      />
    </div>
  );
};

export default TutorialsStep;
