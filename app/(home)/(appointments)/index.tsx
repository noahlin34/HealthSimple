import AddButton from "@/components/AddButton";
import ListItem from "@/components/ListItem";
import { truncate } from "@/components/Styles";
import {
  Appointment,
  getAllAppointments,
  initAppointmentsDB,
} from "@/db/AppointmentsProvider";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function Index() {
  const { refresh } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const sortByDate = (a: Appointment, b: Appointment) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime(); // Sort in descending order
  };

  const fetchAppointments = async () => {
    try {
      await initAppointmentsDB();
      const appts = await getAllAppointments();
      setAppointments(Array.isArray(appts) ? appts.sort(sortByDate) : []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchAppointments();
    }, []),
  );

  useEffect(() => {
    setLoading(true);
    fetchAppointments();
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
        data={appointments}
        renderItem={({ item }: { item: Appointment }) => (
          <ListItem
            onPress={() =>
              router.navigate({
                pathname: "/(home)/(appointments)/appointmentDetailView",
                params: { id: item.id },
              })
            }
            labelLeft={truncate(item.title) + " - " + truncate(item.type)}
            labelRight={new Date(item.date).toLocaleString("en-US", {
              month: "long",
              day: "numeric",
            })}
          />
        )}
        keyExtractor={(item: Appointment) => item.id.toString()}
        contentContainerStyle={{ gap: 10 }}
        ListFooterComponent={
          <AddButton
            label="Add Appointment"
            onPress={() =>
              router.navigate({
                pathname: "/(home)/(appointments)/(addAppointments)",
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
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
