import { useEffect, useState, useCallback } from "react";
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Location from "expo-location";
import { router } from "expo-router";

import BreadCard from "@/components/explore/BreadCard";
import { getRecommendList } from "@/remote/request/explore";
import type { ExploreItem } from "@/remote/response/explore";

const breadImages = [
  require("../../assets/images/bread1.png"),
  require("../../assets/images/bread2.png"),
  require("../../assets/images/bread3.png"),
  require("../../assets/images/bread4.png"),
  require("../../assets/images/bread5.png"),
  require("../../assets/images/bread6.png"),
  require("../../assets/images/bread7.png"),
  require("../../assets/images/bread8.png"),
  require("../../assets/images/bread9.png"),
  require("../../assets/images/bread10.png"),
];

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();

  const getRandomBreadImage = () => {
    const index = Math.floor(Math.random() * breadImages.length);
    return breadImages[index];
  };

  const [items, setItems] = useState<ExploreItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setErrorMsg(null);
    try {
      // 1) 권한
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg(
          "위치 권한이 거부되었습니다. 설정에서 권한을 허용해주세요.",
        );
        return;
      }

      // 2) 현재 위치
      const { coords } = await Location.getCurrentPositionAsync();

      // 3) 추천 리스트
      const res = await getRecommendList({
        // lat: coords.latitude,
        // lng: coords.longitude,
        lat: 36.35504119, // 대전역 좌표
        lng: 127.3845475,
      });

      // if (!res.success) {
      //   throw new Error(`API 실패(code=${res.code})`);
      // }

      setItems(res);
    } catch (e: any) {
      setErrorMsg(e?.message ?? "알 수 없는 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, [fetchData]);

  const handleBakeryPress = useCallback((item: ExploreItem) => {
    // 상세 페이지로 id만 넘기는 예시
    // router.push({
    //   pathname: "/(bakery-detail)",
    //   params: { id: String(item.id) },
    // });
  }, []);

  const formatDistance = (m: number) => {
    if (m < 1000) return `${Math.round(m)}m`;
    return `${(m / 1000).toFixed(1)}km`;
  };

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

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator />
          <Text className="mt-3 text-grey-1">위치를 확인하고 있어요…</Text>
        </View>
      ) : errorMsg ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-grey-1">{errorMsg}</Text>
          {/* 필요하다면 설정 여는 버튼 추가
          <Button title="설정 열기" onPress={() => Linking.openSettings()} />
          */}
        </View>
      ) : (
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            alignItems: "center",
            paddingBottom: 90,
            paddingTop: 10,
          }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {items.map((item) => (
            <BreadCard
              key={item.id}
              image={getRandomBreadImage()}
              name={item.name}
              address={`${item.address} · ${formatDistance(item.distance)}`}
              intro={item.intro}
              onPress={() => handleBakeryPress(item)}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}
