import InputBox, { NotesInput } from "@/components/InputBox";
import SaveButton from "@/components/SaveButton";
import { addTeamMember } from "@/db/TeamProvider";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export default function AddTeamMember() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [notes, setNotes] = useState("");
  const [phone, setPhone] = useState("");
  const scrollViewRef = useRef<ScrollView | null>(null);

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
    router.dismissTo({
      pathname: "/(home)/(teamMembers)",
      params: { refresh: "1" },
    });
  };

  return (
    <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={100}>
      <ScrollView ref={scrollViewRef}>
        <View style={styles.container}>
          <InputBox
            value={name}
            setValue={setName}
            header="What is the name of the team member?"
            maxLength={100}
          />
          <InputBox
            value={role}
            setValue={setRole}
            header="What is the role of the team member?"
            hintText="e.g. cardiologist, general practicioner, etc."
            maxLength={100}
          />
          <InputBox
            value={email}
            setValue={setEmail}
            header="What is the email of the team member?"
            autoCompleteMode="email"
            inputMode="email"
            maxLength={100}
          />
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
            onTouch={() => scrollViewRef.current?.scrollToEnd()}
          />

          <SaveButton
            title="Save Team Member"
            onPress={() => handleSaveMember(name, email, role, notes, phone)}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f0f0",
    gap: 10,
  },
});
