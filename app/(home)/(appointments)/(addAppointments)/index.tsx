import AppointmentsDateInput from "@/components/AppointmentsDateInput";
import InputBox from "@/components/InputBox";
import SaveButton from "@/components/SaveButton";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export default function Index() {
  const [title, setTitle] = useState("");
  const [appointmentType, setAppointmentType] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date(Date.now()));
  const [notes, setNotes] = useState("");
  const scrollViewRef = useRef<ScrollView | null>(null);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <InputBox
          header="What is the title of your appointment?"
          value={title}
          setValue={setTitle}
        />
        <InputBox
          header="What is the purpose of your appointment?"
          value={appointmentType}
          setValue={setAppointmentType}
          hintText="e.g. checkup, follow-up, etc."
        />
        <AppointmentsDateInput date={date} setDate={setDate} />
      </View>

      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={130}>
        <SaveButton
          title="Next"
          onPress={() =>
            router.push({
              pathname: "/addAppointmentsSecond",
              params: {
                title: title,
                type: appointmentType,
                date: date.toISOString(),
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
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f0f0",
    gap: 10,
  },

  saveButton: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    alignSelf: "center",
    width: 339,
    boxShadow: "0px 5px 3px rgba(0, 0, 0, 0.1)",
  },
});
