import { router } from "expo-router";
import { Text, View, TouchableOpacity } from "react-native";

export default function LoginScreen() {
  const handleLogin = () => {
    // TODO: 카카오 로그인 로직 추가
    router.push("/agreement");
  };

  return (
    <View className="flex-1 items-center justify-center p-4">
      <Text className="text-2xl mb-4 display1">로고</Text>
      <Text className="text-2xl mb-4 display1 text-point-4">로그인 화면</Text>
      <TouchableOpacity className="p-3 bg-point-4 rounded" onPress={handleLogin}>
        <Text className="text-white body1">카카오로 로그인하기</Text>
      </TouchableOpacity>
    </View>
  );
}
