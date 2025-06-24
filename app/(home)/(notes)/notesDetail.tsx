import { StyleSheet, Text, View } from "react-native";

import DetailButtons from "@/components/DetailButtons";
import LargeNotesCard from "@/components/MyNotes/LargeNotesCard";
import NotesTitle from "@/components/MyNotes/NotesTitle";
import { deleteNoteById, getNoteById, Note } from "@/db/NotesProvider";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function NotesDetail() {
  const { id, refresh } = useLocalSearchParams<{
    id: string;
    refresh?: string;
  }>();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchNote = async () => {
    try {
      const fetchedNote = await getNoteById(parseInt(id));
      if (!fetchedNote) {
        console.error(`No note found with id: ${id}`);
        return;
      }
      setNote(fetchedNote);
    } catch (error) {
      console.error("Error fetching note:", error);
    }
  };

  const handleDelete = async () => {
    try {
      deleteNoteById(parseInt(id));
    } catch (error) {
      console.error("Error deleting note:", error);
    } finally {
      router.dismissTo({
        pathname: "/(home)/(notes)",
        params: { refresh: "1" },
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchNote();
    if (refresh === "1") {
      router.setParams({ refresh: undefined });
    }
    setLoading(false);
  }, [id, refresh]);

  if (loading || !note) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NotesTitle date={note.editDate} />
      <LargeNotesCard notes={note.content} title={"_blank"} />
      <DetailButtons
        deleteTitle="Delete Note"
        onDelete={handleDelete}
        onEdit={() =>
          router.navigate({
            pathname: "/(home)/(notes)/editNote",
            params: { id: id.toString() },
          })
        }
        editButtonTitle="Edit Note"
        deleteButtonTitle="Delete Note"
        deleteMessage="Are you sure you want to delete this note? This action cannot be undone."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 20,
  },
});
