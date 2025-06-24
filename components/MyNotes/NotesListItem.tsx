import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from "react-native";
import Styles from "../Styles";


type Props = {
    id: number
    editDate: string; 
    content: string;
    onPress?: () => void;
}


export default function NotesListItem({id, editDate, content, onPress}: Props) {
    const dateObj = new Date(editDate);
    const [isPressed, setIsPressed] = useState(false);


    return (
        <Pressable onPressIn={()=>setIsPressed(true)} onPressOut={() => setIsPressed(false)} style={({pressed}) => pressed ? styles.containerPressed : styles.container} onPress={onPress}>
            <View>
                <Text style={Styles.labelBoldLarge}>{dateObj.toLocaleString('en-us', {day: 'numeric', month: 'long', year: 'numeric'})}</Text>
                <Text style={Styles.body}>{content}</Text>
            </View>
        </Pressable>
    )

}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        width: "100%",
        height: 200,
        padding: 15,
        color: "white",
        backgroundColor: "white",
        borderRadius: 15,
        boxShadow: "0px 5px 3px rgba(0, 0, 0, 0.1)",
    },
    containerPressed: {
        flexDirection: "column",
        width: "100%",
        height :200,
        padding: 15,
        backgroundColor: "#f0f0f0",
        borderRadius: 15,
        boxShadow: "0px 5px 3px rgba(0, 0, 0, 0.1)",
    },
    verticalContainer: {
        flexDirection: "column",
        paddingLeft: 20,
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    body: {
        fontSize: 16,
        
    }
})