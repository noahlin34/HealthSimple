import { NotesInput } from "@/components/InputBox";
import SaveButton from "@/components/SaveButton";
import { getNoteById, updateNote } from "@/db/NotesProvider";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export default function AddNote() {
  const [notes, setNotes] = useState("");
  const { id } = useLocalSearchParams<{ id: string }>();

  const handleSaveNotes = async () => {
    try {
      const dateObj = new Date(Date.now());
      await updateNote(parseInt(id), dateObj.toISOString(), notes);
    } catch (error) {
      console.error("Error saving note:", error);
    } finally {
      router.dismissTo({
        pathname: "/(home)/(notes)/notesDetail",
        params: { id: id, refresh: "1" },
      });
    }
  };

  const fetchNote = async () => {
    try {
      const note = await getNoteById(parseInt(id));
      if (!note) {
        console.error(`No note found with id: ${id}`);
        return;
      }
      setNotes(note.content);
    } catch (error) {
      console.error("Error fetching note:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchNote();
    }
  }, []);

  return (
    <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={100}>
      <ScrollView>
        <View style={styles.container}>
          <NotesInput
            notes={notes}
            setNotes={setNotes}
            header="Enter notes here."
          />
          <SaveButton title="Save Note" onPress={handleSaveNotes} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    fontSize: 20,
    padding: 10,
    fontWeight: "bold",
  },
});
