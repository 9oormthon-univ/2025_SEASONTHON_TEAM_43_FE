import React, { useMemo, useRef, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import SearchBar from '@/components/common/Search_map';
import CardView from '@/components/common/Card_Course';
import KakaoMap from '@/components/common/KakaoMap';

const nearbyBakeries = [
  { id: '1', name: '성심당', address: '대전광역시 중구 대종로480번길 15', image: require('../../assets/images/bread.png'), latitude: 36.3275, longitude: 127.4276 },
  { id: '2', name: '태극당', address: '서울특별시 중구 동호로24길 7', image: require('../../assets/images/bread.png'), latitude: 37.5621, longitude: 127.0003 },
  { id: '3', name: '안스 베이커리', address: '인천광역시 연수구...', image: require('../../assets/images/bread.png'), latitude: 37.4042, longitude: 126.6778 },
];

export default function MapScreen() {
  const handleSearch = (text: string) => {
    console.log("Searching for:", text);
  };
  
  const [mapCenter, setMapCenter] = useState({ latitude: 36.3275, longitude: 127.4276 });

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);
  
  const mapMarkers = nearbyBakeries.map(bakery => ({
    id: bakery.id,
    latitude: bakery.latitude,
    longitude: bakery.longitude,
    title: bakery.name,
  }));

  const handleMarkerSelect = (markerId: string) => {
    const selectedBakery = nearbyBakeries.find(b => b.id === markerId);
    if (selectedBakery) {
      Alert.alert('마커 선택!', `${selectedBakery.name}을 선택했습니다.`);
      bottomSheetRef.current?.snapToIndex(1);
    }
  };

  return (
   // ✅ CHANGED: style을 className으로 변경
   <GestureHandlerRootView className="flex-1">
      <SafeAreaView className="flex-1 bg-white">
        
        {/* ✅ CHANGED: style을 className으로 변경 */}
        <View className="absolute inset-0 z-0">
          <KakaoMap
            center={mapCenter}
            markers={mapMarkers}
            zoomLevel={8}
            onMarkerSelect={handleMarkerSelect}
          />
        </View>

        {/* ✅ CHANGED: style을 className으로 변경 */}
        <View className="p-4 items-center z-10">
          <SearchBar onSearch={handleSearch} />
        </View>
        
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          handleIndicatorStyle={{ backgroundColor: '#E5E7EB' }} // 이 부분은 props라 그대로 둡니다.
        >
          {/* ✅ CHANGED: style과 contentContainerStyle을 모두 className으로 변경 */}
          <BottomSheetScrollView className="bg-white" contentContainerClassName="pb-10">
            <Text className="font-bold text-base mb-4 px-4">내 주변 빵집</Text>
            {nearbyBakeries.map((bakery) => (
              <View key={bakery.id} className="w-full px-4 mb-4">
                <CardView
                  imageSource={bakery.image}
                  name={bakery.name}
                  address={bakery.address}
                  onPress={() => {
                    setMapCenter({ latitude: bakery.latitude, longitude: bakery.longitude });
                    Alert.alert(`${bakery.name}(으)로 이동합니다!`);
                  }}
                />
              </View>
            ))}
          </BottomSheetScrollView>
        </BottomSheet>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}