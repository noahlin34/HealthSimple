import InputBox, { NotesInput } from "@/components/InputBox";
import DosageSelector from "@/components/MedicationComponents/DosageSelector";
import FrequencySelector from "@/components/MedicationComponents/FrequencySelector";
import SaveButton from "@/components/SaveButton";
import {
  Medication,
  getMedicationById,
  updateMedication,
} from "@/db/MedicationsProvider";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
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

  const { id } = useLocalSearchParams<{ id: string }>();

  const fetchMedication = async () => {
    try {
      const medication: Medication | null = await getMedicationById(
        parseInt(id),
      ); // Replace 1 with the actual ID you want to fetch
      if (!medication) {
        console.error(`No medication found with id: ${id}`);
        return;
      }
      setN(medication.value.toString());
      setDosageUnit(medication.unit);
      setMedicationName(medication.label);
      setMedicationFrequency(medication.frequency);
      setTimesPerDay(medication.timesPerDay.toString());
      setNotes(medication.notes || "");
    } catch (error) {
      console.error("Error fetching medication:", error);
    }
  };

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

    await updateMedication(
      parseInt(id),
      name,
      n,
      unit,
      frequency,
      timesPerDay,
      notes,
    );
    router.dismissTo({
      pathname: "/(home)/(medications)/medicationDetailView",
      params: { id: id, refresh: "1" },
    });
  };

  useEffect(() => {
    fetchMedication();
  }, []);

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
