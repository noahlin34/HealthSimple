import AddButton from "@/components/AddButton";
import HistoryLabelItem from "@/components/MedicalHistoryComponents/HistoryLabelItem";
import {
  HistoryItem,
  getAllHistoryItems,
  initHistoryDB,
} from "@/db/HistoryProvider";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function Index() {
  const { refresh } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);

  type ItemProps = {
    item: HistoryItem;
    onPress: () => void;
  };

  const fetchHistoryItems = async () => {
    try {
      initHistoryDB();
      const items = await getAllHistoryItems();
      setHistoryItems(Array.isArray(items) ? items : []);
      console.log(items);
    } catch (error) {
      console.error("Error fetching history items:", error);
      setHistoryItems([]);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchHistoryItems();
    }, []),
  );

  useEffect(() => {
    setLoading(true);
    fetchHistoryItems();
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
        data={historyItems}
        renderItem={({ item }: { item: HistoryItem }) => (
          <HistoryLabelItem
            id={item.id}
            date={item.date}
            title={item.title}
            onPress={() =>
              router.navigate({
                pathname: "/(home)/(medicalHistory)/historyDetail",
                params: { id: item.id.toString() },
              })
            }
          />
        )}
        keyExtractor={(item: HistoryItem) => item.id.toString()}
        ListFooterComponent={
          <AddButton
            label="Add Medical History Item"
            onPress={() =>
              router.navigate({
                pathname: "/(home)/(medicalHistory)/(addHistory)",
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
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: 20,
  },
});
