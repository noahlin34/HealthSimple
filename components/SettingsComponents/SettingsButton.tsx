import { FontAwesome5 } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Styles from "../Styles";

export default function SettingsButton({
  label,
  onPress,
}: {
  label: string;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => (pressed ? { opacity: 0.5 } : { opacity: 1 })}
    >
      <View style={styles.container}>
        <Text style={Styles.labelClickable}>{label}</Text>
        <FontAwesome5 name="chevron-right" size={15} color="#black" />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
