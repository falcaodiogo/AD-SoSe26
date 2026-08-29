import { Pressable, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
  onPress: () => void;
}

export default function BackButton({ onPress }: Readonly<Props>) {
  return (
    <Pressable onPress={onPress} hitSlop={12} style={styles.wrapper}>
      <View style={styles.bottomImageContainer}>
        <Image
          source={require("../assets/pins/orange.png")}
          style={styles.bottomImage}
          contentFit="cover"
        />

        <MaterialIcons
          name="arrow-back"
          size={26}
          color="#fff"
          style={styles.arrowIcon}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginRight: 12 },
  bottomImageContainer: {
    width: 50,
    height: 50,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },

  bottomImage: {
    width: 50,
    height: 50,
    borderRadius: 21,
    borderWidth: 2,
    borderColor: "#E3E9E9",
  },

  arrowIcon: {
    position: "absolute",
    zIndex: 2,
  },
});
