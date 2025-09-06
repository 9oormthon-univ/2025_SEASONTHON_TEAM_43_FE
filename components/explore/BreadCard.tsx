// components/BreadCard.tsx
import React from "react";
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { ImageSourcePropType } from "react-native";

interface BreadCardProps {
  image: ImageSourcePropType; // require(...) 또는 {uri: "..."}
  name: string;
  address: string;
  intro: string;
  onPress: () => void;
}

const { width } = Dimensions.get("window");

export default function BreadCard({
  image,
  name,
  address,
  intro,
  onPress,
}: BreadCardProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <View
        className="mb-4 overflow-hidden rounded-xl"
        style={{
          width: width - 48, // ExploreScreen에서 padding px-6 줬으니까 좌우 합쳐서 48 빼줌
          aspectRatio: 16 / 9, // 카드 비율 고정
        }}
      >
        <ImageBackground
          source={image}
          resizeMode="cover"
          className="flex-1 justify-end"
          imageStyle={{ borderRadius: 16 }}
        >
          {/* 어두운 오버레이 */}
          <View className="rounded-b-xl bg-black/40 px-4 py-3">
            <View className="mb-1 flex-row items-center">
              <Text
                className="flex-shrink font-suit-bold text-base text-white"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {name}
              </Text>
              <Text className="mx-2 text-white">|</Text>
              <Text
                className="flex-1 text-sm text-white"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {address}
              </Text>
            </View>
            <Text
              className="text-xs text-white"
              numberOfLines={1} // 1줄로 말줄임
              ellipsizeMode="tail"
            >
              {intro}
            </Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
}
