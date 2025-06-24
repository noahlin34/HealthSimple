import DetailButtons from "@/components/DetailButtons";
import NotesCard from "@/components/NotesCard";
import MemberDetailsCard from "@/components/TeamComponents/MemberDetailsCard";
import MemberTitle from "@/components/TeamComponents/MemberTitle";
import {
  deleteTeamMemberById,
  getTeamMemberById,
  TeamMember,
} from "@/db/TeamProvider";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function TeamMemberDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { refresh } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [teamMember, setTeamMember] = useState<TeamMember | null>(null);

  const fetchTeamMember = async () => {
    try {
      const member = await getTeamMemberById(parseInt(id));
      setTeamMember(member);
    } catch (error) {
      console.error("Error fetching team member:", error);
      setTeamMember(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchTeamMember();
    if (refresh === "1") {
      router.setParams({ refresh: undefined });
    }
  }, [refresh]);

  if (loading || !teamMember) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const handleDeleteMember = async () => {
    try {
      await deleteTeamMemberById(parseInt(id));
    } catch (error) {
      console.error("Error deleting team member:", error);
    } finally {
      router.dismissTo({
        pathname: "/(home)/(teamMembers)",
        params: { refresh: "1" },
      });
    }
  };

  return (
    <View style={styles.container}>
      <MemberTitle name={teamMember.name} />
      <MemberDetailsCard
        role={teamMember.role}
        email={teamMember.email}
        phone={teamMember.phone}
      />
      <NotesCard notes={teamMember.notes} />
      <DetailButtons
        editButtonTitle="Edit Team Member"
        onEdit={() =>
          router.navigate({
            pathname: "/(home)/(teamMembers)/editTeamMember",
            params: { id: id },
          })
        }
        onDelete={handleDeleteMember}
        deleteButtonTitle="Delete Team Member"
        deleteMessage="Are you sure you want to delete this team member record? This action cannot be undone."
        deleteTitle="Delete Team Member"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
  },
});
