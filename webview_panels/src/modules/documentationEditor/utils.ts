import IndexedDBHelper from "@modules/app/indexedDb";
import { panelLogger } from "@modules/logger";
import { DBTDocumentationColumn } from "./state/types";
import { GenerationDBDataProps } from "./types";

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
  const transaction = db.transaction(["generations"], "readonly");
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
          generations.push(cursor.value);
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
