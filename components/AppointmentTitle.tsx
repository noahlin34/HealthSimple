import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { StyleSheet, Text, View } from "react-native";
import Styles from "./Styles";
export default function AppointmentTitle({
  title,
  date,
}: {
  title: string;
  date: string;
}) {
  const dateObject = new Date(date);

  return (
    <View style={styles.outerContainer}>
      <FontAwesome5 name="calendar-alt" size={30} color="limegreen" />
      <View style={styles.verticalContainer}>
        <Text style={Styles.Title}>{title}</Text>
        <View style={styles.horizontalContainer}>
          <Text style={Styles.labelSmall}>
            {dateObject.toDateString() +
              " - " +
              dateObject.toLocaleTimeString("EN-US", {
                hour: "numeric",
                minute: "2-digit",
              })}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  horizontalContainer: {
    flex: 0.75,
    flexDirection: "row",
  },
  outerContainer: {
    flex: 0.75,
    flexDirection: "row",
    padding: 5,
    marginTop: 5,
  },
  verticalContainer: {
    flexDirection: "column",
    marginLeft: 10,
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  subHeaderText: {
    fontSize: 17,
    fontWeight: "bold",
  },
});
