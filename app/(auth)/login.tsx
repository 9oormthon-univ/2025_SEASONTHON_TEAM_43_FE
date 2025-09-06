import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import {
  getKeyHashAndroid,
  initializeKakaoSDK,
} from "@react-native-kakao/core";
import { login as kakaoLogin } from "@react-native-kakao/user";
import { useAuth } from "@/context/AuthContext";

const KAKAO_BTN = require("@/assets/images/kakao_login_large_wide.png");

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [btnRatio, setBtnRatio] = useState(6); // 이미지 가로/세로 비율 (대략값)

  // 실제 이미지 비율로 업데이트
  useEffect(() => {
    const { width, height } = Image.resolveAssetSource(KAKAO_BTN);
    if (width && height) setBtnRatio(width / height);
  }, []);

  useEffect(() => {
    initializeKakaoSDK("083512cd4066153c92c1f28bfed50a2b"); // 네이티브앱키
  }, []);

  const handleLogin = async () => {
    if (__DEV__) {
      console.log(await getKeyHashAndroid());
    }
    try {
      const result = await kakaoLogin();
      const kakaoAccessToken = result.accessToken;
      console.log("카카오 액세스 토큰:", kakaoAccessToken);

      await login(kakaoAccessToken);
      console.log("카카오 로그인 성공, 서버 토큰 발급 완료");
      router.replace("/(onboarding)/allow-permission");
    } catch (error) {
      if (__DEV__) {
        console.error("카카오 로그인 실패:", error);
      }
      Alert.alert("로그인 실패", "카카오 로그인이 취소되었어요.");
    }
  };

  return (
    <View
      className="flex-1 items-center justify-center bg-point-1 p-4"
      style={{ paddingTop: insets.top }}
    >
      <Text className="font-suit-bold text-[16px] text-point-4 body1">
        빵 여행, 함께 떠나볼까요?
      </Text>
      <Text className="font-suit-bold text-[50px] leading-[1.4] text-point-4">
        빵생빵사
      </Text>

      <View className="mb-14 mt-2 h-[200px] w-[375px] bg-grey-3"></View>

      {/* 카카오 공식 이미지 버튼 */}
      <TouchableOpacity
        onPress={handleLogin}
        disabled={loading}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel="카카오로 로그인"
        className="w-full overflow-hidden rounded-[12px]"
        style={{ opacity: loading ? 0.6 : 1 }}
      >
        <Image
          source={KAKAO_BTN}
          // 폭 100% + 비율 유지 (세로 크기는 비율로 자동 계산)
          style={{ width: "100%", height: undefined, aspectRatio: btnRatio }}
          resizeMode="contain"
        />
        {loading && (
          <View className="absolute inset-0 items-center justify-center bg-black/10">
            <ActivityIndicator />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}
