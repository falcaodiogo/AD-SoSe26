import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, FlatList, Image, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Logo from "../components/Logo";
import PersonListItem from "../components/PersonListItem";
import { entries } from "../data/mockData";
import { useTab } from "./context/TabContext";

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

function AnimatedListItem({
  item,
  index,
  onPress,
  tab,
}: Readonly<{
  item: (typeof entries)[0];
  index: number;
  onPress: () => void;
  tab: string;
}>) {
  const anim = useRef(new Animated.Value(tab === "people" ? 1 : 0)).current;

  useEffect(() => {
    if (tab === "people") {
      anim.setValue(0);
      Animated.timing(anim, {
        toValue: 1,
        duration: 450,
        delay: index * 200,
        useNativeDriver: true,
      }).start();
    }
  }, [tab, index, anim]);

  return (
    <Animated.View
      style={{
        opacity: anim,
        transform: [
          {
            translateY: anim.interpolate({
              inputRange: [0, 1],
              outputRange: [25, 0],
            }),
          },
        ],
      }}
    >
      <PersonListItem entry={item} onPress={onPress} />
    </Animated.View>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const { tab } = useTab();

  const enterAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(tab === "places" ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(enterAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [enterAnim]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: tab === "places" ? 1 : 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [tab, fadeAnim]);

  const listOpacity = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const people = entries.filter((e) => e.type === "person");
  const mapEntries = entries.filter(
    (e) => e.latitude !== undefined && e.longitude !== undefined,
  );

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: enterAnim,
          transform: [
            {
              translateY: enterAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        },
      ]}
    >
      <Logo />

      <View style={styles.content}>
        <View
          style={styles.animatedLayer}
          pointerEvents={tab === "places" ? "auto" : "none"}
        >
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
        </View>

        <Animated.View
          style={[
            styles.animatedLayer,
            styles.listBackground,
            { opacity: listOpacity },
          ]}
          pointerEvents={tab === "places" ? "none" : "auto"}
        >
          <FlatList
            data={people}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            renderItem={({ item, index }) => (
              <AnimatedListItem
                item={item}
                index={index}
                tab={tab}
                onPress={() => router.push(`/detail/${item.id}`)}
              />
            )}
          />
        </Animated.View>
      </View>
    </Animated.View>
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
  content: {
    flex: 1,
    borderRadius: 64,
    overflow: "hidden",
    position: "relative",
  },
  animatedLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  listBackground: {
    backgroundColor: "#E3E9E9",
  },
  map: { flex: 1, borderRadius: 64 },
  list: { paddingTop: 32, paddingBottom: 32, gap: 14 },
  markerImage: {
    width: 44,
    height: 44,
    resizeMode: "contain",
  },
});
