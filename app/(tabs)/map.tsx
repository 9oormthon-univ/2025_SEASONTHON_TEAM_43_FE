import React, {
  useMemo,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";

import SearchBar from "@/components/common/Search_map";
import BakeryBottomSheet, {
  type Bakery,
} from "@/components/navigation/BakeryBottomSheet";
import KakaoMap from "@/components/common/KakaoMap";
import MyLocationButton from "@/components/common/MyLocationButton";
import BakeryDetailView from "@/app/detail_webview_[number]";

import { getMapList } from "@/remote/request/maplist";
import type { MapListItem } from "@/remote/response/maplist";

const PLACEHOLDER_IMG = require("../../assets/images/bread.png");

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const [isSearchOverlayVisible, setIsSearchOverlayVisible] = useState(false);
  const [currentSearchQuery, setCurrentSearchQuery] = useState("");
  const [mapCenter, setMapCenter] = useState({
    latitude: 36.3275,
    longitude: 127.4276,
  });
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);
  const [selectedBakery, setSelectedBakery] = useState<Bakery | null>(null);
  const [isBottomSheetExpanded, setIsBottomSheetExpanded] = useState(false);
  const generalSnapPoints = useMemo(() => ["25%", "50%", "90%"], []);
  const detailSnapPoints = useMemo(() => ["25%", "100%"], []);

  // ✅ API로 불러온 빵집 상태
  const [bakeries, setBakeries] = useState<Bakery[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  //앱 실행시 위치 권한 + 현재 위치 기반 데이터 로드
  const loadNearbyBakeries = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("위치 권한이 거부되었습니다. 설정에서 허용해주세요.");
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      // 현재 위치를 지도 중심으로
      setMapCenter({ latitude: coords.latitude, longitude: coords.longitude });

      // ✅ API 호출
      const data = await getMapList({
        lat: coords.latitude,
        lng: coords.longitude,
        radius: "500", // 선택으로
        size: "5", // 선택으로
      });

      // MapListItem[] -> Bakery[] 매핑
      const mapped: Bakery[] = (data ?? []).map((it: MapListItem) => ({
        description: "",
        id: String(it.id),
        name: it.name,
        address: it.address,
        image: PLACEHOLDER_IMG, // 서버가 이미지 제공 시 it.image 로 교체
        latitude: it.latitude,
        longitude: it.longitude,
        kakaoId: String(it.id),
      }));

      setBakeries(mapped);
    } catch (e: any) {
      setErrorMsg(e?.message ?? "내 주변 빵집을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNearbyBakeries();
  }, [loadNearbyBakeries]);

  const SearchOverlay = ({
    onBack,
    onSearch,
  }: {
    onBack: () => void;
    onSearch: (query: string) => void;
  }) => {
    const [searchText, setSearchText] = useState("");
    const insets = useSafeAreaInsets();
    const searchHistory = [
      "성심당 본점",
      "대전역 빵집",
      "롯데백화점 대전점",
      "빵먹고싶다",
    ];

    const handleSearchSubmit = () => {
      if (searchText.trim()) {
        onSearch(searchText);
        onBack();
      }
    };

    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: "white", paddingTop: insets.top, zIndex: 999 },
        ]}
      >
        <View className="flex-row items-center border-b border-gray-200 px-4 py-3">
          <TouchableOpacity onPress={onBack} className="mr-3 p-1">
            <Ionicons name="arrow-back" size={24} color="#222222" />
          </TouchableOpacity>
          <View className="h-10 flex-1 flex-row items-center rounded-full bg-gray-100 px-3">
            <Ionicons name="search" size={20} color="#787878" />
            <TextInput
              className="ml-2 flex-1 text-base text-gray-800"
              placeholder="빵집 검색"
              placeholderTextColor="#787878"
              value={searchText}
              onChangeText={setSearchText}
              onSubmitEditing={handleSearchSubmit}
              returnKeyType="search"
              autoFocus
            />
            {searchText.length > 0 && (
              <TouchableOpacity
                onPress={() => setSearchText("")}
                className="ml-2"
              >
                <Ionicons name="close-circle" size={20} color="#787878" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <ScrollView className="flex-1 px-4 py-2">
          {searchHistory.length > 0 && (
            <View className="mb-4">
              <Text className="mb-2 text-lg font-bold">최근 검색어</Text>
              {searchHistory.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  className="flex-row items-center justify-between border-b border-gray-100 py-2"
                  onPress={() => {
                    setSearchText(item);
                    onSearch(item);
                    onBack();
                  }}
                >
                  <Text className="text-base text-gray-700">{item}</Text>
                  <TouchableOpacity onPress={() => console.log("삭제:", item)}>
                    <Ionicons name="close" size={20} color="#C0C0C0" />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    );
  };

  const handleMyLocationPress = async () => {
    let { status } = await Location.getForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("위치 권한 거부", "설정에서 위치 권한을 허용해주세요.");
      return;
    }

    try {
      let location = await Location.getCurrentPositionAsync({});

      setMapCenter({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      Alert.alert("내 위치로 이동!", "지도를 현재 위치로 이동했습니다.");
    } catch (error) {
      console.error("Error getting location", error);
      Alert.alert(
        "오류",
        "위치를 가져오는 중 오류가 발생했습니다. 다시 시도해 주세요.",
      );
    }
  };

  const handleSearchInitiate = () => {
    setIsSearchOverlayVisible(true);
  };

  const handleSearchSubmit = (text: string) => {
    console.log("실제 검색 수행:", text);
    setCurrentSearchQuery(text);
    Alert.alert("검색 완료!", `"${text}"(으)로 빵집을 검색했습니다.`);
  };

  // ✅ 마커는 API로 받은 bakeries 기준
  const mapMarkers = bakeries.map((bakery) => ({
    id: bakery.id,
    latitude: bakery.latitude,
    longitude: bakery.longitude,
    title: bakery.name,
  }));

  const handleMarkerSelect = (markerId: string) => {
    const selectedBakery = bakeries.find((b) => b.id === markerId);
    if (selectedBakery) {
      setMapCenter({
        latitude: selectedBakery.latitude,
        longitude: selectedBakery.longitude,
      });
      bottomSheetRef.current?.snapToIndex(1);
    }
  };

  const handleBottomSheetChange = (index: number) => {
    //바텀 시트 상태 관리
    // selectedBakery가 있을 때만 상세 페이지 스냅 포인트(100%) 기준으로 확장 여부 결정
    if (selectedBakery) {
      setIsBottomSheetExpanded(index === 1);
    } else {
      // selectedBakery가 없을 때, '내 주변 빵집' 리스트의 마지막 스냅 포인트(90%) 기준으로 확장 여부 결정
      setIsBottomSheetExpanded(index === 2);
    }
  };

  const handleCloseDetailView = () => {
    setSelectedBakery(null); // 선택된 빵집 초기화
    bottomSheetRef.current?.collapse(); // 바텀 시트 접기
  };

  const handleBakerySelect = (bakery: Bakery) => {
    setMapCenter({ latitude: bakery.latitude, longitude: bakery.longitude });
    bottomSheetRef.current?.snapToIndex(0);
  };

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaView className="flex-1 bg-white">
        <View className="absolute inset-0 z-0">
          <KakaoMap
            center={mapCenter}
            markers={mapMarkers}
            zoomLevel={8}
            onMarkerSelect={handleMarkerSelect}
          />
        </View>

        {!isSearchOverlayVisible && !isBottomSheetExpanded && (
          <View
            style={{ paddingTop: insets.top }}
            className="z-10 items-center"
          >
            <View className="w-full p-4">
              <SearchBar onPress={handleSearchInitiate} />
            </View>
          </View>
        )}

        {isSearchOverlayVisible && (
          <SearchOverlay
            onBack={() => setIsSearchOverlayVisible(false)}
            onSearch={handleSearchSubmit}
          />
        )}
        <MyLocationButton onPress={handleMyLocationPress} />
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          // ⭐️ selectedBakery 상태에 따라 snapPoints 동적으로 변경
          snapPoints={selectedBakery ? detailSnapPoints : generalSnapPoints}
          // ⭐️ onChange 핸들러 추가
          onChange={handleBottomSheetChange}
          handleIndicatorStyle={{ backgroundColor: "#E5E7EB" }}
        >
          {/* ⭐️ 조건부 렌더링 로직 추가 */}
          {selectedBakery ? (
            <BakeryDetailView
              bakery={selectedBakery}
              isExpanded={isBottomSheetExpanded}
              onClose={handleCloseDetailView}
            />
          ) : loading ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator />
              <Text className="mt-2 text-gray-500">
                내 주변 빵집을 불러오는 중…
              </Text>
            </View>
          ) : errorMsg ? (
            <View className="flex-1 items-center justify-center px-6">
              <Text className="mb-3 text-center text-gray-600">{errorMsg}</Text>
              <TouchableOpacity
                // loadNearbyBakeries 함수가 정의되어 있지 않아 주석 처리
                // onPress={loadNearbyBakeries}
                className="rounded-full bg-orange-500 px-5 py-3"
              >
                <Text className="text-base font-bold text-white">
                  다시 시도
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <BakeryBottomSheet
              bakeries={bakeries}
              onBakerySelect={handleBakerySelect}
            />
          )}
        </BottomSheet>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
