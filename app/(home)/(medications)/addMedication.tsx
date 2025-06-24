import InputBox, { NotesInput } from "@/components/InputBox";
import DosageSelector from "@/components/MedicationComponents/DosageSelector";
import FrequencySelector from "@/components/MedicationComponents/FrequencySelector";
import SaveButton from "@/components/SaveButton";
import { addMedication } from "@/db/MedicationsProvider";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export default function AddMedication() {
  const [n, setN] = useState("");
  const [dosageUnit, setDosageUnit] = useState("mg");
  const [medicationName, setMedicationName] = useState("");
  const [medicationFrequency, setMedicationFrequency] = useState("daily");
  const [timesPerDay, setTimesPerDay] = useState("");
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
    router.dismissTo({
      pathname: "/(home)/(medications)",
      params: { refresh: "1" },
    });
  };

  return (
    <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={100}>
      <ScrollView>
        <View style={styles.container}>
          <InputBox
            value={medicationName}
            header="What is the name of your medication?"
            setValue={setMedicationName}
          />
          <DosageSelector
            n={n}
            setN={setN}
            unit={dosageUnit}
            setUnit={setDosageUnit}
          />

          <FrequencySelector
            frequency={medicationFrequency}
            setFrequency={setMedicationFrequency}
            timesPerDay={timesPerDay}
            setTimesPerDay={setTimesPerDay}
          />
          <NotesInput
            notes={notes}
            setNotes={setNotes}
            header="Any notes to add?"
          />
          <SaveButton
            title="Save Medication"
            onPress={() =>
              handleSaveMedication(
                parseFloat(n),
                dosageUnit,
                medicationName,
                medicationFrequency,
                parseInt(timesPerDay),
                notes,
              )
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
    padding: 25,
    gap: 20,
  },

  saveButton: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    alignSelf: "center",
    textAlign: "center",
    width: 339,
    boxShadow: "0px 5px 3px rgba(0, 0, 0, 0.1)",
  },
});
