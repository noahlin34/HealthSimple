import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { StyleSheet, Text, View } from "react-native";
import Styles from "../Styles";

export default function NotesTitle({ date }: { date: string }) {
  const dateObj = new Date(date);

  return (
    <View style={styles.container}>
      <FontAwesome5 name="file-medical" color="red" size={30} />
      <Text style={Styles.Title}>
        {dateObj.toLocaleString("en-us", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
  },
});
