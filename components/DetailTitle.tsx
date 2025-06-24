import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Platform, StyleSheet, Text, View } from "react-native";
export default function DetailTitle({icon, color, name}: {icon: string, color: string, name: string}) {
    return (
        <View style={styles.horizontalContainer}>
            <FontAwesome5 name={icon} size={50} color={color} />
            <Text style={styles.titleText}>{name}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    horizontalContainer: {
        flexDirection: 'row',
        flex: 0.5,
    },
    titleText: {
        fontSize: 30, 
        marginTop: 10,
        fontFamily: Platform.OS === 'ios' ? 'LeagueSpartan-Bold' : 'LeagueSpartan_700Bold',
        padding: 10,
    }
})