import { getProfile, initProfileDB } from "@/db/ProfileProvider";
import { Image } from "expo-image";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import NotesCard from "../../components/NotesCard";
import Styles from "../../components/Styles";

export default function Index() {
  const [image, setImage] = useState<string>("./assets/images/icon.png");
  const [name, setName] = useState<string>("Enter Name");
  const [dob, setDob] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [show, setShow] = useState<boolean>(false);

  const fetchUser = async () => {
    try {
      setLoading(true);
      await initProfileDB();
      const profile = await getProfile();
      if (profile) {
        setName(profile.name);
        setDob(profile.dob);
        setImage(profile.photoURI || "./assets/images/icon.png"); // Use fallback only if no photoURI is saved
        console.log("Profile fetched:");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchUser();
    }, []),
  );

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 10,
        marginTop: 10,
        padding: 20,
      }}
    >
      {image && <Image style={styles.image} source={{ uri: image }} />}

      <View style={{ width: "100%", alignItems: "center", padding: 20 }}>
        <Text style={Styles.labelLarge}>Hello, </Text>
        <TextInput
          style={Styles.Title}
          value={name}
          onChangeText={(name: string) => setName(name)}
        />
      </View>
      <NotesCard title="My Medical History" notes={dob} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "25%",
    height: "15%",
    borderRadius: 100,
    backgroundColor: "lightgray",
  },
});
