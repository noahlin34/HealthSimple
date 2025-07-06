import InputBox, { NotesInput } from "@/components/InputBox";
import SaveButton from "@/components/SaveButton";
import { addTeamMember } from "@/db/TeamProvider";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, View } from "react-native";

export default function AddTeamMemberSecond() {
  const { name, role, email } = useLocalSearchParams() as {
    name: string;
    role: string;
    email: string;
  };
  const [notes, setNotes] = useState("");
  const [phone, setPhone] = useState("");

  function validateEmail(email: string): boolean {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }
  const handleSaveMember = async (
    name: string,
    email: string,
    role: string,
    notes: string,
    phone: string,
  ) => {
    if (!validateEmail(email) && email !== "") {
      alert("Please enter a valid email address.");
      return;
    }

    if (phone.length !== 10 && phone !== "") {
      alert("Please enter a valid phone number (10 digits).");
      return;
    }
    if (!name || !role) {
      alert("Please add a name and role for the team member.");
      return;
    }
    await addTeamMember(name, role, email, phone, notes);
    router.dismiss();
    router.dismiss();
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        padding: 20,
        flexDirection: "column",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flex: 1,
          alignContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <InputBox
          value={phone}
          setValue={setPhone}
          header="What is the phone number of the team member?"
          autoCompleteMode="tel"
          inputMode="tel"
          maxLength={10}
        />
        <NotesInput
          notes={notes}
          setNotes={setNotes}
          header="Any notes to add?"
        />
      </View>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={130}>
        <SaveButton
          title="Add Team Member"
          onPress={() => handleSaveMember(name, email, role, notes, phone)}
        />
      </KeyboardAvoidingView>
    </View>
  );
}
