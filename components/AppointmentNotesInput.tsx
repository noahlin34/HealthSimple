import { Keyboard, StyleSheet, Text, TextInput, View } from 'react-native';

type Props = {
     notes: string;
    setNotes: (notes: string) => void;  
};

export default function AppointmentNotesInput({notes, setNotes}: Props) {
    return (
        <View>
            <View style={styles.container}>
                <Text>Appointment Notes:</Text>
                <TextInput
                    style={styles.input}
                    value={notes}
                    onChangeText={setNotes}
                    placeholder="e.g. Bring medical records, discuss symptoms, etc."
                    multiline
                    maxLength={500}
                    enterKeyHint='done'
                    submitBehavior='submit'
                    onSubmitEditing={()=> Keyboard.dismiss()}
                />
            </View>
        </View>

    )

}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        width: 339,
        backgroundColor: "#E5E5EA",
        fontSize: 16,
        fontFamily: "SpaceMono_400Regular",
        borderRadius: 15,
        paddingHorizontal: 15,
        height: 200, // Increased height for multiline input
        margin: 10,
    },
});
    
