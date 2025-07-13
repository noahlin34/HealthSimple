import AddButton from "@/components/AddButton";
import ListItem from "@/components/ListItem";
import {
  getAllMedications,
  initMedicationsDB,
  Medication,
} from "@/db/MedicationsProvider";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function Index() {
  const { refresh } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [medications, setMedications] = useState<Medication[]>([]);

  const fetchMedications = async () => {
    try {
      await initMedicationsDB();
      const meds = await getAllMedications();
      setMedications(Array.isArray(meds) ? meds : []);
    } catch (error) {
      console.error("Error fetching medications:", error);
      setMedications([]);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchMedications();
    }, []),
  );

  useEffect(() => {
    setLoading(true);
    fetchMedications();
    if (refresh === "1") {
      router.setParams({ refresh: undefined });
    }
  }, [refresh]);

  if (loading) {
    return <View></View>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ gap: 10 }}
        data={medications}
        renderItem={({ item }: { item: Medication }) => (
          <ListItem
            onPress={() =>
              router.navigate({
                pathname: "/(home)/(medications)/medicationDetailView",
                params: { id: item.id },
              })
            }
            labelLeft={item.label}
            labelRight={item.value + " " + item.unit}
          />
        )}
        keyExtractor={(item: Medication) => item.id.toString()}
        ListFooterComponent={
          <AddButton
            label="Add Medication"
            onPress={() =>
              router.navigate({
                pathname: "/(home)/(medications)/(addMedications)",
              })
            }
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
