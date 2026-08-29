import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Entry } from "../types";

interface Props {
  entry: Entry;
  onPress: () => void;
}

export default function PersonListItem({ entry, onPress }: Readonly<Props>) {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <MaskedView
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
        maskElement={
          <View
            style={[
              StyleSheet.absoluteFill,
              {
                borderWidth: 1,
                borderRadius: 99,
                backgroundColor: "transparent",
              },
            ]}
          />
        }
      >
        <LinearGradient
          colors={["white", "#cbc9c9", "white"]}
          locations={[0, 0.35, 0.65]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.1, y: 2 }}
          style={StyleSheet.absoluteFill}
        />
      </MaskedView>

      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Image
            source={require("../assets/pins/purple.png")}
            style={styles.avatarImage}
            contentFit="cover"
          />

          <Text style={styles.avatarText}>{entry.name.charAt(0)}</Text>
        </View>
      </View>

      <Text style={styles.name}>{entry.name}</Text>

      <View style={styles.bottomImageContainer}>
        <Image
          source={require("../assets/pins/orange.png")}
          style={styles.bottomImage}
          contentFit="cover"
        />
        <MaterialIcons
          name="arrow-forward"
          size={24}
          color="#000"
          style={styles.arrowIcon}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 24,
    borderRadius: 99,
    marginBottom: 12,
    boxShadow: "inset 0px 0px 10px rgba(0, 0, 0, 0.09)",
  },

  avatarContainer: {
    alignItems: "center",
    marginRight: 16,
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 99,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },

  avatarText: {
    fontFamily: "Kalnia_600SemiBold",
    fontSize: 28,
    position: "absolute",
    color: "white",
  },

  name: {
    flex: 1,
    fontSize: 24,
    fontFamily: "DMSans_500Medium",
  },

  bottomImageContainer: {
    width: 42,
    height: 42,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },

  bottomImage: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    borderColor: "#E3E9E9",
  },

  arrowIcon: {
    position: "absolute",
    zIndex: 2,
    color: "#ffffff",
  },
});
