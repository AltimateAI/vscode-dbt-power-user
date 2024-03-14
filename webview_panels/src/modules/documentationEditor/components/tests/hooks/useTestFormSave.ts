import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { useState } from "react";
import { SaveRequest } from "../types";
import {
  setIsTestUpdatedForAnyColumn,
  updateCurrentDocsTests,
} from "@modules/documentationEditor/state/documentationSlice";
import { panelLogger } from "@modules/logger";
import {
  DBTModelTest,
  DbtGenericTests,
  TestMetadataRelationshipsKwArgs,
  TestMetadataAcceptedValuesKwArgs,
} from "@modules/documentationEditor/state/types";

export enum TestOperation {
  CREATE,
  UPDATE,
  DELETE,
}
const useTestFormSave = (): {
  handleSave: (
    data: SaveRequest,
    column: string,
    operation: TestOperation,
  ) => void;
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
    column: string,
  ) => {
    const temp = [...testsData];
    const currentIndex = temp.findIndex(
      (test: DBTModelTest) =>
        test.test_metadata?.name === type &&
        test.test_metadata.kwargs.column_name === column,
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
    operation: TestOperation,
  ) => {
    const testsData = [...(currentDocsTests ?? [])];
    const newValues = data.accepted_values?.map((s) => s.trim());
    if (operation === TestOperation.DELETE) {
      return testsData.filter((test: DBTModelTest) => {
        if (test.test_metadata?.kwargs.column_name !== column) {
          return true;
        }

        return test.test_metadata?.name !== data.test?.toString();
      });
    }
    if (operation === TestOperation.CREATE) {
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
            to: data.to ? data.to : undefined,
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
        column,
      );
    }

    if (data.test === DbtGenericTests.RELATIONSHIPS) {
      return updateTests(
        testsData,
        {
          to: data.to ? data.to : undefined,
          field: data.field,
        },
        DbtGenericTests.RELATIONSHIPS,
        column,
      );
    }
    return testsData;
  };

  const handleSave = (
    data: SaveRequest,
    column: string,
    operation: TestOperation,
  ) => {
    setIsSaving(true);

    if (!data.test) {
      return;
    }

    const testsData = getUpdatedTestsData(data, column, operation);
    panelLogger.info("add/update test data", testsData);
    dispatch(updateCurrentDocsTests(testsData));
    dispatch(setIsTestUpdatedForAnyColumn(true));
  };

  return { handleSave, isSaving };
};

export default useTestFormSave;
