import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

export type Tab = "places" | "people";

interface NavToggleProps {
  active: Tab;
  onChange: (tab: Tab) => void;
}

const GRADIENTS: Record<Tab, [string, string, string]> = {
  places: ["#E696E2", "#BC6171", "#514C3B"],
  people: ["#626078", "#33477A", "#85AABF"],
};

export default function NavToggle({ active, onChange }: NavToggleProps) {
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
}: {
  label: string;
  tab: Tab;
  isActive: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.buttonWrapper} onPress={onPress}>
      <LinearGradient
        colors={GRADIENTS[tab]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={[styles.button, !isActive && styles.buttonInactive]}
      >
        {/* Hazy/out-of-focus look for the unselected pill */}
        {!isActive && (
          <BlurView
            intensity={25}
            tint="light"
            style={StyleSheet.absoluteFill}
          />
        )}
        <Text
          style={[
            styles.label,
            isActive ? styles.labelActive : styles.labelInactive,
          ]}
        >
          {label}
        </Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 12,
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
    borderWidth: 1,
    borderColor: "rgb(255, 255, 255)",
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    height: 80,
    boxShadow: "inset 0px 4px 8px rgb(255, 255, 255)",
    // filter: "blur(2px)",
  },
  buttonInactive: {
    opacity: 0.55,
  },
  label: {
    fontSize: 24,
    fontFamily: "Kalnia_600SemiBold",
    letterSpacing: 0.5,
  },
  labelActive: {
    color: "#fff",
  },
  labelInactive: {
    color: "rgba(244,245,241,0.6)",
  },
});
