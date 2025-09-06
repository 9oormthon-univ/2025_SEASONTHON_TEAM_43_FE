// components/BreadCard.tsx
import React from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";

interface BreadCardProps {
  image: any; // require(...) 또는 {uri: "..."}
  name: string;
  address: string;
  intro: string;
}

export default function BreadCard({
  image,
  name,
  address,
  intro,
}: BreadCardProps) {
  return (
    <TouchableOpacity>
      <View className="mb-4 h-[218px] w-full overflow-hidden rounded-xl">
        <ImageBackground
          source={image}
          resizeMode="cover"
          className="flex-1 justify-end"
        >
          {/* 어두운 오버레이 */}
          <View className="bg-black/40 px-4 py-3">
            <View className="mb-1 flex-row items-center">
              <Text className="font-suit-bold text-xl text-white">{name}</Text>
              <Text className="ml-2 text-[11px] text-white">|</Text>
              <Text className="ml-2 text-sm text-white">{address}</Text>
            </View>
            <Text
              className="text-white caption1"
              numberOfLines={1} // 말줄임표
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
