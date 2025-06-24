import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
  Title: {
    fontSize: 30,
    fontFamily:
      Platform.OS === "ios" ? "LeagueSpartan-Bold" : "LeagueSpartan_700Bold",
  },
  labelSmall: {
    fontSize: 15,
    fontFamily:
      Platform.OS === "ios"
        ? "LeagueSpartan-Regular"
        : "LeagueSpartan_400Regular",
  },
  label: {
    fontSize: 20,
    fontFamily:
      Platform.OS === "ios"
        ? "LeagueSpartan-Regular"
        : "LeagueSpartan_400Regular",
  },
  labelLarge: {
    fontSize: 25,
    fontFamily:
      Platform.OS === "ios"
        ? "LeagueSpartan-Regular"
        : "LeagueSpartan_400Regular",
  },
  labelClickable: {
    fontSize: 20,
    fontFamily:
      Platform.OS === "ios"
        ? "LeagueSpartan-Regular"
        : "LeagueSpartan_400Regular",
    color: "black", // Default link color
  },
  labelBold: {
    fontSize: 20,
    fontFamily:
      Platform.OS === "ios" ? "LeagueSpartan-Bold" : "LeagueSpartan_700Bold",
  },
  labelBoldLarge: {
    fontSize: 20,
    fontFamily:
      Platform.OS === "ios" ? "LeagueSpartan-Bold" : "LeagueSpartan_700Bold",
  },
  body: {
    fontSize: 15,
    fontFamily:
      Platform.OS === "ios"
        ? "LeagueSpartan-Regular"
        : "LeagueSpartan_400Regular",
  },
  labelDestructive: {
    fontSize: 20,
    fontFamily:
      Platform.OS === "ios"
        ? "LeagueSpartan-Regular"
        : "LeagueSpartan_400Regular",
    color: "red", // Default destructive color
  },
});
