import { Text, View } from 'react-native';

/**
 * '빵 지도' 탭을 눌렀을 때 표시되는 기본 화면입니다.
 */
export default function BreadMapScreen() {
  return (
    // Tailwind CSS를 사용하여 화면 중앙에 텍스트를 표시합니다.
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-gray-800">빵 지도 화면</Text>
    </View>
  );
}
