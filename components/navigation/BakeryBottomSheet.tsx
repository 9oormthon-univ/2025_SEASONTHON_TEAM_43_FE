import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import { ScrollView, ActivityIndicator } from "react-native";

const PLACEHOLDER_IMG = require("@/assets/images/bread.png");

export type Bakery = {
  description: string;
  id: string;
  name: string;
  address: string;
  image: ImageSourcePropType;
  latitude: number;
  longitude: number;
  kakaoId: string; //카카오 맵 id
};

type BakeryListItemProps = {
  name: string;
  address: string;
  image: ImageSourcePropType;
  onSelect: () => void;
};

const BakeryListItem: React.FC<BakeryListItemProps> = ({
  name,
  address,
  image,
  onSelect,
}) => (
  <TouchableOpacity
    onPress={onSelect}
    className="flex-row items-center rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
  >
    <Image source={image} className="mr-4 h-16 w-16 rounded-lg" />
    <View className="flex-1">
      <Text className="text-base font-bold text-gray-800">{name}</Text>
      <Text className="mt-1 text-sm text-gray-500" numberOfLines={1}>
        {address}
      </Text>
    </View>
  </TouchableOpacity>
);

type BakeryBottomSheetProps = {
  bakeries: Bakery[];
  onBakerySelect: (bakery: Bakery) => void;
  // 선택: 상위에서 로딩/에러를 내려주고 싶다면 아래 두 프롭을 추가하세요.
  loading?: boolean;
  errorMsg?: string | null;
  onRetry?: () => void;
};

const BakeryBottomSheet: React.FC<BakeryBottomSheetProps> = ({
  bakeries,
  onBakerySelect,
  loading,
  errorMsg,
  onRetry,
}) => {
  const handleCreateCoursePress = () => {
    alert("코스 만들기 화면으로 이동합니다!");
  };
  const CARD_FULL_HEIGHT = 104; // 각 아이템의 전체 높이 (패딩 포함)
  const CARD_VISIBLE_HEIGHT = 80; // 겹쳤을 때 보이는 아래 아이템의 높이

  const listContainerHeight =
    bakeries.length > 0
      ? (bakeries.length - 1) * CARD_VISIBLE_HEIGHT + CARD_FULL_HEIGHT
      : 0;

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator />
        <Text className="mt-3 text-gray-500">내 주변 빵집을 불러오는 중…</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-6">
        <Text className="mb-3 text-center text-gray-600">{errorMsg}</Text>
        <TouchableOpacity
          onPress={onRetry}
          className="rounded-full bg-orange-500 px-5 py-3"
        >
          <Text className="text-base font-bold text-white">다시 시도</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // API 아이템 -> 렌더용 Bakery로 매핑
  // const bakeries: Bakery[] = items.map((it) => ({
  //   id: it.id,
  //   name: it.name,
  //   address: it.address,
  //   image: PLACEHOLDER_IMG, // 서버에서 이미지 제공 시 교체
  //   latitude: it.latitude,
  //   longitude: it.longitude,
  // }));

  return (
    <View className="flex-1">
      <ScrollView className="bg-white" contentContainerClassName="pt-4 pb-24">
        <View className="mb-4 flex-row items-baseline px-4">
          <Text
            style={{ fontFamily: "SUIT", color: "#A55615" }}
            className="text-xl font-bold"
          >
            내 주변 빵집
          </Text>
          <Text className="ml-2 text-sm text-gray-500">
            반경 500m 내 빵집을 추천해드려요
          </Text>
        </View>

        {bakeries.length === 0 ? (
          <View className="px-4">
            <View className="rounded-xl border border-gray-100 bg-white p-4">
              <Text className="text-gray-600">
                주변에서 표시할 빵집이 없습니다.
              </Text>
            </View>
          </View>
        ) : (
          <View
            style={{ height: listContainerHeight }}
            className="relative px-4"
          >
            {bakeries.map((bakery, index) => (
              <View
                key={bakery.id}
                style={{
                  position: "absolute",
                  top: index * CARD_VISIBLE_HEIGHT,
                  left: 16,
                  right: 16,
                }}
              >
                <BakeryListItem
                  name={bakery.name}
                  address={bakery.address}
                  image={bakery.image ?? PLACEHOLDER_IMG}
                  onSelect={() => onBakerySelect(bakery)}
                />
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <TouchableOpacity
        onPress={handleCreateCoursePress}
        className="absolute bottom-8 right-6 rounded-full bg-orange-500 px-5 py-3 shadow-lg shadow-black/30"
      >
        <Text className="text-base font-bold text-white">+ 코스 만들기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BakeryBottomSheet;
