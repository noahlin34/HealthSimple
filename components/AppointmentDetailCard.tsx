import { StyleSheet, Text, View } from "react-native";

export default function AppointmentDetailCard({type, location}: {type: string, location: string}) {

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Details</Text>
            <View style={styles.cardContainer}>
                <Text >{type}</Text>
                <View style={styles.horizontalLine} />
                <Text >{location}</Text>
            </View>
        </View>
    )

}


const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        flexDirection: 'column',
        padding: 10,
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