/* eslint-disable no-underscore-dangle */
import { GenerationDBDataProps } from "@modules/documentationEditor/types";
import { DBSchema, IDBPDatabase, openDB } from "idb";

interface AltimateDB extends DBSchema {
  generations: {
    value: GenerationDBDataProps;
    key: string;
    indexes: { modelIndex: string; projectIndex: string };
  };
}

interface IndexedDBHelperProps {
  _db: IDBPDatabase<AltimateDB> | undefined;
  getDb: () => Promise<IDBPDatabase<AltimateDB>>;
  initialize: () => Promise<IDBPDatabase<AltimateDB>>;
}

const dbName = "altimate";
const IndexedDBHelper: IndexedDBHelperProps = {
  _db: undefined,
  getDb: async () => {
    if (!IndexedDBHelper._db) {
      return IndexedDBHelper.initialize();
    }

    return IndexedDBHelper._db;
  },
  initialize: async () => {
    const dbInstance = await openDB<AltimateDB>(dbName, 1, {
      upgrade(db) {
        const generationsStore = db.createObjectStore("generations", {
          autoIncrement: true,
        });

        // Create indexes to link models and projects
        generationsStore.createIndex("projectIndex", "project");
        generationsStore.createIndex("modelIndex", "model");
      },
    });
    IndexedDBHelper._db = dbInstance;
    return dbInstance;
  },
};

export default IndexedDBHelper;
