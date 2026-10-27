import { useEffect, useState } from "react";
import { request } from "./api";
import classes from "./onboarding.module.scss";
import { Project } from "./ProjectStep";
import { StatusIcon } from "./ui";

const DOCS_URL = "https://help.altimate.ai/dbt-power-user/";
const TUTORIALS_URL =
  "https://help.altimate.ai/dbt-power-user/develop/autocomplete/";

type OpenAction = "chat" | "lineage" | "preview";

interface ReadyStepProps {
  project: Project;
  instance?: string;
  workspaceLinked: boolean;
  canLinkWorkspace: boolean;
  onSetUpWorkspace: () => void;
}

/** Where setup stands, and a first step on the user's own model. */
const ReadyStep = ({
  project,
  instance,
  workspaceLinked,
  canLinkWorkspace,
  onSetUpWorkspace,
}: ReadyStepProps): JSX.Element => {
  const [modelFile, setModelFile] = useState<string | null>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    void request<{ fileName: string } | null>("getFirstModel", {
      projectRoot: project.projectRoot,
    }).then((model) => setModelFile(model?.fileName ?? null));
  }, [project.projectRoot]);

  const open = (action: OpenAction) => {
    setError(undefined);
    void request<{ success: boolean }>("openFirstModel", {
      projectRoot: project.projectRoot,
      action,
    }).then((result) => {
      if (!result) {
        setError("Could not open a model. See the output for details.");
      }
    });
  };

  const modelLabel = modelFile ?? "a model";

  return (
    <div>
      <div className={classes.statusRow}>
        <StatusIcon status="ok" />
        <div className={classes.checkBody}>
          <span className={classes.checkTitle}>Power User for dbt</span>
          <span className={[classes.checkDetail, classes.detailOk].join(" ")}>
            {[
              project.name,
              project.adapter && `dbt-${project.adapter}`,
              "run, preview, tests, lineage",
            ]
              .filter(Boolean)
              .join(" · ")}
          </span>
        </div>
        <span className={classes.statusChip}>
          <span className={classes.statusDot} />
          ready
        </span>
      </div>
      <div className={classes.statusRow}>
        <StatusIcon status="ok" />
        <div className={classes.checkBody}>
          <span className={classes.checkTitle}>Altimate Code</span>
          <span className={[classes.checkDetail, classes.detailOk].join(" ")}>
            {instance ? `instance ${instance} · runs locally` : "runs locally"}
          </span>
        </div>
        <span className={classes.statusChip}>
          <span className={classes.statusDot} />
          connected
        </span>
      </div>
      <div className={classes.statusRow}>
        <StatusIcon status={workspaceLinked ? "ok" : "pending"} />
        <div className={classes.checkBody}>
          <span className={classes.checkTitle}>Workspace</span>
          <span
            className={[
              classes.checkDetail,
              workspaceLinked ? classes.detailOk : "",
            ].join(" ")}
          >
            {workspaceLinked
              ? `${project.name} · linked`
              : "skipped for now · add your organization's context any time from Altimate"}
          </span>
        </div>
        {!workspaceLinked && canLinkWorkspace && (
          <button
            type="button"
            className={[classes.linkAction, classes.checkAction].join(" ")}
            onClick={onSetUpWorkspace}
          >
            Create ↗
          </button>
        )}
      </div>

      <div className={classes.readyBody}>
        <div className={classes.tryCard}>
          <div className={classes.accountText}>
            <span className={classes.accountTitle}>
              Try it on your own model
            </span>
            <span className={classes.accountDesc}>
              {modelFile === null
                ? "This project has no SQL models yet. Add one to try Altimate Code on it."
                : `Opens ${modelLabel} with Altimate Code beside it, ready for your first question.`}
            </span>
            {modelFile && (
              <span className={classes.accountMeta}>
                Not ready for AI yet?{" "}
                <button
                  type="button"
                  className={classes.inlineLink}
                  onClick={() => open("lineage")}
                >
                  See its lineage
                </button>{" "}
                ·{" "}
                <button
                  type="button"
                  className={classes.inlineLink}
                  onClick={() => open("preview")}
                >
                  Preview its results
                </button>
              </span>
            )}
            {error && (
              <span
                className={[classes.checkDetail, classes.detailError].join(" ")}
              >
                {error}
              </span>
            )}
          </div>
          <button
            type="button"
            className={[classes.btn, classes.btnNav, classes.btnOrange].join(
              " ",
            )}
            disabled={!modelFile}
            onClick={() => open("chat")}
          >
            Open {modelLabel}
          </button>
        </div>
        <span className={classes.accountMeta}>
          Want to look around first?{" "}
          <a href={TUTORIALS_URL} target="_blank" rel="noopener noreferrer">
            Tutorials
          </a>{" "}
          ·{" "}
          <a href={DOCS_URL} target="_blank" rel="noopener noreferrer">
            Help docs
          </a>
        </span>
      </div>
    </div>
  );
};

export default ReadyStep;
