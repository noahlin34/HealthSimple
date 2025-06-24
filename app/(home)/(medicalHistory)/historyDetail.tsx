import DetailButtons from "@/components/DetailButtons";
import HistoryTitle from "@/components/MedicalHistoryComponents/HistoryTitle";
import NotesCard from "@/components/NotesCard";
import { HistoryItem, deleteHistoryItemById, getHistoryItemById } from "@/db/HistoryProvider";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from 'react-native';


export default function HistoryDetail() {
    const {id} = useLocalSearchParams<{id: string}>();
    const [historyItem, setHistoryItem] = useState<HistoryItem | null>(null);
    const {refresh} = useLocalSearchParams<{refresh?: string}>();
    const [loading, setLoading] = useState(true);

    const fetchHistoryItem = async () => {
        const history = await getHistoryItemById(parseInt(id));
        if (!history) {
            console.error(`No history item found with id: ${id}`);
            return;
        }
        setHistoryItem(history);
        setLoading(false)
    }

    const handleDelete = async () => {
        try {
            await deleteHistoryItemById(parseInt(id));
        }
        catch (error) {
            console.error("Error deleting history item:", error);
        } finally {
            router.dismissTo({pathname: '/(home)/(medicalHistory)', params: {refresh: '1'}});
        }
    }

    useEffect(() => {
        setLoading(true);
        fetchHistoryItem();
        if (refresh === "1") {
            router.setParams({ refresh: undefined });
            setLoading(false);
        }
    }, [refresh]);

    if (loading || !historyItem) {
        return <View></View>;
    }

    
    return (
        <View style={styles.container}>
            <HistoryTitle title={historyItem.title} date={historyItem.date}/>
            <NotesCard notes={historyItem.details} title="Details"/>
            <NotesCard notes={historyItem.notes}/>
            <DetailButtons editButtonTitle="Edit History Record" onEdit={()=> router.navigate({pathname: '/(home)/(medicalHistory)/editHistory', params: {id: id}})} onDelete={handleDelete} deleteButtonTitle="Delete History Record" deleteMessage="Are you sure you want to delete this history record? This action cannot be undone." deleteTitle="Delete Medical History Record"/>
        </View>
    )

}


const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    }
})