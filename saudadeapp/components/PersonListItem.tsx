import { Pressable, Text, View, StyleSheet } from "react-native";
import { Entry } from "../types";

interface Props {
  entry: Entry;
  onPress: () => void;
}

export default function PersonListItem({ entry, onPress }: Readonly<Props>) {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{entry.name.charAt(0)}</Text>
      </View>
      <Text style={styles.name}>{entry.name}</Text>
      <Text style={styles.arrow}>→</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 24,
    backgroundColor: "#eee",
    marginBottom: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: { fontWeight: "700" },
  name: { flex: 1, fontSize: 16, fontWeight: "600" },
  arrow: { fontSize: 16 },
});
