import { StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  title: string;
  setTitle: (title: string) => void;
  appointmentType: string;
  setAppointmentType: (type: string) => void;
};

export default function AppointmentTitleInput({
  title,
  setTitle,
  appointmentType,
  setAppointmentType,
}: Props) {
  return (
    <View style={styles.container}>
      <Text>What is the title of your appointment?</Text>
      <TextInput
        value={title}
        onChangeText={(title) => setTitle(title)}
        style={styles.input}
        maxLength={100}
      />
      <Text>What is the purpose of your appointment?</Text>
      <TextInput
        value={appointmentType}
        onChangeText={(appointmentType) => setAppointmentType(appointmentType)}
        style={styles.input}
        placeholder="e.g. Checkup, Consultation"
        maxLength={200}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  horizontalContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },

  input: {
    width: 339,
    backgroundColor: "#E5E5EA",
    fontSize: 16,
    fontFamily: "SpaceMono_400Regular",
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 41,
    margin: 10,
  },
});
