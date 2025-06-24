import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("medications.db");

export type Medication = {
  id: number;
  label: string;
  value: number;
  unit: string;
  frequency: string;
  timesPerDay: number;
  notes: string;
};

export async function initMedicationsDB() {
  await db.execAsync(
    "CREATE TABLE IF NOT EXISTS medications (id INTEGER PRIMARY KEY AUTOINCREMENT, label TEXT NOT NULL, unit TEXT NOT NULL, value REAL NOT NULL, frequency TEXT NOT NULL, timesPerDay INTEGER NOT NULL, notes TEXT NOT NULL)"
  );
  console.log("done!");
}

export async function getAllMedications(): Promise<Medication[]> {
  const result = await db.getAllAsync<Medication>("SELECT * FROM medications");
  console.log(db.databasePath);
  console.log(result);
  return result;
}

export async function addMedication(
  label: string,
  value: number,
  unit: string,
  frequency: string,
  timesPerDay: number,
  notes: string
) {
  await db.runAsync(
    "INSERT INTO medications (label, unit, value, frequency, timesPerDay, notes) VALUES (?, ?, ?, ?, ?, ?)",
    [label, unit, value, frequency, timesPerDay, notes]
  );
}

export async function getMedicationById(
  id: number
): Promise<Medication | null> {
  const result = await db.getFirstAsync<Medication>(
    "SELECT * FROM medications WHERE id = ?",
    id
  );
  if (!result) {
    console.log(`No medication found with id: ${id}`);
  }
  return result;
}

export async function deleteMedicationById(id: number): Promise<void> {
  await db.runAsync("DELETE FROM medications WHERE id = ?", id);
  console.log(`Deleted medication with id: ${id}`);
}

export async function updateMedication(
  id: number,
  label: string,
  value: number,
  unit: string,
  frequency: string,
  timesPerDay: number,
  notes: string
): Promise<void> {
  await db.runAsync(
    "UPDATE medications SET label = ?, value = ?, unit = ?, frequency = ?, timesPerDay = ?, notes = ? WHERE id = ?",
    [label, value, unit, frequency, timesPerDay, notes, id]
  );
  console.log(`Updated medication with id: ${id}`);
}
