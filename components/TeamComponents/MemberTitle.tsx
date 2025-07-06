import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { StyleSheet, Text, View } from "react-native";

export default function MemberTitle({ name }: { name: string }) {
  return (
    <View style={styles.horizontalContainer}>
      <FontAwesome5 name="user-md" size={50} color="orange" />
      <Text style={styles.titleText}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  horizontalContainer: {
    flexDirection: "row",
    flex: 0.75,
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    padding: 10,
  },
});
