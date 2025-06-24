import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Styles from "./Styles";

type Props = {
  label: string;
  unit: string;
  value: number;
  onPress?: () => void;
};

export default function MedicationsItem({
  label,
  unit,
  value,
  onPress,
}: Props) {
    const [isPressed, setIsPressed] = useState(false);



  return (
    <Pressable onPress={onPress} style={isPressed ? styles.buttonPressed : styles.button} onPressIn={() => setIsPressed(true)} onPressOut={() => setIsPressed(false)} >
      <View style={styles.container}>
        <Text style={Styles.label}>{label}</Text>
        <Text style={Styles.label}>
          {value} {unit}
        </Text>
      </View>
    </Pressable>
  );
}

export function AddMedicationButton() {
  return (
    <Link href="./addMedication" asChild>
      <Pressable style={styles.container}>
      <Text style={styles.labelClickable}>Add Medication</Text>
        <FontAwesome5 name="plus-circle" size={15} color="#007AFF" />
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "white",
        boxShadow: "0px 5px 3px rgba(0, 0, 0, 0.1)",
        borderRadius: 15,
        width: 339,
        height: 50,
        justifyContent: "center",
        paddingHorizontal: 15,
    },
    buttonPressed: {
    backgroundColor: '#f0f0f0',
    boxShadow: "0px 5px 3px rgba(0, 0, 0, 0.1)",
    borderRadius: 15,
    width: 339,
    height: 50,
    justifyContent: "center",
    paddingHorizontal: 15,
    },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 20,
    fontFamily: "Inter_400Regular",
  },
  labelClickable: {
    fontSize: 20,
    fontFamily: "Inter_400Regular",
    color: "#007AFF", // Default link color
  },


 
});
