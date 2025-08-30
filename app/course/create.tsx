import { router } from "expo-router";
import { Text, TouchableOpacity, View, TextInput, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function CreateScreen() {
  const [courseName, setCourseName] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  return (
    <View className="flex-1 bg-white">
      {/* 상단 여백 */}
      <View className="h-16" />

      <ScrollView className="flex-1 px-4">
        {/* 코스 만들기 제목 */}
        <View className="items-center mb-3">
          <Text className="text-xl font-semibold text-black">코스 만들기</Text>
        </View>

        {/* 구분선 */}
        <View className="h-px bg-gray-700 mb-8" />

        {/* 이미지 업로드 섹션 */}
        <View className="mb-8">
          <Text className="text-xl font-semibold text-black text-center mb-6">이미지 업로드</Text>

          <View className="w-full p-2 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 items-center justify-center">
            <Ionicons name="image-outline" size={48} color="#9ca3af" />
          </View>
        </View>

        {/* 코스 정보 입력 섹션 */}
        <View className="mb-8">
          <Text className="text-xl font-semibold text-black text-center mb-6">코스 정보</Text>

          {/* 코스명 입력 */}
          <View className="mb-6">
            <Text className="text-m font-medium text-gray-700 mb-2">코스명 입력</Text>
            <TextInput
              className="w-full h-12 bg-gray-100 rounded-lg px-4 text-black"
              placeholder="Ex: 대전 소금빵 맛집"
              placeholderTextColor="gray"
              value={courseName}
              onChangeText={setCourseName}
            />
          </View>

          {/* 한줄 소개 */}
          <View className="mb-6">
            <Text className="text-m font-medium text-gray-700 mb-2">한줄 소개</Text>
            <TextInput
              className="w-full h-12 bg-gray-100 rounded-lg px-4 text-black"
              placeholder="소금빵 이대로만 따라오세요"
              placeholderTextColor="gray"
              value={introduction}
              onChangeText={setIntroduction}
            />
          </View>
        </View>

        {/* 공개 설정 섹션 */}
        <View className="mb-8">
          <Text className="text-xl font-semibold text-black text-center mb-6">공개 설정</Text>

          <View className="flex-row">
            <TouchableOpacity
              className={`flex-1 p-3 rounded mr-2 items-center justify-center ${isPublic ? "bg-blue-500" : "bg-gray-400"}`}
              onPress={() => setIsPublic(true)}
            >
              <Text className="text-white font-medium">공개</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 p-3 rounded ml-2 items-center justify-center ${!isPublic ? "bg-blue-500" : "bg-gray-400"}`}
              onPress={() => setIsPublic(false)}
            >
              <Text className="text-white font-medium">비공개</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 저장 버튼 */}
        <View className="mb-8">
          <TouchableOpacity className="w-full p-3 bg-gray-800 rounded items-center justify-center">
            <Text className="text-white font-medium text-lg">저장</Text>
          </TouchableOpacity>
        </View>

        {/* 하단 여백 */}
        <View className="h-16" />
      </ScrollView>
    </View>
  );
}
