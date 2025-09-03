import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const router = useRouter();
  //   const { user, loading, isAuthReady } = useAuth();

  //   useEffect(() => {
  //     if (!isAuthReady) return;

  //     if (user) {
  //       router.replace('/(tabs)');
  //     } else {
  //       router.replace('/(onboarding)');
  //     }
  //   }, [isAuthReady, user]);

  // 준비가 안 됐거나 로딩 중일 땐 로딩 스피너만 보여줌
  //   if (!isAuthReady || loading) {
  //     return (
  //       <View className="flex-1 justify-center items-center">
  //         <ActivityIndicator size="large" />
  //       </View>
  //     );
  //   }

  // 실제로는 여기에 도달할 일이 거의 없음 (router.replace로 넘어감)
  return null;
}
