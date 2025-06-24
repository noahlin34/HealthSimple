import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  n: string;
  setN: (n: string) => void;
  dosageUnit: string;
  setDosageUnit: (unit: string) => void;
  medicationName: string;
  setMedicationName: (name: string) => void;
  frequency: string;
  setFrequency: (frequency: string) => void;
  timesPerDay: string;
  setTimesPerDay: (times: string) => void;
  notes: string;
  setNotes: (notes: string) => void;
};

const mapDay = new Map();
mapDay.set("daily", "day");
mapDay.set("weekly", "week");
mapDay.set("monthly", "month");

export default function MedicationForm({
  n,
  setN,
  dosageUnit,
  setDosageUnit,
  medicationName,
  setMedicationName,
  frequency,
  setFrequency,
  timesPerDay,
  setTimesPerDay,
  notes,
  setNotes,
}: Props) {
  // const [n, setN] = useState("");
  // const [dosageUnit, setDosageUnit] = useState("mg");
  // const [medicationName, setMedicationName] = useState("");

  const handleOnChangeTimesPerDay = (timesPerDay: string) => {
    const filteredText = timesPerDay.replace(/[^0-9]/g, ""); // Remove non-alphabetic characters
    setTimesPerDay(filteredText); // Update state with filtered text
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>What is the name of your medication?</Text>
      <TextInput
        maxLength={100}
        placeholder="Medication Name"
        style={styles.input}
        value={medicationName}
        onChangeText={(text) => setMedicationName(text)}
      />
      <>
        <Text style={styles.label}>What is the dosage of your medication?</Text>
        <View style={styles.horizontalFlexBox}>
          <TextInput
            placeholder="Dosage"
            maxLength={10}
            inputMode="decimal"
            style={styles.dosageInput}
            onChangeText={(n) => setN(n)}
            value={n}
          />
          <Pressable
            style={
              dosageUnit === "mg"
                ? styles.dosageButtonActive
                : styles.dosageButton
            }
            onPress={() => setDosageUnit("mg")}
          >
            <Text style={styles.dosageButtonText}>mg</Text>
          </Pressable>
          <Pressable
            style={
              dosageUnit === "g"
                ? styles.dosageButtonActive
                : styles.dosageButton
            }
            onPress={() => setDosageUnit("g")}
          >
            <Text style={styles.dosageButtonText}>g</Text>
          </Pressable>
          <Pressable
            style={
              dosageUnit === "ml"
                ? styles.dosageButtonActive
                : styles.dosageButton
            }
            onPress={() => setDosageUnit("ml")}
          >
            <Text style={styles.dosageButtonText}>ml</Text>
          </Pressable>
        </View>

        <Text style={styles.label}>
          Do you have any notes for this medication?
        </Text>
        <TextInput
          maxLength={400}
          placeholder="Notes"
          style={styles.notesInput}
          value={notes}
          editable={true}
          multiline={true}
          onChangeText={(text) => setNotes(text)}
        />
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  horizontalFlexBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
  },

  inputBox: {
    width: "90%",
    height: 50,
    borderWidth: 1,
  },

  label: {
    fontSize: 16,
    margin: 10,
    fontFamily: "SpaceMono_400Regular",
  },

  input: {
    width: 339,
    height: 41,
    backgroundColor: "#E5E5EA",
    fontSize: 16,
    fontFamily: "SpaceMono_400Regular",
    borderRadius: 15,
    paddingHorizontal: 15,
  },
  notesInput: {
    width: 339,
    height: 150,
    backgroundColor: "#E5E5EA",
    fontSize: 16,
    fontFamily: "SpaceMono_400Regular",
    borderRadius: 15,
    paddingHorizontal: 15,
  },
  dosageInput: {
    width: 150,
    backgroundColor: "#E5E5EA",
    fontSize: 16,
    fontFamily: "SpaceMono_400Regular",
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 41,
  },
  dosagePicker: {
    width: 150,
    fontSize: 14,
    fontFamily: "SpaceMono_400Regular",
    borderRadius: 100,
    marginVertical: 0,
  },
  dosageButton: {
    backgroundColor: "#E5E5EA",
    borderRadius: 15,
    width: 60,
    padding: 10,
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  dosageButtonActive: {
    backgroundColor: "#a4a4ab",
    borderRadius: 15,
    padding: 10,
    width: 60,
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  dosageButtonText: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "SpaceMono_400Regular",
    justifyContent: "center",
    alignItems: "center",
  },

  freqButton: {
    backgroundColor: "#E5E5EA",
    borderRadius: 15,
    width: 100,
    padding: 10,
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  freqButtonActive: {
    backgroundColor: "#a4a4ab",
    borderRadius: 15,
    width: 100,
    padding: 10,
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
  },
});
