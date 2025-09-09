import React from 'react';
import { View, Text, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';

//빵집 데이터의 타입을 정의 -> 다른 파일에서도 사용할 수 있도록 export 한다.
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
  onCreateCourse: () => void;
};

const BakeryListItem: React.FC<BakeryListItemProps> = ({ name, address, image, onSelect, onCreateCourse }) => (
  <TouchableOpacity
    onPress={onSelect}
    className="flex-row items-center mb-4"
  >
    <Image source={image} className="w-16 h-16 rounded-lg mr-4" />
    <View className="flex-1">
      <Text className="text-base font-bold text-gray-800">{name}</Text>
      <Text className="text-sm text-gray-500 mt-1">{address}</Text>
    </View>
    <TouchableOpacity
      onPress={onCreateCourse}
      className="bg-orange-500 rounded-full py-2 px-4"
    >
      <Text className="text-white font-bold text-xs">+ 코스 만들기</Text>
    </TouchableOpacity>
  </TouchableOpacity>
);

type BakeryBottomSheetProps = {
  bakeries: Bakery[];
  onBakerySelect: (bakery: Bakery) => void;
};

const BakeryBottomSheet: React.FC<BakeryBottomSheetProps> = ({ bakeries, onBakerySelect }) => (
  <BottomSheetScrollView
    className="bg-white"
    contentContainerClassName="pt-4 pb-10"
  >
    <View className="px-4 mb-4">
      <Text
        style={{ fontFamily: 'SUIT', color: '#A55615' }}
        className="text-xl font-bold"
      >
        내 주변 빵집
      </Text>
      <Text className="text-sm text-gray-500 mt-1">
        반경 500m 내 빵집을 추천해드려요
      </Text>
    </View>

    <View className="px-4">
      {bakeries.map((bakery) => (
        <BakeryListItem
          key={bakery.id}
          name={bakery.name}
          address={bakery.address}
          image={bakery.image} 
          onSelect={() => onBakerySelect(bakery)}
          onCreateCourse={() => alert(`'${bakery.name}'으로 코스 만들기`)} 
        />
      ))}
    </View>
  </BottomSheetScrollView>
);

export default BakeryBottomSheet;