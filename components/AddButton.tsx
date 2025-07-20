import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
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
  label: string;
  onPress?: () => void;
};

export default function AddButton({ label, onPress }: Props) {
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
    <Animated.View style={[{}, animatedStyle]}>
      <Pressable
        style={
          isPressed
            ? styles.addAppointmentButtonPressed
            : styles.addAppointmentButton
        }
        onPress={onPress}
        onPressIn={() => {
          scale.value = 0.95;
        }}
        onPressOut={() => {
          scale.value = 1;
        }}
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
    </Animated.View>
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
    borderRadius: 30,
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
    borderRadius: 30,
    backgroundColor: "#f0f0f0",
    boxShadow: "0px 5px 3px rgba(0, 0, 0, 0.1)",
  },
});
