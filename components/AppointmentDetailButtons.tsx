import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

export default function AppointmentDetailButtons({onEdit, onDelete}: {onEdit: () => void, onDelete: () => void}) {

    return (
        <View style={styles.container}>
            <Pressable style={styles.button} onPress={onEdit}>
                <Text style={styles.labelAction}>Edit Appointment</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={()=> {
                Alert.alert(
                    "Delete Appointment",
                    "Are you sure you want to delete this appointment? This action cannot be undone.",
                    [
                        { text: "Cancel", style: "cancel" },
                        { text: "Delete", style: "destructive", onPress: onDelete }
                    ]
                );
            }}>
                <Text style={styles.labelDestructive}>Delete Appointment</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'white',
        borderRadius: 15,
        alignSelf: 'center',
        width: 339,
        height: '100%',
        boxShadow: '0px 5px 3px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',


    },
    container: {
        flex: 0.5,
        marginVertical: 20,
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignContent: 'center',
        gap: 10,
        paddingBottom: 40,
    },
    labelDestructive: {
        fontSize: 14,
        fontFamily: 'SpaceMono_400Regular',
        color: '#FF3B30', // Default link color for destructive actions
    },
    labelAction: {
        fontSize: 14,
        fontFamily: 'SpaceMono_400Regular',
        color: '#007AFF', // Default link color for actions
    }
})