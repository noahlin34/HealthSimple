import { NotesInput } from "@/components/InputBox";
import SaveButton from "@/components/SaveButton";
import { addHistoryItem } from "@/db/HistoryProvider";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, View } from "react-native";

export default function AddHistorySecond() {
  const [notes, setNotes] = useState("");
  const {
    title,
    date,
    detail,
  }: { title: string; date: string; detail: string } = useLocalSearchParams();

  const handleSaveHistory = async (
    title: string,
    date: string,
    details: string,
    notes: string,
  ) => {
    if (!title || !details) {
      alert("Please add a title and details for the history item.");
      return;
    }

    await addHistoryItem(title, date, detail, notes);
    router.dismiss();
    router.dismiss();
    console.log("test");
  };
  return (
    <View style={{ flex: 1, justifyContent: "space-between", padding: 20 }}>
      <View style={{ flex: 1 }}>
        <NotesInput
          header="Any notes to add?"
          notes={notes}
          setNotes={setNotes}
        />
      </View>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={130}>
        <SaveButton
          title="Add History Item"
          onPress={() =>
            handleSaveHistory(
              title as string,
              date as string,
              detail as string,
              notes,
            )
          }
        />
      </KeyboardAvoidingView>
    </View>
  );
}
