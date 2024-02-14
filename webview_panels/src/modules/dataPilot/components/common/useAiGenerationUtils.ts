import { useCallback } from "react";

const useAiGenerationUtils = (): {
  onAiGenerationRender: (node: HTMLLIElement) => void;
} => {
  const onAiGenerationRender = useCallback((node: HTMLLIElement) => {
    if (node) {
      node.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return { onAiGenerationRender };
};

export default useAiGenerationUtils;
