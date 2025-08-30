import { router } from "expo-router";
import { Text, View, TouchableOpacity } from "react-native";

export default function LoginScreen() {
  // 로그인 버튼 클릭 시 로직 작성
  const handleLogin = () => {
    // 카카오 로그인 로직
    console.log("카카오 로그인");
    router.push("/agreement");
  };

  return (
    <View className="flex-1 items-center justify-center p-4">
      <Text className="text-2xl font-bold mb-4">로고</Text>
      <Text className="text-2xl font-bold mb-4">로그인 화면</Text>
      <TouchableOpacity className="mt-4 p-2 bg-blue-500 rounded" onPress={handleLogin}>
        <Text className="text-white">카카오로 로그인하기</Text>
      </TouchableOpacity>
    </View>
  );
}
