import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect } from "react";
import { router } from "expo-router";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import { getKeyHashAndroid, initializeKakaoSDK } from "@react-native-kakao/core";
import { useAuth } from "@/context/AuthContext";
import { login as kakaoLogin } from "@react-native-kakao/user";

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const { login } = useAuth();

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
      await login(kakaoAccessToken);
    } catch (error) {
      if (__DEV__) {
        console.error("카카오 로그인 실패:", error);
      }
      Alert.alert("로그인 실패", "카카오 로그인 중 문제가 발생했어요. 다시 시도해주세요.");
    }
  };

  return (
    <View className="flex-1 items-center justify-center p-4" style={{ paddingTop: insets.top }}>
      <Text className="text-2xl mb-4 display1">로고</Text>
      <Text className="text-2xl mb-4 display1 text-point-4">로그인 화면</Text>
      <TouchableOpacity className="p-3 bg-point-4 rounded" onPress={handleLogin}>
        <Text className="text-white">카카오로 로그인하기</Text>
      </TouchableOpacity>
    </View>
  );
}
