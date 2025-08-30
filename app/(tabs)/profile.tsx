import { Text, View, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CourseItem from "@/components/profile/CourseItem";

export default function TabProfileScreen() {
  return (
    <View className="flex-1 bg-white">
      {/* 상단 여백 */}
      <View className="h-16" />

      <ScrollView className="flex-1 px-4">
        {/* 사용자 프로필 섹션 */}
        <View className="items-center mb-8">
          <View className="w-24 h-24 bg-gray-200 rounded-full items-center justify-center mb-4">
            <Ionicons name="person" size={48} color="#9ca3af" />
          </View>
          <Text className="text-xl font-semibold text-black">닉네임</Text>
        </View>

        {/* 구분선 */}
        <View className="h-px bg-gray-300 mb-8" />

        {/* 내 코스 섹션 */}
        <View className="mb-8">
          <Text className="text-xl font-semibold text-black text-center mb-6">내코스</Text>

          {/* 내 코스 항목들 */}
          <View className="space-y-4">
            <CourseItem courseName="코스명" description="비공개 목록 | 장소 2개" author="작성자" />
            <CourseItem courseName="코스명" description="비공개 목록 | 장소 2개" author="작성자" />
          </View>
        </View>

        {/* 저장된 코스 섹션 */}
        <View className="mb-8">
          <Text className="text-xl font-semibold text-black text-center mb-6">저장된 코스</Text>

          {/* 저장된 코스 항목 */}
          <CourseItem courseName="코스명" description="짧은 소개" author="작성자" />
        </View>

        {/* 하단 여백 */}
        <View className="h-16" />
      </ScrollView>
    </View>
  );
}
