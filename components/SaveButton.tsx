import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import Styles from "./Styles";

type Props = {
  title: string;
  onPress?: () => void;
};

export default function SaveButton({ title, onPress }: Props) {
  const [isPressed, setIsPressed] = React.useState(false);
  return (
    <Pressable
      style={isPressed ? styles.saveButtonPressed : styles.saveButton}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={onPress}
    >
      <Text style={Styles.label}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  saveButton: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    alignSelf: "center",
    width: 339,
    boxShadow: "0px 5px 3px rgba(0, 0, 0, 0.1)",
    alignItems: "center",
  },
  saveButtonPressed: {
    backgroundColor: "#f0f0f0",
    borderRadius: 15,
    padding: 15,
    alignSelf: "center",
    width: 339,
    boxShadow: "0px 5px 3px rgba(0, 0, 0, 0.1)",
    alignItems: "center",
  },
});
