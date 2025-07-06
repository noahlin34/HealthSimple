import InputBox, { NotesInput } from "@/components/InputBox";
import SaveButton from "@/components/SaveButton";
import { addAppointment } from "@/db/AppointmentsProvider";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, View } from "react-native";
export default function AddAppointmentsSecond() {
  const { title, type, date } = useLocalSearchParams() as {
    title: string;
    type: string;
    date: string;
  };
  const [notes, setNotes] = useState("");
  const [location, setLocation] = useState("");

  const handleSaveAppointment = async () => {
    if (!title || !location || !type) {
      Alert.alert("Please add a title and location.");
      return;
    }

    await addAppointment(title, type, location, notes, date);
    router.dismiss();
    router.dismiss();
  };
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <View style={{ flex: 1 }}>
        <InputBox value={location} setValue={setLocation} header="Location" />
        <NotesInput
          notes={notes}
          setNotes={setNotes}
          header="Any notes to add?"
        />
      </View>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={130}>
        <SaveButton title="Add Appointment" onPress={handleSaveAppointment} />
      </KeyboardAvoidingView>
    </View>
  );
}
