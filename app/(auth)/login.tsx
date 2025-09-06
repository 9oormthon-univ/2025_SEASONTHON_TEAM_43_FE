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
import { LinearGradient } from "expo-linear-gradient";

const KAKAO_BTN = require("@/assets/images/kakao_login_large_wide.png");
const AppLogo = require("@/assets/images/logo.png");
const AppCharacter = require("@/assets/images/app_character.png");

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

      await Promise.all([
        SecureStore.setItemAsync("kakaoAccessToken", kakaoAccessToken),
      ]);

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
    <LinearGradient
      // 그라데이션 색상 배열
      colors={["#FFD796", "#FFEDCF"]}
      // 시작/끝 위치 (x, y는 0~1 사이 비율)
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      className="flex-1 items-center justify-center"
      style={{ paddingTop: insets.top }}
    >
      <View
        className="flex-1 items-center justify-center p-4"
        style={{ paddingTop: insets.top }}
      >
        <Image source={AppLogo} className="h-[115px] w-[300px]" />
        <Image
          source={AppCharacter}
          className="mb-[120px] h-[300px] w-[375px]"
        />

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
    </LinearGradient>
  );
}
