import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Styles from "../Styles";

type Props = {
  name: string;
  role: string;
  onPress?: () => void;
};

export default function TeamItem({ name, role, onPress }: Props) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      style={isPressed ? styles.buttonPressed : styles.button}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
    >
      <View style={styles.container}>
        <Text style={Styles.label}>{name}</Text>
        <Text style={Styles.labelSmall}>{role}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  verticalContainer: {
    flexDirection: "column",
    paddingLeft: 10,
  },
  button: {
    borderRadius: 15,
    backgroundColor: "white",
    boxShadow: "0px 5px 3px rgba(0, 0, 0, 0.1)",
    width: 339,
  },
  buttonPressed: {
    borderRadius: 15,
    backgroundColor: "#f0f0f0",
    boxShadow: "0px 5px 3px rgba(0, 0, 0, 0.1)",
    height: 84,
    width: 339,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginVertical: 10,
    paddingVertical: 10,
  },
  label: {
    fontSize: 20,
  },

  subHeading: {
    fontSize: 16,
  },
});
