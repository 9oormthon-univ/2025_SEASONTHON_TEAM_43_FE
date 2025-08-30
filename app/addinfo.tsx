import { router } from "expo-router";
import { useState } from "react";
import { Text, View, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AddInfoScreen() {
  const [nickname, setNickname] = useState("");
  const [interestArea, setInterestArea] = useState("");

  return (
    <View className="flex-1 bg-white">
      {/* 상단 여백 */}
      <View className="h-16" />
      
      <ScrollView className="flex-1 px-4">
        {/* 닉네임 입력 섹션 */}
        <View className="mb-8">
          <Text className="text-lg font-semibold text-black mb-3">닉네임 입력</Text>
          <TextInput
            className="bg-gray-100 p-4 rounded-2xl text-black"
            placeholder="EX: 빵진녀"
            placeholderTextColor="#9ca3af"
            value={nickname}
            onChangeText={setNickname}
          />
        </View>

        {/* 관심지역 설정 섹션 */}
        <View className="mb-8">
          <Text className="text-lg font-semibold text-black mb-3">관심지역 설정</Text>
          <View className="bg-gray-100 p-4 rounded-2xl flex-row items-center">
            <Ionicons name="search" size={20} color="#6b7280" />
            <TextInput
              className="flex-1 ml-3 text-black"
              placeholder="지역을 검색하세요"
              placeholderTextColor="#9ca3af"
              value={interestArea}
              onChangeText={setInterestArea}
            />
          </View>
        </View>

        {/* 지도 섹션 */}
        <View className="mb-8">
          <View className="bg-gray-100 rounded-2xl overflow-hidden" style={{ height: 300 }}>
            {/* 지도 플레이스홀더 - 실제 지도 라이브러리로 교체 가능 */}
            <View className="flex-1 bg-gray-200 items-center justify-center">
              <Ionicons name="map" size={48} color="#9ca3af" />
              <Text className="text-gray-500 mt-2">지도가 여기에 표시됩니다</Text>
              <Text className="text-gray-400 text-sm mt-1">실제 구현 시 지도 라이브러리 사용</Text>
            </View>
          </View>
        </View>

        {/* 하단 여백 */}
        <View className="h-20" />
      </ScrollView>

      {/* 저장 버튼 */}
      <View className="absolute bottom-0 left-0 right-0 p-4 bg-white">
        <TouchableOpacity 
          className="bg-gray-800 p-4 rounded-2xl"
          onPress={() => {
            // 저장 로직 구현
            console.log('닉네임:', nickname);
            console.log('관심지역:', interestArea);
            // 여기에 저장 처리 및 다음 화면 이동 로직 추가
          }}
        >
          <Text className="text-white text-center text-lg font-medium">저장</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
