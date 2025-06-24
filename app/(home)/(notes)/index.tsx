import AddButton from "@/components/AddButton";
import NotesListItem from "@/components/MyNotes/NotesListItem";
import { getAllNotes, initNotesDB, Note } from "@/db/NotesProvider";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function Index() {
  const { refresh } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState<Note[]>([]);

  const sortByDate = (a: Note, b: Note) => {
    const dateA = new Date(a.editDate);
    const dateB = new Date(b.editDate);
    return dateB.getTime() - dateA.getTime(); // Sort in descending order
  };

  const fetchNotes = async () => {
    try {
      initNotesDB();
      const items = await getAllNotes();
      setNotes(Array.isArray(items) ? items.sort(sortByDate) : []);
    } catch (error) {
      console.error("Error fetching notes:", error);
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchNotes();
      if (refresh === "1") {
        router.setParams({ refresh: undefined });
      }
    }, []),
  );

  useEffect(() => {
    setLoading(true);
    fetchNotes();
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
        data={notes}
        contentContainerStyle={{ gap: 10 }}
        keyExtractor={(item: Note) => item.id.toString()}
        ListFooterComponent={
          <AddButton
            label="Add Note"
            onPress={() =>
              router.navigate({ pathname: "/(home)/(notes)/addNote" })
            }
          />
        }
        renderItem={({ item }: { item: Note }) => (
          <NotesListItem
            id={item.id}
            content={item.content}
            editDate={item.editDate}
            onPress={() =>
              router.navigate({
                pathname: "/(home)/(notes)/notesDetail",
                params: { id: item.id.toString() },
              })
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    gap: 10,
  },
});
