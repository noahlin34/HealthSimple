import Styles from "@/components/Styles";
import { getAllData } from "@/db/ExportHandler";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Pressable, Text, View } from "react-native";
export default function Export() {
  const handleExport = async () => {
    console.log("Exporting data...");
    const data = await getAllData();
    if (!data) {
      console.error("No data found to export.");
      return;
    }
    console.log("Data fetched successfully:", data);
    const convertedData = JSON.stringify(data, null, 2);
    console.log("test");
    await FileSystem.writeAsStringAsync(
      FileSystem.cacheDirectory + "data.json",
      convertedData,
    );
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(FileSystem.cacheDirectory + "data.json");
    }
    console.log("test!");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: 15,
      }}
    >
      <Text style={Styles.body}>
        This will export all records stored in this app as a JSON file. This
        feature is intended for you to transfer your data out for safekeeping or
        to import it into another app. Please note that this does not include
        any data from external sources like Apple Health or Google Fit.
      </Text>
      <Pressable
        style={({ pressed }) => ({
          backgroundColor: "white",
          borderRadius: 15,
          padding: 15,
          opacity: pressed ? 0.5 : 1,
          boxShadow: "0px 5px 3px rgba(0, 0, 0, 0.1)",
        })}
        onPress={handleExport}
      >
        <Text style={Styles.labelClickable}>Export Data to file</Text>
      </Pressable>
    </View>
  );
}
