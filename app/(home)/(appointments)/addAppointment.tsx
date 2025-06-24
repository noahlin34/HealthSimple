import AppointmentsDateInput from "@/components/AppointmentsDateInput";
import InputBox, { NotesInput } from "@/components/InputBox";
import SaveButton from "@/components/SaveButton";
import { addAppointment } from "@/db/AppointmentsProvider";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export default function AddAppointment() {
  const [title, setTitle] = useState("");
  const [appointmentType, setAppointmentType] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date(Date.now()));
  const [notes, setNotes] = useState("");
  const scrollViewRef = useRef<ScrollView | null>(null);

  const handleSaveAppointment = async () => {
    if (!title || !location || !appointmentType) {
      Alert.alert("Please add a title and location.");
      return;
    }

    await addAppointment(
      title,
      appointmentType,
      location,
      notes,
      date.toISOString(),
    );
    router.dismissTo({
      pathname: "/(home)/(appointments)",
      params: { refresh: "1" },
    });
  };

  return (
    <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={100}>
      <ScrollView ref={scrollViewRef}>
        <View style={styles.container}>
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
          <InputBox
            header="Appointment Location:"
            value={location}
            setValue={setLocation}
            hintText="e.g. 2559 Kingston Ave, Remote, etc."
          />

          <NotesInput
            notes={notes}
            setNotes={setNotes}
            header="Any notes to add?"
            onTouch={() => scrollViewRef.current?.scrollToEnd()}
          />

          <SaveButton
            title="Save Appointment"
            onPress={handleSaveAppointment}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
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
