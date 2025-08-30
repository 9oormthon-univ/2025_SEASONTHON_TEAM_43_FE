import { Text, View, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ExploreCard from "@/components/explore/ExploreCard";

export default function TabExploreScreen() {
  return (
    <View className="flex-1 bg-white">
      {/* 상단 여백 */}
      <View className="h-16" />

      <ScrollView className="flex-1 px-4">
        {/* 제목 */}
        <Text className="text-2xl font-bold text-black text-center mb-6">둘러보기</Text>

        {/* 검색 및 필터 영역 */}
        <View className="flex-row items-center mb-6 space-x-3">
          {/* 검색바 */}
          <View className="flex-1 bg-gray-100 rounded-2xl flex-row items-center px-4 py-3">
            <Ionicons name="search" size={20} color="#6b7280" />
            <TextInput
              className="flex-1 ml-3 text-black"
              placeholder="검색어를 입력하세요"
              placeholderTextColor="#9ca3af"
            />
          </View>

          {/* 필터 버튼 */}
          <TouchableOpacity className="bg-gray-100 w-12 h-12 rounded-full items-center justify-center">
            <Ionicons name="filter" size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>

        {/* 내 코스 추가하기 섹션 */}
        <TouchableOpacity className="flex-row items-center mb-6">
          <View className="w-8 h-8 rounded-full border-2 border-gray-300 items-center justify-center mr-3">
            <Ionicons name="add" size={20} color="#6b7280" />
          </View>
          <Text className="text-lg text-black font-medium">내 코스 추가하기</Text>
        </TouchableOpacity>

        {/* 콘텐츠 카드들 */}
        <View className="space-y-4">
          <ExploreCard />
          <ExploreCard />
          <ExploreCard />
        </View>

        {/* 하단 여백 */}
        <View className="h-20" />
      </ScrollView>
    </View>
  );
}
