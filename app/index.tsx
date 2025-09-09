import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AppLogo = require("@/assets/images/logo.png");

export default function Index() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

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
      <Image source={AppLogo} className="h-[115px] w-[300px]" />
    </LinearGradient>
  );
}
