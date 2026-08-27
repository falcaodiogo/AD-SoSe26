import { View, Text, Pressable, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';

interface AudioPlayerProps {
  uri?: string;
  onChangeUri?: (uri: string) => void;
}

// No recording here on purpose — the user picks an existing audio file
// from their device, and this component just plays / pauses it.
export default function AudioPlayer({ uri, onChangeUri }: AudioPlayerProps) {
  const player = useAudioPlayer(uri ?? null);
  const status = useAudioPlayerStatus(player);

  const handleAdd = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: 'audio/*' });
    if (!result.canceled && result.assets[0] && onChangeUri) {
      onChangeUri(result.assets[0].uri);
    }
  };

  const togglePlay = () => {
    if (!uri) return;
    if (status.playing) {
      player.pause();
    } else {
      player.play();
    }
  };

  if (!uri) {
    if (!onChangeUri) return null; // nothing to show, nothing to add
    return (
      <Pressable style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>+ Add audio</Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.row}>
      <Pressable style={styles.playButton} onPress={togglePlay}>
        <Text style={styles.playButtonText}>{status.playing ? 'Pause' : 'Play'}</Text>
      </Pressable>
      {onChangeUri && (
        <Pressable onPress={handleAdd}>
          <Text style={styles.replaceText}>Replace</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 16, marginVertical: 12 },
  playButton: {
    backgroundColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  playButtonText: { fontWeight: '600' },
  replaceText: { color: '#666', textDecorationLine: 'underline' },
  addButton: {
    marginVertical: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#999',
    alignSelf: 'flex-start',
  },
  addButtonText: { color: '#666' },
});
