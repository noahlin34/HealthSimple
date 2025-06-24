import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("profile.db");

export type Profile = {
  id: number;
  name: string;
  dob: string;
  photoURI: string;
};

export async function initProfileDB() {
  await db.execAsync(
    "CREATE TABLE IF NOT EXISTS profile (id INTEGER PRIMARY KEY CHECK (id = 1), name TEXT NOT NULL, dob TEXT NOT NULL, photoURI TEXT NOT NULL)",
  );
  await db.runAsync(
    "INSERT OR IGNORE INTO profile (id, name, dob, photoURI) VALUES (?, ?, ?, ?)",
    [1, "ADD NAME", new Date(Date.now()).toISOString(), ""],
  );
}

export async function getProfile(): Promise<Profile | null> {
  const result = await db.getFirstAsync<Profile>(
    "SELECT * FROM profile WHERE id = 1",
  );
  if (!result) {
    console.log("No profile found");
    return null;
  }
  return result;
}

export async function updateProfile(
  name: string,
  dob: string,
  photoURI: string,
): Promise<void> {
  await db.runAsync(
    "UPDATE profile SET name = ?, dob = ?, photoURI = ? WHERE id = 1",
    [name, dob, photoURI],
  );
  console.log("Profile updated");
}

export async function updateProfileName(name: string): Promise<void> {
  await db.runAsync("UPDATE profile SET name = ? WHERE id = 1", [name]);
  console.log("Profile name updated");
}

export async function updateProfilephotoURI(photoURI: string): Promise<void> {
  await db.runAsync("UPDATE profile SET photoURI = ? WHERE id = 1", [photoURI]);
  console.log("Profile photo URI updated");
}

export async function updateProfileDOB(dob: string): Promise<void> {
  await db.runAsync("UPDATE profile SET dob = ? WHERE id = 1", [dob]);
  console.log("Profile date of birth updated");
}
