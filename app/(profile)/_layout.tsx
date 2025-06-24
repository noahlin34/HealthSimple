import { FontAwesome5 } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import { Platform, Pressable } from "react-native";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerTitleStyle: {
          fontFamily:
            Platform.OS === "ios"
              ? "LeagueSpartan-Bold"
              : "LeagueSpartan_700Bold",
        },
        headerLeft: () => (
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
          >
            <FontAwesome5 name="arrow-left" size={20} color="dark-gray" />
          </Pressable>
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Profile",
          headerRight: () => (
            <Pressable
              onPress={() => router.push("/(profile)/settings")}
              style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
            >
              <FontAwesome5 name="cog" size={20} color="dark-gray" />
            </Pressable>
          ),
          headerLeft: undefined,
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: "Settings",
          headerLeft: () => (
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
            >
              <FontAwesome5 name="arrow-left" size={20} color="dark-gray" />
            </Pressable>
          ),
          headerTitleStyle: {
            fontFamily:
              Platform.OS === "ios"
                ? "LeagueSpartan-Bold"
                : "LeagueSpartan_700Bold",
          },
        }}
      />
    </Stack>
  );
}
