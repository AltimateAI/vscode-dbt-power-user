import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { useState } from "react";
import { SaveRequest } from "../types";
import {
  setIsDocGeneratedForAnyColumn,
  updateCurrentDocsTests,
} from "@modules/documentationEditor/state/documentationSlice";
import { panelLogger } from "@modules/logger";
import {
  DBTModelTest,
  DbtGenericTests,
  TestMetadataRelationshipsKwArgs,
  TestMetadataAcceptedValuesKwArgs,
} from "@modules/documentationEditor/state/types";

const useTestFormSave = (): {
  handleSave: (data: SaveRequest, column: string, isNewTest: boolean) => void;
  isSaving: boolean;
} => {
  const [isSaving, setIsSaving] = useState(false);
  const {
    state: { currentDocsData, currentDocsTests },
    dispatch,
  } = useDocumentationContext();

  const updateTests = (
    testsData: DBTModelTest[],
    data:
      | Partial<TestMetadataAcceptedValuesKwArgs>
      | Partial<TestMetadataRelationshipsKwArgs>,
    type: DbtGenericTests,
  ) => {
    const temp = [...testsData];
    const currentIndex = temp.findIndex(
      (test: DBTModelTest) => test.test_metadata?.name === type,
    );
    if (currentIndex > -1) {
      temp[currentIndex] = {
        ...temp[currentIndex],
        test_metadata: {
          ...temp[currentIndex].test_metadata,
          name: temp[currentIndex].test_metadata?.name ?? "",
          kwargs: {
            ...temp[currentIndex].test_metadata!.kwargs,
            ...data,
          },
        },
      };
      return temp;
    }

    return temp;
  };

  const getUpdatedTestsData = (
    data: SaveRequest,
    column: string,
    isNewTest: boolean,
  ) => {
    const testsData = [...(currentDocsTests ?? [])];
    const newValues = data.accepted_values?.split(",").map((s) => s.trim());
    if (isNewTest) {
      testsData.push({
        alias: "",
        database: "",
        schema: "",
        column_name: column,
        key: `${data.test}_${column}`,
        path: `${data.test}_${column}`,
        test_metadata: {
          name: data.test!,
          kwargs: {
            column_name: column,
            model: currentDocsData?.name ?? "",
            values: newValues,
            to: data.to ? `ref('${data.to}')` : undefined,
            field: data.field,
          },
        },
      });
      return testsData;
    }

    if (data.test === DbtGenericTests.ACCEPTED_VALUES) {
      return updateTests(
        testsData,
        { values: newValues ?? [] },
        DbtGenericTests.ACCEPTED_VALUES,
      );
    }

    if (data.test === DbtGenericTests.RELATIONSHIPS) {
      return updateTests(
        testsData,
        {
          to: data.to ? `ref('${data.to}')` : undefined,
          field: data.field,
        },
        DbtGenericTests.RELATIONSHIPS,
      );
    }
    return testsData;
  };

  const handleSave = (
    data: SaveRequest,
    column: string,
    isNewTest: boolean,
  ) => {
    setIsSaving(true);

    if (!data.test) {
      return;
    }

    const testsData = getUpdatedTestsData(data, column, isNewTest);
    panelLogger.info("add/update test data", testsData);
    dispatch(updateCurrentDocsTests(testsData));
    dispatch(setIsDocGeneratedForAnyColumn(true));
  };

  return { handleSave, isSaving };
};

export default useTestFormSave;
