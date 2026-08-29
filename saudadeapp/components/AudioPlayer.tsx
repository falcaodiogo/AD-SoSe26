import { useEffect, useRef } from "react";
import { View, Pressable, StyleSheet, Animated, Easing } from "react-native";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import * as DocumentPicker from "expo-document-picker";

interface Props {
  uri?: string;
  onChangeUri: (uri: string | undefined) => void;
  variant?: "playback" | "record";
}

const BAR_COUNT = 46;
const ACCENT = { playback: "#ef4444", record: "#ec4899" };

export default function AudioPlayer({
  uri,
  onChangeUri,
  variant = "playback",
}: Readonly<Props>) {
  const accent = ACCENT[variant];

  const player = useAudioPlayer(uri ?? null);
  const status = useAudioPlayerStatus(player);
  const isPlaying = status.playing;

  useEffect(() => {
    if (status.didJustFinish) {
      player.seekTo(0);
    }
  }, [status.didJustFinish, player]);

  const pickAudio = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: "audio/*" });
    if (!result.canceled) onChangeUri(result.assets[0].uri);
  };

  const toggle = () => {
    if (isPlaying) {
      player.pause();
      player.seekTo(0);
    } else {
      player.play();
    }
  };

  const handlePress = uri ? toggle : pickAudio;

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <Waveform accent={accent} isPlaying={isPlaying} />
    </Pressable>
  );
}

function Waveform({
  accent,
  isPlaying,
}: Readonly<{
  accent: string;
  isPlaying: boolean;
}>) {
  const bases = useRef(
    Array.from({ length: BAR_COUNT }, (_, i) => 6 + ((i * 37) % 22)),
  ).current;
  const pulses = useRef(bases.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    const loops = pulses.map((val, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay((i % 6) * 60),
          Animated.timing(val, {
            toValue: 1,
            duration: 260 + (i % 5) * 40,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: false,
          }),
          Animated.timing(val, {
            toValue: 0,
            duration: 260 + (i % 5) * 40,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: false,
          }),
        ]),
      ),
    );

    if (isPlaying) {
      loops.forEach((l) => l.start());
    } else {
      loops.forEach((l) => l.stop());
      pulses.forEach((v) => v.setValue(0));
    }

    return () => loops.forEach((l) => l.stop());
  }, [isPlaying, pulses]);

  return (
    <View style={styles.barsRow}>
      {bases.map((h, i) => (
        <Animated.View
          key={i}
          style={[
            styles.bar,
            {
              backgroundColor: accent,
              height: isPlaying
                ? pulses[i].interpolate({
                    inputRange: [0, 1],
                    outputRange: [h * 0.4, h],
                  })
                : h * 0.4,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 32,
    paddingVertical: 24,
    alignContent: "center",
    alignItems: "center",
    boxShadow: "inset 0px 0px 20px rgba(0, 0, 0, 0.09)",
    justifyContent: "center",
  },
  barsRow: { flexDirection: "row", alignItems: "center", gap: 2, height: 32 },
  bar: { width: 3, borderRadius: 2 },
});
