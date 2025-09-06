// 빵 가게 클릭 -> 카드 뷰 -> 전체 화면 스크롤 하면 네이티브 바 + 웹뷰 형식으로 보임 
//웹뷰는 https://place.map.kakao.com/kakaoId - 요런 식으로 props를 전달해서 받아감  
// 웹뷰시 내부 Scrollview 를 적용해서 해야할 거 같음, 그리고 카드뷰를 최대로 하면 -> searchbar 컴포넌트가 안보이게 해야함.
// 더불어 카드뷰가 최대가 된다면 해당 컴포넌트만 보여야하며 바텀 네비게이션은 보이지 않아야함 
// map.tsx에서는 내가 선택한 빵 매장이 있을때만 해당 컴포넌트를 띄우며 그러지 않을시에는 주변 빵집을 띄워야함 -> 그러면 마커를 클릭했을 떄 빵집 정보를 바텀 시트로 넘기자

import React from 'react';
import { View, Text, Linking, TouchableOpacity, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import { type Bakery } from '@/components/navigation/BakeryBottomSheet';
import { isAxiosError } from 'axios';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

import BackIcon from '../../assets/icons/ic_back_big.svg';
import CloseIcon from '../../assets/icons/ic_close_big.svg';

interface BakeryDetailViewProps {
  bakery: Bakery;
  isExpanded: boolean;
  onClose: () => void;
}

const BakeryDetailView: React.FC<BakeryDetailViewProps> = ({ bakery, isExpanded, onClose }) => {
  const insets = useSafeAreaInsets();
  const getMapUrl = (query: string): string => {
    // 카카오맵이나 네이버맵 상세 페이지 URL을 반환
    return `https://place.map.kakao.com/${bakery.kakaoId}`;
    /* return 'https://naver.me/FTXwFWCx'; */
  };

  const mapSearchUrl = getMapUrl(bakery.name);

  return (
    <View className="flex-1 bg-white">
      <View 
          style={{ paddingTop: insets.top }} 
          className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-200"
        >
          <TouchableOpacity onPress={onClose} className="p-2">
            <BackIcon width={40} height={40} />
          </TouchableOpacity>
          <Text className="text-lg font-bold">{bakery.name}</Text>
          <TouchableOpacity onPress={onClose} className="p-2">
            <CloseIcon width={40} height={40} />
          </TouchableOpacity>
        </View>
      {/* 미리보기 카드 뷰 (바텀 시트가 절반 높이일 때 보임) */}
      {!isExpanded && (
        <View className="px-4 pt-2 pb-4">
          <Text className="text-2xl font-bold">{bakery.name}</Text>
          <Text className="text-gray-600 mt-1">{bakery.address}</Text>
          {/* 다른 미리보기 정보 */}
        </View>
      )}
      
      {/* 웹뷰 영역 (꽉 찬 화면에서만 보여줌) */}
      <View className={`flex-1 ${isExpanded ? '' : 'hidden'}`}>
        <WebView
          source={{ uri: mapSearchUrl }}
          className="flex-1"
        />
         <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 50, 
            backgroundColor: 'white', //카카오 맵 상단 바 가림
          }}
        />
      </View>
    </View>
  );
};

export default BakeryDetailView;