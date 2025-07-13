import Styles from "@/components/Styles";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type Props = {
  label: string;
  symbolName: keyof typeof FontAwesome5.glyphMap; // Ensure type safety for icon names
  symbolColor?: string;
  onPress?: () => void;
};

export default function MenuItem({
  label,
  symbolName,
  symbolColor,
  onPress,
}: Props) {
  const [isPressed, setIsPressed] = useState(false);
  const scale = useSharedValue(1);
  const config = {
    duration: 100,
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  };

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withTiming(scale.value, config) }],
    };
  });

  return (
    <Animated.View style={[styles.container, style]}>
      <Pressable
        onPress={() => {
          onPress?.();
        }}
        onPressIn={() => {
          scale.value = 0.9;
        }}
        onPressOut={() => {
          scale.value = 1;
        }}
        style={isPressed ? styles.buttonPressed : styles.button}
      >
        <View style={styles.container}>
          <FontAwesome5
            name={symbolName}
            size={30}
            color={symbolColor || "black"}
            style={{ marginHorizontal: 20 }}
          />
          <Text style={Styles.labelLarge}>{label}</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  button: {
    boxShadow: "0px 5px 3px rgba(0, 0, 0, 0.1)",
    backgroundColor: "white",
    borderRadius: 30,
    width: 339,
    height: 61,
    paddingLeft: 15,
    justifyContent: "center",
    margin: 10,
  },
  buttonPressed: {
    backgroundColor: "#f0f0f0",
    boxShadow: "0px 5px 3px rgba(0, 0, 0, 0.1)",
    borderRadius: 30,
    width: 339,
    height: 61,
    justifyContent: "center",
    paddingLeft: 15,
    margin: 10,
  },
  label: {
    fontSize: 20,
    fontFamily: "Inter_400Regular",
  },
});
