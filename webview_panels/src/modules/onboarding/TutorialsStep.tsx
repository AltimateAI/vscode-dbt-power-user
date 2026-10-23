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
import { useEffect, useRef } from "react";
import { Icon } from "./icons";
import classes from "./onboarding.module.scss";

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

declare global {
  interface Window {
    tutorialImages?: TutorialImages;
  }
}

// Image URIs come from the webview host; the imports are build-time fallbacks.
const images: TutorialImages = window.tutorialImages ?? {};

interface TutorialBlock {
  text: string;
  gifs: [string, string][];
  note?: string;
  bullets?: [string, string][];
}

const TUTORIALS: [string, TutorialBlock[]][] = [
  [
    "Generate models",
    [
      {
        text: "Start by generating a new dbt model from source files or SQL",
        gifs: [
          [
            images.generateModelFromSource ?? GenerateModelFromSourceGif,
            "Generate a model from your source definition",
          ],
        ],
        note: "You can configure a file name template and prefix in the extension settings",
      },
      {
        text: "You can also convert existing SQL to a dbt model",
        gifs: [
          [
            images.generateModelFromSQL ?? GenerateModelFromSQLGif,
            "Generate a model from SQL",
          ],
        ],
      },
    ],
  ],
  [
    "Autocomplete",
    [
      {
        text: "Write dbt code faster with autocomplete for model, macro and source names",
        gifs: [
          [
            images.autocompleteModel ?? AutocompleteModelGif,
            "Autocomplete model",
          ],
          [
            images.autocompleteMacro ?? AutocompleteMacroGif,
            "Autocomplete macro",
          ],
          [
            images.autocompleteSource ?? AutocompleteSourceGif,
            "Autocomplete source",
          ],
        ],
      },
      {
        text: "Hover for a preview, or click a definition to jump to the file",
        gifs: [
          [
            images.definitionModel ?? DefinitionModelGif,
            "Go to model definition",
          ],
          [
            images.definitionMacro ?? DefinitionMacroGif,
            "Go to macro definition",
          ],
        ],
      },
    ],
  ],
  [
    "Query preview",
    [
      {
        text: "See results and the compiled SQL in the query panel while you develop",
        gifs: [
          [
            images.queryResultsAndSQL ?? QueryResultsAndSQLGif,
            "Preview query results and SQL",
          ],
        ],
      },
      {
        text: "Split by, group by, chart the results, or export as CSV",
        gifs: [
          [
            images.edaAndExport ?? EDAAndExportGif,
            "Results analysis and export",
          ],
        ],
      },
      {
        text: "Understand complex models with a generated query explanation",
        gifs: [
          [images.queryExplanation ?? QueryExplanationGif, "Query explanation"],
        ],
      },
    ],
  ],
  [
    "Build and run",
    [
      {
        text: "Click to build and run parent or child models and tests, no commands to type",
        gifs: [
          [
            images.graph ?? GraphGif,
            "Execute parent or children models from the graph",
          ],
        ],
        note: "The toolbar on the right of each file also runs build, run, test and query preview",
      },
    ],
  ],
  [
    "Docs editor",
    [
      {
        text: "Edit model and column descriptions inline",
        gifs: [[images.docsEditor ?? DocsEditorGif, "Documentation editor"]],
      },
      {
        text: "Generate descriptions in the style you want. They are saved to YAML with correct formatting",
        gifs: [
          [
            images.docGenerationUsingAi ?? DocGenerationUsingAiGif,
            "Generate descriptions for models and columns",
          ],
        ],
      },
    ],
  ],
  [
    "Lineage",
    [
      {
        text: "See the parents and children of a model",
        gifs: [[images.modelLineage ?? ModelLineageGif, "Model lineage"]],
      },
      {
        text: "Explore column lineage to gauge the impact of a change",
        gifs: [[images.columnLineage ?? ColumnLineageGif, "Column lineage"]],
      },
    ],
  ],
  [
    "Health check",
    [
      {
        text: "Scan the whole project before you commit to find:",
        gifs: [[images.projectScan ?? ProjectScanGif, "Project scan"]],
        bullets: [
          ["Undocumented models", " - missing schema.yml files"],
          ["Undocumented columns", " - columns missing in schema.yml"],
          ["Extra columns", " - in schema.yml but not in the model"],
          ["Seeds and models absent in the database", ""],
        ],
      },
    ],
  ],
];

export const TUTORIAL_COUNT = TUTORIALS.length;

const GIF_COLUMNS: Record<number, string> = {
  2: classes.gifs2,
  3: classes.gifs3,
};

interface TutorialsStepProps {
  index: number;
  onChange: (index: number) => void;
}

const TutorialsStep = ({
  index,
  onChange,
}: TutorialsStepProps): JSX.Element => {
  const tabsRef = useRef<HTMLDivElement>(null);

  // Keep the active tab centred when the tab strip scrolls on narrow panels.
  useEffect(() => {
    const strip = tabsRef.current;
    const tab = strip?.querySelector<HTMLElement>(`[data-tutorial="${index}"]`);
    if (strip && tab) {
      strip.scrollLeft =
        tab.offsetLeft - (strip.clientWidth - tab.offsetWidth) / 2;
    }
  }, [index]);

  return (
    <div className={classes.tutorials}>
      <div className={classes.tutorialTabs}>
        <button
          type="button"
          className={classes.tutorialArrow}
          disabled={index === 0}
          onClick={() => onChange(index - 1)}
          aria-label="Previous tutorial"
        >
          <Icon name="chevron-left" size={18} />
        </button>
        <div className={classes.tutorialTabList} ref={tabsRef}>
          {TUTORIALS.map(([title], i) => (
            <button
              key={title}
              type="button"
              data-tutorial={i}
              className={[
                classes.tutorialTab,
                i === index ? classes.tutorialTabActive : "",
              ].join(" ")}
              onClick={() => onChange(i)}
            >
              {title}
            </button>
          ))}
        </div>
        <button
          type="button"
          className={classes.tutorialArrow}
          disabled={index === TUTORIALS.length - 1}
          onClick={() => onChange(index + 1)}
          aria-label="Next tutorial"
        >
          <Icon name="chevron-right" size={18} />
        </button>
      </div>
      <div className={classes.tutorialBlocks}>
        {TUTORIALS[index][1].map((block) => (
          <div key={block.text} className={classes.tutorialBlock}>
            <p>{block.text}</p>
            {block.bullets && (
              <div className={classes.bullets}>
                {block.bullets.map(([strong, rest]) => (
                  <div key={strong}>
                    <span>◈</span>
                    <span>
                      <strong>{strong}</strong>
                      {rest}
                    </span>
                  </div>
                ))}
              </div>
            )}
            <div
              className={[
                classes.gifs,
                GIF_COLUMNS[block.gifs.length] ?? "",
              ].join(" ")}
            >
              {block.gifs.map(([src, alt]) => (
                <figure key={alt} className={classes.figure}>
                  <img src={src} alt={alt} loading="lazy" />
                  <figcaption>{alt}</figcaption>
                </figure>
              ))}
            </div>
            {block.note && (
              <div className={classes.note}>
                <Icon name="info-circle" size={16} />
                <span>{block.note}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorialsStep;
