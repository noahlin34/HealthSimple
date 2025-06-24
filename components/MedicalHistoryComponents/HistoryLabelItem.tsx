import { Inter_400Regular, Inter_700Bold, useFonts } from "@expo-google-fonts/inter";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Styles from "../Styles";


type Props = {
  id: number;
  date: string;
  title: string;
  onPress?: () => void;
};

export default function HistoryLabelItem({id, date, title, onPress}: Props) {
  useFonts({
    Inter_400Regular,
    Inter_700Bold,})

    const dateObj = new Date(date);
    const [isPressed, setIsPressed] = useState(false);


  return (
    <Pressable style={{width: 339}} onPressIn={() => setIsPressed(true)} onPressOut={() => setIsPressed(false)} onPress={onPress}>
      <View style={isPressed ? styles.containerPressed : styles.container}>
        <FontAwesome5 name="history" size={50} color="purple" />
        <View style={styles.verticalContainer}>
            <Text style={Styles.labelBold}>{dateObj.toLocaleDateString('en-us', {day: 'numeric', month: 'long', year: 'numeric'})}</Text>
            <Text style={Styles.label}>{title}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  verticalContainer: {
    flexDirection: "column",
    paddingLeft: 20,
  },
  container: {
    flexDirection: "row",
    width: "100%",
    padding: 15,
    color: "white",
    backgroundColor: "white",
    borderRadius: 15,
    boxShadow: "0px 5px 3px rgba(0, 0, 0, 0.1)",
  },
  containerPressed: {
    flexDirection: "row",
    width: "100%",
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 15,
    boxShadow: "0px 5px 3px rgba(0, 0, 0, 0.1)",
  },
  label: {
    fontSize: 20,
  }
});
