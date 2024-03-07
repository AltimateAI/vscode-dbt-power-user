import { Button } from "reactstrap";
import styles from "./styles.module.scss";
import { openChat } from "./service_utils";

function Help() {
  return (
    <div className="p-3 h-100 d-flex flex-column overflow-y">
      <div className="mb-2 d-flex">
        <div className="fw-semibold fs-5">Help</div>
        <div className="spacer"></div>
        <Button
          size="sm"
          color="primary"
          onClick={(e) => {
            e.stopPropagation();
            openChat();
          }}
        >
          Chat with us
        </Button>
      </div>
      <div className={styles.help_body}>
        <p>
          Lineage is available in two forms - model level lineage and column
          level lineage. You need to add API key in the extension settings to
          view column level lineage. You can view model level lineage without an
          API key.
        </p>
        <ul>
          <li>
            Different dbt entities like sources, seeds, models, tests and model
            types are shown in the lineage view. You can expand lineage from
            that component by click on (+) sign in the component.
          </li>
          <li>
            For applicable components, column lineage view includes list of
            columns with descriptions as well as dbt tests that are written for
            that particular component. You can see columns and tests by clicking
            on "view details" in the component
          </li>
          <li>
            In column lineage view, links between components (columns) are shown
            as direct links and indirect links. Direct links are shown as solid
            lines if there is direct flow of data between columns through select
            statements. Indirect links are shown as dotted line if columns
            appear in condition/clauses like where, join, having, etc. These
            links can be filters in the column lineage view.
          </li>
        </ul>
        <div>
          <span>If you want to know more please check our </span>
          <a href="https://docs.myaltimate.com" className="text-blue">
            Documentation
          </a>
          <span> or still have issue no problem Get in touch with us </span>
          <a href="https://www.altimate.ai/support" className="text-blue">
            Contact us
          </a>
        </div>
      </div>
    </div>
  );
}

export { Help };
