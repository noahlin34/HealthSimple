import InputBox, { NotesInput } from "@/components/InputBox";
import SaveButton from "@/components/SaveButton";
import Styles from "@/components/Styles";
import { getHistoryItemById, updateHistoryItem } from "@/db/HistoryProvider";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function EditHistory() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date(Date.now()));
  const [notes, setNotes] = useState("");
  const [detail, setDetails] = useState("");

  const handleSaveHistory = async (
    id: string,
    title: string,
    date: string,
    details: string,
    notes: string,
  ) => {
    if (!title || !details) {
      alert("Please add a title and details for the history item.");
      return;
    }

    await updateHistoryItem(parseInt(id), title, date, details, notes);
    router.dismissTo({
      pathname: "/(home)/(medicalHistory)/historyDetail",
      params: { id: id, refresh: 1 },
    });
    console.log("test");
  };

  const fetchHistoryItem = async () => {
    try {
      const history = await getHistoryItemById(parseInt(id));
      if (!history) {
        console.error(`No history item found with id: ${id}`);
        return;
      }
      setTitle(history.title);
      setDate(new Date(history.date));
      setDetails(history.details);
      setNotes(history.notes);
    } catch (error) {
      console.error("Error fetching history item:", error);
    }
  };

  useEffect(() => {
    fetchHistoryItem();
  }, []);

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
              handleSaveHistory(id, title, date.toISOString(), detail, notes)
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
