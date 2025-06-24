import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import * as Haptics from "expo-haptics";
import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{ tabBarActiveTintColor: "dark-gray" }}
      screenListeners={{
        tabPress: (e) => {
          Haptics.impactAsync();
        },
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          headerShown: false,
          title: "",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="home" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          headerShown: false,
          title: "",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user" size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
