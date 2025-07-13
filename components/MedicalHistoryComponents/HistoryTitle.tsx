import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { StyleSheet, Text, View } from "react-native";
import Styles from "../Styles";

export default function HistoryTitle({
  title,
  date,
}: {
  title: string;
  date: string;
}) {
  return (
    <View style={styles.horizontalContainer}>
      <FontAwesome5 name="clipboard-list" size={30} color="purple" />
      <View style={styles.verticalContainer}>
        <Text style={Styles.Title}>{title}</Text>
        <Text style={Styles.labelSmall}>
          {new Date(date).toLocaleString("en-us", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  horizontalContainer: {
    flexDirection: "row",
    flex: 0.5,
  },
  verticalContainer: {
    paddingLeft: 10,
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  subTitleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
