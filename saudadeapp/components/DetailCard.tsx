import { View, StyleSheet } from "react-native";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function DetailCard({ children }: Readonly<Props>) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#e5e0e0",
    borderRadius: 48,
    padding: 28,
    gap: 38,
    boxShadow: "inset 40px 20px 200px rgb(248, 244, 244)",
  },
});
