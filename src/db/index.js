import * as SQLite from "expo-sqlite";

let db;

export const initDb = async () => {
  if(!db) {
    db = await SQLite.openDatabaseAsync("souljournal.db")
  };
};

export const initSessionsTable = async () => {
  console.log("Iniciando tablas");

  await initDb();
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      localId TEXT,
      email TEXT,
      token TEXT
    )
  `);
};

export const saveSession = async (localId, email, token) => {
  await initDb();
  await db.runAsync("DELETE FROM sessions;");
  await db.runAsync("INSERT INTO sessions (localId, email, token) VALUES (?, ?, ?);", [
    localId,
    email,
    token
  ]);
  console.log("Session saved successfully!");
};

export const getSession = async () => {
  await initDb();
  const result = await db.getAllAsync("SELECT * FROM sessions LIMIT 1;");
  console.log("Getting data from SQLite:", result);
  return result.length > 0 ? result[0] : null;
};

export const clearSession = async () => {
  await initDb();
  await db.runAsync("DELETE FROM sessions;");
};
