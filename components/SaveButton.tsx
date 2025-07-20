import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Styles from "./Styles";

type Props = {
  title: string;
  onPress?: () => void;
};

export default function SaveButton({ title, onPress }: Props) {
  const [isPressed, setIsPressed] = React.useState(false);
  const scale = useSharedValue(1);
  const animationConfig = {
    duration: 150,
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  };
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withTiming(scale.value, animationConfig) }],
    };
  });
  return (
    <Animated.View style={[{}, animatedStyle]}>
      <Pressable
        style={isPressed ? styles.saveButtonPressed : styles.saveButton}
        onPressIn={() => {
          scale.value = 0.95;
        }}
        onPressOut={() => {
          scale.value = 1;
        }}
        onPress={onPress}
      >
        <Text style={Styles.label}>{title}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  saveButton: {
    backgroundColor: "white",
    borderRadius: 30,
    padding: 15,
    alignSelf: "center",
    width: 339,
    boxShadow: "0px 5px 3px rgba(0, 0, 0, 0.1)",
    alignItems: "center",
  },
  saveButtonPressed: {
    backgroundColor: "#f0f0f0",
    borderRadius: 30,
    padding: 15,
    alignSelf: "center",
    width: 339,
    boxShadow: "0px 5px 3px rgba(0, 0, 0, 0.1)",
    alignItems: "center",
  },
});
