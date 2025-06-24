import { NotesInput } from "@/components/InputBox";
import SaveButton from "@/components/SaveButton";
import { getProfile, updateProfileDOB } from "@/db/ProfileProvider";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, View } from "react-native";

export default function EditMedicalHistory() {
  const [notes, setNotes] = useState("");

  const fetchMedicalHistory = async () => {
    try {
      const profile = await getProfile();
      if (profile) {
        setNotes(profile.dob || "");
      }
    } catch (error) {
      console.error("Error fetching medical history:", error);
    }
  };

  const handleSave = async () => {
    if (!notes) {
      console.error("Medical history cannot be empty.");
      return;
    }
    try {
      // Here you would typically save the notes to the database
      // For example: await updateMedicalHistory(notes);
      await updateProfileDOB(notes);
    } catch (error) {
      console.error("Error saving medical history:", error);
    } finally {
      router.dismiss();
    }
  };

  useEffect(() => {
    fetchMedicalHistory();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
        flexDirection: "column",
      }}
    >
      <NotesInput
        header="Provide information about your medical history, especially information that may be relevant to first responders."
        notes={notes}
        setNotes={setNotes}
      />
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={130}>
        <SaveButton title="Update Medical History" onPress={handleSave} />
      </KeyboardAvoidingView>
    </View>
  );
}
