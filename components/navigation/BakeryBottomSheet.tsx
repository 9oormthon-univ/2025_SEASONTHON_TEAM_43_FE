import React from 'react';
import { View, Text, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';

export type Bakery = {
  id: string;
  name: string;
  address: string;
  image: ImageSourcePropType; 
  latitude: number;
  longitude: number;
};

type BakeryListItemProps = {
  name: string;
  address: string;
  image: ImageSourcePropType;
  onSelect: () => void;
};

const BakeryListItem: React.FC<BakeryListItemProps> = ({ name, address, image, onSelect }) => (
  <TouchableOpacity
    onPress={onSelect}
    className="flex-row items-center p-4 bg-white border border-gray-100 rounded-xl shadow-sm"
  >
    <Image source={image} className="w-16 h-16 rounded-lg mr-4" />
    <View className="flex-1">
      <Text className="text-base font-bold text-gray-800">{name}</Text>
      <Text className="text-sm text-gray-500 mt-1">{address}</Text>
    </View>
  </TouchableOpacity>
);

type BakeryBottomSheetProps = {
  bakeries: Bakery[]; 
  onBakerySelect: (bakery: Bakery) => void;
};

const BakeryBottomSheet: React.FC<BakeryBottomSheetProps> = ({ bakeries, onBakerySelect }) => {
  const handleCreateCoursePress = () => {
    alert('코스 만들기 화면으로 이동합니다!');
  };
  const CARD_FULL_HEIGHT = 104; // 각 아이템의 전체 높이 (패딩 포함)
  const CARD_VISIBLE_HEIGHT = 80; // 겹쳤을 때 보이는 아래 아이템의 높이

  const listContainerHeight = bakeries.length > 0
    ? (bakeries.length - 1) * CARD_VISIBLE_HEIGHT + CARD_FULL_HEIGHT
    : 0;
  return (
    <View className="flex-1">
      <BottomSheetScrollView
        className="bg-white"
        contentContainerClassName="pt-4 pb-24" 
      >
        <View className="px-4 mb-4 flex-row items-baseline">
          <Text style={{ fontFamily: 'SUIT', color: '#A55615' }} className="text-xl font-bold">
            내 주변 빵집
          </Text>
          <Text className="text-sm text-gray-500 ml-2">
            반경 500m 내 빵집을 추천해드려요
          </Text>
        </View>

        <View style={{ height: listContainerHeight }} className="relative px-4">
          {bakeries.map((bakery, index) => (
            <View
              key={bakery.id}
              // absolute를 사용하여 각 아이템의 위치를 동적으로 지정합니다.
              style={{
                position: 'absolute',
                top: index * CARD_VISIBLE_HEIGHT,
                left: 16, // px-4에 해당하는 값
                right: 16,
              }}
            >
              <BakeryListItem
                name={bakery.name}
                address={bakery.address}
                image={bakery.image}
                onSelect={() => onBakerySelect(bakery)}
              />
            </View>
          ))}
        </View>
      </BottomSheetScrollView>

      <TouchableOpacity
        onPress={handleCreateCoursePress}
        className="absolute bottom-8 right-6 bg-orange-500 rounded-full py-3 px-5 shadow-lg shadow-black/30"
      >
        <Text className="text-white font-bold text-base">+ 코스 만들기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BakeryBottomSheet;