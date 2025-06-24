import InputBox from "@/components/InputBox";
import DosageSelector from "@/components/MedicationComponents/DosageSelector";
import FrequencySelector from "@/components/MedicationComponents/FrequencySelector";
import SaveButton from "@/components/SaveButton";
import { router } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";

export default function Index() {
  const [n, setN] = useState("");
  const [dosageUnit, setDosageUnit] = useState("mg");
  const [medicationName, setMedicationName] = useState("");
  const [medicationFrequency, setMedicationFrequency] = useState("daily");
  const [timesPerDay, setTimesPerDay] = useState("");

  return (
    <View style={styles.container}>
      <View>
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
      </View>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={130}>
        <SaveButton
          title="Next"
          onPress={() =>
            router.navigate({
              pathname: "/addMedicationSecond",
              params: {
                n: n,
                unit: dosageUnit,
                name: medicationName,
                frequency: medicationFrequency,
                timesPerDay: timesPerDay,
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
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 25,
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
