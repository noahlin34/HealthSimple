import AddButton from "@/components/AddButton";
import TeamItem from "@/components/TeamComponents/TeamItem";
import { getAllTeamsMembers, initTeamsDB, TeamMember } from "@/db/TeamProvider";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function Index() {
  const { refresh } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  const fetchTeamMembers = async () => {
    try {
      await initTeamsDB();
      const members = await getAllTeamsMembers();
      setTeamMembers(Array.isArray(members) ? members : []);
    } catch (error) {
      console.error("Error fetching team members:", error);
      setTeamMembers([]);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchTeamMembers();
    }, []),
  );

  useEffect(() => {
    setLoading(true);
    fetchTeamMembers();
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
        data={teamMembers}
        renderItem={({ item }: { item: TeamMember }) => (
          <TeamItem
            name={item.name}
            role={item.role}
            onPress={() =>
              router.navigate({
                pathname: "/(home)/(teamMembers)/teamMemberDetails",
                params: { id: item.id },
              })
            }
          />
        )}
        keyExtractor={(item: TeamMember) => item.id.toString()}
        contentContainerStyle={{ gap: 10 }}
        ListFooterComponent={
          <AddButton
            label="Add Team Member"
            onPress={() =>
              router.navigate({
                pathname: "/(home)/(teamMembers)/addTeamMember",
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
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 10,
  },
  title: {},
  horizontalContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});
