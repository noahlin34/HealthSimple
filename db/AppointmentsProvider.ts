import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("appointments.db");

export type Appointment = {
  id: number;
  title: string;
  type: string;
  location: string;
  notes: string;
  date: string;
};

export async function initAppointmentsDB() {
  await db.execAsync(
    "CREATE TABLE IF NOT EXISTS appointments (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, type TEXT NOT NULL, location TEXT NOT NULL, notes TEXT NOT NULL, date TEXT NOT NULL)",
  );
}

export async function getAllAppointments(): Promise<Appointment[]> {
  const result = await db.getAllAsync<Appointment>(
    "SELECT * FROM appointments",
  );
  return result;
}

export async function addAppointment(
  title: string,
  type: string,
  location: string,
  notes: string,
  date: string,
) {
  await db.runAsync(
    "INSERT INTO appointments (title, type, location, notes, date) VALUES (?, ?, ?, ?, ?)",
    [title, type, location, notes, date],
  );
}
export async function getAppointmentById(
  id: number,
): Promise<Appointment | null> {
  const result = await db.getFirstAsync<Appointment>(
    "SELECT * FROM appointments WHERE id = ?",
    id,
  );
  if (!result) {
    console.log(`No appointment found with id: ${id}`);
  }
  return result;
}
export async function deleteAppointmentById(id: number): Promise<void> {
  await db.runAsync("DELETE FROM appointments WHERE id = ?", id);
  console.log(`Deleted appointment with id: ${id}`);
}
export async function updateAppointment(
  id: number,
  title: string,
  type: string,
  location: string,
  notes: string,
  date: string,
): Promise<void> {
  await db.runAsync(
    "UPDATE appointments SET title = ?, type = ?, location = ?, notes = ?, date = ? WHERE id = ?",
    [title, type, location, notes, date, id],
  );
  console.log(`Updated appointment with id: ${id}`);
}
