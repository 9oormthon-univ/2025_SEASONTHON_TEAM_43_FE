import { Text, View } from "react-native";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BreadCard from "@/components/explore/BreadCard";

export default function BreadMapScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-1 items-center bg-white px-6"
      style={{ paddingTop: insets.top }}
    >
      <Text className="pb-1 pt-7 font-bold text-point-4 title1">
        당신의 취향저격 빵집
      </Text>
      <Text className="pb-4 font-suit-regular text-grey-1 body4">
        내 취향에 맞는 숨은 빵집을 추천해드려요
      </Text>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          alignItems: "center",
          paddingBottom: 90,
          paddingTop: 10,
        }}
        showsVerticalScrollIndicator={false}
      >
        <BreadCard
          image={require("../../assets/images/bread.png")}
          name="빠앙집"
          address="구 단위 혹은 읍면동 단위(구 없을 시)"
          intro="한줄소개최대30자라서여기말줄임표설정해뒀습니다참고부탁드려요"
        />
        <BreadCard
          image={require("../../assets/images/bread.png")}
          name="빠앙집"
          address="구 단위 혹은 읍면동 단위(구 없을 시)"
          intro="한줄소개최대30자라서여기말줄임표설정해뒀습니다참고부탁드려요"
        />
        <BreadCard
          image={require("../../assets/images/bread.png")}
          name="빠앙집"
          address="구 단위 혹은 읍면동 단위(구 없을 시)"
          intro="한줄소개최대30자라서여기말줄임표설정해뒀습니다참고부탁드려요"
        />
      </ScrollView>
    </View>
  );
}
