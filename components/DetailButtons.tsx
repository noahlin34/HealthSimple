import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import Styles from "./Styles";

type Props = {
  onEdit: () => void;
  onDelete: () => void;
  deleteButtonTitle: string;
  editButtonTitle: string;
  deleteTitle: string;
  deleteMessage: string;
};

export default function DetailButtons({
  onEdit,
  onDelete,
  deleteButtonTitle,
  editButtonTitle,
  deleteTitle,
  deleteMessage,
}: Props) {
  const [deleteIsPressed, setDeleteIsPressed] = useState(false);
  const [editIsPressed, setEditIsPressed] = useState(false);

  return (
    <View style={styles.container}>
      <Pressable
        style={editIsPressed ? styles.buttonPressed : styles.button}
        onPress={onEdit}
        onPressIn={() => setEditIsPressed(true)}
        onPressOut={() => setEditIsPressed(false)}
      >
        <Text style={Styles.labelClickable}>{editButtonTitle}</Text>
      </Pressable>
      <Pressable
        style={deleteIsPressed ? styles.buttonPressed : styles.button}
        onPress={() => {
          Alert.alert(deleteTitle, deleteMessage, [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", style: "destructive", onPress: onDelete },
          ]);
        }}
        onPressIn={() => setDeleteIsPressed(true)}
        onPressOut={() => setDeleteIsPressed(false)}
      >
        <Text style={Styles.labelDestructive}>{deleteButtonTitle}</Text>
      </Pressable>
    </View>
  );
}

export function DeleteButton({
  onDelete,
  title,
  deleteTitle,
  deleteMessage,
}: {
  onDelete: () => void;
  title: string;
  deleteTitle: string;
  deleteMessage: string;
}) {
  const [deleteIsPressed, setDeleteIsPressed] = useState(false);

  return (
    <View style={styles.container}>
      <Pressable
        style={deleteIsPressed ? styles.buttonPressed : styles.button}
        onPress={() => {
          Alert.alert(deleteTitle, deleteMessage, [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", style: "destructive", onPress: onDelete },
          ]);
        }}
        onPressIn={() => setDeleteIsPressed(true)}
        onPressOut={() => setDeleteIsPressed(false)}
      >
        <Text style={Styles.labelDestructive}>{title}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    borderRadius: 15,
    alignSelf: "center",
    width: 339,
    height: "100%",
    boxShadow: "0px 5px 3px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPressed: {
    backgroundColor: "#f0f0f0",
    borderRadius: 15,
    alignSelf: "center",
    width: 339,
    height: "100%",
    boxShadow: "0px 5px 3px rgba(0, 0, 0, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 0.5,
    marginVertical: 20,
    justifyContent: "space-between",
    flexDirection: "column",
    alignContent: "center",
    gap: 10,
    paddingBottom: 40,
  },
  labelDestructive: {
    fontSize: 14,
    fontFamily: "SpaceMono_400Regular",
    color: "#FF3B30", // Default link color for destructive actions
  },
  labelAction: {
    fontSize: 14,
    fontFamily: "SpaceMono_400Regular",
    color: "#007AFF", // Default link color for actions
  },
});
