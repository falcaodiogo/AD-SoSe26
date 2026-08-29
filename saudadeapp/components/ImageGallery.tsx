import {
  ScrollView,
  Image,
  Pressable,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
  images: ImageSourcePropType[];
  onChangeImages: (images: ImageSourcePropType[]) => void;
}

export default function ImageGallery({
  images,
  onChangeImages,
}: Readonly<Props>) {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.canceled) {
      onChangeImages([...images, { uri: result.assets[0].uri }]);
    }
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.row}
      contentContainerStyle={styles.rowInner}
    >
      {images.map((source, index) => (
        <Image
          key={
            typeof source === "number"
              ? source
              : (source as { uri: string }).uri
          }
          source={source}
          style={[
            styles.image,
            index === 0 && styles.first,
            index === images.length - 1 && images.length > 1 && styles.last,
          ]}
        />
      ))}
      <Pressable style={styles.addButton} onPress={pickImage}>
        <MaterialIcons name="add" size={26} color="#aaa" />
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { maxHeight: 160, borderRadius: 28 },
  rowInner: { alignItems: "center", gap: 6, borderRadius: 28 },
  image: { width: 110, height: 150, borderRadius: 28, resizeMode: "cover" },
  first: { borderRadius: 28 },
  last: { borderRadius: 28 },
  addButton: {
    width: 56,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    borderRadius: 28,
  },
});
