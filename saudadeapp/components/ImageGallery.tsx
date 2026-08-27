import { Image, ScrollView, Pressable, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface ImageGalleryProps {
  images: string[];
  onChangeImages?: (images: string[]) => void;
}

// Horizontal gallery. Entirely optional — if `images` is empty and no
// onChangeImages is given, this renders nothing to keep it out of the way.
export default function ImageGallery({ images, onChangeImages }: ImageGalleryProps) {
  if (images.length === 0 && !onChangeImages) return null;

  const handleAdd = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (!result.canceled && onChangeImages) {
      const newUris = result.assets.map((a) => a.uri);
      onChangeImages([...images, ...newUris]);
    }
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.row}>
      {images.map((uri) => (
        <Image key={uri} source={{ uri }} style={styles.image} />
      ))}
      {onChangeImages && (
        <Pressable style={styles.addTile} onPress={handleAdd}>
          <Text style={styles.addText}>+ Add</Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { marginVertical: 12 },
  image: { width: 100, height: 100, borderRadius: 8, marginRight: 8 },
  addTile: {
    width: 100,
    height: 100,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#999',
  },
  addText: { color: '#666' },
});
