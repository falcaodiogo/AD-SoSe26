import { Text, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";

export default function Logo() {
  return (
    <View style={styles.wrapper}>
      <MaskedView maskElement={<Text style={styles.logo}>SAUDADE</Text>}>
        <LinearGradient
          colors={["#DA6A9F", "#2B63C5"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={[styles.logo, { opacity: 0 }]}>SAUDADE</Text>
        </LinearGradient>
      </MaskedView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    marginBottom: 8,
  },
  logo: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Kalnia_700Bold",
    backgroundColor: "transparent",
  },
});
