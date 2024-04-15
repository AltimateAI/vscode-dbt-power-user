import {
  DBTDocumentation,
  DBTDocumentationColumn,
  DocsGenerateModelRequestV2,
} from "@modules/documentationEditor/state/types";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { Input, InputGroup, Stack } from "@uicore";
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

interface Props {
  entity: DBTDocumentationColumn | DBTDocumentation;
  onSubmit: (data: DocsGenerateModelRequestV2) => void;
  placeholder?: string;
  type: EntityType;
}
const DocGeneratorInput = ({
  onSubmit,
  entity,
  placeholder,
  type,
}: Props): JSX.Element => {
  const stackRef = useRef<HTMLDivElement | null>(null);
  const {
    state: {
      userInstructions,
      currentDocsData,
      insertedEntityName,
      selectedConversationGroupId,
      conversations,
    },
    dispatch,
  } = useDocumentationContext();
  const [showButton, setShowButton] = useState(true);
  const [description, setDescription] = useState("");
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  const selectedConversationGroup = useMemo(() => {
    if (!selectedConversationGroupId) {
      return null;
    }

    const allConversationGroups = Object.values(conversations).flat();
    return allConversationGroups.find(
      (c) => c.conversation_group_id === selectedConversationGroupId,
    );
  }, [conversations, selectedConversationGroupId]);

  useEffect(() => {
    if (!selectedConversationGroup) {
      return;
    }
    const {
      meta: { field, column },
    } = selectedConversationGroup;

    if (field === "description") {
      const isMatchingEntity = column ? entity.name === column : true;
      if (isMatchingEntity) {
        panelLogger.log("scrolling");
        stackRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
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

  const handleHideButton = () => setShowButton(false);
  const handleShowButton = () => setShowButton(true);

  const variant = entity.description ? Variants.ICON : Variants.ICON_WITH_TEXT;

  return (
    <Stack ref={stackRef}>
      <InputGroup className={classes.inputGroup}>
        <Input
          innerRef={inputRef}
          value={description}
          onChange={onChange}
          onFocus={handleHideButton}
          onBlur={handleShowButton}
          type="textarea"
          rows={description ? 5 : 1}
          placeholder={placeholder}
        />

        {showButton ? (
          <Stack className={classes.actionButtons}>
            <AddCoversationButton
              field="description"
              value={description}
              name={entity.name}
              type={type}
              model={currentDocsData?.name}
            />
            <GenerateButton onSubmit={handleSubmit} variant={variant} />
          </Stack>
        ) : null}
      </InputGroup>
    </Stack>
  );
};

export default DocGeneratorInput;
