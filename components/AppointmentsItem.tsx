import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Styles from "./Styles"; // Adjust the import path as necessary

type Props = {
  label: string;
  subheading: string;
  date: string;
  onPress?: () => void;
};

export function AddAppointmentButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.addAppointmentButton}>
        <Text style={styles.labelClickable}>Add Appointment</Text>
        <FontAwesome5 name="plus-circle" size={15} color="#007AFF" />
      </View>
    </Pressable>
  );
}

export default function AppointmentsItem({
  label,
  subheading,
  date,
  onPress,
}: Props) {
  const theDate = new Date(date);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
    >
      <View style={isPressed ? styles.containerPressed : styles.container}>
        <View style={styles.verticalContainer}>
          <Text style={Styles.label}>{label}</Text>
          <Text style={Styles.labelSmall}>{subheading}</Text>
        </View>
        <View style={styles.verticalContainer}>
          <Text style={Styles.label}>
            {theDate.toLocaleDateString("en-us", {
              month: "long",
              day: "numeric",
            })}
          </Text>
          <Text style={Styles.labelSmall}>
            {theDate.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
            })}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 84,
    width: 339,
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 30,
    backgroundColor: "white",
    boxShadow: "0px 5px 3px rgba(0, 0, 0, 0.1)",
  },
  containerPressed: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 84,
    width: 339,
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 30,
    backgroundColor: "#f0f0f0",
    boxShadow: "0px 5px 3px rgba(0, 0, 0, 0.1)",
  },
  verticalContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 20,
    fontFamily: "SpaceMono_400Regular",
  },
  subHeading: {
    fontSize: 16,
    fontFamily: "SpaceMono_400Regular",
  },
  labelClickable: {
    fontSize: 15,
    fontFamily: "SpaceMono_400Regular",
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
});
