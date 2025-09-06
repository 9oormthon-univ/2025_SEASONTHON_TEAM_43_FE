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

export default function DiaryScreen() {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();

  const handelLogout = async () => {
    try {
      setLoading(true);
      await logout();

      // 4) (선택) 라우팅 초기화 - 로그아웃 후 로그인 화면으로
      // 현재 화면이 이미 로그인 화면이면 생략 가능n
      router.replace("/(auth)/login");
    } catch (error) {
      if (__DEV__) console.error("카카오 로그아웃 실패:", error);
      Alert.alert("로그아웃 실패", "카카오 로그아웃 실패");
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
        <TouchableOpacity onPress={handelLogout}>
          <Text className="border-b-grey-1 font-suit-semibold text-grey-1 caption1">
            로그아웃
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
