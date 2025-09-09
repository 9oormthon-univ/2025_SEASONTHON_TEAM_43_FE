import React from 'react';
import { View, Image, Text, TouchableOpacity, ImageSourcePropType } from 'react-native';
// List 컴포넌트 W(375) H(94) P(12 24 12 24 G:10)에 왼쪽 빵집 사진은 W(70) H(70) 빵집 이름은 W(241) H(22), 사진과 빵집 이름 사이 거리는 16, 빵집 이름 밑에 빵집 설명도 있어

interface ListProps {
  imageSource: ImageSourcePropType; // 이미지 경로 (require('./bread.png') 등)
  name: string; // 빵집 이름
  description: string; // 빵집 설명
  onPress?: () => void; // 아이템을 눌렀을 때 실행할 함수 (선택 사항)
}

/*빵집 정보를 보여주는 재사용 가능한 리스트 아이템 컴포넌트 */
const List: React.FC<ListProps> = ({
  imageSource,
  name,
  description,
  onPress,
}) => {
  return (
    // TouchableOpacity로 감싸서 아이템 전체를 버튼처럼 누를 수 있게 합니다.
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8} // 눌렀을 때 투명도 효과
      className="w-full h-[94px] px-6 py-3 flex-row items-center bg-white"
    >
      {/* 왼쪽 빵집 사진 */}
      <Image
        source={imageSource}
        className="w-[70px] h-[70px] rounded-md"
      />

      {/* 오른쪽 텍스트 영역 */}
      {/* 사진과의 간격 16px, 남은 공간 모두 차지 */}
      <View className="flex-1 ml-4">
        <Text
          className="text-base font-bold text-gray-800" // 폰트 크기 16px (text-base)
          numberOfLines={1} 
        >
          {name}
        </Text>
        <Text
          className="text-sm text-gray-500 mt-1" // 폰트 크기 14px (text-sm), 이름과의 간격
          numberOfLines={2} 
        >
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default List;