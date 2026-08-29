import React, { useEffect, useRef } from "react";
import { View, Pressable, Text, StyleSheet, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

export type Tab = "places" | "people";

interface NavToggleProps {
  active: Tab;
  onChange: (tab: Tab) => void;
}

const GRADIENTS: Record<Tab, [string, string, string]> = {
  places: ["#E696E2", "#BC6171", "#514C3B"],
  people: ["#626078", "#33477A", "#8ca8b9"],
};

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export default function NavToggle({
  active,
  onChange,
}: Readonly<NavToggleProps>) {
  return (
    <View style={styles.row}>
      <ToggleButton
        label="PLACES"
        tab="places"
        isActive={active === "places"}
        onPress={() => onChange("places")}
      />
      <ToggleButton
        label="PEOPLE"
        tab="people"
        isActive={active === "people"}
        onPress={() => onChange("people")}
      />
    </View>
  );
}

function ToggleButton({
  label,
  tab,
  isActive,
  onPress,
}: Readonly<{
  label: string;
  tab: Tab;
  isActive: boolean;
  onPress: () => void;
}>) {
  const anim = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: isActive ? 1 : 0,
      duration: 350,
      useNativeDriver: false,
    }).start();
  }, [isActive, anim]);

  const buttonOpacity = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.55, 1],
  });

  const buttonScale = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.95, 1],
  });

  const blurOpacity = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const textColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(244,245,241,0.6)", "rgba(255,255,255,1)"],
  });

  return (
    <Pressable style={styles.buttonWrapper} onPress={onPress}>
      <AnimatedLinearGradient
        colors={GRADIENTS[tab]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={[
          styles.button,
          {
            opacity: buttonOpacity,
            transform: [{ scale: buttonScale }],
          },
        ]}
      >
        <Animated.View
          style={[StyleSheet.absoluteFill, { opacity: blurOpacity }]}
        >
          <BlurView
            intensity={25}
            tint="light"
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>

        <View pointerEvents="none" style={styles.insetShadow} />

        <Animated.Text style={[styles.label, { color: textColor }]}>
          {label}
        </Animated.Text>
      </AnimatedLinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 32,
    paddingBottom: 16,
  },
  buttonWrapper: {
    flex: 1,
    borderRadius: 999,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 6,
  },
  button: {
    borderRadius: 999,
    borderWidth: 0.5,
    borderColor: "rgb(255, 255, 255)",
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    height: 80,
  },
  insetShadow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 999,
    boxShadow: "inset 0px 0px 30px rgb(248, 248, 248)",
  },
  label: {
    fontSize: 24,
    fontFamily: "Kalnia_600SemiBold",
    letterSpacing: 0.5,
  },
});
