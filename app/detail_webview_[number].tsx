// 빵 가게 클릭 -> 카드 뷰 -> 전체 화면 스크롤 하면 네이티브 바 + 웹뷰 형식으로 보임 
//웹뷰는 https://place.map.kakao.com/kakaoId - 요런 식으로 props를 전달해서 받아감  
// 웹뷰시 내부 Scrollview 를 적용해서 해야할 거 같음, 그리고 카드뷰를 최대로 하면 -> searchbar 컴포넌트가 안보이게 해야함.
// 더불어 카드뷰가 최대가 된다면 해당 컴포넌트만 보여야하며 바텀 네비게이션은 보이지 않아야함 
// map.tsx에서는 내가 선택한 빵 매장이 있을때만 해당 컴포넌트를 띄우며 그러지 않을시에는 주변 빵집을 띄워야함 -> 그러면 마커를 클릭했을 떄 빵집 정보를 바텀 시트로 넘기자

import React from 'react';
import { View, Text, Linking, TouchableOpacity, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import { Edge, EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';

import { type Bakery } from '@/components/navigation/BakeryBottomSheet';
import BackIcon from '@/assets/icons/ic_back_big.svg';
import CloseIcon from '@/assets/icons/ic_close_big.svg';

interface BakeryDetailViewProps {
  bakery: Bakery;
  isExpanded: boolean;
  onClose: () => void;
}

const DetailHeader = ({ bakeryName, onClose }: { bakeryName: string; onClose: () => void }) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{ paddingTop: insets.top }}
      className="flex-row items-center justify-between px-4 py-2 bg-white border-b border-gray-200"
    >
      <TouchableOpacity onPress={onClose} className="p-1">
        <BackIcon width={40} height={40} />
      </TouchableOpacity>
      <Text className="text-lg font-bold" numberOfLines={1}>
        {bakeryName}
      </Text>
      <TouchableOpacity onPress={onClose} className="p-1">
        <CloseIcon width={40} height={40} />
      </TouchableOpacity>
    </View>
  );
};

const BakeryDetailView: React.FC<BakeryDetailViewProps> = ({ bakery, isExpanded, onClose }) => {
  const mapUrl = `https://place.map.kakao.com/${bakery.kakaoId}`;

  return (
    <View style={{ flex: 1 }}>
      {isExpanded && <DetailHeader bakeryName={bakery.name} onClose={onClose} />}

      {/* 카드 뷰 (isExpanded=false일 때만 보여줌) */}
      {!isExpanded && (
        <BottomSheetScrollView>
          <View className="p-5">
            <Image
              source={typeof bakery.image === 'string' ? { uri: bakery.image } : bakery.image}
              className="w-full h-48 mb-4 rounded-lg bg-gray-200"
              resizeMode="cover"
            />
            <Text className="text-2xl font-bold text-gray-800">{bakery.name}</Text>
            <Text className="mt-2 text-base text-gray-600">{bakery.address}</Text>
            <Text className="mt-4 text-gray-500">
            </Text>
          </View>
        </BottomSheetScrollView>
      )}

      {/* 웹뷰 (isExpanded=true일 때만 보여줌) */}
      {isExpanded && (
        <View style={{ flex: 1 }}>
          <WebView source={{ uri: mapUrl }} style={{ flex: 1, backgroundColor: 'transparent' }} />
          {/* 카카오맵 상단 바 가리는 오버레이 */}
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 50,
              backgroundColor: 'white',
            }}
          />
        </View>
      )}
    </View>
  );
};

export default BakeryDetailView;