import { FontAwesome5 } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import { Pressable } from "react-native";
export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="addAppointmentsSecond"
        options={{
          headerShown: false,
          headerLeft: () => (
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome5 name="arrow-left" size={20} color="black" />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
