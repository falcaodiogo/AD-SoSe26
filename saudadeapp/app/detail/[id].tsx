import { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Logo from '../../components/Logo';
import ImageGallery from '../../components/ImageGallery';
import AudioPlayer from '../../components/AudioPlayer';
import { entries } from '../../data/mockData';

// One screen handles both a person and a place — same layout, same
// optional sections. The only thing that differs is the coordinates line,
// which only makes sense for a place.
export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const entry = entries.find((e) => e.id === id);

  const [images, setImages] = useState<string[]>(entry?.images ?? []);
  const [audioUri, setAudioUri] = useState<string | undefined>(entry?.audio?.uri);

  if (!entry) {
    return (
      <View style={styles.container}>
        <Logo />
        <Text style={styles.notFound}>Not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Logo />

      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Text style={styles.back}>←</Text>
        </Pressable>
        <Text style={styles.name}>{entry.name}</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentInner}>
        {entry.type === 'place' && entry.latitude != null && entry.longitude != null && (
          <Text style={styles.coords}>
            {entry.latitude}, {entry.longitude}
          </Text>
        )}

        {entry.note ? <Text style={styles.note}>{entry.note}</Text> : null}

        <ImageGallery images={images} onChangeImages={setImages} />

        <AudioPlayer uri={audioUri} onChangeUri={setAudioUri} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  back: { fontSize: 20, marginRight: 12 },
  name: { fontSize: 18, fontWeight: '700' },
  content: { flex: 1 },
  contentInner: { paddingHorizontal: 16, paddingBottom: 32 },
  coords: { fontSize: 14, color: '#666', marginBottom: 8 },
  note: { fontSize: 14, lineHeight: 20, marginBottom: 8 },
  notFound: { textAlign: 'center', marginTop: 32 },
});
