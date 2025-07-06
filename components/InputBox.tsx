// Removed incorrect import
import {
  InputModeOptions,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Styles from "./Styles";

type Props = {
  value: string;
  setValue: (value: string) => void;
  header: string;
  hintText?: string;
  inputMode?: InputModeOptions | undefined;
  autoCompleteMode?:
    | "tel"
    | "email"
    | "url"
    | "additional-name"
    | "address-line1"
    | "address-line2"
    | "birthdate-day"
    | "birthdate-full"
    | "birthdate-month"
    | "birthdate-year"
    | "cc-csc"
    | "cc-exp"
    | "cc-exp-day"
    | "cc-exp-month"
    | "cc-exp-year"
    | "cc-number"
    | "family-name"
    | "given-name"
    | "honorific-prefix"
    | "honorific-suffix"
    | "postal-code"
    | "street-address"
    | "username"
    | "password"
    | "new-password"
    | "one-time-code"
    | undefined;
  maxLength?: number;
};

export default function InputBox({
  value,
  setValue,
  header,
  hintText,
  inputMode,
  autoCompleteMode,
  maxLength,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={Styles.label}>{header}</Text>
      <TextInput
        value={value}
        onChangeText={(value) => setValue(value)}
        style={styles.input}
        maxLength={maxLength}
        placeholder={hintText ? hintText : ""}
        inputMode={inputMode}
        autoComplete={autoCompleteMode}
      />
    </View>
  );
}

type NotesProps = {
  notes: string;
  header: string;
  setNotes: (notes: string) => void;
  onTouch?: () => void;
};

export function NotesInput({ notes, header, setNotes, onTouch }: NotesProps) {
  return (
    <View style={styles.notescontainer}>
      <Text style={Styles.label}>{header}</Text>
      <TextInput
        style={styles.notesInput}
        value={notes}
        onChangeText={setNotes}
        multiline
        maxLength={500}
        onFocus={onTouch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  notescontainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 0.2,
  },
  horizontalContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },

  input: {
    width: 339,
    backgroundColor: "#E5E5EA",
    fontSize: 16,
    fontFamily:
      Platform.OS === "ios"
        ? "LeagueSpartan-Regular"
        : "LeagueSpartan_400Regular",
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 41,
    margin: 10,
  },

  notesInput: {
    width: 339,
    backgroundColor: "#E5E5EA",
    fontSize: 16,
    fontFamily:
      Platform.OS === "ios"
        ? "LeagueSpartan-Regular"
        : "LeagueSpartan_400Regular",
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 200, // Increased height for multiline input
    margin: 10,
  },
});
