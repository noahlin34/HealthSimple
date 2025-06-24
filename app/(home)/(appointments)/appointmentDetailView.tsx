import AppointmentTitle from '@/components/AppointmentTitle';
import DetailButtons from '@/components/DetailButtons';
import DetailCard from '@/components/DetailCard';
import NotesCard from '@/components/NotesCard';
import Styles from '@/components/Styles';
import { Appointment, deleteAppointmentById, getAppointmentById } from '@/db/AppointmentsProvider';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';


export default function AppointmentDetailView() {
    const {id} = useLocalSearchParams<{id: string}>();
    const {refresh} = useLocalSearchParams();
    const [loading, setLoading] = useState(true);
    const [appointment, setAppointment] = useState<Appointment | null>(null);
    

    const fetchAppointment = async () => {
        try {
            const appt = await getAppointmentById(parseInt(id));
            setAppointment(appt);
        } catch (error) {
            console.error("Error fetching appointment:", error);
            setAppointment(null);
        } finally {
            setLoading(false);
        }
    }

    const handleDeleteAppointment = async () => {
        try {
            await deleteAppointmentById(parseInt(id));
        } catch (error) {
            console.error("Error deleting appointment:", error);
            Alert.alert("Error", "Failed to delete appointment.");
        } finally {
            router.dismissTo({pathname: "/(home)/(appointments)", params: {refresh: '1'}});
        }
    }

    useEffect(() => {
        setLoading(true);
        fetchAppointment();
        if (refresh === '1') {
            router.setParams({refresh: undefined});
        }
    }, [refresh]);
    if (loading || !appointment) {
        return <View><Text>Loading...</Text></View>;
    }

    return (
        <View style={styles.container}>
            <AppointmentTitle title={appointment.title} date={appointment.date}/>
            <DetailCard objects={<><Text style={Styles.label}>{appointment.type}</Text><Text style={Styles.label}>{appointment.location}</Text></>} title='Details'/>
            <NotesCard notes={appointment.notes} title='Notes'/>
            <DetailButtons onEdit={() => router.navigate({pathname: '/(home)/(appointments)/editAppointment', params: {id: id}})} onDelete={handleDeleteAppointment} deleteButtonTitle='Delete Appointment' editButtonTitle='Edit Appointment' deleteMessage='Are you sure you want to delete this appointment? This action cannot be undone.' deleteTitle='Delete Appointment'/>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: '100%',
    },
    button: {
      

    }

        
});


