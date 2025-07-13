import { DeleteButton } from "@/components/DetailButtons";
import DetailCard from "@/components/DetailCard";
import DetailTitle from "@/components/DetailTitle";
import NotesCard from "@/components/NotesCard";
import Styles from "@/components/Styles";
import {
  Medication,
  deleteMedicationById,
  getMedicationById,
} from "@/db/MedicationsProvider";
import { FontAwesome5 } from "@expo/vector-icons";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

export default function MedicationDetailView() {
  const { refresh } = useLocalSearchParams();
  const [medication, setMedication] = useState<Medication | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useLocalSearchParams<{ id: string }>();

  const fetchMedication = async () => {
    try {
      const med = await getMedicationById(parseInt(id));
      setMedication(med);
    } catch (error) {
      console.error("Error fetching medication:", error);
      setMedication(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMedication = async () => {
    try {
      await deleteMedicationById(parseInt(id));
    } catch (error) {
      console.error("Error deleting medication:", error);
      Alert.alert("Error", "Failed to delete medication.");
    } finally {
      router.dismissTo({
        pathname: "/(home)/(medications)",
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
            router.push({ pathname: "/editMedication", params: { id: id } })
          }
        >
          <FontAwesome5 name="pencil-alt" size={20} color="dark-gray" />
        </Pressable>
      ),
    });
  });

  useEffect(() => {
    setLoading(true);
    fetchMedication();
    if (refresh === "1") {
      router.setParams({ refresh: undefined });
    }
  }, [refresh]);

  if (loading || !medication) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <DetailTitle name={medication.label} icon="pills" color="skyblue" />
      <DetailCard
        title="Details"
        objects={
          <>
            <Text style={Styles.label}>
              {medication.value + medication.unit}
            </Text>
            <Text style={Styles.label}>
              Taken {medication.timesPerDay}x {medication.frequency}
            </Text>
          </>
        }
      />
      <NotesCard notes={medication.notes} />

      <DeleteButton
        title="Delete Medication"
        onDelete={handleDeleteMedication}
        deleteMessage="Are you sure you want to delete this medication? This action cannot be undone."
        deleteTitle="Delete Medication"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 20,
    flex: 1,
    justifyContent: "flex-start",
    gap: 20,
  },
});
