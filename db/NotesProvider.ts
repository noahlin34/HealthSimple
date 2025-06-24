import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("notes.db");

export type Note = {
  id: number;
  editDate: string;
  content: string;
};

export async function initNotesDB() {
  await db.execAsync(
    "CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, editDate TEXT NOT NULL, content TEXT NOT NULL)"
  );
}
export async function getAllNotes(): Promise<Note[]> {
  const result = await db.getAllAsync<Note>("SELECT * FROM notes");
  return result;
}
export async function addNote(editDate: string, content: string) {
  await db.runAsync("INSERT INTO notes (editDate, content) VALUES (?, ?)", [
    editDate,
    content,
  ]);
}
export async function getNoteById(id: number): Promise<Note | null> {
  const result = await db.getFirstAsync<Note>(
    "SELECT * FROM notes WHERE id = ?",
    id
  );
  if (!result) {
    console.log(`No note found with id: ${id}`);
  }
  return result;
}
export async function deleteNoteById(id: number): Promise<void> {
  await db.runAsync("DELETE FROM notes WHERE id = ?", id);
  console.log(`Deleted note with id: ${id}`);
}
export async function updateNote(
  id: number,
  editDate: string,
  content: string
): Promise<void> {
  await db.runAsync("UPDATE notes SET editDate = ?, content = ? WHERE id = ?", [
    editDate,
    content,
    id,
  ]);
  console.log(`Updated note with id: ${id}`);
}
