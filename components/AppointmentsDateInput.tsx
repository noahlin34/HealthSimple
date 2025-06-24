import DateTimePicker from "@react-native-community/datetimepicker";
import { Text, View } from "react-native";
import Styles from "./Styles";


type Props = {
    date: Date;
    setDate: (date: Date) => void;
}

export default function AppointmentsDateInput({date, setDate}: Props) {
    return (
        <View style={{gap: 10, justifyContent: 'center', alignItems: 'center'}}>

                <Text style={Styles.label}>Select Appointment Date and Time:</Text>

            <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode='datetime'
                display="default"
                onChange={(event, date) => {
                    if (date) {
                        setDate(date);
                    }
                }}/>
        </View>
    )
}
