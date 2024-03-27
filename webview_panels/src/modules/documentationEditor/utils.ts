import { differenceInHours } from "date-fns";
import IndexedDBHelper from "@modules/app/indexedDb";
import { panelLogger } from "@modules/logger";
import { DBTDocumentationColumn } from "./state/types";
import { GenerationDBDataProps } from "./types";
import { DataPilotChatAction } from "../dataPilot/types";

export const addDefaultActions = (
  data: Record<string, unknown>,
  command: string,
): DataPilotChatAction[] => {
  return [
    {
      title: "Regenerate",
      data,
      command,
      userPrompt: "Regenerate documentation for {type} {name}",
      datapilotTitle: "Improving documentation based on the user suggestion",
    },
    {
      title: "Make it shorter",
      data,
      command,
      userPrompt: "Make documentation shorter for {type} {name}",
      datapilotTitle: "Improving documentation based on the user suggestion",
    },
    {
      title: "Make it longer",
      data,
      command,
      userPrompt: "Make documentation longer for {type} {name}",
      datapilotTitle: "Improving documentation based on the user suggestion",
    },
    {
      title: "Make it fun",
      data,
      command,
      userPrompt: "Make documentation fun for {type} {name}",
      datapilotTitle: "Improving documentation based on the user suggestion",
    },
    {
      title: "Generate for business user",
      data,
      command,
      userPrompt: "Regenerate documentation for {type} {name} as business user",
      datapilotTitle: "Improving documentation based on the user suggestion",
    },
  ];
};

export const addDocGeneration = async (
  project: string,
  model: string,
  data: Partial<DBTDocumentationColumn>,
): Promise<void> => {
  const db = await IndexedDBHelper.getDb();
  const transaction = db.transaction(["generations"], "readwrite");
  const generationstore = transaction.objectStore("generations");

  const operation = {
    project,
    model,
    data,
    timestamp: new Date().getTime(),
  } as GenerationDBDataProps;

  await generationstore.add(operation);
};

export const getGenerationsInModel = async (
  project: string,
  model: string,
): Promise<GenerationDBDataProps[]> => {
  const db = await IndexedDBHelper.getDb();
  const transaction = db.transaction(["generations"], "readwrite");
  const generationstore = transaction.objectStore("generations");
  const projectIndex = generationstore.index("projectIndex");

  const range = IDBKeyRange.only(project);
  const generations: GenerationDBDataProps[] = [];

  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const cursor = await projectIndex.openCursor(range);
    function iterateCursor() {
      if (cursor) {
        if (cursor.value.model === model) {
          const generation = cursor.value;
          if (
            differenceInHours(new Date(), new Date(generation.timestamp)) < 24
          ) {
            generations.push(generation);
          }
        }
        cursor
          .continue()
          .then(iterateCursor)
          .catch((err) =>
            panelLogger.error("error while iterating cursor", err),
          );
      } else {
        resolve(generations);
      }
    }

    iterateCursor();

    transaction.oncomplete = () => {
      resolve(generations);
    };

    transaction.onerror = () => {
      reject("Error retrieving operations");
    };
  });
};
