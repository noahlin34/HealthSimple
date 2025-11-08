import MenuItem from "@/components/MenuItem";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <MenuItem
        symbolName={"pills"}
        symbolColor="skyblue"
        label="Medications"
        onPress={() => {
          router.push("/(home)/(medications)");
        }}
      />
      <MenuItem
        symbolName={"calendar"}
        symbolColor="limegreen"
        label="Appointments"
        onPress={() => router.push({ pathname: "/(home)/(appointments)" })}
      />
      <MenuItem
        symbolName={"user-alt"}
        symbolColor="orange"
        label="Health Care Team"
        onPress={() => router.push("/(home)/(teamMembers)")}
      />
      <MenuItem
        symbolName={"clipboard-list"}
        symbolColor="purple"
        label="Medical History"
        onPress={() => router.push("/(home)/(medicalHistory)")}
      />
      <MenuItem
        symbolName={"book-medical"}
        symbolColor="red"
        label="Notes"
        onPress={() => router.push("/(home)/(notes)")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 100,
  },
});
