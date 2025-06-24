import InputBox from "@/components/InputBox";
import SaveButton from "@/components/SaveButton";
import { Profile, getProfile, updateProfileName } from "@/db/ProfileProvider";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, View } from "react-native";

export default function EditUsername() {
  const [username, setUsername] = useState("");

  const getCurrentName = async () => {
    try {
      const profile: Profile | null = await getProfile();
      if (profile) {
        setUsername(profile.name);
        return;
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const saveUserName = async () => {
    if (!username) {
      Alert.alert("Please enter a username before saving.");
      return;
    }
    try {
      await updateProfileName(username);
    } catch (error) {
      console.error("Error updating username:", error);
      return;
    } finally {
      router.dismiss();
    }
  };

  useEffect(() => {
    getCurrentName();
  }, []);

  return (
    <View style={{ padding: 20, flex: 1, justifyContent: "space-between" }}>
      <InputBox
        value={username}
        setValue={setUsername}
        header="What's your name?"
      />
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={120}>
        <SaveButton title="Update username" onPress={saveUserName} />
      </KeyboardAvoidingView>
    </View>
  );
}
