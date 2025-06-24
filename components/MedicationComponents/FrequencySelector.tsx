import Styles from "@/components/Styles";
import * as Haptics from "expo-haptics";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function FrequencySelector({
  frequency,
  setFrequency,
  timesPerDay,
  setTimesPerDay,
}: {
  frequency: string;
  setFrequency: (frequency: string) => void;
  timesPerDay: string;
  setTimesPerDay: (timesPerDay: string) => void;
}) {
  const mapDay = new Map();
  const translateX = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  mapDay.set("daily", "day");
  mapDay.set("weekly", "week");
  mapDay.set("monthly", "month");

  return (
    <View style={styles.verticalFlexBox}>
      <Text style={Styles.label}>How often do you take this medication?</Text>
      <View style={styles.horizontalFlexBox}>
        <Animated.View style={[styles.pill, animatedStyle]} />
        <Pressable
          style={styles.freqButton}
          onPress={() => {
            translateX.value = withTiming(-110);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setFrequency("daily");
          }}
        >
          <Text style={styles.dosageButtonText}>Daily</Text>
        </Pressable>
        <Pressable
          style={styles.freqButton}
          onPress={() => {
            setFrequency("weekly");
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            translateX.value = withTiming(0);
          }}
        >
          <Text style={styles.dosageButtonText}>Weekly</Text>
        </Pressable>
        <Pressable
          style={styles.freqButton}
          onPress={() => {
            translateX.value = withTiming(110);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setFrequency("monthly");
          }}
        >
          <Text style={styles.dosageButtonText}>Monthly</Text>
        </Pressable>
      </View>
      <View style={styles.horizontalFlexBoxx}>
        <Text style={Styles.label}>
          {" "}
          How many times per {mapDay.get(frequency)}?
        </Text>

        <TextInput
          style={styles.dosageInput}
          onChangeText={(timesPerDay) => setTimesPerDay(timesPerDay)}
          value={timesPerDay}
          inputMode={"numeric"}
          maxLength={10}
        ></TextInput>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    backgroundColor: "#a4a4ab",
    width: 100,
    position: "absolute",
    height: "80%",
    borderRadius: 15,
    zIndex: 0,
  },
  horizontalFlexBox: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#E5E5EA",
    borderRadius: 15,
  },
  horizontalFlexBoxx: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    borderRadius: 15,
  },
  verticalFlexBox: {
    flexDirection: "column",
    flex: 0.25,
    alignItems: "center",
    gap: 15,
  },

  inputBox: {
    width: "90%",
    height: 50,
    borderWidth: 1,
  },

  notesInput: {
    width: 339,
    height: 150,
    backgroundColor: "#E5E5EA",
    fontSize: 16,
    fontFamily: "SpaceMono_400Regular",
    borderRadius: 15,
    paddingHorizontal: 15,
  },
  dosageInput: {
    width: "30%",
    backgroundColor: "#E5E5EA",
    fontSize: 16,
    fontFamily:
      Platform.OS === "ios"
        ? "LeagueSpartan-Regular"
        : "LeagueSpartan_400Regular",
    borderRadius: 15,
    paddingHorizontal: 15,
    height: "175%",
  },
  dosagePicker: {
    width: 150,
    fontSize: 14,
    fontFamily: "SpaceMono_400Regular",
    borderRadius: 100,
    marginVertical: 0,
  },
  dosageButton: {
    borderRadius: 15,
    width: 60,
    padding: 10,
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  dosageButtonActive: {
    backgroundColor: "#a4a4ab",
    borderRadius: 15,
    padding: 10,
    width: 60,
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  dosageButtonText: {
    textAlign: "center",
    fontSize: 16,
    fontFamily:
      Platform.OS === "ios"
        ? "LeagueSpartan-Regular"
        : "LeagueSpartan_400Regular",
    justifyContent: "center",
    alignItems: "center",
  },

  freqButton: {
    borderRadius: 15,
    width: 100,
    padding: 10,
    zIndex: 1,
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  freqButtonActive: {
    backgroundColor: "#a4a4ab",
    borderRadius: 15,
    width: 100,
    padding: 10,
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
  },
});
