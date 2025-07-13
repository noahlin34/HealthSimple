import SettingsButton from "@/components/SettingsComponents/SettingsButton";
import { router } from "expo-router";
import { FlatList, View } from "react-native";

export default function Settings() {
  return (
    <View style={{ padding: 20, flex: 1, backgroundColor: "white" }}>
      <FlatList
        ItemSeparatorComponent={() => (
          <View
            style={{ height: 0.5, backgroundColor: "gray", marginVertical: 5 }}
          />
        )}
        data={[
          { label: "Edit username", path: "/(profile)/editUsername" },
          {
            label: "Change profile picture",
            path: "/(profile)/editPhoto",
          },
          {
            label: "Edit medical history",
            path: "/(profile)/editMedicalHistory",
          },
          {
            label: "Export health data",
            path: "/(profile)/export",
          },
        ]}
        renderItem={({ item }) => (
          <SettingsButton
            label={item.label}
            onPress={() => router.push(item.path)}
          />
        )}
      />
    </View>
  );
}
