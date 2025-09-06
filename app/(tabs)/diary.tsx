// app/(tabs)/diary.tsx 파일
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import Active from "@/assets/icons/maker_active.svg";
import * as SecureStore from "expo-secure-store";

export default function DiaryScreen() {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      setLoading(true);
      const kakaoToken = await SecureStore.getItemAsync("kakaoAccessToken"); // ✅ 여기!
      if (!kakaoToken) throw new Error("카카오 토큰이 없습니다.");
      await logout(kakaoToken);
      router.replace("/(auth)/login");
    } catch (e) {
      if (__DEV__) console.error(e);
      Alert.alert("로그아웃 실패", "다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#f0f0f0", paddingTop: insets.top }}
    >
      <View className="flex-1 items-center justify-center">
        {/* 이미지 변경해야 함 */}
        <Active />

        <Text className="pb-3 pt-6 font-suit-bold text-black title1">
          빵생빵사
        </Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text className="border-b-grey-1 font-suit-semibold text-grey-1 caption1">
            로그아웃
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
