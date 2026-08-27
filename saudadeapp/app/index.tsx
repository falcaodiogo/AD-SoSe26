import { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useRouter } from "expo-router";
import Logo from "../components/Logo";
import NavToggle, { Tab } from "../components/NavToggle";
import PersonListItem from "../components/PersonListItem";
import { entries } from "../data/mockData";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const minimalMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#f7f7f7" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#f5f5f5" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }],
  },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
];

export default function HomeScreen() {
  const [tab, setTab] = useState<Tab>("places");
  const router = useRouter();

  const places = entries.filter((e) => e.type === "place");
  const people = entries.filter((e) => e.type === "person");

  return (
    <View style={styles.container}>
      <Logo />

      <View style={styles.content}>
        {tab === "places" ? (
          <MapView
            style={styles.map}
            customMapStyle={minimalMapStyle}
            initialRegion={{
              latitude: places[0]?.latitude ?? 0,
              longitude: places[0]?.longitude ?? 0,
              latitudeDelta: 0.04,
              longitudeDelta: 0.04,
            }}
          >
            {places.map((item) => {
              const isPerson = item.type === "person";
              const gradientColors = isPerson
                ? (["#D241DF", "#875889", "#7E709A"] as const)
                : (["#B96F6F", "#ED7C3A", "#EFC98E"] as const);
              const iconName = isPerson ? "person" : "heart";

              return (
                <Marker
                  key={item.id}
                  coordinate={{
                    latitude: item.latitude!,
                    longitude: item.longitude!,
                  }}
                  title={item.name}
                  onPress={() => router.push(`/detail/${item.id}`)}
                >
                  <LinearGradient
                    colors={gradientColors}
                    start={{ x: 0.2, y: 0.2 }}
                    end={{ x: 0.8, y: 0.8 }}
                    style={styles.markerCircle}
                  >
                    <Ionicons name={iconName} size={24} color="white" />
                  </LinearGradient>
                </Marker>
              );
            })}
          </MapView>
        ) : (
          <FlatList
            data={people}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <PersonListItem
                entry={item}
                onPress={() => router.push(`/detail/${item.id}`)}
              />
            )}
          />
        )}
      </View>

      <NavToggle active={tab} onChange={setTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
    paddingBottom: 32,
    paddingHorizontal: 32,
    gap: 24,
    backgroundColor: "#E3E9E9",
  },
  content: { flex: 1, borderRadius: 64, overflow: "hidden" },
  map: { flex: 1, borderRadius: 64 },
  list: { padding: 32 },

  markerCircle: {
    width: 44,
    height: 44,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
});
