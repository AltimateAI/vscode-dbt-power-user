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
      const currentIndex = testsData.findIndex(
        (test: DBTModelTest) =>
          test.test_metadata?.name === DbtGenericTests.ACCEPTED_VALUES,
      );
      if (currentIndex > -1) {
        testsData[currentIndex] = {
          ...testsData[currentIndex],
          test_metadata: {
            ...testsData[currentIndex].test_metadata,
            name: testsData[currentIndex].test_metadata?.name ?? "",
            kwargs: {
              ...testsData[currentIndex].test_metadata!.kwargs,
              values: newValues ?? [],
            },
          },
        };
        return testsData;
      }
    }

    if (data.test === DbtGenericTests.RELATIONSHIPS) {
      const currentIndex = testsData.findIndex(
        (test: DBTModelTest) =>
          test.test_metadata?.name === DbtGenericTests.RELATIONSHIPS,
      );
      if (currentIndex > -1) {
        testsData[currentIndex] = {
          ...testsData[currentIndex],
          test_metadata: {
            ...testsData[currentIndex].test_metadata,
            name: testsData[currentIndex].test_metadata?.name ?? "",
            kwargs: {
              ...testsData[currentIndex].test_metadata!.kwargs,
              to: data.to ? `ref('${data.to}')` : undefined,
              field: data.field,
            },
          },
        };
        return testsData;
      }
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
