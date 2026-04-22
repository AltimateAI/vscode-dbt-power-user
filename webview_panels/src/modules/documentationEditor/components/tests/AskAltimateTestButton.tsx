import { executeRequestInAsync } from "@modules/app/requestExecutor";
import { EntityType } from "@modules/dataPilot/components/docGen/types";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { ListGroupItem } from "@uicore";
import classes from "../../styles.module.scss";

interface Props {
  column: string;
  type: EntityType;
}

const AskAltimateTestButton = ({ column, type }: Props): JSX.Element => {
  const {
    state: { currentDocsData },
  } = useDocumentationContext();

  const onClick = () => {
    const modelName = currentDocsData?.name ?? "this model";
    const columnMeta = currentDocsData?.columns?.find((c) => c.name === column);
    const isModel = type === EntityType.MODEL;
    const target = isModel
      ? `model \`${modelName}\``
      : `column \`${column}\` of model \`${modelName}\``;
    const typeLine = columnMeta?.type
      ? `\n\nColumn datatype: ${columnMeta.type}`
      : "";
    const initialMessage = `Help me write a dbt test for ${target}.${typeLine}\n\nAsk me what invariant I want to enforce, then produce the YAML test definition I should paste into my schema.yml.`;
    executeRequestInAsync("openAltimateChat", {
      initialMessage,
      title: isModel ? `Test: ${modelName}` : `Test: ${modelName}.${column}`,
    });
  };

  return (
    <ListGroupItem
      action
      tag="button"
      className={`${classes.customTest} ${classes.newTestTag} btn btn-outline-secondary`}
      onClick={onClick}
      data-testid="docs-ask-altimate-test"
    >
      Ask Altimate
    </ListGroupItem>
  );
};

export default AskAltimateTestButton;
