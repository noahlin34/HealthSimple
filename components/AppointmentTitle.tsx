import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { StyleSheet, Text, View } from 'react-native';
import Styles from './Styles';
export default function AppointmentTitle({title, date}: {title: string, date: string}) {

    const dateObject = new Date(date);

    return (
        <View style={styles.horizontalContainer}>
            <FontAwesome5 name="calendar-alt" size={50} color="limegreen" />
            <View style={styles.verticalContainer}>
                <Text style={Styles.Title}>{title}</Text>
                <Text style={Styles.label}>{dateObject.toDateString()}</Text>
                <Text style={Styles.label}>{dateObject.toLocaleTimeString('EN-US', {hour: 'numeric', minute: '2-digit'})}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    horizontalContainer: {
        flex: 0.75,
        flexDirection: 'row',
    },
    verticalContainer: {
        flexDirection: 'column',
        marginLeft: 10,
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    subHeaderText: {
        fontSize: 17,
        fontWeight: 'bold',
    }
})