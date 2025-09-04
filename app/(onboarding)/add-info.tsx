import { router } from "expo-router";
import { useState } from "react";
import { Text, View, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SearchBox from "../../components/add-info/SearchBox";

export default function AddInfoScreen() {
  const insets = useSafeAreaInsets();
  const [nickname, setNickname] = useState("");
  const [interestArea, setInterestArea] = useState("");

  return (
    <View className="flex-1 bg-white pt-5">
      <View className="flex-1 px-6">
        {/* 닉네임 입력 섹션 */}
        <View className="mb-9">
          <Text className="body1 font-suit-bold font-bold text-point-3 pb-2">닉네임</Text>
          <View className="bg-grey-2 px-[10px] py-[5px] rounded-lg flex-row justify-between items-center">
            <TextInput
              className="flex-1 rounded-lg text-black font-suit-regular font-normal"
              placeholder="닉네임을 입력해주세요"
              placeholderTextColor="#B1B1B1"
              value={nickname}
              onChangeText={setNickname}
            />
          </View>
        </View>

        {/* 관심지역 설정 섹션 */}
        <View className="mb-3">
          <Text className="body1 font-suit-bold font-bold text-point-3 pb-3">내 지역 찾기</Text>
          <SearchBox interestArea={interestArea} setInterestArea={setInterestArea} />
        </View>

        {/* 지도 섹션 */}
        <View>
          <View className="bg-gray-100 rounded-2xl h-80 overflow-hidden">
            {/* 지도 플레이스홀더 - 실제 지도 라이브러리로 교체 */}
            <View className="flex-1 bg-gray-200 items-center justify-center">
              <Ionicons name="map" size={48} color="#9ca3af" />
              <Text className="text-gray-500 mt-2">지도가 여기에 표시됩니다</Text>
              <Text className="text-gray-400 text-sm mt-1">실제 구현 시 지도 라이브러리 사용</Text>
            </View>
          </View>
        </View>

        {/* 하단 여백 */}
        <View className="h-5" />
      </View>

      {/* 저장 버튼 */}
      <View className="pt-5 px-6" style={{ paddingBottom: insets.bottom }}>
        <TouchableOpacity
          className="bg-grey-2 py-3 rounded-lg"
          onPress={() => {
            // 저장 로직 구현
            console.log("닉네임:", nickname);
            console.log("관심지역:", interestArea);
            // 여기에 저장 처리 및 다음 화면 이동 로직 추가
          }}
        >
          <Text className="body3 text-center text-grey-3 font-bold">회원가입하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
