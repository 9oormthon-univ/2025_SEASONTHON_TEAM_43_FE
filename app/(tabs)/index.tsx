import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function TabHomeScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold">Tab Home</Text>
      <TouchableOpacity className="mt-4 rounded bg-blue-500 p-3" onPress={() => router.push("/course/create")}>
        <Text className="text-white">코스 만들기</Text>
      </TouchableOpacity>
    </View>
  );
}

