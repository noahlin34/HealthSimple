import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: "whitesmoke" },
        headerTitleStyle: {
          fontFamily:
            Platform.OS === "ios"
              ? "LeagueSpartan-Bold"
              : "LeagueSpartan_700Bold",
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Home" }} />
    </Stack>
  );
}
