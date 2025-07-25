import { Platform, StyleSheet } from "react-native";

export function truncate(text: string): string {
  if (text.length > 10) {
    return text.substring(0, 10) + "...";
  }
  return text;
}

export default StyleSheet.create({
  Title: {
    fontSize: 40,
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
  labelBoldGray: {
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
