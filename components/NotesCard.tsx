import Styles from "@/components/Styles";
import { StyleSheet, Text, View } from "react-native";

export default function NotesCard({
  notes,
  title,
}: {
  notes: string;
  title?: string;
}) {
  return (
    <View style={styles.container}>
      {title !== "_blank" && (
        <Text style={Styles.labelBoldLarge}>{title ? title : "Notes"}</Text>
      )}
      <View style={styles.cardContainer}>
        <Text style={Styles.body}>{notes}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    flexDirection: "column",
    width: "100%",
    paddingVertical: 10,
    marginVertical: 5,
    flex: 2,
    gap: 5,
  },
  horizontalLine: {
    width: "95%",
    borderBottomColor: "black",
    borderBottomWidth: 0.5,
    alignSelf: "center",
  },
  cardContainer: {
    alignSelf: "center",
    flexDirection: "column",
    padding: 20,
    width: 339,
    height: "100%",
    borderRadius: 15,
    backgroundColor: "white",
    boxShadow: "0px 5px 3px rgba(0, 0, 0, 0.1)",
    justifyContent: "space-between",
  },
  header: {
    fontSize: 20,
    padding: 10,
    fontWeight: "bold",
  },
});
