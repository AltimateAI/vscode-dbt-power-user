import {
  DBTDocumentation,
  DBTDocumentationColumn,
  DocsGenerateModelRequestV2,
} from "@modules/documentationEditor/state/types";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { Input, InputGroup, Stack, Tag } from "@uicore";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import GenerateButton, { Variants } from "./GenerateButton";
import classes from "./docGenInput.module.scss";
import {
  updateColumnsInCurrentDocsData,
  updateCurrentDocsData,
} from "@modules/documentationEditor/state/documentationSlice";
import { EntityType } from "@modules/dataPilot/components/docGen/types";
import { executeRequestInSync } from "@modules/app/requestExecutor";
import AddCoversationButton from "../conversation/AddCoversationButton";
import { panelLogger } from "@modules/logger";
import { DocumentationPropagationButton } from "../documentationPropagation/DocumentationPropagation";

interface Props {
  entity: DBTDocumentationColumn | DBTDocumentation;
  onSubmit: (data: DocsGenerateModelRequestV2) => void;
  placeholder?: string;
  type: EntityType;
  title: string;
}
const DocGeneratorInput = ({
  onSubmit,
  entity,
  placeholder,
  type,
  title,
}: Props): JSX.Element => {
  const stackRef = useRef<HTMLDivElement | null>(null);
  const {
    state: {
      userInstructions,
      incomingDocsData,
      currentDocsData,
      insertedEntityName,
      selectedConversationGroup,
      conversations,
    },
    dispatch,
  } = useDocumentationContext();
  const [description, setDescription] = useState("");
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const [inputRows, setInputRows] = useState(1);

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }
    const newLines = (description.match(/\n/g) ?? []).length;
    const rows =
      Math.ceil(
        ((description.length - newLines) * 6.5) / inputRef.current.clientWidth,
      ) + newLines;
    setInputRows(rows);
  }, [description]);

  const selectedConversationGroupData = useMemo(() => {
    if (!selectedConversationGroup) {
      return undefined;
    }

    return conversations[selectedConversationGroup.shareId]?.find(
      (c) =>
        c.conversation_group_id ===
        selectedConversationGroup.conversationGroupId,
    );
  }, [conversations, selectedConversationGroup]);

  useEffect(() => {
    if (!selectedConversationGroupData || !stackRef.current) {
      return;
    }
    const {
      meta: { field, column },
    } = selectedConversationGroupData;

    if (field === "description") {
      const isMatchingEntity = column
        ? entity.name === column
        : type === EntityType.MODEL;
      if (isMatchingEntity) {
        panelLogger.log("scrolling");
        setTimeout(() => {
          stackRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 500);
      }
    }
  }, [selectedConversationGroup]);

  useEffect(() => {
    setDescription(entity.description ?? "");
  }, [entity.description]);

  useEffect(() => {
    if (!insertedEntityName || !inputRef.current) {
      return;
    }

    if (insertedEntityName === entity.name) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [insertedEntityName, entity.name]);

  const handleSubmit = useCallback(async () => {
    const result = (await executeRequestInSync("validateCredentials", {})) as {
      isValid: boolean;
    };
    if (!result.isValid) {
      return;
    }
    const columns = currentDocsData?.columns.map((c) => c.name) ?? [];
    onSubmit({ user_instructions: userInstructions, description, columns });
  }, [description, userInstructions, currentDocsData?.columns]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
    if (type === EntityType.COLUMN) {
      dispatch(
        updateColumnsInCurrentDocsData({
          columns: [{ name: entity.name, description: e.target.value }],
          isNewGeneration: true,
        }),
      );
    }

    if (type === EntityType.MODEL) {
      dispatch(
        updateCurrentDocsData({
          name: entity.name,
          description: e.target.value,
          isNewGeneration: true,
        }),
      );
    }
  };

  const variant = entity.description ? Variants.ICON : Variants.ICON_WITH_TEXT;
  const entityColumn = incomingDocsData?.docs?.columns?.find(
    (c) => c.name === entity.name,
  );
  const isDirty =
    type === EntityType.MODEL
      ? currentDocsData?.description !== incomingDocsData?.docs?.description
      : entity.description !== entityColumn?.description;

  return (
    <>
      <Stack className="align-items-center mb-2">
        <h4 className="mb-0">{title}</h4>
        {type === EntityType.COLUMN &&
        (entity as DBTDocumentationColumn).type ? (
          <Tag type="rounded">{(entity as DBTDocumentationColumn).type}</Tag>
        ) : null}
        {isDirty ? (
          <Tag color="orange" type="rounded">
            modified
          </Tag>
        ) : null}
        <div className="spacer" />
        <Stack className={classes.actionButtons}>
          <DocumentationPropagationButton type={type} name={entity.name} />
          <AddCoversationButton
            field="description"
            value={description}
            name={entity.name}
            type={type}
            model={currentDocsData?.name}
          />
          <GenerateButton
            onSubmit={handleSubmit}
            variant={variant}
            entityName={entity.name}
          />
        </Stack>
      </Stack>
      <Stack ref={stackRef}>
        <InputGroup className={classes.inputGroup}>
          <Input
            innerRef={inputRef}
            value={description}
            onChange={onChange}
            type="textarea"
            rows={inputRows}
            placeholder={placeholder}
            className={isDirty ? "border-orange" : ""}
          />
        </InputGroup>
      </Stack>
    </>
  );
};

export default DocGeneratorInput;
