// app/_layout.tsx
import "../global.css";
import "react-native-reanimated";
import { Stack, Redirect } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "@/context/AuthContext";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

SplashScreen.preventAutoHideAsync(); // 스플래시 유지

export default function RootLayout() {
  const [ready, setReady] = useState(false);
  const [route, setRoute] = useState<
    "/(auth)/login" | "/(onboarding)/allow-permission" | "/(tabs)/map"
  >("/(auth)/login");

  useEffect(() => {
    (async () => {
      try {
        // 1) 로그인 토큰 확인
        const token = await SecureStore.getItemAsync("accessToken");
        console.log("저장된 토큰:", token);

        // 2) 온보딩(약관 동의 등) 완료 여부 확인
        const onboardingDone = await AsyncStorage.getItem("onboarding_done");

        if (!token) {
          setRoute("/(auth)/login");
        } else if (token && onboardingDone !== "true") {
          setRoute("/(onboarding)/allow-permission");
        } else {
          setRoute("/(tabs)/map");
        }
      } finally {
        setReady(true);
        SplashScreen.hideAsync(); // 준비되면 스플래시 숨김
      }
    })();
  }, []);

  if (!ready) {
    // 별도 로딩 UI 필요하면 구현 -> 지금은 스플래시가 가려주어서 따로 적지는 않음.
    return null;
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(onboarding)" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </AuthProvider>
      <Redirect href={route} />
    </SafeAreaProvider>
  );
}
