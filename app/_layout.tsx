import {
  Manrope_200ExtraLight,
  Manrope_300Light,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/manrope";
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-reanimated';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import 'react-native-svg';

export const unstable_settings = {
  anchor: '(auth)',
};


export default function RootLayout() {
  const [fontsLoaded, fontsError] = useFonts({
    manropeExtraLight: Manrope_200ExtraLight,
    manropeLight: Manrope_300Light,
    manropeRegular: Manrope_400Regular,
    manropeMedium: Manrope_500Medium,
    manropeSemiBold: Manrope_600SemiBold,
    manropeBold: Manrope_700Bold,
    manropeExtraBold: Manrope_800ExtraBold,
  });

  React.useEffect(() => {
    async function prepare() {
      if (fontsLoaded || fontsError) {
        // await new Promise((resolve) => setTimeout(resolve, 500));
        router.replace("/(auth)");
      }
    }

    prepare();
  }, [fontsLoaded, fontsError]);

  return (
     <SafeAreaProvider
      initialMetrics={initialWindowMetrics}
      style={{ flex: 1, backgroundColor: "black" }}
    >
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(main)" />
        <Stack.Screen name="(auth)" />
      </Stack>
      <StatusBar style="auto" />
     </SafeAreaProvider>
  );
}