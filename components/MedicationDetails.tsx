import { StyleSheet, Text, View } from "react-native";

const mapDay = new Map();
mapDay.set("daily", "day");
mapDay.set("weekly", "week"); 
mapDay.set("monthly", "month");

type Props = {
  medicationName: string;
  dosage: number;
  unit: string;
  frequency: string;
  timesPerDay?: number;
  notes?: string;
};

export default function MedicationDetails({
  medicationName,
  dosage,
  unit,
  frequency,
  timesPerDay,
  notes,

}: Props) {
  return (
    <View style={styles.container}>
                <Text style={styles.header}>Details</Text>

      <View style={styles.cardContainer}>

        <Text style={styles.labelText}>
          {dosage} {unit}
        </Text>
        <Text style={styles.labelText}>Take {frequency}</Text>
        <Text style={styles.labelText}>{timesPerDay}x per {mapDay.get(frequency)}</Text>
    </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: "column",
    paddingVertical: 20,
    paddingHorizontal: 10,
    height: '100%',
  },
  labelText: {
    fontSize: 20,
  },

  horizontalContainer: {
    flexDirection: "row",
  },
  
  cardContainer: {
    alignSelf: "center",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 20,
    marginVertical: 5,
    height: '100%',
    width: 339,
    borderRadius: 15,
    backgroundColor: "white",
    boxShadow: "0px 5px 3px rgba(0, 0, 0, 0.1)",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "SpaceMono_400Regular",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  }
});
