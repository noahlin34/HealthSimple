import AppointmentTitle from "@/components/AppointmentTitle";
import { DeleteButton } from "@/components/DetailButtons";
import DetailCard from "@/components/DetailCard";
import NotesCard from "@/components/NotesCard";
import Styles from "@/components/Styles";
import {
  Appointment,
  deleteAppointmentById,
  getAppointmentById,
} from "@/db/AppointmentsProvider";
import { FontAwesome5 } from "@expo/vector-icons";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

export default function AppointmentDetailView() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { refresh } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [appointment, setAppointment] = useState<Appointment | null>(null);

  const fetchAppointment = async () => {
    try {
      const appt = await getAppointmentById(parseInt(id));
      setAppointment(appt);
    } catch (error) {
      console.error("Error fetching appointment:", error);
      setAppointment(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAppointment = async () => {
    try {
      await deleteAppointmentById(parseInt(id));
    } catch (error) {
      console.error("Error deleting appointment:", error);
      Alert.alert("Error", "Failed to delete appointment.");
    } finally {
      router.dismissTo({
        pathname: "/(home)/(appointments)",
        params: { refresh: "1" },
      });
    }
  };

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
          })}
          onPress={() =>
            router.push({ pathname: "/editAppointment", params: { id: id } })
          }
        >
          <FontAwesome5 name="pencil-alt" size={20} color="dark-gray" />
        </Pressable>
      ),
    });
  });

  useEffect(() => {
    setLoading(true);
    fetchAppointment();
    if (refresh === "1") {
      router.setParams({ refresh: undefined });
    }
  }, [refresh]);
  if (loading || !appointment) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppointmentTitle title={appointment.title} date={appointment.date} />
      <DetailCard
        objects={
          <>
            <Text style={Styles.label}>{appointment.type}</Text>
            <Text style={Styles.label}>{appointment.location}</Text>
          </>
        }
        title="Details"
      />
      <NotesCard notes={appointment.notes} title="Notes" />
      <DeleteButton
        title="Delete Appointment"
        onDelete={handleDeleteAppointment}
        deleteMessage="Are you sure you want to delete this appointment? This action cannot be undone."
        deleteTitle="Delete Appointment"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
    gap: 20,
    flexDirection: "column",
    justifyContent: "space-evenly",
    height: "100%",
  },
  button: {},
});
