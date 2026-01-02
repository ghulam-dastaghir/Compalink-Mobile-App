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
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, Text, View } from 'react-native';
import 'react-native-reanimated';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import 'react-native-svg';
import Toast from 'react-native-toast-message';
import { Colors } from "@/constants/colors";

SplashScreen.preventAutoHideAsync();



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
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, [fontsLoaded, fontsError]);

  return (
     <SafeAreaProvider
      initialMetrics={initialWindowMetrics}
      style={{ flex: 1, backgroundColor: Colors.primary }}
    >
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(main)" />
        <Stack.Screen name="(auth)" />
      </Stack>
      <StatusBar style="light" />
      <Toast
        topOffset={Platform.OS === 'ios' ? 70 : 60}
        config={{
          success: ({ text1, text2 }) => (
            <View
              style={{
                minHeight: 60,
                width: '90%',
                backgroundColor: Colors.primary,
                borderRadius: 12,
                paddingHorizontal: 16,
                paddingVertical: 12,
                flexDirection: 'row',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              <View style={{ flex: 1 }}>
                {text1 && (
                  <Text style={{ color: Colors.white, fontSize: 14, fontWeight: '600', marginBottom: text2 ? 4 : 0 }}>
                    {text1}
                  </Text>
                )}
                {text2 && (
                  <Text style={{ color: Colors.white, fontSize: 12, opacity: 0.9 }}>
                    {text2}
                  </Text>
                )}
              </View>
            </View>
          ),
          error: ({ text1, text2 }) => (
            <View
              style={{
                minHeight: 60,
                width: '90%',
                backgroundColor: Colors.red,
                borderRadius: 12,
                paddingHorizontal: 16,
                paddingVertical: 12,
                flexDirection: 'row',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              <View style={{ flex: 1 }}>
                {text1 && (
                  <Text style={{ color: Colors.white, fontSize: 14, fontWeight: '600', marginBottom: text2 ? 4 : 0 }}>
                    {text1}
                  </Text>
                )}
                {text2 && (
                  <Text style={{ color: Colors.white, fontSize: 12, opacity: 0.9 }}>
                    {text2}
                  </Text>
                )}
              </View>
            </View>
          ),
          info: ({ text1, text2 }) => (
            <View
              style={{
                minHeight: 60,
                width: '90%',
                backgroundColor: Colors.info,
                borderRadius: 12,
                paddingHorizontal: 16,
                paddingVertical: 12,
                flexDirection: 'row',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              <View style={{ flex: 1 }}>
                {text1 && (
                  <Text style={{ color: Colors.white, fontSize: 14, fontWeight: '600', marginBottom: text2 ? 4 : 0 }}>
                    {text1}
                  </Text>
                )}
                {text2 && (
                  <Text style={{ color: Colors.white, fontSize: 12, opacity: 0.9 }}>
                    {text2}
                  </Text>
                )}
              </View>
            </View>
          ),
        }}
      />
     </SafeAreaProvider>
  );
}