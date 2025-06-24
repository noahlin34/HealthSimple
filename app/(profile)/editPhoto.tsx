import SaveButton from "@/components/SaveButton";
import { getProfile, updateProfilephotoURI } from "@/db/ProfileProvider";
import { FontAwesome5 } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Styles from "../../components/Styles";
export default function EditPhoto() {
  const placeHolder = require("../../assets/images/icon.png");
  const [uri, setUri] = useState<string | null>(null);

  const fetchProfilePhoto = async () => {
    try {
      const profile = await getProfile();
      if (profile && profile.photoURI) {
        setUri(profile.photoURI);
      } else {
        setUri(placeHolder); // Default image if no photoURI is found
      }
    } catch (error) {
      console.error("Error fetching profile photo:", error);
    }
  };

  useEffect(() => {
    fetchProfilePhoto();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) {
      return;
    }
    try {
      setUri(result.assets[0].uri);
    } catch (error) {
      console.error("Error setting image URI:", error);
    }
  };

  const save = async () => {
    await updateProfilephotoURI(uri || "");
    router.dismiss();
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
      }}
    >
      <View
        style={{
          alignContent: "center",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={Styles.label}>Current photo:</Text>
        <Image
          source={uri ? { uri } : placeHolder}
          style={{ width: 100, height: 100, borderRadius: 100 }}
        />
        <Pressable onPress={pickImage}>
          <FontAwesome5 name="edit" size={20} />
        </Pressable>
      </View>

      <SaveButton title="Update" onPress={save} />
    </View>
  );
}
