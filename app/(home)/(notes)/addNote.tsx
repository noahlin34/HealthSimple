import { NotesInput } from "@/components/InputBox";
import SaveButton from "@/components/SaveButton";
import { addNote } from "@/db/NotesProvider";
import { router } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";

export default function AddNote() {
  const [notes, setNotes] = useState("");

  const handleSaveNotes = async () => {
    try {
      const dateObj = new Date(Date.now());
      await addNote(dateObj.toISOString(), notes);
    } catch (error) {
      console.error("Error saving note:", error);
    } finally {
      router.dismissTo({
        pathname: "/(home)/(notes)",
        params: { refresh: "1" },
      });
    }
  };

  return (
    <View style={styles.container}>
      <NotesInput
        notes={notes}
        setNotes={setNotes}
        header="Enter notes here."
      />
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={130}>
        <SaveButton title="Save Note" onPress={handleSaveNotes} />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    padding: 10,
    fontWeight: "bold",
  },
});
