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

export default function DosageSelector({
  n,
  unit,
  setN,
  setUnit,
}: {
  n: string;
  unit: string;
  setN: (n: string) => void;
  setUnit: (unit: string) => void;
}) {
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.verticalFlexBox}>
      <Text style={Styles.label}>What is the dosage of your medication?</Text>
      <View style={styles.horizontalFlexBox}>
        <TextInput
          placeholder="Dosage"
          maxLength={10}
          inputMode="decimal"
          style={styles.dosageInput}
          onChangeText={(n) => setN(n)}
          value={n}
        />
        <Animated.View
          style={{
            backgroundColor: "#E5E5EA",
            flexDirection: "row",
            padding: 5,
            borderRadius: 15,
            height: "100%",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Animated.View style={[styles.pill, animatedStyle]} />
          <Pressable
            style={styles.dosageButton}
            onPress={() => {
              translateX.value = withTiming(-60);
              Haptics.impactAsync();
              setUnit("mg");
            }}
          >
            <Text style={styles.dosageButtonText}>mg</Text>
          </Pressable>
          <Pressable
            style={styles.dosageButton}
            onPress={() => {
              Haptics.impactAsync();
              translateX.value = withTiming(0);
              setUnit("g");
            }}
          >
            <Text style={styles.dosageButtonText}>g</Text>
          </Pressable>
          <Pressable
            style={styles.dosageButton}
            onPress={() => {
              translateX.value = withTiming(60);
              Haptics.impactAsync();
              setUnit("ml");
            }}
          >
            <Text style={styles.dosageButtonText}>ml</Text>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    position: "absolute",
    height: "100%",
    width: "33.33333%",
    zIndex: 0,
    borderRadius: 15,
    backgroundColor: "#a4a4ab",
    alignSelf: "center",
  },
  container: {
    flex: 1,
    padding: 25,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  horizontalFlexBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: 10,
    gap: 5,
  },
  verticalFlexBox: {
    flexDirection: "column",
    flex: 0.2,
    alignItems: "center",
    alignContent: "center",
  },

  inputBox: {
    width: "90%",
    height: 50,
    borderWidth: 1,
  },

  label: {
    fontSize: 16,
    margin: 10,
    fontFamily: "SpaceMono_400Regular",
  },

  input: {
    width: 339,
    height: 41,
    backgroundColor: "#E5E5EA",
    fontSize: 16,
    fontFamily: "SpaceMono_400Regular",
    borderRadius: 15,
    paddingHorizontal: 15,
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
    width: 150,
    backgroundColor: "#E5E5EA",
    fontSize: 16,
    fontFamily:
      Platform.OS === "ios"
        ? "LeagueSpartan-Regular"
        : "LeagueSpartan_400Regular",
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 41,
    zIndex: 1,
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
    backgroundColor: "#E5E5EA",
    borderRadius: 15,
    width: 100,
    padding: 10,
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
