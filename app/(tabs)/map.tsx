import React, { useMemo, useRef, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import SearchBar from '@/components/common/Search_map';
import BakeryBottomSheet, {type Bakery} from '@/components/navigation/BakeryBottomSheet'; 
import KakaoMap from '@/components/common/KakaoMap';

const nearbyBakeries: Bakery[] = [ 
  { id: '1', name: '성심당', address: '대전광역시 중구 대종로480번길 15', image: require('../../assets/images/bread.png'), latitude: 36.3275, longitude: 127.4276 },
  { id: '2', name: '태극당', address: '서울특별시 중구 동호로24길 7', image: require('../../assets/images/bread.png'), latitude: 37.5621, longitude: 127.0003 },
  { id: '3', name: '안스 베이커리', address: '인천광역시 연수구...', image: require('../../assets/images/bread.png'), latitude: 37.4042, longitude: 126.6778 },
  { id: '4', name: '성심당', address: '대전광역시 중구 대종로480번길 15', image: require('../../assets/images/bread.png'), latitude: 36.3275, longitude: 127.4276 },
  { id: '5', name: '태극당', address: '서울특별시 중구 동호로24길 7', image: require('../../assets/images/bread.png'), latitude: 37.5621, longitude: 127.0003 },
  { id: '6', name: '안스 베이커리', address: '인천광역시 연수구...', image: require('../../assets/images/bread.png'), latitude: 37.4042, longitude: 126.6778 },
  { id: '7', name: '성심당', address: '대전광역시 중구 대종로480번길 15', image: require('../../assets/images/bread.png'), latitude: 36.3275, longitude: 127.4276 },
  { id: '8', name: '태극당', address: '서울특별시 중구 동호로24길 7', image: require('../../assets/images/bread.png'), latitude: 37.5621, longitude: 127.0003 },
  { id: '9', name: '안스 베이커리', address: '인천광역시 연수구...', image: require('../../assets/images/bread.png'), latitude: 37.4042, longitude: 126.6778 },
  
  
];

export default function MapScreen() {
  const insets = useSafeAreaInsets();
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
          <KakaoMap
            center={mapCenter}
            markers={mapMarkers}
            zoomLevel={8}
            onMarkerSelect={handleMarkerSelect}
          />
        </View>

        <View 
          style={{ paddingTop: insets.top }} 
          className="items-center z-10"
        >
          <View className="p-4 w-full">
            <SearchBar onSearch={handleSearch} />
          </View>
        </View>
        
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          handleIndicatorStyle={{ backgroundColor: '#E5E7EB' }}
        >
          <BakeryBottomSheet
            bakeries={nearbyBakeries}
            onBakerySelect={handleBakerySelect}
          />
        </BottomSheet>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}