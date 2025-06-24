import { StyleSheet, Text, TextInput, View } from 'react-native';


type Props = {
    location: string;
    setLocation: (location: string) => void;
};

export default function AppointmentsLocationInput({location, setLocation}: Props) {
    return (
        <View style={styles.container}>
            <Text>Appointment Location:</Text>
            <TextInput
                style={styles.input}
                value={location}
                onChangeText={setLocation}
                placeholder="e.g. 2559 Kingston Ave, Remote, etc."
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    horizontalContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 10,
    },
  
    input: {
      width: 339,
      backgroundColor: "#E5E5EA",
      fontSize: 16,
      fontFamily: "SpaceMono_400Regular",
      borderRadius: 15,
      paddingHorizontal: 15,
      height: 41,
      margin: 10,
    },
  });