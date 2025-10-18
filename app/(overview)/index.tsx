import DetailCard from "@/components/DetailCard";
import Styles from "@/components/Styles";
import {
  Appointment,
  getUpComingAppointments,
} from "@/db/AppointmentsProvider";
import { getDailyMedications, Medication } from "@/db/MedicationsProvider";
import { getProfileName } from "@/db/ProfileProvider";
import { FontAwesome5 } from "@expo/vector-icons";
import { Text } from "@react-navigation/elements";
import { registerRootComponent } from "expo";
import { Link, router, useFocusEffect } from "expo-router";
import "expo-router/entry";
import { useCallback, useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";

export default function Index() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("Noah");
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const fetchName = async () => {
    try {
      const name = await getProfileName();
      setName(name ?? "User");
    } catch (error) {
      console.error("Error fetching name:", error);
      setName("User");
    }
  };

  const fetchUpComingAppointments = async () => {
    try {
      const appointments = await getUpComingAppointments();
      console.log("Upcoming Appointments:", appointments);
      setAppointments(appointments);
    } catch (error) {
      console.error("Error fetching upcoming appointments:", error);
      setAppointments([]);
    }
  };

  const fetchDailyMedications = async () => {
    try {
      const meds = await getDailyMedications();
      setMedications(meds);
    } catch (error) {
      console.error("Error fetching daily medications:", error);
      setMedications([]);
    } finally {
      setLoading(false);
    }
  };

  const appointmentsFlatList = () => {
    if (appointments.length === 0) {
      return <Text style={Styles.labelBold}>No upcoming appointments. </Text>;
    }

    return (
      <FlatList
        style={{ alignContent: "center", padding: 10 }}
        data={appointments}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                marginVertical: 10,
                height: 1,
                backgroundColor: "lightgray",
              }}
            />
          );
        }}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1,
            })}
            onPress={() =>
              router.push({
                pathname: "/(home)/(appointments)/appointmentDetailView",
                params: { id: item.id },
              })
            }
          >
            <View style={{ flex: 1, flexDirection: "row" }}>
              <FontAwesome5 name="calendar" size={24} color="limegreen" />
              <View style={{ flex: 1, flexDirection: "column" }}>
                <Text style={Styles.listLabel}>{item.title} </Text>
                <Text style={Styles.labelSmall}>
                  {" "}
                  {new Date(item.date).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </View>
            </View>
          </Pressable>
        )}
      ></FlatList>
    );
  };

  const medicationsFlatList = () => {
    if (medications.length === 0) {
      return <Text style={Styles.labelBold}>No medications for today.</Text>;
    }
    return (
      <FlatList
        style={{ alignContent: "center", padding: 10 }}
        data={medications}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                marginVertical: 10,
                height: 1,
                backgroundColor: "lightgray",
              }}
            />
          );
        }}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: "/(home)/(medications)/medicationDetailView",
              params: { id: item.id },
            }}
          >
            <View style={{ flex: 1, flexDirection: "row" }}>
              <FontAwesome5 name="pills" size={24} color="skyblue" />
              <Text style={Styles.listLabel}>
                {item.label} - {item.value}
                {item.unit} - {item.timesPerDay} times
              </Text>
            </View>
          </Link>
        )}
      ></FlatList>
    );
  };
  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchDailyMedications();
      fetchName();
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchUpComingAppointments();
      fetchDailyMedications();
    }, []),
  );

  if (loading) {
    return <View></View>;
  }
  return (
    <View style={styles.container}>
      <Text style={Styles.Title}>Hello there, {name}</Text>
      <DetailCard title="Today's Medications" objects={medicationsFlatList()} />
      <DetailCard
        title="Upcoming Appointments"
        objects={appointmentsFlatList()}
      />
    </View>
  );
}

registerRootComponent(Index);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    gap: 20,
  },
});
