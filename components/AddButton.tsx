import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Styles from "./Styles";

type Props = {
  label: string;
  onPress?: () => void;
};

export default function AddButton({ label, onPress }: Props) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Pressable
      style={
        isPressed
          ? styles.addAppointmentButtonPressed
          : styles.addAppointmentButton
      }
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
    >
      <View
        style={{
          gap: 10,
          height: "100%",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <FontAwesome5 name="plus" size={15} color="black" />

        <Text style={Styles.labelClickable}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  labelClickable: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    color: "#007AFF", // Default link color
  },
  addAppointmentButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: 339,
    borderRadius: 15,
    backgroundColor: "white",
    boxShadow: "0px 5px 3px rgba(0, 0, 0, 0.1)",
  },
  addAppointmentButtonPressed: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: 339,
    borderRadius: 15,
    backgroundColor: "#f0f0f0",
    boxShadow: "0px 5px 3px rgba(0, 0, 0, 0.1)",
  },
});
