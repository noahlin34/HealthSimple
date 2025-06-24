import InputBox, { NotesInput } from "@/components/InputBox";
import SaveButton from "@/components/SaveButton";
import Styles from "@/components/Styles";
import { addHistoryItem } from "@/db/HistoryProvider";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function AddHistory() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date(Date.now()));
  const [notes, setNotes] = useState("");
  const [detail, setDetails] = useState("");

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

    await addHistoryItem(title, date, details, notes);
    router.dismissTo({
      pathname: "/(home)/(medicalHistory)",
      params: { refresh: 1 },
    });
    console.log("test");
  };

  return (
    <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={100}>
      <ScrollView>
        <View style={styles.container}>
          <InputBox
            value={title}
            setValue={setTitle}
            header="What is the title of this history event?"
          />
          <Text style={Styles.label}>When did this event occur?</Text>
          <DateTimePicker
            value={date}
            onChange={(event, date) => {
              if (date) {
                setDate(date);
              }
            }}
          />
          <InputBox
            value={detail}
            setValue={setDetails}
            header="Please provide details about this event."
            hintText="e.g. surgery, new perscription, etc."
          />
          <NotesInput
            notes={notes}
            setNotes={setNotes}
            header="Any additional notes?"
          />

          <SaveButton
            title="Save History Item"
            onPress={() =>
              handleSaveHistory(title, date.toISOString(), detail, notes)
            }
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    gap: 10,
  },
});
