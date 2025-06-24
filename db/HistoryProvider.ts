import * as SQLite from "expo-sqlite";

export type HistoryItem = {
  id: number;
  title: string;
  date: string;
  details: string;
  notes: string;
};

const db = SQLite.openDatabaseSync("history.db");

export async function initHistoryDB() {
  await db.execAsync(
    "CREATE TABLE IF NOT EXISTS history (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, date TEXT NOT NULL, details TEXT NOT NULL, notes TEXT)"
  );
}

export async function getAllHistoryItems(): Promise<HistoryItem[]> {
  const result = await db.getAllAsync<HistoryItem>("SELECT * FROM history");
  return result;
}

export async function addHistoryItem(
  title: string,
  date: string,
  details: string,
  notes: string
) {
  await db.runAsync(
    "INSERT INTO history (title, date, details, notes) VALUES (?, ?, ?, ?)",
    [title, date, details, notes]
  );
}

export async function getHistoryItemById(
  id: number
): Promise<HistoryItem | null> {
  const result = await db.getFirstAsync<HistoryItem>(
    "SELECT * FROM history WHERE id = ?",
    id
  );
  if (!result) {
    console.log(`No history item found with id: ${id}`);
  }
  return result;
}
export async function deleteHistoryItemById(id: number): Promise<void> {
  await db.runAsync("DELETE FROM history WHERE id = ?", id);
  console.log(`Deleted history item with id: ${id}`);
}
export async function updateHistoryItem(
  id: number,
  title: string,
  date: string,
  details: string,
  notes: string
): Promise<void> {
  await db.runAsync(
    "UPDATE history SET title = ?, date = ?, details = ?, notes = ? WHERE id = ?",
    [title, date, details, notes, id]
  );
  console.log(`Updated history item with id: ${id}`);
}
