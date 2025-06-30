import { FontAwesome } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Stack, router } from "expo-router";
import { Platform, Pressable } from "react-native";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerLeft: () => (
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1,
            })}
          >
            <FontAwesome5 name="arrow-left" size={20} color="dark-gray" />
          </Pressable>
        ),
        headerTitleStyle: {
          fontFamily:
            Platform.OS === "ios"
              ? "LeagueSpartan-Bold"
              : "LeagueSpartan_700Bold",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: "Home", headerLeft: undefined }}
      />
      <Stack.Screen
        name="(appointments)/index"
        options={{ title: "Appointments" }}
      />
      <Stack.Screen
        name="(medications)/index"
        options={{ title: "Medications" }}
      />
      <Stack.Screen
        name="(medications)/medicationDetailView"
        options={{
          title: "Medication",
          headerRight: () => (
            <Pressable
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome name="pencil" size={20} color="dark-gray" />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="(medications)/(addMedications)"
        options={{ title: "Add Medication", presentation: "modal" }}
      />

      <Stack.Screen
        name="(appointments)/(addAppointments)"
        options={{
          headerLeft: () => (
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome name="close" size={20} color="black" />
            </Pressable>
          ),

          title: "Add Appointment",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="(appointments)/(addAppointment)/addAppointmentSecond"
        options={{
          headerLeft: () => (
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome5 name="arrow-left" size={20} color="black" />
            </Pressable>
          ),
        }}
      />

      <Stack.Screen
        name="(appointments)/appointmentDetailView"
        options={{ title: "Appointment" }}
      />
      <Stack.Screen
        name="(medications)/editMedication"
        options={{
          title: "Edit Medication",
          presentation: "modal",
          headerLeft: () => (
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome name="close" size={20} color="black" />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="(appointments)/editAppointment"
        options={{
          title: "Edit Appointment",
          presentation: "modal",
          headerLeft: () => (
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome name="close" size={20} color="black" />
            </Pressable>
          ),
        }}
      />

      <Stack.Screen
        name="(teamMembers)/index"
        options={{ title: "Team Members" }}
      />
      <Stack.Screen
        name="(teamMembers)/teamMemberDetails"
        options={{ title: "Team Member Details" }}
      />
      <Stack.Screen
        name="(teamMembers)/addTeamMember"
        options={{
          title: "Add Team Member",
          presentation: "modal",
          headerLeft: () => (
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome name="close" size={20} color="black" />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="(teamMembers)/editTeamMember"
        options={{
          title: "Edit Team Member",
          presentation: "modal",
          headerLeft: () => (
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome name="close" size={20} color="black" />
            </Pressable>
          ),
        }}
      />

      <Stack.Screen
        name="(medicalHistory)/index"
        options={{ title: "Medical History" }}
      />
      <Stack.Screen
        name="(medicalHistory)/historyDetail"
        options={{ title: "Medical History Detail" }}
      />
      <Stack.Screen
        name="(medicalHistory)/addHistory"
        options={{
          presentation: "modal",
          title: "Add History Item",
          headerLeft: () => (
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome name="close" size={20} color="black" />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="(medicalHistory)/editHistory"
        options={{
          presentation: "modal",
          title: "Edit History Item",
          headerLeft: () => (
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome name="close" size={20} color="black" />
            </Pressable>
          ),
        }}
      />

      <Stack.Screen name="(notes)/index" options={{ title: "Notes" }} />
      <Stack.Screen
        name="(notes)/addNote"
        options={{
          title: "Add Note",
          presentation: "modal",
          headerLeft: () => (
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome name="close" size={20} color="black" />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="(notes)/notesDetail"
        options={{ title: "Note Details" }}
      />
      <Stack.Screen
        name="(notes)/editNote"
        options={{
          title: "Edit Note",
          presentation: "modal",
          headerLeft: () => (
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome name="close" size={20} color="black" />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
