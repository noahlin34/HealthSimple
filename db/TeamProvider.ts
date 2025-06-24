import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("teams.db");

export type TeamMember = {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  notes: string;
};

export async function initTeamsDB() {
  await db.execAsync(
    "CREATE TABLE IF NOT EXISTS teams (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, role TEXT NOT NULL, email TEXT, phone TEXT, notes TEXT)",
  );
}

export async function getAllTeamsMembers(): Promise<TeamMember[]> {
  const result = await db.getAllAsync<TeamMember>("SELECT * FROM teams");
  return result;
}

export async function addTeamMember(
  name: string,
  role: string,
  email: string,
  phone: string,
  notes: string,
) {
  await db.runAsync(
    "INSERT INTO teams (name, role, email, phone, notes) VALUES (?, ?, ?, ?, ?)",
    [name, role, email, phone, notes],
  );
}

export async function getTeamMemberById(
  id: number,
): Promise<TeamMember | null> {
  const result = await db.getFirstAsync<TeamMember>(
    "SELECT * FROM teams WHERE id = ?",
    id,
  );
  if (!result) {
    console.log(`No team member found with id: ${id}`);
  }
  return result;
}

export async function deleteTeamMemberById(id: number): Promise<void> {
  await db.runAsync("DELETE FROM teams WHERE id = ?", id);
  console.log(`Deleted team member with id: ${id}`);
}

export async function updateTeamMember(
  id: number,
  name: string,
  role: string,
  email: string,
  phone: string,
  notes: string,
): Promise<void> {
  await db.runAsync(
    "UPDATE teams SET name = ?, role = ?, email = ?, phone = ?, notes = ? WHERE id = ?",
    [name, role, email, phone, notes, id],
  );
  console.log(`Updated team member with id: ${id}`);
}
