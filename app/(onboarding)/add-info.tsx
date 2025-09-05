import {
  router,
  useLocalSearchParams,
  useFocusEffect,
  useRouter,
} from "expo-router";
import { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
// import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SearchBox from "../../components/add-info/SearchBox";
import MapView from "@/components/add-info/MapView";
import geocodeAddress from "@/utils/geocodeAddress";

export default function AddInfoScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [nickname, setNickname] = useState("");
  const [interestArea, setInterestArea] = useState("");
  const { address } = useLocalSearchParams<{ address?: string }>(); // ✅ 주소 파라미터

  const nicknameValid = nickname.trim().length > 0;
  const areaValid = interestArea.trim().length > 0;
  const canSubmit = nicknameValid && areaValid;

  // 기본 서울시청 좌표
  const [coords, setCoords] = useState<{ lat: number; lng: number }>({
    lat: 37.5665,
    lng: 126.978,
  });

  // (2) 파라미터가 바뀌면 상태에 반영
  useEffect(() => {
    if (typeof address === "string" && address && address !== interestArea) {
      setInterestArea(address);
    }
  }, [address]);

  // 주소가 생기면 지오코딩 → 지도 좌표 갱신
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        if (typeof address === "string" && address) {
          const c = await geocodeAddress(address);
          if (!cancelled) setCoords(c);
        }
      } catch (e) {
        console.warn("[geocode] 실패:", e);
        Alert.alert("주소 변환 오류", "해당 주소의 좌표를 찾을 수 없습니다.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [address]);

  return (
    <View className="flex-1 bg-white pt-5">
      <View className="flex-1 px-6">
        {/* 닉네임 입력 섹션 */}
        <View className="mb-9">
          <Text className="body1 font-suit-bold font-bold text-point-3 pb-2">
            닉네임
          </Text>
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
          <Text className="body1 font-suit-bold font-bold text-point-3 pb-3">
            내 지역 찾기
          </Text>
          <SearchBox
            onPress={() => {
              // 검색창 클릭 시 동작 -> 검색 화면으로 이동
              console.log("검색창 클릭됨");
              router.push("/(onboarding)/search-myarea");
            }}
            interestArea={interestArea}
            setInterestArea={setInterestArea}
          />
        </View>

        {/* 지도 섹션 */}
        <View className="flex-1 items-center justify-center">
          <View className="bg-gray-700 overflow-hidden">
            <MapView
              latitude={coords.lat}
              longitude={coords.lng}
              // coords가 바뀔 때 WebView 강제 리로드 보장
              key={`${coords.lat.toFixed(6)}-${coords.lng.toFixed(6)}`}
            />
          </View>
        </View>

        {/* 하단 여백 */}
        <View className="h-5" />
      </View>

      {/* 저장 버튼 */}
      <View className="pt-5 px-6" style={{ paddingBottom: insets.bottom + 40 }}>
        <TouchableOpacity
          className={`px-20 py-3 rounded-lg ${
            canSubmit ? "bg-point-3" : "bg-gray-300"
          }`}
          disabled={!canSubmit}
          activeOpacity={canSubmit ? 0.7 : 1}
          onPress={() => {
            if (!canSubmit) return;
            // TODO: 저장 및 다음 화면 이동
            console.log("닉네임:", nickname);
            console.log("관심지역:", interestArea, coords);
            router.push("/(tabs)");
          }}
        >
          <Text
            className={`text-center body3 font-bold ${
              canSubmit ? "text-point-1" : "text-gray-500"
            }`}
          >
            회원가입하기
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
