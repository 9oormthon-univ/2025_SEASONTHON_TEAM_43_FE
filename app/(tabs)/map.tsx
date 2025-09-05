import React, { useMemo, useRef, useState, useEffect } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Alert, StyleSheet, TextInput, ScrollView } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";

import SearchBar from "@/components/common/Search_map";
import BakeryBottomSheet, { type Bakery } from "@/components/navigation/BakeryBottomSheet";
import KakaoMap from "@/components/common/KakaoMap";
import MyLocationButton from "@/components/common/MyLocationButton";

const nearbyBakeries: Bakery[] = [
  {
    id: "1",
    name: "성심당",
    address: "대전광역시 중구 대종로480번길 15",
    image: require("../../assets/images/bread.png"),
    latitude: 36.3275,
    longitude: 127.4276
  },
  {
    id: "2",
    name: "태극당",
    address: "서울특별시 중구 동호로24길 7",
    image: require("../../assets/images/bread.png"),
    latitude: 37.5621,
    longitude: 127.0003
  },
  {
    id: "3",
    name: "안스 베이커리",
    address: "인천광역시 연수구...",
    image: require("../../assets/images/bread.png"),
    latitude: 37.4042,
    longitude: 126.6778
  },
  {
    id: "4",
    name: "성심당 롯데백화점 대전점",
    address: "대전광역시 서구 계룡로 598",
    image: require("../../assets/images/bread.png"),
    latitude: 36.34,
    longitude: 127.3879
  },
  {
    id: "5",
    name: "하레하레 본점",
    address: "대전광역시 서구 계룡로 612",
    image: require("../../assets/images/bread.png"),
    latitude: 36.3405,
    longitude: 127.389
  }
];

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const [isSearchOverlayVisible, setIsSearchOverlayVisible] = useState(false);
  const [currentSearchQuery, setCurrentSearchQuery] = useState("");
  const [mapCenter, setMapCenter] = useState({ latitude: 36.3275, longitude: 127.4276 });
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  //앱 실행시 위치 권한 필요
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("위치 권한 필요", "내 위치를 확인하려면 위치 접근 권한이 필요합니다.");
      }
    })();
  }, []);

  const SearchOverlay = ({ onBack, onSearch }: { onBack: () => void; onSearch: (query: string) => void }) => {
    const [searchText, setSearchText] = useState("");
    const insets = useSafeAreaInsets();
    const searchHistory = ["성심당 본점", "대전역 빵집", "롯데백화점 대전점", "빵먹고싶다"];

    const handleSearchSubmit = () => {
      if (searchText.trim()) {
        onSearch(searchText);
        onBack();
      }
    };

    return (
      <View style={[StyleSheet.absoluteFill, { backgroundColor: "white", paddingTop: insets.top, zIndex: 999 }]}>
        <View className="flex-row items-center px-4 py-3 border-b border-gray-200">
          <TouchableOpacity onPress={onBack} className="mr-3 p-1">
            <Ionicons name="arrow-back" size={24} color="#222222" />
          </TouchableOpacity>
          <View className="flex-1 flex-row items-center bg-gray-100 h-10 rounded-full px-3">
            <Ionicons name="search" size={20} color="#787878" />
            <TextInput
              className="flex-1 ml-2 text-base text-gray-800"
              placeholder="빵집 검색"
              placeholderTextColor="#787878"
              value={searchText}
              onChangeText={setSearchText}
              onSubmitEditing={handleSearchSubmit}
              returnKeyType="search"
              autoFocus
            />
            {searchText.length > 0 && (
              <TouchableOpacity onPress={() => setSearchText("")} className="ml-2">
                <Ionicons name="close-circle" size={20} color="#787878" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <ScrollView className="flex-1 px-4 py-2">
          {searchHistory.length > 0 && (
            <View className="mb-4">
              <Text className="text-lg font-bold mb-2">최근 검색어</Text>
              {searchHistory.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  className="flex-row justify-between items-center py-2 border-b border-gray-100"
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
        longitude: location.coords.longitude
      });

      Alert.alert("내 위치로 이동!", "지도를 현재 위치로 이동했습니다.");
    } catch (error) {
      console.error("Error getting location", error);
      Alert.alert("오류", "위치를 가져오는 중 오류가 발생했습니다. 다시 시도해 주세요.");
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

  const mapMarkers = nearbyBakeries.map((bakery) => ({
    id: bakery.id,
    latitude: bakery.latitude,
    longitude: bakery.longitude,
    title: bakery.name
  }));

  const handleMarkerSelect = (markerId: string) => {
    const selectedBakery = nearbyBakeries.find((b) => b.id === markerId);
    if (selectedBakery) {
      Alert.alert("마커 선택!", `${selectedBakery.name}을 선택했습니다.`);
      setMapCenter({ latitude: selectedBakery.latitude, longitude: selectedBakery.longitude });
      bottomSheetRef.current?.snapToIndex(1);
    }
  };

  const handleBakerySelect = (bakery: Bakery) => {
    setMapCenter({ latitude: bakery.latitude, longitude: bakery.longitude });
    Alert.alert(`${bakery.name}(으)로 이동합니다!`);
  };

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaView className="flex-1 bg-white">
        <View className="absolute inset-0 z-0">
          <KakaoMap center={mapCenter} markers={mapMarkers} zoomLevel={8} onMarkerSelect={handleMarkerSelect} />
        </View>

        {!isSearchOverlayVisible && (
          <View style={{ paddingTop: insets.top }} className="items-center z-10">
            <View className="p-4 w-full">
              <SearchBar onPress={handleSearchInitiate} />
            </View>
          </View>
        )}

        {isSearchOverlayVisible && (
          <SearchOverlay onBack={() => setIsSearchOverlayVisible(false)} onSearch={handleSearchSubmit} />
        )}
        <MyLocationButton onPress={handleMyLocationPress} />
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          handleIndicatorStyle={{ backgroundColor: "#E5E7EB" }}
        >
          <BakeryBottomSheet bakeries={nearbyBakeries} onBakerySelect={handleBakerySelect} />
        </BottomSheet>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
