import { StyleSheet, Text, View } from "react-native";

export default function AppointmentNotesCard({notes}: {notes: string}) {

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Notes</Text>
            <View style={styles.cardContainer}>
                <Text >{notes}</Text>
            </View>
        </View>
    )

}


const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        flexDirection: 'column',
        padding: 10,
        marginTop: 20,
        flex: 2,
    },
    horizontalLine: {
        width: '95%',
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
        alignSelf: 'center'
    },
    cardContainer: {
        alignSelf: 'center',
        flexDirection: 'column',
        padding: 20,
        width: 339,
        height: '100%',
        borderRadius: 15,
        backgroundColor: 'white',
        boxShadow: '0px 5px 3px rgba(0, 0, 0, 0.1)',
        justifyContent: 'space-between',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
    }
    
})