import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Styles from "./Styles";

type Props = {
  labelLeft: string;
  labelRight: string;
  onPress?: () => void;
};

export default function ListItem({ labelLeft, labelRight, onPress }: Props) {
  const [isPressed, setIsPressed] = useState(false);

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
    <Animated.View style={[styles.container, animatedStyle]}>
      <Pressable
        onPress={onPress}
        style={isPressed ? styles.buttonPressed : styles.button}
        onPressIn={() => {
          scale.value = 0.95;
        }}
        onPressOut={() => {
          scale.value = 1;
        }}
      >
        <View style={styles.container}>
          <Text style={Styles.label}>{labelLeft}</Text>
          <Text style={Styles.label}>{labelRight}</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    boxShadow: "0px 5px 3px rgba(0, 0, 0, 0.1)",
    borderRadius: 30,
    width: 339,
    height: 50,
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  buttonPressed: {
    backgroundColor: "#f0f0f0",
    boxShadow: "0px 5px 3px rgba(0, 0, 0, 0.1)",
    borderRadius: 30,
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
