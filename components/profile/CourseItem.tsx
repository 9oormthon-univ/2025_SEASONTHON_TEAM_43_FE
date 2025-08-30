import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CourseItemProps {
  courseName: string;
  description: string;
  author: string;
  className?: string;
}

export default function CourseItem({ courseName, description, author, className = "" }: CourseItemProps) {
  return (
    <View className={`bg-white rounded-lg p-4 shadow-sm border border-gray-200 ${className}`}>
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <Text className="text-lg font-bold text-black mb-2">{courseName}</Text>
          <Text className="text-sm text-gray-500 mb-1">{description}</Text>
          <Text className="text-xs text-gray-400">{author}</Text>
        </View>
        <View className="items-end">
          <View className="w-8 h-8 bg-gray-200 rounded items-center justify-center mb-2">
            <Ionicons name="bookmark" size={20} color="#6b7280" />
          </View>
          <Text className="text-xs text-gray-400">조회수</Text>
        </View>
      </View>
    </View>
  );
}
