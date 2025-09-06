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
import { getMapList } from "@/remote/request/maplist";
import type { MapListItem } from "@/remote/response/maplist";

const PLACEHOLDER_IMG = require("../../assets/images/bread.png");

// const nearbyBakeries: Bakery[] = [
//   { id: '1', name: '성심당', address: '대전광역시 중구 대종로480번길 15', image: require('../../assets/images/bread.png'), latitude: 36.3275, longitude: 127.4276 },
//   { id: '2', name: '태극당', address: '서울특별시 중구 동호로24길 7', image: require('../../assets/images/bread.png'), latitude: 37.5621, longitude: 127.0003 },
//   { id: '3', name: '안스 베이커리', address: '인천광역시 연수구...', image: require('../../assets/images/bread.png'), latitude: 37.4042, longitude: 126.6778 },
//   { id: '4', name: '성심당 롯데백화점 대전점', address: '대전광역시 서구 계룡로 598', image: require('../../assets/images/bread.png'), latitude: 36.3400, longitude: 127.3879 },
//   { id: '5', name: '하레하레 본점', address: '대전광역시 서구 계룡로 612', image: require('../../assets/images/bread.png'), latitude: 36.3405, longitude: 127.3890 },
// ];

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
        // radius: '500',
        // size: '5',
      });

      // MapListItem[] -> Bakery[] 매핑
      const mapped: Bakery[] = (data ?? []).map((it: MapListItem) => ({
        id: it.id,
        name: it.name,
        address: it.address,
        image: PLACEHOLDER_IMG, // 서버가 이미지 제공 시 it.image 로 교체
        latitude: it.latitude,
        longitude: it.longitude,
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

        {!isSearchOverlayVisible && (
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
          snapPoints={snapPoints}
          handleIndicatorStyle={{ backgroundColor: "#E5E7EB" }}
        >
          {loading ? (
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
                onPress={loadNearbyBakeries}
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
