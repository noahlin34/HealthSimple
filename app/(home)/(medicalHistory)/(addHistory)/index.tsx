import InputBox from "@/components/InputBox";
import SaveButton from "@/components/SaveButton";
import Styles from "@/components/Styles";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date(Date.now()));
  const [notes, setNotes] = useState("");
  const [detail, setDetails] = useState("");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        padding: 20,
        alignContent: "center",
      }}
    >
      <View style={{ flex: 1, alignContent: "center", alignItems: "center" }}>
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
      </View>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={130}>
        <SaveButton
          title="Next"
          onPress={() =>
            router.push({
              pathname: "/addHistorySecond",
              params: {
                title: title,
                date: date.toISOString(),
                detail: detail,
              },
            })
          }
        />
      </KeyboardAvoidingView>
    </View>
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
