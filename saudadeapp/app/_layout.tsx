import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import {
  Kalnia_400Regular,
  Kalnia_500Medium,
  Kalnia_600SemiBold,
  Kalnia_700Bold,
} from "@expo-google-fonts/kalnia";
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";
import { useEffect } from "react";
import NavToggle from "@/components/NavToggle";
import { TabProvider, useTab } from "./context/TabContext";

function LayoutContent() {
  const { tab, setTab } = useTab();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#E3E9E9" }}>
      <StatusBar barStyle="dark-content" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="detail/[id]" />
      </Stack>
      <NavToggle active={tab} onChange={setTab} />
    </SafeAreaView>
  );
}

export default function RootLayout() {
  const [fontloaded, fonterror] = useFonts({
    Kalnia_400Regular,
    Kalnia_500Medium,
    Kalnia_600SemiBold,
    Kalnia_700Bold,
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  useEffect(() => {
    if (fontloaded || fonterror) {
      SplashScreen.hideAsync();
    }
  }, [fontloaded, fonterror]);

  if (!fontloaded && !fonterror) {
    return null;
  }

  return (
    <TabProvider>
      <LayoutContent />
    </TabProvider>
  );
}
