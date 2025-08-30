import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ExploreCardProps {
  height?: number;
  className?: string;
}

export default function ExploreCard({ height = 120, className = "" }: ExploreCardProps) {
  return (
    <View className={`bg-gray-100 rounded-2xl p-6 border border-gray-200 mb-4 ${className}`}>
      <View className="items-center justify-center" style={{ height }}>
        <Ionicons name="location" size={48} color="#9ca3af" />
      </View>
    </View>
  );
}
