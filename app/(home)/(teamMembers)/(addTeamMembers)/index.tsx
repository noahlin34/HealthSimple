import InputBox from "@/components/InputBox";
import SaveButton from "@/components/SaveButton";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export default function Index() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const scrollViewRef = useRef<ScrollView | null>(null);

  return (
    <View style={styles.container}>
      <View>
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
      </View>

      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={130}>
        <SaveButton
          title="Next"
          onPress={() =>
            router.push({
              pathname: "/addTeamMembersSecond",
              params: { name, email, role },
            })
          }
        />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f0f0",
    gap: 10,
  },
});
