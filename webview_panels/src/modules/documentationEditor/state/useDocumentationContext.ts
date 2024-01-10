import { UnknownAction } from "@reduxjs/toolkit";
import { Dispatch, useContext } from "react";
import { DocumentationContext } from "../DocumentationProvider";
import { DocumentationStateProps } from "./types";

const useDocumentationContext = (): {
  state: DocumentationStateProps;
  dispatch: Dispatch<UnknownAction>;
} => {
  const { state, dispatch } = useContext(DocumentationContext);
  return { state, dispatch };
};

export default useDocumentationContext;
