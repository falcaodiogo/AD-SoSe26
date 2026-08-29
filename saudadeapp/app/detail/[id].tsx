import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Logo from "../../components/Logo";
import ListItem from "@/components/ListItem";
import BackButton from "@/components/BackButton";
import DetailCard from "@/components/DetailCard";
import ImageGallery from "../../components/ImageGallery";
import AudioPlayer from "../../components/AudioPlayer";
import { entries } from "../../data/mockData";

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const entry = entries.find((e) => e.id === id);

  const [images, setImages] = useState<ImageSourcePropType[]>(() =>
    (entry?.images as ImageSourcePropType[]) ?? [],
  );
  const [audioUri, setAudioUri] = useState<string | undefined>(
    entry?.audio?.uri,
  );

  if (!entry) {
    return (
      <View style={styles.container}>
        <Logo />
        <Text style={styles.notFound}>Not found</Text>
      </View>
    );
  }

  const isPerson = entry.type === "person";

  return (
    <View style={styles.container}>
      <Logo />

      <View style={styles.header}>
        <BackButton onPress={() => router.back()} />
        <View style={styles.headerPill}>
          <ListItem name={entry.name} showAvatar={isPerson} showArrow={false} />
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentInner}
      >
        <DetailCard>
          {!isPerson && entry.latitude != null && entry.longitude != null && (
            <Text style={styles.coords}>
              {entry.latitude}, {entry.longitude}
            </Text>
          )}

          <ImageGallery
            images={images}
            onChangeImages={setImages}
            key={entry.id}
          />

          {entry.note ? <Text style={styles.note}>{entry.note}</Text> : null}

          <AudioPlayer
            uri={audioUri}
            onChangeUri={setAudioUri}
            variant={isPerson ? "playback" : "record"}
          />
        </DetailCard>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3E9E9",
    paddingHorizontal: 32,
    gap: 16,
  },
  header: { flexDirection: "row", alignItems: "center" },
  headerPill: { flex: 1 },
  content: { flex: 1 },
  contentInner: { paddingBottom: 32 },
  coords: {
    fontSize: 20,
    fontFamily: "DMSans_500Medium",
    color: "#333",
  },
  note: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "DMSans_400Regular",
    color: "#333",
  },
  notFound: { textAlign: "center", marginTop: 32 },
});
