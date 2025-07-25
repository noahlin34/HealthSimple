import { NotesInput } from "@/components/InputBox";
import SaveButton from "@/components/SaveButton";
import { addMedication } from "@/db/MedicationsProvider";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, View } from "react-native";

export default function AddMedicationSecond() {
  const { n, unit, name, frequency, timesPerDay } = useLocalSearchParams() as {
    n: string;
    unit: string;
    name: string;
    frequency: string;
    timesPerDay: string;
  };
  const [notes, setNotes] = useState("");

  const handleSaveMedication = async (
    n: number,
    unit: string,
    name: string,
    frequency: string,
    timesPerDay: number,
    notes: string,
  ) => {
    if (!n || !unit || !name || !frequency || !timesPerDay) {
      Alert.alert("Please add a name, dosage, and frequency before saving.");
      return;
    }

    await addMedication(name, n, unit, frequency, timesPerDay, notes);
    router.dismiss();
    router.dismiss();
    router.navigate({
      pathname: "/(home)/(medications)",
      params: { refresh: "1" },
    });
  };

  return (
    <View
      style={{
        padding: 20,
        flex: 1,
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <NotesInput
        header="Any notes to add?"
        notes={notes}
        setNotes={setNotes}
      />
      <KeyboardAvoidingView keyboardVerticalOffset={130} behavior="position">
        <SaveButton
          title="Add Medication"
          onPress={() =>
            handleSaveMedication(
              parseFloat(n),
              unit,
              name,
              frequency,
              parseInt(timesPerDay),
              notes,
            )
          }
        />
      </KeyboardAvoidingView>
    </View>
  );
}
