import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import Styles from "../Styles";

export default function MemberDetailsCard({
  role,
  email,
  phone,
}: {
  role: string;
  email: string;
  phone: string;
}) {
  return (
    <View style={styles.container}>
      <Text style={Styles.labelBoldLarge}>Details</Text>
      <View style={styles.cardContainer}>
        <Text>{role}</Text>
        <Pressable
          onPress={() => {
            Linking.openURL("tel:" + phone);
          }}
        >
          <Text style={Styles.labelClickable}>{phone}</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            Linking.openURL("mailto:" + email);
          }}
        >
          <Text style={Styles.labelClickable}>{email}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    flex: 2,
    flexDirection: "column",
  },
  cardContainer: {
    alignSelf: "center",
    flexDirection: "column",
    height: "100%",
    padding: 20,
    flex: 1,
    width: 339,
    borderRadius: 15,
    backgroundColor: "white",
    boxShadow: "0px 5px 3px rgba(0, 0, 0, 0.1)",
    justifyContent: "space-between",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    marginVertical: 10,
  },
  linkText: {
    color: "#007AFF", // Default link color
    fontSize: 16,
  },
});
