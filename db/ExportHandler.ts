import * as SQlite from "expo-sqlite";

const appointmentsDb = SQlite.openDatabaseSync("appointments.db");
const medicationsDb = SQlite.openDatabaseSync("medications.db");
const teamMembersDb = SQlite.openDatabaseSync("teams.db");
const notesDb = SQlite.openDatabaseSync("notes.db");
const historyDb = SQlite.openDatabaseSync("history.db");

export async function getAllData() {
  console.log("Start");
  const appointments = await appointmentsDb.getAllAsync(
    "SELECT * FROM appointments",
  );
  const medications = await medicationsDb.getAllAsync(
    "SELECT * FROM medications",
  );

  const teamMembers = await teamMembersDb.getAllAsync("SELECT * FROM teams");
  console.log("1");

  const notes = await notesDb.getAllAsync("SELECT * FROM notes");
  const history = await historyDb.getAllAsync("SELECT * FROM history");
  console.log("Done");
  return {
    appointments,
    medications,
    teamMembers,
    notes,
    history,
  };
}
