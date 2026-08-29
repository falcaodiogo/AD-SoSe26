import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Image, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Logo from "../components/Logo";
import NavToggle, { Tab } from "../components/NavToggle";
import PersonListItem from "../components/PersonListItem";
import { entries } from "../data/mockData";

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

const DEFAULT_PERSON_IMAGE = require("../assets/pins/people.png");
const DEFAULT_PLACE_IMAGE = require("../assets/pins/place.png");

export default function HomeScreen() {
  const [tab, setTab] = useState<Tab>("places");
  const router = useRouter();

  const people = entries.filter((e) => e.type === "person");

  // 1. Create a combined array of anything that has coordinates
  const mapEntries = entries.filter(
    (e) => e.latitude !== undefined && e.longitude !== undefined,
  );

  return (
    <View style={styles.container}>
      <Logo />

      <View style={styles.content}>
        {tab === "places" ? (
          <MapView
            style={styles.map}
            customMapStyle={minimalMapStyle}
            initialRegion={{
              latitude: mapEntries[0]?.latitude ?? 50.8748,
              longitude: mapEntries[0]?.longitude ?? 8.0243,
              latitudeDelta: 0.04,
              longitudeDelta: 0.04,
            }}
          >
            {mapEntries.map((item) => {
              const isPerson = item.type === "person";

              const pinImage = isPerson
                ? DEFAULT_PERSON_IMAGE
                : DEFAULT_PLACE_IMAGE;

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
                  <Image
                    source={
                      typeof pinImage === "string"
                        ? { uri: pinImage }
                        : pinImage
                    }
                    style={styles.markerImage}
                  />
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
  list: { paddingTop: 32, gap: 14 },
  markerImage: {
    width: 44,
    height: 44,
    resizeMode: "contain",
  },
});
